let obj = require('./export.js')
function fn () {
  obj.name = "new"
  console.log(9999);
}
module.exports = {
  fn
}