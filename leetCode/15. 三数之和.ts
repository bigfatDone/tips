function threeSum(nums: number[]): number[][] {
  let res = []
  let len = nums.length
  console.log(len)
  if (len < 3) return res
  nums.sort((a,b):number => a - b)
  console.log(nums)
  for (let i = 0; i < len; i++) {
    let L = i + 1
    let R = len - 1
    // 已经大于0
    if (nums[i] > 0) {
      return res
    }
    // 跳过二次重复值
    if (nums[i] === nums[i-1]) {
      continue
    }
    while(L < R) {
      if(nums[i]+nums[L]+nums[R] === 0) {
        console.log([nums[i],nums[L],nums[R]]);
        
        res.push([nums[i],nums[L],nums[R]])
        if(L < R && nums[L] === nums[L + 1]) {
          L = L + 1
        }
        while(L < R && nums[R] === nums[R - 1]) {
          R = R - 1
        }
        L = L + 1
        R = R - 1
      } else if(nums[i]+nums[L]+nums[R] < 0) {
        // L太小，L需要往右移
        L = L + 1
      } else {
        // R太大，R需要往左移
        R = R - 1
      }
    }
  }
  return res
};

console.log(threeSum([-1,0,1,2,-1,-4]));
