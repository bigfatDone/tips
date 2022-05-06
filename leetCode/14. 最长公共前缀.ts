function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return ''
  let first = strs[0].split('')
  let common = ''
  let check = ''
  for (let i = 0; i < first.length; i++) {
    const element = first[i];
    check +=element
    if (strs.every(item => item.indexOf(check) === 0)) {
      common +=element
    } else {
      return common
    }
  }
  return common
};
console.log(longestCommonPrefix(["flower","flow","flight"]));
