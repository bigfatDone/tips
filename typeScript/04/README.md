# 第四天学习

- `function draw({ shape: Shape, xPos: number = 100 })`这个在对象里面写法为结构赋值，Shape是shape的别名，并不是指是shape的interface。

- 与readonly属性修饰符不同，可赋值性在常规Arrays 和ReadonlyArrays之间不是双向的

- 在泛型里面T，U是声明这两个是泛型，通过<>来接受

```js
function a<T,U>(arg1: T, arg2: U): T {
  return arg1
}
// <T,U>这里声明这两个字母代表泛型，泛型指的入参的时候才确定入参的类型，用变量代表这个类型
// arg1:T 表明第一个参数的类型是泛型T
// arg2:U 表明第二个参数的类型是泛型U
// 函数的返回值的类型也是T
```

- 能用interface的就用interface(extend)，不能用就用type，type支持一些表达式，基本类型别名，联合类型自由度比较高