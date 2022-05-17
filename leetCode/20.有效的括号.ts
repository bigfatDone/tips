/*
 * @lc app=leetcode.cn id=20 lang=typescript
 *
 * [20] 有效的括号
 */

// @lc code=start
function isValid(s: string): boolean {
  let map = {
    '(':')',
    '{':'}',
    '[':']'
  }
  let stack = []
  let len = s.length

  for (let i = 0; i < len; i++) {
    if (map[s[i]] === ')') {
      stack.push(')')
    } else if (map[s[i]] === '}') {
      stack.push('}')
    } else if (map[s[i]] === ']') {
      stack.push(']')
    } else if(stack.pop() !== s[i]) {
      return false
    }
  }
  return stack.length === 0
};
// @lc code=end

