# node学习

1. esModule是静态加载的，是因为在编译打包的时候就知道需要引用什么(可以使用tree-shaking)；commonjs是动态加载的，只有在运行的时候才能知道里面引用的是什么，因此不能通过tree-shaking优化。