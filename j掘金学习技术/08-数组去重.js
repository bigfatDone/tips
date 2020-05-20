let arr = [1,2,3,33,1,3,'ys','ys']

/**
 * 通过Set进行数组去重（Array.from）
 */

let set = new Set(arr)
// 这里输出的是set数据类型
console.log(set)
// 可以通过展开运算符来转换会数组
console.log([...set])
// Array.from将可迭代对象转换成数组
let arr1 = Array.from(set)
console.log(arr1)


/**
 * 通过reduce进行数组去重(indexOf)
 */

let arrr = [1,2,3,33,1,3,'ys','ys']

let reduce = arrr.reduce((pre,cur) => {
  if(pre.indexOf(cur) == -1){
    pre.push(cur)
  }
  return pre
},[])
console.log('reduce:'+ reduce)


/**
 * 通过filter进行数组去重
 */

let arrrr = [1,2,3,33,1,3,'ys','ys']

let filter = arrrr.filter((item,index) => {
  return arrrr.indexOf(item) === index
})
console.log('filter:'+ filter)
