const data = {
  name: "cxr",
}

const computed = {
  age: 18
}

let handler = {
  get: function (target, prop) {
    return target[prop]
  },
  set: function (target, prop, value) {
    target[prop] = value
  }
}

let ctx = new Proxy(Object.assign(data, computed), handler)

console.log(ctx.name ) // cxr

console.log(ctx.age)   // 18


data.name = "xiaohong"

console.log(ctx.name) // xiaohong

