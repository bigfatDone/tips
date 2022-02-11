const myPromise = require("./01简版promise")

let promise = new myPromise(resolve => {
  setTimeout(() => {
    resolve('i is ok')
  })
})

promise.then(resolve => {
  console.log(resolve)
})