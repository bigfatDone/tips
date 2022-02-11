# Component解析初次加载流程

## 创建组件实例

组件实例，设置vue组件的所有通用属性，包括attr，props，provides这些vue组件自身带有的属性，通过对象的形式接收起来。组件内部也赋予了生命周期的命名，目前都是空值。会将父级的provides继续接收到当前组件中`provides: parent ? parent.provides : Object.create(appContext.provides)`,对于props和emits参数，会进行额外的存储起来,通过`normalizePropsOptions`这个函数。
