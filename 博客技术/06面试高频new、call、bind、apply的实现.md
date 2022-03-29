---
theme: channing-cyan
highlight: github-gist
---

# 06面试高频new、call、bind、apply的实现

## new 运算符

`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

`new` 关键字会进行如下的操作:

1. 创建一个空的简单JavaScript对象（即{}）；
2. 为步骤1新创建的对象添加属性 `__proto__` ，将该属性链接至构造函数的原型对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。

实现一个`new` 函数

```js
function myNew() {
  let obj = {} // 创建对象
  let Con = [].shift.call(arguments) // 将类数组转成数组，并且取出第一个参数
  obj.__proto__ = Con.prototype // 将对象的隐性原型指向构造函数的原型对象
  let result = Con.apply(obj, arguments) // 把创建对象作为this的上下文, arguments已经变成了数组并且头部第一个参数被取出
  return result instanceof Object ? result : obj; // 应该返回对象
}

// 示例
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car1 =myNew(Car, 'Eagle', 'Talon TSi', 1993);

console.log(car1.make) // Eagle
```

## call() 方法

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。

`call` 方法内部会进行如下的操作:

1. 会接收多个参数，且第一个参数为 `this` 。

2. 声明当前执行上下文的指向，并且将绑定函数指派到当前上下文中。

3. 执行当前上下文中的绑定函数，并将除了第一个参数作为绑定函数的入参

4. 删除上下文中的绑定函数，并且返回值为当前上下文绑定的函数。

实现一个 `call` 函数:

```js
Function.prototype.mycall = function(context){
  if(typeof this !== 'function'){ // 判断是否是函数，不是抛出异常
    throw new TypeError('error')
  }
  context = context || window; // 当前上下文的指向
  context.fn = this; // 给context创建一个fn属性，并且该属性为调用的函数
  const args = [...arguments].slice(1);// 传入的参数
  const resurlt = context.fn(...args); // 给调用的函数传参
  delete context.fn; // 删除对象上的函数
  return resurlt; // 返回调用函数
}

// 示例
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.mycall(this, name, price);
}

console.log(new Food('cheese', 5).name); // cheese
```

## apply() 方法

`apply()` 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

调用有指定 `this` 值和参数的函数的结果。

`apply` 方法内部会进行如下的操作:

1. 会接收两个参数，且第一个参数为 `this`，第二个参数为数组。

2. 声明当前执行上下文的指向，并且将绑定函数指派到当前上下文中。

3. 执行当前上下文中的绑定函数，并判断第二个参数是否有值，将其解构为执行函数的入参。

4. 删除上下文中的绑定函数，并且返回值为当前上下文绑定的函数。

实现一个 `apply` 函数:

```js
Function.prototype.myapply = function (context) {
  if(typeof this !== 'function'){ // 判断是否是函数，不是抛出异常
    throw new TypeError('error')
  }
  context = context || window; // 当前上下文指向函数或者window
  context.fn = this; // 给当前添加属性fn，并且该属性为调用的函数，那么this就是指向当前的调用函数
  let resurlt;
  // 判断存储是否有第二个参数，如果有第二个参数就将其展开
  if (arguments[1]) { // 判断apply是否有参数（第二个参数）
      resurlt = context.fn(...arguments[1])
  } else {
      resurlt = context.fn()
  }
  delete context.fn; // 删除原型链上的fn属性
  return resurlt;
}

// 示例
window.name = 'zys';
let obj = {
    name: 'xiaoli',
    myF: function (one, two) {
        console.log(one + '---' + two)
        console.log(this.name)
    }
}
let myobj = ['one', 'two']
// this指向window
obj.myF.myapply(this, myobj) // zys
```

## bind() 方法

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

返回一个原函数的拷贝，并拥有指定的 `this` 值和初始参数。

`bind` 方法内部会进行如下的操作:

1. 会接收多个参数，且第一个参数为 `this`，并取出除了第一个参数的其他参数 。

2. 返回一个函数F，并且判断函数内的this是否是F的实例。

3. 如果是实例，则会返回一个new绑定的函数，并且把除了第一个参数的其他传参传进来

4. 不是实例，则返回绑定函数并且apply传进来的第一个参数，和其他参数。

```js
Function.prototype.mybind = function(context) {
  if(typeof this !== 'function'){ // 判断是否是函数，不是抛出异常
    throw new TypeError('error')
  }
  const _this = this;
  const args = arguments.slice(1); // 获取参数
  return function F() {
    if(this instanceof F){ // this 是F的实例化对象，直接返回new 一个对象
      // 因为bind返回的是一个函数，函数在哪里执行不确定，如果是在同个作用域下执行，则直接返回
      return new _this(args,...arguments)
    }
    return _this.apply(context,args.concat(...arguments)) // 这个是this不指向指定函数，所以需要apply绑定修改this
  }
}

// 实例
window.name = 'zys';
let obj = {
    name: 'xiaoli',
    myF: function (one, two) {
        console.log(one + '---' + two)
        console.log(this.name)
    }
}
// this指向window
let fn = obj.myF.mybind(this, 'one')
fn('two') // one---two   zys
```
