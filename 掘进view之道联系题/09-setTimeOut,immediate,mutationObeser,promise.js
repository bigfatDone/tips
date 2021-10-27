setTimeout(() => {
  console.log('setTimeOut 3');
})

setImmediate(() => { // node 環境
  console.log('immediate 4');
})

Promise.resolve().then(() => {
  console.log('promise 1');
})

let count = 0
new MutationObserver(() => { // DOM對象
  console.log('mutationObserve 2');
}).observe(document.createTextNode(String(count)), {characterData: true})
count = 1