function list(n) {
  let l = new Array(n.length).fill(1)
  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < i; j++) {
      if (n[i] > n[j]) {
        // 每次大一个就递增一个
        l[i] = Math.max(l[i], 1 + l[j])
      }
    }
  }
  let res = 1
  for (let i = 0; i < l.length; i++) {
    res = Math.max(res,l[i])
  }
  return res
}
console.log(list([0, 3, 4, 17, 2, 8, 6, 10]));