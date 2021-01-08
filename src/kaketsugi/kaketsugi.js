/**
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/16 - 14:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Polyfill
 *
 * build: @@buildTime
 * version: @@version
 * url @@url
 */
/* jshint bitwise: false */
(function(window) {
  'use strict';
  var
    // document = window.document,
    mathMax = Math.max,
    mathAbs = Math.abs;

  // Chrome < 5, Firefox < 3, IE < 9, Safari < 4
  // Date.now
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  // Chrome < 24, Firefox < 23, IE < 10, Safari < 6
  // requestAnimationFrame
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var limit = vendors.length;
    for (var x = 0; x < limit && !window.requestAnimationFrame; x = x + 1) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (typeof window.requestAnimationFrame === 'undefined' && typeof window.setTimeout !== 'undefined') {
      window.requestAnimationFrame = function(callback) {
        var currTime = Date.now(),
          timeToCall = mathMax(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if(typeof window.cancelAnimationFrame === 'undefined' && typeof window.clearTimeout !== 'undefined') {
      window.cancelAnimationFrame = function(id) {
        window.clearTimeout(id);
      };
    }
  }());

  // Chrome < 5, Firefox < 5, IE < 9, Safari < 5
  // Object.create
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  if (typeof Object.create !== 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function() {
      // To save on memory, use a shared constructor
      /**
       * To save on memory, use a shared constructor
       * @constructor
       */
      function Temp() {}
      // make a safe reference to Object.prototype.hasOwnProperty
      var hasOwn = Object.prototype.hasOwnProperty;
      return function(O) {
        // 1. If Type(O) is not Object or Null throw a TypeError exception.
        if (typeof O !== 'object') {
          throw new TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object() where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        var obj = new Temp();
        // Let's not keep a stray reference to O...
        Temp.prototype = null;

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
          // Object.defineProperties does ToObject on its first argument.
          var Properties = Object(arguments[1]);
          for (var prop in Properties) {
            if (hasOwn.call(Properties, prop)) {
              obj[prop] = Properties[prop];
            }
          }
        }
        // 5. Return obj
        return obj;
      };
    }());
  }

  // Firefox < 4, Chrome < 5, IE < 9, Safari < 5
  // Array.isArray
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // IE < 9
  // Array.indexOf
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // Production steps of ECMA-262, Edition 5, 15.4.4.14
  // Reference: http://es5.github.io/#x15.4.4.14
  if (!Array.prototype.indexOf) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      var k;
      // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.
      if (this === null || typeof this === 'undefined') {
        throw new TypeError('"this" is null or not defined');
      }
      var O = Object(this);
      // 2. Let lenValue be the result of calling the Get
      //    internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;
      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }
      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      var n = +fromIndex || 0;
      if (mathAbs(n) === Infinity) {
        n = 0;
      }
      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }
      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = mathMax(n >= 0 ? n : len - mathAbs(n), 0);

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  // IE < 9
  // Array.forEach
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  if (!Array.prototype.forEach) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.forEach = function(callback, thisArg) {
      var T, k;
      // if (this == null) {
      if (this === null || typeof this === 'undefined') {
        throw new TypeError('"this" is null or not defined');
      }
      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      var O = Object(this);
      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;
      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }
      // 6. Let k be 0
      k = 0;
      // 7. Repeat, while k < len
      while (k < len) {
        var kValue;
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[k];
          // ii. Call the Call internal method of callback with T as the this value and
          // argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

  // For iOS 3.x, IE < 9, Firefox < 3.0, Safari < 4.0
  // https://github.com/madrobby/zepto/blob/master/src/ios3.js
  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
  if (Array.prototype.reduce === 'undefined') {
    // eslint-disable-next-line no-extend-native
    Array.prototype.reduce = function(fun) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }
      var t = Object(this),
        len = t.length >>> 0,
        k = 0,
        accumulator;

      if (typeof fun !== 'function') {
        throw new TypeError();
      }
      if (len === 0 && arguments.length === 1) {
        throw new TypeError();
      }

      if (arguments.length >= 2) {
        accumulator = arguments[1];
      } else {
        do {
          if (k in t) {
            accumulator = t[k++];
            break;
          }
          if (++k >= len) {
            throw new TypeError();
          }
          // eslint-disable-next-line no-constant-condition
        } while (true);
      }
      while (k < len) {
        if (k in t) {
          // eslint-disable-next-line no-undefined
          accumulator = fun.call(undefined, accumulator, t[k], k, t);
        }
        k++;
      }
      return accumulator;
    };
  }

  // Chrome < 7, Firefox < 4, IE < 9, Safari < 5.1.4
  // Function.prototype.bind
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  if (!Function.prototype.bind) {
    // eslint-disable-next-line no-extend-native, func-style
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        // eslint-disable-next-line func-style
        FnOP = function() {},
        // eslint-disable-next-line func-style
        fBound = function() {
          return fToBind.apply(
            // eslint-disable-next-line no-invalid-this
            this instanceof FnOP && oThis ? this : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments))
          );
        };
      FnOP.prototype = this.prototype;
      fBound.prototype = new FnOP();
      return fBound;
    };
  }

  // IE < 9, Safari < 5
  // String.prototype.trim
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      // eslint-disable-next-line no-extend-native
      String.prototype.trim = function() {
        return this.replace( rtrim, '' );
      };
    }());
  }

  // navigator.getUserMedia
  // https://developer.mozilla.org/ja/docs/Web/API/Navigator/getUserMedia
  navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );


  // window.URL
  // https://github.com/caa1211/webOAcard/blob/master/saveFile.html
  window.URL = window.URL ||
    window.webkitURL ||
    window.mozURL ||
    window.msURL;

  // console
  if (!window.console) {
    window.console = {
      info: function() {},
      log: function() {},
      debug: function() {},
      warn: function() {},
      error: function() {},
      table: function() {},
    };
  }
}(window));
