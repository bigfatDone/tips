# vue3中使用lulu-UI和源码解析

## 前言

本文分析的是`LuLu UI`的Edge主题，这是[张鑫旭](https://www.zhangxinxu.com/)开发的一套UI组件，使用原生JavaScript编写，使用了JavaScript和CSS前沿的新语法和新特性，React和Vue项目均适用。其核心主旨为面向设计、面向项目的半封装web组件开发。

## 安装vue3和lulu

- 通过Vite 快速构建 Vue 项目

```js
// npm 6.x
npm init vite@latest <project-name> --template vue

// npm 7+，需要加上额外的双短横线
npm init vite@latest <project-name> -- --template vue

cd <project-name>
npm install
npm run dev
```

- 安装lulu UI

```js
npm install lu2
```

## 引入和展示效果

该组件支持按需引入，减小项目的体积，目前引入的是edge主题，其他主题引入也是如此。

main.js 引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import 'lu2/theme/edge/js/common/all.js'
import 'lu2/theme/edge/css/common/ui.css'

createApp(App).mount('#app')
```

页面引入组件

```js
<template>
  <h1>开始引入lulu-日期组件</h1>
  <input is="ui-datetime">
</template>
```

展示效果

![日期组件图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c92833f2e4949bc95728b761044b30c~tplv-k3u1fbpfcp-watermark.image?)

问题:

1. 为什么只是一个input标签就会显示日期了呢？

2. is这个属性是干什么用的？

## 寻找问题答案

### 问题一
  
在原生组件的input里面，可以通过设置`type`的属性来决定这个元素是哪种类型，原生的`type="date"`为日期元素，具体展示如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feb7cc92b27c4c75a77f3b3425451f42~tplv-k3u1fbpfcp-watermark.image?)

### 问题二

is这个属性是用于自定义内置元素，在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%86%85%E7%BD%AE%E5%85%83%E7%B4%A0)里面是这样声明`customElements.define()`

你可以通过`customElements.define()`创建两种类型的自定义元素：

- 自主定制元素：独立元素; 它们不会从内置HTML元素继承。

- 自定义内置元素：这些元素继承自 - 并扩展 - 内置HTML元素。

语法

```js
// name
// 自定义元素名.

// constructor
// 自定义元素构造器.

// options 可选
// 控制元素如何定义. 目前有一个选项支持:
// extends. 指定继承的已创建的元素. 被用于创建自定义元素.

customElements.define(name, constructor, options)
```

## 日期组件源码解析

在使用`<input is="ui-datetime">`的时候，我的`input`元素怎么就变成上面那么好看的日期选择器了呢,下面来看看这个日期的源码是怎么写的。

找到`theme/edge/js/common/ui/DateTime.js`这个文件，拉到最下面，看到是通过`customElements.define()`来继承`input`元素。

```js
// 判断全局是有已经定义了'ui-datetime'，如果有就不需要再重复定义了。
if (!customElements.get('ui-datetime')) {
  // 自定义元素并且继承已有的input元素
  customElements.define('ui-datetime', DateTime, {
    extends: 'input'
  });
}
```

日期组件继承了input的所有属性，并且对内部的属性进行重写，进行二次封装，对样式和排版也进行了封装。

```js
// 
const DateTime = (() => {
  // ...省略很多行
  // 组件继承原生的input元素
  class Component extends HTMLInputElement {
    constructor () {
      // 继承父类的方法和属性
      super();
    }
    // 对一些基本的属性的set和get操作
    get min () {...}
    set min (value) {{...}}

    get max () {{...}}
    set max (value) {{...}}

    get step () {{...}}
    set step (value) {{...}}

    /**
   * 事件，这里判断日期格式和样式
   * @return {[type]} [description]
   */
    events () {
      // 具体元素们
      const eleContainer = this.element.target;
  
      // 点击容器的事件处理
      eleContainer.addEventListener('click', (event) => {...}

      // 输入框元素行为
      this.addEventListener('keydown', (event) => {...}

      // 时间范围选择点击页面空白区域不会隐藏
      document.addEventListener('mouseup', (event) => {...}

      // time类型的上下左右快捷键处理
        document.addEventListener('keydown', event => {...}

      // 窗口尺寸变化与重定位
      window.addEventListener('resize', () => {}

      return this;
    }
    // ...省略很多行
  }
  return Component;
})()
```

## 结语

虽然这里只是对时间组件进行解析，但是这个库里面的其他组件封装也是如此。理解了这个组件那么其他组件的使用和理解也是游刃有余。

官方网站：[l-ui.com](https://l-ui.com/)

github地址：[github.com/yued-fe/lulu](https://github.com/yued-fe/lulu)

官方作者看法：[https://www.zhangxinxu.com/php/cache/backup/ui-components-for-design/index.html](https://www.zhangxinxu.com/php/cache/backup/ui-components-for-design/index.html)

PS：另外安利一个大崔哥[min-vue](https://github.com/cuixiaorui/mini-vue)库，学习vue源码利器.
