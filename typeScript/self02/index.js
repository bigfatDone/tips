// class hello {
//   name1
//   constructor(name: any) {
//     this.name1 = name
//   }
//   get myName() {
//     return this.name1
//   }
//   set myName(value) {
//     this.name1 = value
//   }
// }
// let a = new hello(222)
// console.log(a.myName);
// a.myName = 8881
// console.log(a.name1);

// function thisUse(){
//     this.name = '钟阳山'
//     console.log(this);
// }

// let use = new thisUse()
// console.log(use.name);

class t {
    constructor(public name) {}
    fn() {
        console.log(this)
    }
}
let f = new t('zys')
f.fn()