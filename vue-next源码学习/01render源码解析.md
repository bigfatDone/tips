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
