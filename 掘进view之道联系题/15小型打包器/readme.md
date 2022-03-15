# 实现一个小型打包器的原理

1. 输入入口文件，将入口文件的内容提取出来

2. 将内容通过过插件生成ast

3. 对ast进行操作，将里面的一些链接依赖用一个字段提取出来，并且通过babel将ast生成es5。{ ast, dependencis }

4. 对依赖进行进行重新1,2,3步骤，获取依赖的生成es5，将全部的ast放到一个数组里面。（依赖就是另外的一个文件内容）

5. 对数组进行遍历，并且生成下面的数据结构

```js
// 构建函数参数，生成的结构为
// { './entry.js': function(module, exports, require) { 代码 } }
```

6. 生成指定格式的代码(commonjs, esm),并且通过 `fs.writeFileSync('./bundle.js', result)`新建文件并且写入内容
