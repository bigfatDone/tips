let arr = [1,2,3,33,1,3,'ys','ys']

/**
 * 通过Set进行数组去重（Array.from）
 */

function unrepeaty(param){
  let set = new Set(param)

  // 这里输出的是set数据类型
  console.log(set) // Set { 1, 2, 3, 33, 'ys' }

  // 可以通过展开运算符来转换会数组
  console.log([...set]) // [ 1, 2, 3, 33, 'ys' ]

  // Array.from将可迭代对象转换成数组
  let arr = Array.from(set)

  return arr
}

/**
 * 通过reduce进行数组去重(indexOf)
 */

function unrepeaty(param){
  let reduce = param.reduce((pre,cur) => {
  	// 判断当前pre数组里面是否有了重复的数据
    if(pre.indexOf(cur) == -1){
      pre.push(cur)
    }
    return pre
  },[])
return reduce
}
let arr = [1,2,3,33,1,3,'ys','ys']
unrepeaty(arr) // [ 1, 2, 3, 33, 'ys' ]


/**
 * 通过filter进行数组去重
 */
function unrepeaty(param){
  let filter = param.filter((item,index) => {
    // 判断item的下标是否是第一下标，如果是true则返回
    return param.indexOf(item) === index
  })
  return filter;
}
let arr = [1,2,3,33,1,3,'ys','ys']
unrepeaty(arr) // [ 1, 2, 3, 33, 'ys' ]
