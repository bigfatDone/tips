let arr1 = [1,[2,3,[4,5]],6]

const deepArr = (arr) =>
  Array.isArray(arr) ? arr.reduce((pre,item)=> [...pre,...deepArr(item)],[]):[arr]
  console.log(deepArr(arr1))