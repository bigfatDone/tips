/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 */

// @lc code=start
// 不用考虑错位的问题，因为都是括号
function generateParenthesis(n: number): string[] {
  let result: string[] = []
  function deps(str: string, left: number, right: number) {
    if(left !== 0) {
      deps(str+'(', left - 1, right)
    }
    if (right !== 0 && left < right) {
      deps(str+')', left, right - 1)
    }
    if (left === 0 && right === 0) {
      result.push(str)
    }
  }
  deps('', n, n)
  return result
};
// @lc code=end

