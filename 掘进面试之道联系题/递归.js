function Sum(param){
  if(param < 1){
    return param
  }else {
    return param + Sum(param - 1)
  }
}
console.log(Sum(4))
