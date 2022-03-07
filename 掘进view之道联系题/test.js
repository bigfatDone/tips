// function test() {
//   console.log(111)
//   for(var i = 0;i < 3;i++){ 
//     console.log(222)
//     if(i == 1){
//       console.log(333)
//     }
//     console.log(444)
//     break
//   }
//   console.log(555)
// }
// test()
// // console.log(global);
// // console.log(process);

// setImmediate(() => {
//     console.log('timeout1')
//     Promise.resolve().then(() => console.log('promise resolve'))
//     process.nextTick(() => console.log('next tick1'))
// });
// setImmediate(() => {
//   console.log('timeout2')
// })

// class ct{
//   age = 881
//   constructor(name) {
//     this.name = name
//   }
//   fn() {
//     console.log('fn');
//   }
// }
// ct.age

// console.log(null + 1);
// Promise.reject(88).then(null, reject => 88).then(res => console.log(res)).catch(e => console.log(e))

//   script start  async1 start    async2      promise1 script end    async-next  promise2 settimeout

// let a = [11]
// a.splice(0, 0, 55)
// console.log(a);

// let thenable = {
//   then: (resolve, reject) => {
//     console.log(888)
//     resolve(thenable)
//   }
// }

// Promise.reject(thenable)  //这会造成一个死循环

// setTimeout(() => {
//   console.log('timer1')
 
//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
//  }, 0)
 
//  process.nextTick(() => {
//   console.log('nextTick')
//   process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//       console.log('nextTick')
//       process.nextTick(() => {
//         console.log('nextTick')
//       })
//     })
//   })
//  })

// function arg(a, ...args) {
//   console.log(arguments);
//   console.log(...args);
// }
// arg('i', {name: 'am'})

// function create() {
//   console.log(arguments[0])
//   let Con = [].shift.call(arguments) // 这里是获取第一个参数
//   console.log(Con)
// }
// function a() {
//   console.log('i am a')
// }
// let a1 = create(a)

// 实现一个new的思路
// function create() {
//   // 第一种情况直接让新创建的obj绑定传进来的函数的原型
//   let obj = { };
//   let construtor = [].shift.call(arguments)
//   obj.__proto__ = construtor.prototype
//   // 第二种让传进来的函数的this指向当前环境
//   let result = construtor.apply(this, arguments)
//   // 判断new 出来的是不是对象，new出来的必须是对象
//   return result instanceof Object ? result : obj
// }

// function a() {
//   console.log('i is a');
// }

// let b = new a();

// console.log(b);

// let c = create(a);

// console.log(c);

// proxy代理

// let a = {
//   name: 'zys',
//   age: '18'
// }

// let b = new Proxy(a, {
//   get: function(target, key) {
//     console.log(target, key)
//   },
//   set: function(target, key, value) {
//     console.log(value);
//   }
// })

// a.bus = 888
// console.log(b);
// b.bus


// console.log(module.paths)

function a () {
  console.log('a');
  return function () {
    console.log('b');
  }
}
a()
console.log(a()());