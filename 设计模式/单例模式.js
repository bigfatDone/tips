class Father {
  constructor(){}
}
Father.child = (function(){
  let instance;
  return function(){
    if(!instance){
      instance = new Father
    }
    return instance
  }
})()
// 保证实例只被创建一次（全局缓存，全局状态管理）
let s1 = Father.child();
let s2 = Father.child();
console.log(s1 === s2) // true