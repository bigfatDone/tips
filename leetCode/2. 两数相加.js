var addTwoNumbers = function(l1, l2) {
  console.log(l1);
  console.log(l2);
  let result = []
  let length = Math.max(l1.length, l2.length) - 1
  let ten = false
  for(let i = 0; i <= length; i++) {
    let add
      if (ten) {
        add = isNumber(l1[i]) +  isNumber(l2[i]) + 1

      } else {
        add =  isNumber(l1[i]) +  isNumber(l2[i])
      }
      if (add > 9) {
          ten = true
          result.push(add % 10)
      } else {
          ten = false
          result.push(add)
      }
      if (i === length && ten) {
          result.push(1)
      }
  }
  return result
};
var isNumber = function(val) {
  return typeof val === 'number' ? val.toFixed(0) : 0
}
// console.log(addTwoNumbers([2,4,3],[5,6,4,9,6]));
// console.log(addTwoNumbers([9,9,9,9,9,9,9],[9,9,9,9]));
// console.log(addTwoNumbers([0],[0]));