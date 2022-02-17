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

setImmediate(() => {
    console.log('timeout1')
    Promise.resolve().then(() => console.log('promise resolve'))
    process.nextTick(() => console.log('next tick1'))
});
setImmediate(() => {
  console.log('timeout2')
})