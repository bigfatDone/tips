# px2rem-loader的实现逻辑

- loader的核心就是一个函数，接受参数

- 参数就是匹配到的源文件

- 通过将源文件内容生成AST树，然后对里面的内容进行操作处理

- 通过正则表达式匹配到px，然后进行处理
  
- 根据配置loader的参数，进行px转换成rem的配置

- 最后返回处理过的内容

## 设置全局的font-size的一个loader

- 需要给document.style 设置一个font-size，后面的rem才能根据这个最顶级的root的字体去匹配

- root的字体大小需要根据设备像素比去进行设置，因为设计师给出的设计稿一般都是750px；就需要对这个进行处理

- body上面设置大小是为了给默认字体的大小，避免走了html给出的font-size[html和body上面设置佛fontSize](https://www.cnblogs.com/miniSkytrue/p/12089511.html)