b();
a();
var a = function() { // 报错，这样不能函数提升
  console.log('a')
}
function b() {
  console.log('b') // 成功
}