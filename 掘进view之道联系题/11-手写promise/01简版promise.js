const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(executor) {
    this.status = PENDING; // 默认的状态
    this.value = ''; // 成功的原因
    this.onFulfilledCallbacks = []; // 成功的回调函数集
    this.onRejectedCallbacks = []; // 失败的回调函数集

    // 成功回调函数
    const resolve = value => {
      this.value = value;
      this.status = FULFILLED; // 修改状态
      this.onFulfilledCallbacks.forEach(fn => fn())
    }

    // 失败回调函数
    const reject = value => {
      this.value = value;
      this.status = REJECTED; // 修改状态
      this.onRejectedCallbacks.forEach(fn => fn())
    }

    // 一开始执行回调函数
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === PENDING) { // 异步加载，需要将缓存值存起来
      // 等待状态
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.value)
      })
    }

    if (this.status === FULFILLED) {
      // 成功状态
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      // 失败状态
      onRejected(this.value)
    }
  }
}

module.exports = myPromise