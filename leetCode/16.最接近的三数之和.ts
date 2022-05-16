/*
 * @lc app=leetcode.cn id=16 lang=typescript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
function threeSumClosest(nums: number[], target: number): number {
  let cur = 0
  let len = nums.length
  nums.sort((a, b) => (a - b))
  if (len <= 3) {
      for(let i of nums) {
          cur += i
      }
      return cur
  } else {
      cur = nums[0] + nums[1] + nums[2]
  }
  for (let i = 0; i < len; i++) {
    let L = i + 1;
    let R = len -1;
    while(L < R) {
      let tol = nums[i] + nums[L] + nums[R] 
      cur = Math.abs(tol - target) >= Math.abs(cur -target) ? cur : tol
      if (nums[i] + nums[L] + nums[R] === target) {
        return cur
      } else if (nums[i] + nums[L] + nums[R] < target) {
        L = L + 1
      } else {
        R = R - 1
      }
    }
  }
  return cur
};
// @lc code=end

