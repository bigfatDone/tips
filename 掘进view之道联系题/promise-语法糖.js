new Promise((resoleve,reject) => {
  setTimeout(() => {
    reject('1111')
  })
}).then(data => {
  console.log(data)
  return 'woshi return'
},data1 => {
  console.log(data1)
}).then(data => {
  // 这个data是拿上一级return的值('woshi return')，会自动转换成Promise对象，并且还是resolve的状态
}).catch(e => {
  console.log('catch e:'+e)
})