# AMD+CMD+CommonJS+ESM的不同之处

## AMD (RequireJS)

- AMD 规范在这里：<https://github.com/amdjs/amdjs-api/wiki/AMD>

- AMD = Asynchronous Module Definition，即 异步模块定义。

- AMD 规范加载模块是异步的，并允许函数回调，不必等到所有模块都加载完成，后续操作可以正常执行（依赖前置，提前执行）。

```js
// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好    
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()    
  // ...
})
```

## CMD (SeaJS)

- CMD 规范在这里：<https://github.com/seajs/seajs/issues/242>

- CMD = Common Module Definition，即 通用模块定义。CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

- CMD中，模块作为依赖且被引用时才会初始化，否则只会加载。

```js
// CMD 默认推荐的是
define(function(require, exports, module) {   

  // 获取模块 a 的接口
  var a = require('./a') 
  // 调用模块 a 的方法,就近依赖
  a.doSomething()

  // 获取模块 b 的接口
  var b = require('./b')
  // 调用模块 b 的方法，就近依赖
  b.doSomething()
  // ... 
})
```

## AMD和CMD的区别

- AMD中只要模块作为依赖时，就会加载并初始化

- CMD 推崇依赖就近，AMD 推崇依赖前置。

- AMD 的 API 默认是一个当多个用，CMD 严格的区分推崇职责单一。例如，AMD 里 require 分全局的和局部的。CMD里面没有全局的 require，提供 seajs.use() 来实现模块系统的加载启动。CMD 里每个 API 都简单纯粹。

## 传统加载

- 在传统的html网页中，浏览器通过`<script>`标签加载 JavaScript 脚本。加载网页的顺序可以通过控制`defer`和 `async`来判断js的加载顺序。

```js
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

- 上面代码中，`<script>`标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

- defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

## 加载ES6（ESM）模块

- 浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入type="module"属性,浏览器对于带有type="module"的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的defer属性。

```js
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

- 通过引入模块脚本，那么代码就是在模块作用域中执行的，而不是在全局作用域中运行，模块顶层的变量，外部不可见。因此模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。

- 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```js
<script type="module">
    import test from "./test.js" // 测试引入module
    var a  = 888
    console.log(window.a); // undefined
    console.log(this); // undefined
  </script>
  <script>
    var b = 899
    console.log(this); // Window
    console.log(window.b); // 899
  </script>
```

## ES6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

CommonJS模块输出的是拷贝值，不会影响原来的数据

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

ES6模块输出是引用值，原始数据也会受到影响。export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

## Node.js的模块的加载方式

- JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS，CommonJS 模块使用`require()`和`module.exports`，ES6 模块使用`import`和`export`。

- 从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持,但是要在node环境中使用esm，那么文件名的后缀就在修改成`.mjs`或者是在`package.json`文件中修改`type`的字段:

```js
{
   "type": "module"
}
```

- 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。

- CommonJS模块的`require()`不可以加载ES6模块，但是ES6的`import`可以加载CommonJS模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```

- 这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载。如果加载单一的输出项，可以写成下面这样。

```js
import packageMain from 'commonjs-package';
const { method } = packageMain;
```

- CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。第二次引入的时候就会去缓存里面的对象，不会重新加载执行该脚本。

```js
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

> 码字不易，可不可给bigfat一个小小赞，回一点点血呢。


[![olvzSe.jpg](https://z3.ax1x.com/2021/11/30/olvzSe.jpg)](https://imgtu.com/i/olvzSe)