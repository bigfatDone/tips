new Promise((resoleve,reject) => {
  setTimeout(() => {
    reject('1111')
  })
}).then(data => {
  console.log(data)
},data1 => {
  console.log(data1)
}).catch(e => {
  console.log('catch e:'+e)
})