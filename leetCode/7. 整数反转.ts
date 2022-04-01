function reverse(x: number): number {
  let int = ''
  if (x === 0 ) return 0
  let num: string | number = Math.abs(x).toString().split("").reverse().join('')
  num = x < 0 ? -num : num
  return -(2**31) <= num  && num <= (2**31 - 1) ? Number(num) : 0
};
console.log(reverse(1534236469));
