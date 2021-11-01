# 学习vue3疑问点-看的见的思考

1. `Teleprot`达到瞬间移动的效果，通过to直接嵌到某个选择器

2. `as`断言，说明了程序员进行了充分的检查，不需要程序再多管闲事了。

3. `?` 为可选修饰符，`**name?: string` 代表该属性是**可选填**的。`name: string` 则代表该属性为**必填**并且是字符串类型。

4. `T` 泛型，代表所有的类型都是待定的。只要传进类型，所有`<T>`都是会是同样的类型

5. `const` 声明的object表示内存地址不变，不会变成其他的数据类型。object里面的值可以任意变换，但内存地址还是指向同一个。如果是需要修改object的类型。那么就可以使用let声明。

``` js
// bad
const life = {};
life = '+1s'; // error

// good
const life = {};
life.length = 90;

// good
let life = {};
life = '+1s'; // ok
```

6. `SFC`里面的`.vue`的template字段必须要有或者`<script>`里面必须要有`render`函数，其他的标签可有可有无。

## 应用api-mount

`mount`的使用，在源码里面`vue`实例需要挂载到某个元素上，参数可以传`string`或者是`element`,在传入值的时候，mount会去调用`normalizeContainer`，进行将其转为`element`类型。

```js
// runtime-core/index.ts
app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
  const container = normalizeContainer(containerOrSelector)
  if (container) {
    return mount(container, true, container instanceof SVGElement)
  }
}

// 将容器正常化
function normalizeContainer(
container: Element | ShadowRoot | string
): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    return res
  }
  return container as any
}
```

## 应用api-use

安装 Vue.js 插件。如果插件是一个对象，它必须暴露一个`install` 方法。如果它本身是一个函数，它将被视为安装方法。插件只能安装一次，因为在源码中会有`installedPlugins<set>`来判断当前插件是否已经安装过了。该安装方法将以应用实例作为第一个参数被调用。传给 use 的其他 options 参数将作为后续参数传入该安装方法。

```js
// runtime-core/apiCreateApp.ts
use(plugin: Plugin, ...options: any[]) {
  if (installedPlugins.has(plugin)) {
    __DEV__ && warn(`Plugin has already been applied to target app.`)
  } else if (plugin && isFunction(plugin.install)) {
    installedPlugins.add(plugin)
    plugin.install(app, ...options)
  } else if (isFunction(plugin)) {
    installedPlugins.add(plugin)
    plugin(app, ...options)
  } else if (__DEV__) {
    warn(
      `A plugin must either be a function or an object with an "install" ` +
        `function.`
    )
  }
  return app
}
```

## 应用api-component

使用`component`来注册一个组件，会挂载全局的`context`上面，如果只有组件名没有组件，那么全局不会加入这个组件，只有有了组件名和组件才会加入到全局的组件里面，同时还会判断是否组件重复了。

```js
// runtime-core/apiCreateApp.ts
component(name: string, component?: Component): any {
  if (__DEV__) {
    validateComponentName(name, context.config)
  }
  if (!component) { // 重复组件名
    return context.components[name]
  }
  if (__DEV__ && context.components[name]) {
    warn(`Component "${name}" has already been registered in target app.`)
  }
  context.components[name] = component
  return app
}
```

## 应用api-directive

`directive`作为自定义指令，可以在全局范围内使用。它是挂载到context上面的，并且不能和原生的指令有冲突，`validateDirectiveName`就是用来验证是否和原生指令冲突。

```js
// runtime-core/apiCreateApp.ts
directive(name: string, directive?: Directive) {
  if (__DEV__) {
    validateDirectiveName(name)
  }

  if (!directive) {
    return context.directives[name] as any
  }
  if (__DEV__ && context.directives[name]) {
    warn(`Directive "${name}" has already been registered in target app.`)
  }
  context.directives[name] = directive
  return app
},
```

## 应用api-config

config传参是无法接收的，因为set方法是没有接收参数值。只能是调用config的属性来进行出来业务逻辑。

```js
// runtime-core/apiCreateApp.ts
get config() {
  return context.config
},

set config(v) {
  if (__DEV__) {
    warn(
      `app.config cannot be replaced. Modify individual options instead.`
    )
  }
},
```
