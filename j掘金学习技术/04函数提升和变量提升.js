// 如果有一变量提升和函数提升，并且两者都是相同的命名，那么函数的优先级是最高的，显示函数
b();
a();
var a = function() { // 报错，这样不能函数提升,这样只是变量提示
  console.log('a')
}
function b() {
  console.log('b') // 成功
}