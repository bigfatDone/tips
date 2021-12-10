# render源码解析篇

## render如何被调用

在源码里面，发觉`render`函数并不是直接被调用，而是经过了层层的调用函数，return出来而被调用。在`createAppAPI`函数里面，可以发现这是要创建vue实例。在mount的阶段，会去创建`vnode`并且将其渲染到页面，多的不说，直接看源码

```js
// packages\runtime-core\src\apiCreateApp.ts
function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    // ...省略好多
    mount(
      rootContainer: HostElement,
      isHydrate?: boolean,
      isSVG?: boolean
    ): any {
      // 首次进来就要渲染
      if (!isMounted) {
        const vnode = createVNode(
          rootComponent as ConcreteComponent,
          rootProps
        )
        // 将当前上下文都赋予到了AppContext上面
        vnode.appContext = context

        // 这里判断是否ssr渲染
        if (isHydrate && hydrate) {
          hydrate(vnode as VNode<Node, Element>, rootContainer as any)
        } else {
          // 重头来了，render渲染
          render(vnode, rootContainer, isSVG)
        }
        isMounted = true // 用于判断当前组件是否已经加载完毕
        app._container = rootContainer
        ;(rootContainer as any).__vue_app__ = app
      }
    },
  }
```

这时眼尖的会发现`render`怎么是作为参数传进来的，为什么不是通过`import`引入的呢?

---

让我们从`createApp`说起，在初始化vue实例的时候，我们是这样做的：

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

`createApp`在源码里面是这样写的,会经过`ensureRenderer()`、`createRenderer()`和`baseCreateRenderer()`最终到达如何创建render

```js
// packages\runtime-dom\src\index.ts
export const createApp = ((...args) => {
  // 这个调用是最重要的，负责唤醒render
  const app = ensureRenderer().createApp(...args)

  const { mount } = app

  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    const component = app._component
    // 这里挂载
    const proxy = mount(container, false, container instanceof SVGElement)

    return proxy
  }
  return app
})

// 这里获取renderer，取到关键作用
function ensureRenderer() {
  console.log('--ensureRenderer--');
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}

// packages\runtime-core\src\renderer.ts
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}

function baseCreateRenderer(
  options: RendererOptions,
  createHydrationFns?: typeof createHydrationFunctions
): any {
  // ...省略
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate) // 终于回到开头说的那个函数，形成了闭环
  }
}
```

## render内部定义

`render`函数会接收vnode用来渲染到页面中去，内部会有两个判断，当`vnode`为空的情况，就说明没的内容挂载，如果之前赋予的`vnode`是有数据的，那么就会认定这是要卸载了之前挂载的`vnode`。如果`vnode`有值，那么就会进行`patch`。

```js
const render: RootRenderFunction = (vnode, container, isSVG) => {
  if (vnode == null) {
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    patch(container._vnode || null, vnode, container, null, null, null, isSVG)
  }
  // 调用调度系统，批量执行清空前置回调任务队列
  flushPostFlushCbs()
  container._vnode = vnode
}
```

## patch不同类型和标志

patch的主要入参有`n1(旧节点)`，`n2(新节点)`和`container(挂载的容器)`，进行patch的时候，如果n1和n2是不同的节点，那么就要卸载掉n1,然后就将n2进行细分。接下来则是对vnode的类型进行`switch`。对于vnode的type有四个基础的(`text`,`commont`,`static`和`fragmnet`),当匹配不上这些基础类型的type之后，就会去匹配`shapeFlag`,`shapeFla`g是用二进制进行编码的，通过位运算符`&`进行判断不同的`shapFlag`(`ELEMENT`,`COMPONENT`,`TELEPORT`和`SUSPENSE`)。

```js
const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  slotScopeIds = null,
  optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren
) => {
  if (n1 === n2) {
    return
  }

  // 修补不同的类型，卸载旧的vonde
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }

  if (n2.patchFlag === PatchFlags.BAIL) {
    optimized = false
    n2.dynamicChildren = null
  }

  const { type, ref, shapeFlag } = n2
  // 进行遍历，获取type和shapeflag进而调用不同的进程
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor)
      break
    case Comment:
      processCommentNode(n1, n2, container, anchor)
      break
    case Static:
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, isSVG)
      } else if (__DEV__) {
        patchStaticNode(n1, n2, container, isSVG)
      }
      break
    case Fragment:
      processFragment(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        ;(type as typeof TeleportImpl).process(
          n1 as TeleportVNode,
          n2 as TeleportVNode,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized,
          internals
        )
      } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
        ;(type as typeof SuspenseImpl).process(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized,
          internals
        )
      }
  }

  // 设置ref
  if (ref != null && parentComponent) {
    setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
  }
}
```

### processText处理文本

当判断type是`text`类型的时候，就调用这个流程。由于是文本类型，那么就是会直接操作`dom`对象。当旧节点没有数据的时候，就会将这个文本的值直接`hostInsert`到`dom`节点上去。如果新旧节点都有数据，如果两个节点对比的数据是一致的，那么就不会进行任何的操作，保持原来的状态，如果不一致，就会去替换旧的节点，将新节点的文本直接替换掉。

```js
processText: ProcessTextOrCommentFn = (n1, n2, container, anchor) => {
  if (n1 == null) {
    // 创建文本节点
    hostInsert( // 调用dom操作
      (n2.el = hostCreateText(n2.children as string)),
      container,
      anchor
    )
  } else {
    // !  用在赋值的内容后时，使null和undefined类型可以赋值给其他类型并通过编译
    const el = (n2.el = n1.el!)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.children as string) // 调用dom操作
    }
  }
}
```

### processCommentNode处理注释节点

当判断type是`comment`类型的时候，就会调用这个。这个是注释类型，所有也是会直接操作`dom`对象，当节点没有数据的时候，那么就会去先创建注释节点，然后把这个节点插入到指定的dom元素上。因为vue3里面是不支持注释节点的动态替换的，所以当两个新旧节点都有数据的时候，是会直接把旧的内容直接赋予给新的节点。

```js
processCommentNode: ProcessTextOrCommentFn = (
  n1,
  n2,
  container,
  anchor
) => {
  if (n1 == null) {
    // 插入节点到指定dom元素上
    hostInsert(
      (n2.el = hostCreateComment((n2.children as string) || '')), // 创建注释节点
      container,
      anchor
    )
  } else {
    // 不支持动态注释
    n2.el = n1.el
  }
}
```

### StaticNode处理静态节点

当判断type是`static`类型的时候，就会调用这个。这个是静态节点，接收用户自己的模板，因为这些模板是直接使用innerHTML，是有风险的，所以用户要确保提交的模板是安全的。在生产环境中，当旧模板有内容的时候是不会对其进行操作的，为了用户的安全着想。但是在开发环境会对其内容进行`patch`处理，通过`patchStaticNode`函数对比不同内容进行不同操作。

```js
mountStaticNode = (
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  isSVG: boolean
) => {
//静态节点仅在与编译器dom/运行时dom一起使用时才存在
//这保证了hostInsertStaticContent的存在。
  ;[n2.el, n2.anchor] = hostInsertStaticContent!( // 创建静态节点，并且插入内容
    n2.children as string,
    container,
    anchor,
    isSVG
  )
}

// 开发环境，只用于hmr（热更新）
patchStaticNode = (
  n1: VNode,
  n2: VNode,
  container: RendererElement,
  isSVG: boolean
) => {
  if (n2.children !== n1.children) {
    const anchor = hostNextSibling(n1.anchor!)
    // 移除旧的的静态节点
    removeStaticNode(n1)
    // 插入新的静态节点
    ;[n2.el, n2.anchor] = hostInsertStaticContent!(
      n2.children as string,
      container,
      anchor,
      isSVG
    )
  } else { // 两个节点一致，直接把旧节点复制给新节点
    n2.el = n1.el
    n2.anchor = n1.anchor
  }
}
```

### processFragment处理片段

这是vue3新增的一个组件，以前的vue组件是需要一个根节点，里面才可以继续写内容。但是`fragment`就取代了这种情况，可以直接写平级代码，就不会有多余的div了。`processFragment`这个函数就处理这些组件的内容，将其行行解析操作。当n1是为空的时候，就会直接进行`mountChildren`操作，将内部的内容遍历挂载。如果旧节点和新节点都有内容的情况下，就会把新旧节点的内容进行对比更新，由于可以接受`v-for`之类的动态内容，所以还将其进行不同的处理。

```js
processFragment = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  // 创建fragment的开头和结束位置
  const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''))!
  const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''))!

  let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2

  // 检查是否有插槽的片段，如果有就将其收集起来
  if (fragmentSlotScopeIds) {
    slotScopeIds = slotScopeIds
      ? slotScopeIds.concat(fragmentSlotScopeIds)
      : fragmentSlotScopeIds
  }

  if (n1 == null) {
    hostInsert(fragmentStartAnchor, container, anchor)
    hostInsert(fragmentEndAnchor, container, anchor)
    // fragment只有数组子集，所以就是直接加载子集
    mountChildren(
      n2.children as VNodeArrayChildren,
      container,
      fragmentEndAnchor,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    if (
      patchFlag > 0 &&
      patchFlag & PatchFlags.STABLE_FRAGMENT &&
      dynamicChildren &&
      n1.dynamicChildren
    ) {
      // 动态属性的子集，例如使用了v-for之类的，那么就进行动态的对比打补丁
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        container,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds
      )
    } else {
      // 平常的子集，进行对比打补丁
      patchChildren(
        n1,
        n2,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
  }
}
```

# 结语

只对四钟基础类型进行源码解读，后续还有对shapeflag和diff算法的解析，给个小关注，方便后续学习~~~
