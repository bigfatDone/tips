# 学习总结

- vue给了每个dom元素都挂载了__vue__属性，绑定当前组件的vue实例

- 关联查询，通过select值的改变触发了directive的里面给vnode绑定的查询条件，触发

- utils.getOnlineFormInstance(this),this是组件内部的实例，可以循环查找上级parent，不断递归或者查找$root,找到根组件实例

## 看得见的思考

### 1.reactive是干什么的，如何将数据转换成响应式，如果传了基础类型和复杂类型，里面会如何处理？

- 将复杂类型（如果是基本数据类型，则会直接返回）的数据转成响应式数据，复杂类型数据的子项还是object类型则会递归遍历进行reactive操作。
