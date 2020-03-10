// let obj = {
//   name: 'father',
//   person: {
//     name: 'son',
//     age: 18
//   }
// }
// function change(param) {
//   param.person.name = 'didi'
// }
// console.log(obj)
// change(obj)
// console.log(obj)


// let obj = { // 对象
//   name: 'father',
//   person: {
//     name: 'son',
//     age: 18
//   }
// }

// function change(param) {
//   let obj1 = {}; // 空对象
//   deepCopy(param, obj1) // 深拷贝
//   console.log(obj1) // { name: 'father', person: { name: 'son', age: 18 } }
//   obj1.person.name = 'didi'
//   console.log(obj1) // { name: 'father', person: { name: 'didi', age: 18 } }
// }
// function deepCopy(o1, o2) {
//       for (var key in o1) {
//         // 获取key属性对应的值
//         var item = o1[key];
//         // 如果item 是对象？
//         // var o = {}
//         if (item instanceof Object) {
//           // var o = {};
//           o2[key] = {}; 
//           deepCopy(item, o2[key]);
//         } else if (item instanceof Array) {
//           // 如果item 是数组呢？
//           // var arr = [];
//           o2[key] = [];
//           deepCopy(item, o2[key]);
//         } else {
//           // 如果是简单类型
//           o2[key] = o1[key];
//         }
//       }
//     }
// console.log(obj) // { name: 'father', person: { name: 'son', age: 18 } }
// change(obj)
// console.log(obj) // { name: 'father', person: { name: 'son', age: 18 } }

let obj = { // 对象
  name: 'father',
  person: {
    name: 'son',
    age: 18
  }
}

function change(param) {
  let obj1 = JSON.parse(JSON.stringify(param)); // 空对象
  console.log(obj1) // { name: 'father', person: { name: 'son', age: 18 } }
  obj1.person.name = 'didi'
  console.log(obj1) // { name: 'father', person: { name: 'didi', age: 18 } }
}

console.log(obj) // { name: 'father', person: { name: 'son', age: 18 } }
change(obj)
console.log(obj) // { name: 'father', person: { name: 'son', age: 18 } }