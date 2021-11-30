# vscode-debugger调试vue项目和html文件

## 安装插件

> [Deprecated] Debugger for Chrome

## html文件配置

```js
// launch.js
"configurations": [
  {
    "name": "vue3-minxins",
    "type": "chrome",
    "request": "launch",
    "sourceMaps": true, // 开启sourcemap
    "file": "${workspaceRoot}/packages/vue/examples/demo/mixins.html" // 每个文件都单独配置
  },
]
```

## vue项目配置

```js
// launch.js
"configurations": [
  {
    "name": "vue项目",
    "request": "launch",
    "type": "pwa-chrome",
    "url": "http://localhost:3000", // 这个必须是要和项目开启的端口是同一个端口，这样才能监听到
    "webRoot": "${workspaceFolder}"
  },
]
```
