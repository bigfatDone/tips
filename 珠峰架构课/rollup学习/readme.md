# rollup 学习笔记

## 项目初始化

## 前置知识

1. tree-shaking 摇树优化

2. magic-string截取字符串

3. AST抽象语法树

## 主要原理

首先是通过rollup函数将入口文件和要输出的文件名作为入参传进来，调用build方法，通过获取入口文件名去读取入口文件模块定义，开始对文件进行读取，获取模块内部的代码，将模块内部代码通过插件转换成ast树，之后开始对ast进行分析，通过遍历body内部的数据，将里面的ast全部拿出来，把所有的语句进行判断遍历展开，并且还会标志该节点（对依赖变量进行标志，表明已经被引入了-tree-shaking的核心，对ast依赖变量进行标志）。将拿到的所有的内容通过magic-string拼凑在一起，通过fs.write操作将内容输出到之前传出参文件名。
