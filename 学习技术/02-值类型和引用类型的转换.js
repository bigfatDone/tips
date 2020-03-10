function Person(name){
  this.name = name;
}
function f1(person){
  // var person = p; // 指向之前开辟的堆
  person.name = 'ls';
  person = new Person('aa') // 这里是重新开辟一个堆
}
var p = new Person('zs')
console.log(p.name) // zs
f1(p)
console.log(p.name) // ls
// for(var i=0;i<25;i++) // 获取字母排序
// {
// console.log(String.fromCharCode((65+i)));
// }Wallpaper Engine