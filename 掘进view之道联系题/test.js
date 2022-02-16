function test() {
  console.log(111)
  for(var i = 0;i < 3;i++){ 
    console.log(222)
    if(i == 1){
      console.log(333)
    }
    console.log(444)
    break
  }
  console.log(555)
}
test()
console.log(global);
console.log(process);