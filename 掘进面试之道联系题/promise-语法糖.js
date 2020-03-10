new Promise((resoleve,reject) => {
  setTimeout(() => {
    reject('1111')
  })
}).then(data => {
  console.log(data)
}).catch(e => {
  console.log('catch e:'+e)
})