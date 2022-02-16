# Component解析初次加载流程

## 创建组件实例

组件实例，设置vue组件的所有通用属性，包括attr，props，provides这些vue组件自身带有的属性，通过对象的形式接收起来。组件内部也赋予了生命周期的命名，目前都是空值。会将父级的provides继续接收到当前组件中`provides: parent ? parent.provides : Object.create(appContext.provides)`,对于props和emits参数，会进行额外的存储起来,通过`normalizePropsOptions`和`normalizeEmitsOptions`这个两个函数，因为组件允许有mixins和extends功能，所以也需要将功能里面这些属性全部聚集起来。

## 将当前实例加入热更新

判断当前实例`__hmrId`属性有没有被加入map（用于记录当前实例是否被收录），如果没有则要`set`进去。

## 开始初始化组件实例

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

### 设置有状态组件

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
