function btn() {
  for (var i = 0; i < 5; i++) {
      // 涉及到作用域的问题
      // setTimeout(function () {
      //   console.log(i)
      // }, 1000)

    // 自执行函数，有自己的函数作用域
    (function (i) {
      setTimeout(function () {
        console.log(i)
      }, 1000)
    })(i)

  }
}
btn()
// js在运行阶段
// 解释阶段
// 1. 确定语法
// 2. 确定作用域（全局作用域，函数作用域，快级作用域）

// 执行阶段
// 1.确定执行上下文
// * 在全局作用域下直接调用函数，this指向window
// * 对象函数调用，哪个对象调用就指向哪个对象
// * 使用 new 实例化对象，在构造函数中的this指向实例化对象。
// * 使用call或apply改变this的指向
// * 箭头函数的this指向其上级普通函数