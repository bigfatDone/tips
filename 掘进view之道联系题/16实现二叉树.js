class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmty() {
    return this.size === 0
  }
  addNode(v) {
    this.root = this.appendNode(this.root, v)
  }
  appendNode(node, v) {
    if(!node) {
      this.size ++
      return new Node(v)
    }
    if (node.value > v) {
      // 递归调用自身
      node.left = this.appendNode(node.left, v)
    } else if (node.value < v) {
      node.right = this.appendNode(node.right, v)
    }
    return node
  }
}
let node = new BST()
node.addNode(2)
node.addNode(3)
node.addNode(4)
node.addNode(42)
node.addNode(34)
node.addNode(45)
console.dir(node.root);