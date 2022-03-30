# 部分学习总结

- vue给了每个dom元素都挂载了__vue__属性，绑定当前组件的vue实例

- 关联查询，通过select值的改变触发了directive的里面给vnode绑定的查询条件，触发

- utils.getOnlineFormInstance(this),this是组件内部的实例，可以循环查找上级parent，不断递归或者查找$root,找到根组件实例