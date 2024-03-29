---
theme: channing-cyan
highlight: github-gist
---

# Component解析初次加载流程

## 创建组件实例(createComponentInstance)

组件实例，设置vue组件的所有通用属性，包括attr，props，provides这些vue组件自身带有的属性，通过对象的形式接收起来。组件内部也赋予了生命周期的命名，目前都是空值。会将父级的provides继续接收到当前组件中`provides: parent ? parent.provides : Object.create(appContext.provides)`,对于props和emits参数，会进行额外的存储起来,通过`normalizePropsOptions`和`normalizeEmitsOptions`这个两个函数，因为组件允许有mixins和extends功能，所以也需要将功能里面这些属性全部聚集起来。

## 将当前实例加入热更新(registerHMR)

判断当前实例`__hmrId`属性有没有被加入map（用于记录当前实例是否被收录），如果没有则要`set`进去。

## 开始初始化组件实例(setupComponent)

通过判断当前组件的shapeFlag是否是有状态组件（组件分为有状态组件和无状态组件）。

```js
instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
```

### initProps初始化props

初始化`props`和`attrs`，因为`attrs`将所有的组件上的属性全部收录起来，`props`只是用户声明的属性；并且将`props`属性用`proxy`代理，变成`shallowReactive`。

### initSlots初始化插槽

通过对子节点的操作，获取子节点上面的所有`slot`，并且最终收集到父节点的`slots`属性上。没有具名的`slot`放到`default`这个函数上面；

```js
// 遍历原始插槽
for (const key in rawSlots) {
  if (isInternalKey(key)) continue
  const value = rawSlots[key]
  // 原始的数据格式需要转成特定的格式
  if (isFunction(value)) {
    slots[key] = normalizeSlot(key, value, ctx)
  } else if (value != null) {
    const normalized = normalizeSlotValue(value)
    slots[key] = () => normalized
  }
}
```

### 安装有状态组件(setupStatefulComponent)

给组件实例设置`accessCache`属性用于缓存内部变量，二次访问会直接读取缓存。开始给实例ctx设置公共代理。

```js
// 创建缓存属性
instance.accessCache = Object.create(null)

// 对ctx进行全局代理
instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers))
```

处理setup属性，创建setup的上下文环境并且给其传入参数：

```js
return {
  get attrs() { // attrs只有读操作
    return attrs || (attrs = createAttrsProxy(instance))
  },
  slots: instance.slots, // 插槽
  emit: instance.emit, // emit参数
  expose // 暴露公共实例属性
}
```

设置当前组件实例，暂停了对组件的跟踪,执行setup函数，并且对setup内部的进行错误收集。

```js
setCurrentInstance(instance)
pauseTracking()
const setupResult = callWithErrorHandling( // 执行setup函数，报错了就对报错信息收集
  setup,
  instance,
  ErrorCodes.SETUP_FUNCTION,
)
resetTracking()
unsetCurrentInstance()

// callWithErrorHandling
function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn() // 执行setup函数
  } catch (err) {
    handleError(err, instance, type) // 对错误数据进行收集
  }
  return res
}
```

因为setup可以用async/await语法糖，所以需要进行是否是promise判断方便进行额外操作；setup的返回值refs在模板中访问时是被自动浅解包的`instance.setupState = proxyRefs(setupResult)`

```js
function proxyRefs<T extends object>(
  objectWithRefs: T
): ShallowUnwrapRef<T> {
  return isReactive(objectWithRefs)
    ? objectWithRefs
    : new Proxy(objectWithRefs, shallowUnwrapHandlers)
}

// 代理函数，进行解包
const shallowUnwrapHandlers: ProxyHandler<any> = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key]
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value
      return true
    } else {
      return Reflect.set(target, key, value, receiver)
    }
  }
}
```

最终进入到了`finishComponentSetup`函数阶段，这里会将组件进行编译，通过调用`compile()`,将页面的`template`内容转换成`js`形式的`ast`树,最后生成vnode。

抽取出vue中的script内部的所有选项，组成一个函数,方便统一管理。

```js
export function applyOptions(instance: ComponentInternalInstance) {
  const options = resolveMergedOptions(instance) // 将组件实例的选项拿出来
  const publicThis = instance.proxy! as any
  const ctx = instance.ctx

  // do not cache property access on public proxy during state initialization
  shouldCacheAccess = false

 // 首先执行beforeCreate函数
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, LifecycleHooks.BEFORE_CREATE) // 绑定实例，执行函数
  }
  // 函数内部选项
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options
}
```

## Suspense组件额外处理

因为`setu()`是异步的，`Suspense`依赖的逻辑有可能是依赖于`setup`的内容，所以需要提前执行。

```js
parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect)
```

## 设置渲染效果(setupRenderEffect)

创建渲染效果，开始将组件进行反应处理。

```js
const effect = new ReactiveEffect(
  componentUpdateFn, // 组件内部更新处理函数
  () => queueJob(instance.update), // 加入任务工作队列
  instance.scope
)
```

对组件进行更新处理，进入`componentUpdateFn`处理方法，对于没有加载过的组件，从组件实例内部拿出`bm(beforemounted)`,执行生命钩子函数。之后通过`const subTree = (instance.subTree = renderComponentRoot(instance))`将组件生成以组件为根目录的vnode，并且通过`patch`方法进行打补丁，进行下一步的shapeFlag的细分操作。

后面就进行组件内部的钩子函数`m(mounted)`操作，当遇到`ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE`的时候，说明是缓存组件，则会执行`activated`钩子函数。
