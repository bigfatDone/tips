---
theme: channing-cyan
highlight: github-gist
---

# 高频遍历js源码实现map,filter,reduce...

## find方法

**描述**

- `find`方法对数组中的每一项元素执行一次 `callback` 函数，直至有一个 `callback` 返回 `true`。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 `undefined`。
- `callback`函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myFind = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw TypeError(`${callback} is not function`)
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return this[i]
    }
  }
  return undefined
}
```

## findIndex方法

**描述**

- `findIndex`方法对数组中的每一项元素执行一次 `callback` 函数，直至有一个 `callback` 返回 `true`。当找到了这样一个元素后，该方法会立即返回这个元素的索引，否则返回 `-1`。
- `callback`函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myFindIndex = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw TypeError('err function')
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return i
    }
  }
  return -1
}
```

## some方法

**描述**

- `some()` 为数组中的每一个元素执行一次 `callback` 函数，直到找到一个使得 `callback` 返回一个“真值”（即可转换为布尔值 `true` 的值）。如果找到了这样一个值，`some()` 将会立即返回 true。否则，`some()` 返回 `false`。
- `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.mySome = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`${callback} is not function`)
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return true
    }
  }
  return false
}
```

## every方法

**描述**

- `every` 方法为数组中的每个元素执行一次 `callback` 函数，直到它找到一个会使 `callback` 返回 `false` 的元素。如果发现了一个这样的元素，`every` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。
- `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myEvery = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`${callback} is not function`)
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return false
    }
  }
  return true
}
```

## map方法

**描述**

- `map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 `undefined`）组合起来形成一个新数组。
- `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`error ${callback} no a function `)
  }
  let data = new Array(this.length)
  for (let i = 0; i < this.length; i++) {
    data.push(callback.call(thisArg, this[i], i, this))
  }
  return data;
}
```

## filter方法

**描述**

- `filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 `true` 或等价于 `true` 的值的元素创建一个新数组。
- `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback.bind != 'function') {
    throw new TypeError(`error ${callback.bind} no a function `)
  }
  let data = []
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      data.push(this[i])
    }
  }
  return data;
}
```

## reduce方法

**描述**

- `reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：`accumulator 累计器`, `currentValue 当前值`, `currentIndex 当前索引`, `array 数组`。
- 回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

**实现**

```js
Array.prototype.myReduce = function (fn, initialValue) {
  if (typeof fn != 'function') {
    throw new TypeError(`error ${fn} no a function `)
  }
  let i = 0
  let data
  if (initialValue) {
    data = initialValue
  } else {
    data = this[i]
    i++
  }
  for (i; i < this.length; i++) {
    data = fn(data, this[i], i, this)
  }
  return data
}
```

## forEach方法

**描述**

- `forEach() `方法按升序为数组中含有效值的每一项执行一次 `callback` 函数，那些已删除或者未初始化的项将被跳过。`forEach()` 遍历的范围在第一次调用 `callback` 前就会确定。调用 `forEach` 后添加到数组中的项不会被 `callback` 访问到，除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。
- `callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
- `thisArg`为可选项，执行回调时用作`this`的对象。

**实现**

```js
Array.prototype.myForEach = function(callback, thisArg) {
  if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)
  let l = this.length
  let i = 0
  do {
    callback.call(thisArg, this[i], i, this)
    i++
  } while (i < l);
};
```