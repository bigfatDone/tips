const { resolve, reject } = require("./promise A+")

class Promise {
  RESOLVE = "resolve"
  REJECT = "reject"
  PENDING = "pending"
  constructor(excutor) {
    state = this.PENDING
    value = null
    reason = null
    onFulfillCalbacks = []
    onRejectCalbacks = []
    const resolve = (value) => {
      if (this.state = this.PENDING) {
        this.state = this.RESOLVE
        this.value = value
        this.onFulfillCalbacks(cb => cb(this.value))
      }
    }
    const reject = (reason) => {
      if (this.state = this.PENDING) {
        this.state = this.REJECT
        this.reason = reason
        this.onRejectCalbacks(cb => cb(this.reason))
      }
    }
    try {
      excutor(resolve, reject)
    } catch(error) {
      resolve(error)
    }
  }

  then(onFulfill, onReject) {
    let promise2 = new Promise((resolve, reject) => {
      let realOnFulfilled = onFulfill
      if ( typeof realOnFulfilled !== 'function') {
        realOnFulfilled = value => value
      }
      let realOnRejected = onReject
      if ( typeof realOnRejected !== 'function') {
        realOnRejected = reason => reason
      }
      if (this.state === this.RESOLVE) {
        setTimeout(() => {
          try {
            if (typeof onFulfill !== 'function') {
              resolve(this.value)
            } else {
              let x = realOnFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch(e) {
            reject(e)
          }
        }, 0);
      }
      if (this.state === this.REJECT) {
        setTimeout(() => {
          try {
            if (onReject !== 'function') {
              reject(onReject)
            } else {
              let x = realOnRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch(e) {
            reject(e)
          }
        }, 0);
      }
      if (this.state === this.PENDING) {
        this.onFulfillCalbacks.push(() => {
          setTimeout(() => {
            try {
              // 如果不是函数，继续往深一层渗透
              if (typeof onFulfill !== 'function') {
                resolve(this.value)
              } else {
                let x = realOnFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch(e) {
              reject(e)
            }
          }, 0);
        })
        this.onRejectCalbacks(() => {
          setTimeout(() => {
              // 如果不是函数，继续往深一层渗透
            if (typeof onReject !== 'function') {
              reject(this.reason)
            }
            try {
              let x = realOnRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch(e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return promise
  }
/**
 * 
 * @param {*} promise // 返回Promise2对象
 * @param {*} x // 返回值
 * @param {*} resolve // 成功回调
 * @param {*} reject // 失败回调
 * @returns 
 */
  resolvePromise(promise, x, resolve, reject) {
    // 同一个promise
    if (promise === x) {
      return reject(new TypeError("两个promise不能是同一个promise！"))
    }

    // x 是promise的实例
    if (x instanceof promise) {
      try {
        const then = x.then
        then(y => {
          resolvePromise(promise, y, resolve, reject)
        })
      } catch (e) {
        reject(e)
      }
    } else if (typeof x === 'object' || typeof x === 'function') {
      if (x === null) {
        return resolve(x);
      }
      try {
        const then = x.then
      } catch(e) {
        return reject(e)
      }
      if (typeof then === 'function') {
        try {
          let callStatus = false
          then.call(x, y => {
            if (callStatus) return
            callStatus =true
            resolvePromise(promise, y, resolve, reject)
          }, r => {
            if (callStatus) return
            callStatus =true
            resolvePromise(promise, r, resolve, reject)
          })
        } catch (e) {
          if (callStatus) return
          reject(e)
        }
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  }
}