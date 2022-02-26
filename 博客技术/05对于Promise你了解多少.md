---
theme: channing-cyan
highlight: github-gist
---

# 05对于Promise你了解多少

## 前言

在没有出现`Promise`的时代，回调函数有着一个致命的软点，那就是容易写出回调地狱`（Callback hell`）。加入多个回调函数之间有着依赖，你可能会写出下面的代码：

```js
ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
```

这样的代码写的既复杂又难维护，并且有着根本性的问题

- 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身。

- 嵌套函数一多，就很难处理错误。

- 不能使用`try catch`捕获问题，也不能`return`结果。

## Promise

这个函数的出现主要就是为了解决掉回调地狱的问题，它能够将异步操作的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值，并且返回值还是一个`promise`，这样就可以继续进行链式调用。

一个 `Promise` 必然处于以下几种状态之一：

- 待定（`pending`）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（`fulfilled`）: 意味着操作成功完成。
- 已拒绝（`rejected`）: 意味着操作失败。

`promise`只能改变一次状态，从初始状态`pending`转成`fulfilled`，或者是从初始状态转成`rejected`；`promise`一旦改变了状态就不能再改变状态，最终的状态永远是第一次改变的状态。
new一个Promise的时候，有两个参数，分别是resolve和reject。这两个状态分别对应的状态为fulfilled和rejected。Promise内部的代码是同步执行。

```js
new Promise(resolve, rejected) {
  // 在这里修改promise的状态，因为先改成fulfilled状态，所以后面的reject状态没有生效
  resolve('is fulfilled'); 
  rejected('is rejected');
}
```

## Promise.resolve()

`Promise.resolve(value)`方法返回了一个将`value`解析成`Promise`的对象。如果`value`是一个`Promise`则会直接返回这个`Promise`,并且是将`Promise`的状态改成了`fulfilled`。但是使用了`Promise.resolve()就`不要在在`then`方法里面`resolve`自身，不然会造成死循环。

```js
let thenable = {
  then: (resolve, reject) => {
    resolve(thenable)
  }
}

Promise.resolve(thenable)  //这会造成一个死循环
```

正确的使用

```js
const promise = Promise.resolve('is fulfilled');

promise.then((value) => {
  console.log(value);
  // expected output: is fulfilled
});

```

## Promise.reject()

Promise.reject(value)方法返回一个带有拒绝原因的Promise对象。如果`value`不是一个`Promise`对象则会转成`Promise`对象,并且是将`Promise`的状态改成了`rejected`。

```js
const promise = Promise.reject('is rejected');

promise.then(null, (value) => {
  // 第二个回调函数才是rejected状态
  console.log(value);
  // expected output: is rejected
});
```

## Promise.prototype.then()

`then()` 方法返回一个 `Promise`，它最多需要有两个参数：`Promise` 的成功和失败情况的回调函数。

- onFulfilled：当 `Promise` 变成接受状态（`fulfilled`）时调用的函数。该函数有一个参数，即接受的最终结果。如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回 `promise` 最终结果的函数。

- onRejected：当 `Promise` 变成拒绝状态`（rejected）`时调用的函数。该函数有一个参数，即拒绝的原因`（rejection reason）`。  如果该参数不是函数，则会在内部被替换为一个 `"Thrower"` 函数 (抛出异常)。

```js
// fulfilled
const promise1 = new Promise((resolve, reject) => {
  resolve('fulfilled!');
});

promise1.then((value) => {
  console.log(value);
  // expected output: "fulfilled!"
});

// rejected
const promise1 = new Promise((resolve, reject) => {
  reject('rejected!');
});

promise1.then((value) => {
  console.log(value);
  // expected output: "rejected!"
});
```

由于`Promise`是链式调用，因此在执行完`then`方法之后，返回值会依据下面的规则返回：

- 返回了一个值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。

- 没有返回任何值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且该接受状态的回调函数的参数值为 `undefined`。

- 抛出一个错误，那么 `then` 返回的 `Promise` 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。

- 返回一个已经是接受状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为接受状态，并且将那个 `Promise` 的接受状态的回调函数的参数值作为该被返回的`Promise`的接受状态回调函数的参数值。

- 返回一个已经是拒绝状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为拒绝状态，并且将那个 `Promise` 的拒绝状态的回调函数的参数值作为该被返回的`Promise`的拒绝状态回调函数的参数值。

- 返回一个未定状态`（pending）`的 `Promise`，那么 `then` 返回 `Promise` 的状态也是未定的，并且它的终态与那个 `Promise` 的终态相同；同时，它变为终态时调用的回调函数参数与那个 `Promise` 变为终态时的回调函数的参数是相同的。

## Promise.any()

`Promise.any()` 接收一个`Promise`可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise` 。如果可迭代对象中没有一个 `promise` 成功（即所有的 `promise`s 都失败/拒绝），就返回一个失败的 `promise` 和`AggregateError`类型的实例。

成功的案例：

```js
const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
})
// 输出: "很快完成"

```

失败的案例：

```js
const pErr = new Promise((resolve, reject) => {
  reject('总是失败');
});

Promise.any([pErr]).catch((err) => {
  console.log(err);
})
// 输出: "AggregateError: No Promise in Promise.any was resolved"
```

## Promise.race()

`Promise.race(iterable) `方法返回一个 `promise`，一旦迭代器中的某个`promise`解决或拒绝，返回的 `promise`就会解决或拒绝。

成功的案例：

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 500, 'is rejected');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'is fulfilled');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
},(value) => {
  console.log(value)
});
// 输出：is fulfilled
```

失败的案例：

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'is rejected');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'is fulfilled');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
},(value) => {
  console.log(value)
});
// 输出：is rejected
```

## Promise.all()

`Promise.all()`方法接收一个`promise`的`iterable`类型（注：`Array`，`Map`，`Set`都属于ES6的`iterable`类型）的输入，并且只返回一个`Promise`实例， 那个输入的所有`promise`的`resolve`回调的结果是一个数组。这个`Promise`的`resolve`回调执行是在所有输入的`promise`的`resolve`回调都结束，或者输入的`iterable`里没有`promise`了的时候。它的`reject`回调执行是，只要任何一个输入的`promise`的`reject`回调执行或者输入不合法的`promise`就会立即抛出错误，并且`reject`的是第一个抛出的错误信息。

PS：如果参数中包含非 `promise` 值，这些值将被忽略，但仍然会被放在返回数组中（如果 `promise` 完成的话）

成功的案例：

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// 输出: Array [3, 42, "foo"]
```

失败的案例：

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'foo'); //设置了rejected
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
},(value) => {
  console.log(value)
});
// 输出: foo
```

## Promise.allSettled()

该Promise.allSettled(iterable)方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

案例：

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => console.log(results));
// 输出：Array [Object { status: "fulfilled", value: 3 }, Object { status: "rejected", reason: "foo" }]
```

## Promise.prototype.catch()

catch() 方法返回一个Promise，并且处理拒绝的情况。当执行到then方法时，当前promise的状态为rejected，但是then并没有onRejected的回调函数，则会将值交给catch处理；或者是函数内部抛出了异常，则会有catch来处理异常。

```js
// 情况1，rejected状态，但then没有onRejected回调函数
var p1 = new Promise(function(resolve, reject) {
  reject('reject');
});
p1.then(value => {
  console.log('success:'+ value )
}).catch(e => {
  console.log('catch:'+e)
})
// 输出：catch：reject

// 情况2，抛出异常
var p1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

p1.catch(function(e) {
  console.log(e); // "Uh-oh!"
});
// 输出："Uh-oh!"
```

## Promise.prototype.finally()

finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。

```js
Promise.resolve('resolve').then(value=> {
  console.log(value)
}).finally(() => {
  console.log('i am finally!')
})
// 输出：resolve   i am finally
```

## 实现一个简易版的Promise

```js
const PENDING = 'PENDING' // 等待
const FULFILLED = 'FULFILLED' // 成功
const REJECTED = 'REJECTED' // 失败

class myPromise { // 原则上是一个函数
  constructor(executor) { // 这是一个函数
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

  then(onFulfilled, onRejected) { // 这个也是函数
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
```
