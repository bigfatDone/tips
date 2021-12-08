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
    createApp: createAppAPI(render, hydrate) // 终于回到开头说的那个函数
  }
}
```
