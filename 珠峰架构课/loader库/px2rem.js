'use strict';

var css = require('css');
var extend = require('extend');

// 基本配置
var defaultConfig = {
  baseDpr: 2,             // base device pixel ratio (default: 2)
  remUnit: 75,            // rem unit value (default: 75)
  remPrecision: 6,        // rem value precision (default: 6)
  forcePxComment: 'px',   // force px comment (default: `px`)
  keepComment: 'no'       // no transform value comment (default: `no`)
};

// 正则匹配px单词周边内容
var pxRegExp = /\b(\d+(\.\d+)?)px\b/;

function Px2rem(options) {
  this.config = {};
  extend(this.config, defaultConfig, options);
}

// 生成css ast树操作，并根据dpr进行相应的调整
// generate @1x, @2x and @3x version stylesheet
Px2rem.prototype.generateThree = function (cssText, dpr) {
  dpr = dpr || 2;
  var self = this;
  var config = self.config;
  // 生成css ast树
  var astObj = css.parse(cssText);
  // { ast树结构
  //   "type": "stylesheet",
  //   "stylesheet": {
  //     "rules": [
  //       {
  //         "type": "rule",
  //         "selectors": [
  //           "#main"
  //         ],
  //         "declarations": [
  //           {
  //             "type": "declaration",
  //             "property": "border",
  //             "value": "1px solid black",
  //             "position": {
  //               "start": {
  //                 "line": 2,
  //                 "column": 5
  //               },
  //               "end": {
  //                 "line": 2,
  //                 "column": 28
  //               }
  //             }
  //           }
  //         ],
  //         "position": {
  //           "start": {
  //             "line": 1,
  //             "column": 1
  //           },
  //           "end": {
  //             "line": 3,
  //             "column": 2
  //           }
  //         }
  //       }
  //     ],
  //     "parsingErrors": []
  //   }
  // }
  // 处理rules(合集) ==> rule(每个选择器)
  function processRules(rules) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        // 媒体查询
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        // 动画
        processRules(rule.keyframes); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      var declarations = rule.declarations;
      // 选择器内部的全部内容
      for (var j = 0; j < declarations.length; j++) {
        // 选择器内部每行内容
        var declaration = declarations[j];
        // need transform: declaration && has 'px'
        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
          var nextDeclaration = rule.declarations[j + 1];
          // 判断是否有注释节点，将无用的注释节点删除
          if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
            if (nextDeclaration.comment.trim() === config.keepComment) { // no transform
              declarations.splice(j + 1, 1); // delete corresponding comment
              continue;
            } else if (nextDeclaration.comment.trim() === config.forcePxComment) { // force px
              declarations.splice(j + 1, 1); // delete corresponding comment
            }
          }
          // 根据dpr转换成对应的px值
          declaration.value = self._getCalcValue('px', declaration.value, dpr); // common transform
        }
      }
    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj);
};

// 通过生成ast将px转换成rem
// generate rem version stylesheet
Px2rem.prototype.generateRem = function (cssText) {
  var self = this;
  var config = self.config;
  // 生成ast树
  var astObj = css.parse(cssText);

  // 对ast进行遍历
  function processRules(rules, noDealPx) { // FIXME: keyframes do not support `force px` comment
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.type === 'media') {
        processRules(rule.rules); // recursive invocation while dealing with media queries
        continue;
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes, true); // recursive invocation while dealing with keyframes
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      if (!noDealPx) {
        // generate 3 new rules which has [data-dpr]
        var newRules = [];
        for (var dpr = 1; dpr <= 3; dpr++) {
          var newRule = {};
          newRule.type = rule.type;
          newRule.selectors = rule.selectors.map(function (sel) {
            return '[data-dpr="' + dpr + '"] ' + sel;
          });
          newRule.declarations = [];
          newRules.push(newRule);
        }
      }

      // 开始处理声明的内容
      var declarations = rule.declarations;
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j];
        // need transform: declaration && has 'px'
        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
          // 获取下个节点，因为有注释节点，都是处于当前节点的下一个节点
          var nextDeclaration = declarations[j + 1];
          // 对注释节点进行判断
          if (nextDeclaration && nextDeclaration.type === 'comment') { // next next declaration is comment
            if (nextDeclaration.comment.trim() === config.forcePxComment) { // force px
              // 对0px不进行处理
              // do not transform `0px`
              if (declaration.value === '0px') {
                declaration.value = '0';
                // 删除注释
                declarations.splice(j + 1, 1); // delete corresponding comment
                continue;
              }
              if (!noDealPx) {
                // generate 3 new declarations and put them in the new rules which has [data-dpr]
                for (var dpr = 1; dpr <= 3; dpr++) {
                  var newDeclaration = {};
                  extend(true, newDeclaration, declaration);
                  newDeclaration.value = self._getCalcValue('px', newDeclaration.value, dpr);
                  newRules[dpr - 1].declarations.push(newDeclaration);
                }
                declarations.splice(j, 2); // delete this rule and corresponding comment
                j--;
              } else { // FIXME: keyframes do not support `force px` comment
                // 将px转换成rem
                declaration.value = self._getCalcValue('rem', declaration.value); // common transform
                // 删除下个一注释节点
                declarations.splice(j + 1, 1); // delete corresponding comment
              }
              // 注释了不要转换
            } else if (nextDeclaration.comment.trim() === config.keepComment) { // no transform
              declarations.splice(j + 1, 1); // delete corresponding comment
            } else {
              declaration.value = self._getCalcValue('rem', declaration.value); // common transform
            }
          } else {
            declaration.value = self._getCalcValue('rem', declaration.value); // common transform
          }
        }
      }
      // 删除只有了选择器但是里面没有内容
      // if the origin rule has no declarations, delete it
      if (!rules[i].declarations.length) {
        rules.splice(i, 1);
        i--;
      }

      if (!noDealPx) {
        // add the new rules which contain declarations that are forced to use px
        if (newRules[0].declarations.length) {
          rules.splice(i + 1, 0, newRules[0], newRules[1], newRules[2]);
          i += 3; // skip the added new rules
        }
      }
    }
  }

  processRules(astObj.stylesheet.rules);

  return css.stringify(astObj); 
};

//  生成px或者是rem，需要根据dpr（设备像素比）
// get calculated value of px or rem
Px2rem.prototype._getCalcValue = function (type, value, dpr) {
  var config = this.config;
  var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

  // 计数数值
  function getValue(val) {
    val = parseFloat(val.toFixed(config.remPrecision)); // control decimal precision of the calculated value
    return val == 0 ? val : val + type;
  }

  // 根据正则表达式匹配相应的px参数
  return value.replace(pxGlobalRegExp, function ($0, $1) {
    return type === 'px' ? getValue($1 * dpr / config.baseDpr) : getValue($1 / config.remUnit);
  });
};

module.exports = Px2rem;