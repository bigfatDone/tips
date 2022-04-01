/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums: number[]): number {
  if (!nums.length) return 0
  // 填充都是为1
  let array: number[]= new Array(nums.length).fill(1)
  for (let i:number = 0; i < nums.length; i++) {
    // 以初始值为最大，下面遍历都必须小于它
    for (let j:number = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 最小递增是1
        array[i] = Math.max(array[i], 1 + array[j])
      }
    }
  }
  let max:number = 1
  for (let index:number = 0; index < array.length; index++) {
    max = Math.max(max, array[index]) 
  }
  return max
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));