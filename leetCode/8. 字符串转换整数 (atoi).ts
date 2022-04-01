function myAtoi(s: string): number {
  let minus = false
  let array = s.split('')
  let match = []
  let status = false
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '-') {
      status = true
      minus = true
      if (array[i+1] !== undefined && !array[i+1].match(/\d/g)) return 0
    } else if (array[i] === '+') {
      status = true
      minus = false
      if (array[i+1] !== undefined  &&  !array[i+1].match(/\d/g)) return 0
    } else if (array[i] === ' ') {
      status = true
    } else if (!!Number(array[i])) {
      status = true
      match.push(array[i])
    } 
    if (!status) {
      break
    }
    status = false
  }
  const nums = match ? match.join("").match(/[1-9]+\d*$/g) : null
  if (!nums) return 0
  const numString = nums.join('')
  return minus ? -(2**31) > -numString ? -(2**31) : -Number(numString) : +numString >  (2**31 - 1) ? (2**31 - 1) :  Number(numString)
};

console.log(myAtoi("+"));
