var longestPalindrome = function(s) {
  let array = s.split('')
  let max = []
  for (let i = 0; i < array.length; i++) {
    let set = [array[i]]
    for (let j = i; j < array.length; j++) {
      if (set[0] === array[j]) {
        j == i ? null : set.push(array[j])
        let reverse = JSON.parse(JSON.stringify(set))
        max = max.length > set.length ? max : JSON.stringify(set) === JSON.stringify(reverse.reverse()) ? JSON.parse(JSON.stringify(set)) : max
      } else {
        j == i ? null : set.push(array[j])
      }
    }
    
  }
  return [...max].join('')
};
longestPalindrome("babadada")
// "adabada"