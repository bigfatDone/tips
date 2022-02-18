# node学习

1. esModule是静态加载的，是因为在编译打包的时候就知道需要引用什么(可以使用tree-shaking)；commonjs是动态加载的，只有在运行的时候才能知道里面引用的是什么，因此不能通过tree-shaking优化。

2. 函数柯里化（多个参数转成一个个函数传入） ==》 偏函数(不一定是一个参数，可以存在多个参数 )；避免内存溢出，把变量存在函数内部；

3. all(全部执行，遇到第一个失败停止并且抛出第一个) resolve reject race(竞选，第一个首先执行就第一个) then catch(捕获异常) finally(最终会执行) any(遇到第一个成功，抛出第一个成功) allSettled(全部执行，抛出错误和成功结果)；

4. 宏任务定义

   - script主代码块、setTimeout 、setInterval 、nodejs的setImmediate 、MessageChannel（react的fiber用到）、postMessage、网络I/O、文件I/O、用户交互的回调等事件、UI渲染事件（DOM解析、布局计算、绘制）等等。

5. 微任务定义

   - 浏览器：new Promise().then(回调) > MutationObserver

   - nodejs：中process.nextTick >new Promise().then(回调)

6. promise只能改变一次状态，resolve和reject没有终止代码执行的能力;catch的返回值会作为下一次成功的入参，reject也一样，返回值会作为下一次成功的入参；

7. async相当于promise；  await相当于yield + co；await后面的作为resolve返回值，await下面的代码都会当成then的resolve回调函数内容来执行。

8. Promise.resolve()就代表这个函数内部执行完了，后续的then就属于下一个任务了；then的方法内返回一个promise会变成x.then来执行。