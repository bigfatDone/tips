function intToRoman(num: number): string {
  let romNum = ''
  let nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  for (let i = 0; i < nums.length; i++) {
    while(num >= nums[i]) {
      num -=nums[i]
      romNum +=rom[i]
    }
  }
  return romNum
};

console.log(intToRoman(58));

