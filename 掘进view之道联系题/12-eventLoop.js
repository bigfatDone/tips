let p = new Promise(function(resolve, reject) {
  resolve('promise')
  setTimeout(() => {console.log('settimeout500')}, 500)
  let p1 = new Promise((r, j) => {
    console.log('rrr');
    r("r")
  })
  p1.then(e => {
    setTimeout(() => {console.log('settimeout50')}, 50)
    console.log(e);
  })
})
console.log('log1');
p.then(resolve => {
  console.log(resolve);
  let p1 = new Promise((r, j) => {
    console.log('rrr1');
    r("r1")
  })
  p1.then(e => {
    console.log(e);
    setTimeout(() => {console.log('settimeout50--1')}, 49);
  })
})

// rrr log1 r promise rrr1 r1 settimeout1 