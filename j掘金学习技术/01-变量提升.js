var num1 = 56;
var num2 = 66;
function f1(num,num1) { // 传参这里说明了的
  // var num = 56
  // var num1 = 56
  num = 100;
  num1 = 100;
  num2 = 100;
  console.log(num)
  console.log(num1)
  console.log(num2)
}
f1(num1,num2)
console.log(num1)
console.log(num2)
// console.log(num)