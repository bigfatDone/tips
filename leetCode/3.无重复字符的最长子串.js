// var lengthOfLongestSubstring = function(s) {
//   let array = s.split('')
//   let set = new Set()
//   let max = 0
//   for (let i = 0; i < array.length; i++) {
//     let l = 0
//     for (let j = i; j < array.length; j++) {
//       if (set.has(array[j])) {
//         max = Math.max(l, max)
//         set.clear()
//         break
//       } else {
//         set.add(array[j])
//         l += 1 
//         max = Math.max(l, max)
//       }
//     }
//   }
//   return max
// };

// console.log(lengthOfLongestSubstring(" "));

function getData(n) {
  let i
  if (n % 2 === 1) {
    i = (n - 1) / 2 + 1
  } else {
    i = n / 2
  }
  return i
}

console.log(getData(3));