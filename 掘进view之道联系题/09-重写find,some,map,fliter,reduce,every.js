/**
 * 实现find ---------------------------------------
 */

let arrFind = [12, 15, 19]
/**
 *
 */
Array.prototype.myFind = function (callback, thisArg) { //必须使用function不能使用箭头函数，this指向调用的数组
  if (typeof callback != 'function') {
    throw TypeError('err function')
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i])) {
      return this[i]
    }
  }
  return undefined // 没有匹配则返回undefined 
}

let find = arrFind.myFind(item => { // 返回第一个判断为true的值
    return item > 12
  })
console.log('find:' + find) // find:15
/**
 * 实现findIndex ---------------------------------------
 */

let arrFindIndex = [12, 15, 19]

Array.prototype.myFindIndex = function (callback, thisArg) { //必须使用function不能使用箭头函数，this指向调用的数组
  if (typeof callback != 'function') {
    throw TypeError('err function')
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i])) {
      return i
    }
  }
  return undefined // 没有匹配则返回 -1
}
let findIndex = arrFindIndex.myFindIndex(item => { // 返回第一个判断为true的值
  return item > 12
})
console.log('findIndex:' + findIndex) // findIndex:1

/**
 * 实现some ---------------------------------------
 */

let arrSome = [12, 15, 19]

Array.prototype.mySome = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`${callback} is not function`)
  }
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i])) {
      return true
    }
  }
  return false
}
let
  some = arrSome.mySome(item => {
    return item > 17
  })
console.log('some:' + some) // some:false

/**
 * 实现every ---------------------------------------
 */


let arrEvery = [12, 15, 19]

Array.prototype.myEvery = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`${callback} is not function`)
  }
  for (let i = 0; i < this.length; i++) {
    if (!callback.call(thisArg, this[i])) {
      return false
    }
  }
  return true
}
let
  every = arrEvery.myEvery(item => {
    return item > 19
  })
console.log('every:' + every) // every:false

/**
 * 实现map ---------------------------------------
 */

let arrMap = [12, 15, 19]

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback != 'function') {
    throw new TypeError(`error ${callback} no a function `)
  }
  let data = new Array(this.length)
  for (let i = 0; i < this.length; i++) {
    data.push(callback.call(thisArg, this[i]))
  }
  return data;
}
let map = arrMap.map(item => {
  item += 3;
  return item + 'map'
})
console.log('map:' + map) // map:15map,18map,22map

/**
 * 实现filter ---------------------------------------
 */

let arrFilter = [12, 15, 19]

Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback.bind != 'function') {
    throw new TypeError(`error ${callback.bind} no a function `)
  }
  let data = []
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i])) {
      data.push(this[i])
    }
  }
  return data;
}
let
  filter = arrFilter.myFilter(item => {
    return item > 12
  })
console.log('filter:' + filter) // filter:15,19

/**
 * 实现reduce
 */
let arrReduce = [12, 15, 19]

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
let
  reduce = arrReduce.myReduce((pre, item) => {
    pre = pre + item
    return pre
  }, 0)
console.log('reduce:' + reduce) // reduce:46

/**
 * forEach
 */
Array.prototype.myForEach = function(callback, thisArg) {
  if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)
  let l = this.length
  let i = 0
  do {
    callback.call(thisArg, this[i], i, this)
    i++
  } while (i < l);
};


let forEachArr = [{name: '1'}, {name: '2'}, {name: '3'}] 
forEachArr.myForEach((item, index, arr) => {
  item.name = 'gggg';
  console.log(item, index, arr);
})
console.log(forEachArr);
