class Inside {
  constructor(name) {
    this.name = name
  }
  show(){
    console.log(this.name)
  }
}
class Factory { //类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用
  static create(name){
    return new Inside(name)
  }
}
Factory.create('zys').show() // 只暴露接口，内部通过new 具体实现方法。