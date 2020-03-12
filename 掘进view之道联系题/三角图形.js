function triangle(param){
  for(let i = 1 ;i <= param;i++){
    let arr1 = []
    for(let j = 1;j < param;j++){
      if(j < i){
        arr1.push(j)
      }else {
        arr1.unshift('   ')
      }
    }
    console.log(`${arr1.join('')}${i}${arr1.reverse().join('')}`)
  }
}
triangle(4)