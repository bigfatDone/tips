var findMedianSortedArrays = function(nums1, nums2) {
  let nums = nums1.concat(nums2).sort((a, b) => a - b)
  let num = 0
  let l = nums.length
  if (l % 2 === 0) {
      let center = l / 2
      num = (nums[center] + nums[center - 1]) / 2
    } else {
      let center = (l + 1) / 2
      num = nums[center - 1]
  }
  return num
};

findMedianSortedArrays([3],[-2,-1])