function maxArea(height: number[]): number {
  let max = 0
  let l = height.length
  // n(2)
  // for (let i = 0; i < l; i++) {
  //   let b = height[i]
  //   for (let j = i; j < l; j++) {
  //     let a = height[j]
  //     let min = Math.min(height[i], height[j])
  //     max = Math.max(min * (j - i), max)
  //   }
  // }

  // n(1) 双指针
  for (let i = 0, j = l - 1; i < j;) {
    let minH = height[i] > height[j] ? height[j--] : height[i++]
    max = Math.max(minH * (j - i + 1), max)
  }
  return max
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
