# render源码解析篇-element,component,teleport,suspense

## processElement处理元素标签

之前说过vue3通过shapeFlag来标记标签，判断该标签设什么类型。这时候如果该元素的标准是ShapeFlags.ELEMENT(该标志代表这个标签是符合h5的元素标签)，则进入processElement操作。其中里面会判断n1是否有值，没有值得情况则是判断是初次进行加载该元素，则会加载mountElement这个函数；如果n1是有值的情况这个，就说明旧节点是存在，就要进行patchElement操作，把新旧节点进行对比patch。

```js
// 判断旧节点是否有值
if (n1 == null) {
  mountElement(
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  )
} else {
  patchElement(
    n1,
    n2,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized
  )
}
```

### mountElement初次加载元素

里面会进行开发环境判断，如果是在非开发环境的时候并且vnode具有非空el，则表示它正在被重用。只有静态 vnode 可以重用，因此其挂载的 DOM 节点应为完全相同，我们可以简单地在这里做一个克隆。但克隆的树无法进行HMR更新（只用于生产环境中）。

```js
if (
  !__DEV__ &&
  vnode.el &&
  hostCloneNode !== undefined &&
  patchFlag === PatchFlags.HOISTED
) {
  el = vnode.el = hostCloneNode(vnode.el)
} 
```

如果是处于开发环境就会进行创建元素操作hostCreateElement。获取刚刚创建的el，通过判断当前vnode的shapeFlag的值，如果是为ShapeFlags.TEXT_CHILDREN，则表明是文本节点，直接会把该内容挂载的刚刚创建的el。当判断shapeFlag是ShapeFlags.ARRAY_CHILDREN时，则会进行调用mountChildren函数,进入mountChildren函数，内部会将传入的数组参数进行for循环，并且重新调用patch函数。执行完mountChildren函数之后就会开始进行调用什么周期函数。

```js
// 指令目录有值，开始调用created钩子函数
if (dirs) {
  invokeDirectiveHook(vnode, null, parentComponent, 'created')
}
```

对props参数进行处理，遍历props对象，并且调用hostPatchProp函数，对用到props的进行更新操作。之后调用生命周期函数beforeMount。

### patchElement 对元素打补丁

对于新旧节点都是数值，就需要进行patch操作，用新节点替换。元素的类型有两种类型，一种是动态元素，另外一种是普通的元素。对于动态元素，那么就会调用patchBlockChildren函数，将新旧节点进行patch操作。普通元素则会调用patchChildren函数，如果是PatchFlags.KEYED_FRAGMENT，那么就会进行diff算法，寻找那些的改变。如果不是通过key标志，则会进行常规的判断，取两者最小长度，然后进行patch对比判断。如果是旧的长度较长就会卸载掉旧节点长出的长度，如果新节点较长，则会挂载长出的这些长度。后续则会对props进行遍历比较判断。

## processComponent处理组件标签

当新节点的shapeFlag是ShapeFlags.COMPONENT的时候，就会进入processComponent处理函数。判断旧节点是空节点时就会进入判断该节点是否是ShapeFlags.COMPONENT_KEPT_ALIVE标志的，并且当前ctx为KeepAliveContext，则会从缓存中取出该组件，不需要重新加载，否则就会通过mountComponent加载该组件。

```js
if (n1 == null) {
  if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
    ;(parentComponent!.ctx as KeepAliveContext).activate(
      n2,
      container,
      anchor,
      isSVG,
      optimized
    )
  } else {
    mountComponent(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
  }
}
```

### mountComponent挂载组件

通过createComponentInstance创建当前组件实例对象，之后通过setupComponent初始化组件。将初始化的组件通过setupRenderEffect函数将该组件进行渲染effect。

### updateComponent更新组件

通过shouldUpdateComponent判断这个组件是否需要更新，如果需要更新则需要将其新组件进行更新并且更新props和slots。如果不需要更新，直接将旧节点的赋予新节点。

## TeleportImpl瞬间导入组件

这是vue3新增的元素，可以控制在DOM中哪个父节点下渲染了HTML。当旧节点为空的情况下，会通过isTeleportDisabled(n2.props)判断该组件是否渲染，如果不允许渲染，只会在哪里的代码写在哪里就在哪里渲染。如果允许渲染，则会在目标的标签下面渲染指定的组件。

当旧节点有数据的时候，则说明是update操作，这里也是和元素更新那块一样，如果是动态加载的组件，则会加载新的组件。如果是普通的组件，就会通过patchChildren函数来循环遍历内部的元素，进行对比更新。

这里也是会判断当前组件是否要显示，如果要显示则需要通过moveTeleport函数移动到指定位置显示的组件。

如果显示的位置与旧节点显示的位置不同，则要将新节点移动指定的位置显示。如若不然则会继续显示之前的

## SuspenseImpl 悬念导入组件

这是vue3新增的元素，用于控制异步组件的加载，并且异步组件的状态都是由<Suspense> 控制，异步组件自身的加载、错误、延迟和超时选项都将被忽略。当旧节点为空的情况下，则会加载Suspense，并且会创建一个隐藏的div元素，并且刚刚创建的suspense挂载到这个隐藏的元素上面。接下来则会判断有没有异步依赖，如果有就会调用异步事件。如果没有则就直接执行。

如果新旧节点都有数据，则要调用patchSuspense来对比新旧节点，将更新的数据渲染到页面上。

## 友情

PS：另外安利一个大崔哥[mini-vue](https://github.com/cuixiaorui/mini-vue)库，学习vue源码利器.