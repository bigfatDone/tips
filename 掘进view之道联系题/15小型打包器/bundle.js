const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

function readCode(filePath) {
   // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8')
  // console.log(content);
  // 将内容生成ast
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  // console.log(ast);
  // 寻找当前的依赖关系
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    }
  })
  console.log(dependencies);
}

let a = path.resolve(__dirname, 'a.js')
readCode(a)