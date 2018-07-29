/*!
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build @@buildTime
 * version @@version
 * github: @@url
 */

/**
 * # Browser 機能を調べる
 * # HTMLElement の CSS class 操作
 *
 * @module wakegi
 * @submodule wakegi
 * @type {{}|wakegi}
 */

/**
 * builtin 関数を拡張するのを許可
 * `==` 判定許可
 */

/* eslint no-extend-native: 1 */
/* eslint eqeqeq: 1 */
/**
 * [global object] - wakegi
 * @type {object}
 */
var wakegi = window.wakegi || {};

wakegi.int = parseInt;
wakegi.float = parseFloat;
//
// (function() {
//   'use strict';
//
//   // Array.isArray
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
//   if ( !Array.isArray ) {
//     Array.isArray = function( arg ) {
//       return Object.prototype.toString.call( arg ) === '[object Array]';
//     };
//   }
//
//   // Array.indexOf
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
//   // Production steps of ECMA-262, Edition 5, 15.4.4.14
//   // Reference: http://es5.github.io/#x15.4.4.14
//   if (!Array.prototype.indexOf) {
//     // eslint-disable-next-line
//     Array.prototype.indexOf = function(searchElement, fromIndex) {
//
//       var k;
//
//       // 1. Let o be the result of calling ToObject passing
//       //    the this value as the argument.
//       // eslint-disable-next-line
//       if (this == null) {
//         throw new TypeError('"this" is null or not defined');
//       }
//
//       var o = Object(this);
//
//       // 2. Let lenValue be the result of calling the Get
//       //    internal method of o with the argument "length".
//       // 3. Let len be ToUint32(lenValue).
//       var len = o.length >>> 0;
//
//       // 4. If len is 0, return -1.
//       if (len === 0) {
//         return -1;
//       }
//
//       // 5. If argument fromIndex was passed let n be
//       //    ToInteger(fromIndex); else let n be 0.
//       var n = +fromIndex || 0;
//
//       if (Math.abs(n) === Infinity) {
//         n = 0;
//       }
//
//       // 6. If n >= len, return -1.
//       if (n >= len) {
//         return -1;
//       }
//
//       // 7. If n >= 0, then Let k be n.
//       // 8. Else, n<0, Let k be len - abs(n).
//       //    If k is less than 0, then let k be 0.
//       k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
//
//       // 9. Repeat, while k < len
//       while (k < len) {
//         // a. Let Pk be ToString(k).
//         //   This is implicit for LHS operands of the in operator
//         // b. Let kPresent be the result of calling the
//         //    HasProperty internal method of o with argument Pk.
//         //   This step can be combined with c
//         // c. If kPresent is true, then
//         //    i.  Let elementK be the result of calling the Get
//         //        internal method of o with the argument ToString(k).
//         //   ii.  Let same be the result of applying the
//         //        Strict Equality Comparison Algorithm to
//         //        searchElement and elementK.
//         //  iii.  If same is true, return k.
//         if (k in o && o[k] === searchElement) {
//           return k;
//         }
//         k++;
//       }
//       return -1;
//     };
//   }
//
//   // trim
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
//   if (!String.prototype.trim) {
//     // eslint-disable-next-line
//     String.prototype.trim = function() {
//       return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
//     };
//   }
// }());
