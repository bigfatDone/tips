const n1 = [
  {type: 'one', key: 'one'},
  {type: 'two', key: 'two'},
  {type: 'six', key: 'six'},
]
const n2 = [
  {type: 'one', key: 'one'},
  {type: 'two', key: 'two'},
  {type: 'four', key: 'four'},
  {type: 'five', key: 'five'},
  {type: 'six', key: 'six'},
]

let i = 0
let e1 = n1.length - 1 // 旧节点长度
let e2 = n2.length - 1 // 新节点的长度
// 判断是相同的节点
function isSameVnode(preChild, child) {
  if (preChild.type === child.type && preChild.key === child.key) {
    console.log(`n1和n2的type值为${child.type}是相同的节点`)
    return true
  }
  return false
}

// 两个节点进行比较打补丁
function patch(n1, n2) {
  if (n1 && n2) {
    console.log(`两个节点不同，进行比较`);
  } else if (!n1 && n2) {
    console.log(`新增节点，节点的type值为${n2.type}`);
  } else {
    console.log(`删除节点，节点的type值为${n1.type}`);
  }
}
// 从左往右循环
while(i <= e1 && i <= e2) {
  if (isSameVnode(n1[i],n2[i])) {
    i++
  } else {
    break
  }
}
// 从右往左循环
while(i <= e1 && i <=e2) {
  if (isSameVnode(n1[e1],n2[e2])) {
    e1--
    e2--
  } else {
    break
  }
}

// 全是新增节点
if (i > e1 && i <= e2) {
  for(let i = 0; i <= e2; i++) {
    patch(null, n2[i])
  }
}