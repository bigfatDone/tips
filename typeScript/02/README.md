# 第二天学习

- !的用法，在不进行任何显式检查的情况下从类型中删除 null 和未定义的内容。写作！在任何表达式之后都是一个类型断言，该值不是 null 或未定义的.

``` js
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
