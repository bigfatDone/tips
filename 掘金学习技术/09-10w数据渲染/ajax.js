const getList = () => {
  return new Promise((resolve, reject) => {
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数
      ajax.open('get', 'http://127.0.0.1:8020');
      //步骤三:发送请求
      ajax.send();
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
              //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
              resolve(JSON.parse(ajax.responseText))
          }
      }
  })
}