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

function arg(a, ...args) {
  console.log(arguments);
  console.log(...args);
}
arg('i', {name: 'am'})