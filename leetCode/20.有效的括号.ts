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
  if (!s || s.length % 2 != 0) {
    return false
  }
  let len = s.length
  for (let i = 0; i < len / 2; i++) {
    if (s[len - 1 - i] !== map[s[i]]) {
      return false
    }
  }
  return true
};
// @lc code=end

