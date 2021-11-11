class hello {
  name1
  constructor(name: any) {
    this.name1 = name
  }
  get myName() {
    return this.name1
  }
  set myName(value) {
    this.name1 = value
  }
}
te
let a = new hello(222)
console.log(a.myName);
a.myName = 8881
console.log(a.name1);
