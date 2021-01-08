/**
 * Copyright (c) 2011-2021 inazumatv.com, inc.
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
 * build: 2021-1-8 17:38:57
 * version: 0.5.3
 * url https://github.com/taikiken/sagen.js
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

/**
 * Copyright (c) 2011-2021 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/24 - 12:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2021-1-8 17:38:57
 * @version 0.5.3
 * @git @@repository
 *
 */
/**
 * Fps, Polling 時間管理eventを発行します
 *
 * Polyfill methods として以下の関数を用意しています。
 *
 * - Date.now
 * - requestAnimationFrame
 * - cancelAnimationFrame
 *
 * @module Gasane
 * @property Gasane
 * @type {{}}
 */
// eslint-disable-next-line no-unused-vars
var Gasane = window.Gasane || {};

// (function(window) {
//   'use strict';
//   // var
//   //   self = window.self;
//   // Date.now
//   // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now
//   if (!Date.now) {
//     Date.now = function now() {
//       return new Date().getTime();
//     };
//   }
//
//   // requestAnimationFrame
//   // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//   // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//   (function() {
//     var
//       lastTime = 0,
//       vendors = [ 'ms', 'moz', 'webkit', 'o' ],
//       x,
//       limit,
//       currTime,
//       timeToCall,
//       id,
//       mathMax;
//
//     for (x = 0, limit = vendors.length; x < limit && !self.requestAnimationFrame; ++x) {
//       self.requestAnimationFrame = self[ vendors[ x ] + 'RequestAnimationFrame' ];
//       self.cancelAnimationFrame = self[ vendors[ x ] + 'CancelAnimationFrame' ] || self[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
//     }
//
//     if (typeof self.requestAnimationFrame === 'undefined' && typeof self.setTimeout !== 'undefined') {
//       mathMax = Math.max;
//
//       self.requestAnimationFrame = function(callback) {
//         currTime = Date.now();
//         timeToCall = mathMax(0, 16 - (currTime - lastTime));
//         id = self.setTimeout(function() {
//           callback( currTime + timeToCall );
//         }, timeToCall);
//         lastTime = currTime + timeToCall;
//         return id;
//       };
//     }
//
//     if(typeof self.cancelAnimationFrame === 'undefined' && typeof self.clearTimeout !== 'undefined') {
//       self.cancelAnimationFrame = function(timerId) {
//         self.clearTimeout(timerId);
//       };
//     }
//   }());
// }(window));

/* jslint -W016 */
/**
 * Fps, Polling 時間管理eventを発行します
 *
 * @module Gasane
 */
(function(window) {
  'use strict';
  var Gasane = window.Gasane;
  /**
   * ### カスタム Event を管理します
   * - 必要なClassでmixinします
   * - mixin 後下記の6関数が使用できるようになります
   *
   *
   *      addEventListener
   *      hasEventListener
   *      removeEventListener
   *      dispatchEvent
   *      on
   *      off
   *
   * ### mixin
   *
   *      function SomeClass () {}
   *      // mixin
   *      Gasane.EventDispatcher.initialize( SomeClass.prototype );
   *
   * @class EventDispatcher
   * @constructor
   */
  function EventDispatcher() {
    /**
     * eventType を key にした listener(function) を配列にし管理します
     * @property listeners
     * @type {{}}
     */
    this.listeners = {};
  }

  var p = EventDispatcher.prototype;
  p.constructor = EventDispatcher;
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * EventDispatcher.on alias, EventDispatcher.on 使用推奨
   *
   * @method addEventListener
   * @param {string} type event type
   * @param {function} listener event handler
   */
  p.addEventListener = function(type, listener) {
    this.on(type, listener);
  };
  /**
   * イベントにハンドラを登録します
   *
   * ハンドラ内のthisはイベント発生元になるので注意が必要です
   *
   * this参照を変えないために bind を使用する方法があります
   *
   *      function EventReceive () {
   *          var example = new ExampleClass();
   *
   *          example.addEventListener( "other", onOtherHandler );
   *          example.addEventListener( "example", this.onBoundHandler.bind( this ) );
   *      }
   *
   *      EventReceive.prototype.onOtherHandler ( event ) {
   *          console.log( this );// ExampleClass
   *      }
   *
   *      EventReceive.prototype.onBoundHandler ( event ) {
   *          console.log( this );// EventReceive
   *      }
   *
   * @method on
   * @param {string} type event type
   * @param {function} listener event handler
   */
  p.on = function(type, listener) {
    // if (typeof listener === 'undefined') {
    if (!listener) {
      // listener undefined
      return;
    }
    if (typeof this.listeners === 'undefined') {
      this.listeners = {};
    }
    var listeners = this.listeners;
    if (typeof listeners[type] === 'undefined') {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  };

  /**
   * EventDispatcher.has alias, EventDispatcher.has 使用推奨
   *
   * @method hasEventListener
   * @param {string} type event type
   * @param {function} listener event handler
   * @return {boolean} event type へ listener 登録が有るか無いかの真偽値を返します
   */
  p.hasEventListener = function(type, listener) {
    return this.has(type, listener);
  };

  /**
   * listener 登録があるか調べます
   *
   * @method has
   * @param {string} type event type
   * @param {function} listener event handler
   * @return {boolean} event type へ listener 登録が有るか無いかの真偽値を返します
   */
  p.has = function(type, listener) {
    var listeners = this.listeners;
    if ( typeof listeners === 'undefined') {
      return false;
    } else if (typeof listener[type] !== 'undefined' && listeners[type].indexOf(listener) !== -1) {
      return true;
    }
    return false;
  };

  /**
   * event type から listener を削除します
   *
   * メモリーリークの原因になるので不要になったlistenerは必ずremoveEventListenerを実行します
   *
   * EventDispatcher.off alias, EventDispatcher.off 使用推奨
   *
   * @method removeEventListener
   * @param {string} type event type
   * @param {function} listener event handler
   */
  p.removeEventListener = function(type, listener) {
    this.off(type, listener);
  };
  /**
   * event type から listener を削除します
   *
   * メモリーリークの原因になるので不要になったlistenerは必ずremoveEventListenerを実行します
   *
   * @method off
   * @param {string} type event type
   * @param {function} listener event handler
   */
  p.off = function(type, listener) {
    var
      listeners = this.listeners,
      listenersTypes,
      index,
      i, limit, found;

    if (typeof listeners === 'undefined') {
      return;
    }

    if (!listeners.hasOwnProperty(type)) {
      return;
    }
    listenersTypes = listeners[type];
    // if (typeof listenersTypes !== 'undefined') {
    //   index = listenersTypes.indexOf( listener );
    //
    //   if (index !== -1) {
    //     // listenersTypes.splice(index, 1);
    //     // dispatch 中にすぐ off （切り詰める）されると index が変わり続く listener が call できなくなるのでやめる
    //     // 変わりにnull代入
    //     listenersTypes[index] = null;
    //
    //     // 全て null の時は [] （空配列）にする
    //     found = false;
    //     for (i = 0, limit = listenersTypes.length; i < limit; i = (i + 1) | 0) {
    //       if (listenersTypes[i] !== null) {
    //         // null 以外が見つかったので処理中止
    //         found = true;
    //         break;
    //       }
    //     }
    //
    //     if (!found) {
    //       // null 以外が無い
    //       this.listeners[type] = [];
    //     }
    //   }
    // }
    index = listenersTypes.indexOf( listener );

    if (index !== -1) {
      // listenersTypes.splice(index, 1);
      // dispatch 中にすぐ off （切り詰める）されると index が変わり続く listener が call できなくなるのでやめる
      // 変わりにnull代入
      listenersTypes[index] = null;

      // 全て null の時は [] （空配列）にする
      found = false;
      for (i = 0, limit = listenersTypes.length; i < limit; i = (i + 1) | 0) {
        if (listenersTypes[i] !== null) {
          // null 以外が見つかったので処理中止
          found = true;
          break;
        }
      }

      if (!found) {
        // null 以外が無い
        this.listeners[type] = [];
      }
    }
  };

  /**
   * event発生をlistenerに通知します
   *
   * @method dispatchEvent
   * @param {Object} event require event.type:String, { type: 'some_event', [] }
   */
  p.dispatchEvent = function(event) {
    var
      listeners = this.listeners,
      listenersTypes,
      listener,
      i, limit;

    if (typeof listeners === 'undefined' || typeof event.type === 'undefined') {
      return;
    }

    listenersTypes = listeners[event.type];
    // if (typeof listenersTypes !== 'undefined') {
    if (listeners.hasOwnProperty(event.type)) {
      event.target = this;

      for (i = 0, limit = listenersTypes.length; i < limit; i = ( i + 1 ) | 0) {
        listener = listenersTypes[i];
        if (!!listener) {
          listener.call(this, event);
        }
      }
    }
  };
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * ## EventDispatcher mixin
   *
   * 6関数を引数(object)へ追加します
   *
   * - addEventListener
   * - hasEventListener
   * - removeEventListener
   * - dispatchEvent
   * - on
   * - off
   *
   * ```
   * function SomeClass () {}
   * // mixin
   * Gasane.EventDispatcher.initialize(SomeClass.prototype);
   *
   * var someObject = {};
   * // mixin
   * Gasane.EventDispatcher.initialize(someObject);
   * ```
   *
   * @method initialize
   * @param {Object} object mixin する class prototype
   * @static
   */
  EventDispatcher.initialize = function(object) {
    object.addEventListener = p.addEventListener;
    object.on = p.on;
    object.hasEventListener = p.hasEventListener;
    object.has = p.has;
    object.removeEventListener = p.removeEventListener;
    object.off = p.off;
    object.dispatchEvent = p.dispatchEvent;
  };
  Gasane.EventDispatcher = EventDispatcher;
}(window));

/**
 * Fps, Polling 時間管理eventを発行します
 *
 * @module Gasane
 */
(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    EventDispatcher = Gasane.EventDispatcher,
    animation = window.requestAnimationFrame,
    cancel = window.cancelAnimationFrame;

  /**
   * requestAnimationFrame Event を発火します
   * @class Cycle
   * @static
   * @constructor
   */
  function Cycle() {
    throw new Error('Cycle can\'t create instance.');
  }

  /**
   * @property started
   * @static
   * @type {boolean}
   */
  Cycle.started = false;

  /**
   * @property id
   * @static
   * @type {number}
   */
  Cycle.id = 0;

  /**
   * @event UPDATE
   * @static
   * @type {string}
   */
  Cycle.UPDATE = 'cycleUpdate';

  /**
   * @property event
   * @static
   * @type {{type: string, scope: Cycle, time: number, interval: number}}
   */
  Cycle.event = { type: Cycle.UPDATE, scope: Cycle, time: Date.now(), interval: -1 };

  // mixin
  EventDispatcher.initialize(Cycle);

  var p = Cycle.prototype;
  p.constructor = Cycle;

  /**
   * requestAnimationFrame を開始します
   * @method start
   * @static
   */
  Cycle.start = function() {
    if (!Cycle.started) {
      // start when not started
      Cycle.started = true;
      Cycle.event.time = Date.now();
      Cycle.update();
    }
  };

  /**
   * requestAnimationFrame を停止します
   * - 全てのlistener handlerに影響します
   * - 個別に止める場合は listener を off(removeEventListener) して下さい
   *
   * @method stop
   * @static
   */
  Cycle.stop = function() {
    // if (Cycle.started) {
    //   // cancel when started
    //   cancel(Cycle.id);
    //   Cycle.started = false;
    //   Cycle.id = 0;
    // }
    // cancel
    cancel(Cycle.id);
    Cycle.started = false;
    Cycle.id = 0;
  };

  /**
   * requestAnimationFrame event handler
   * - fire Cycle event
   * @method update
   * @static
   */
  Cycle.update = function() {
    // requestAnimationFrame loop
    Cycle.id = animation(Cycle.update);
    // event fire
    var present = Date.now();
    Cycle.event.interval = present - Cycle.event.time;
    Cycle.event.time = present;
    Cycle.dispatchEvent(Cycle.event);
  };

  Gasane.Cycle = Cycle;
}(window));

/**
 * Fps, Polling 時間管理eventを発行します
 *
 * @module Gasane
 */
(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    EventDispatcher = Gasane.EventDispatcher,
    Cycle = Gasane.Cycle,
    dateNow = Date.now;

  /**
   * 指定 fps(frame rate per second)毎にeventを通知します
   *
   * 24fps毎に実行する
   *
   *      var fps = new Gasane.Fps( 24 );
   *      fps.on( Gasane.Fps.ENTER_FRAME, function() {
   *        //
   *      } );
   *
   *      fps.start();
   *
   * @class Fps
   * @uses EventDispatcher
   * @param {int} [fps=24] frame rate
   * @constructor
   */
  function Fps(fps) {
    /**
     * frame rate
     * @property fps
     * @type {Number}
     */
    this.fps = fps || 24;
    /**
     * start flag
     * @property started
     * @type {boolean}
     */
    this.started = false;
    /**
     * frame 開始時間, frame rate 計算に使用
     * @property startId
     * @type {number}
     */
    this.startId = 0;
    /**
     * frame 間時間, frame rate 計算に使用。 1000 / fps
     * @property polling
     * @type {number}
     */
    this.polling = 0;
    /**
     * Cycle.UPDATE event handler binding
     * @property boundUpdate
     * @type {function(this:Fps)|*}
     */
    this.update = this.update.bind( this );
    /**
     * @property event
     * @type {{type: string, scope: Fps, time: number, interval: number}}
     */
    this.event = { type: Fps.ENTER_FRAME, scope: this, time: 0, interval: -1, current: 0 };
  }

  /**
   * @event ENTER_FRAME
   * @static
   * @type {string}
   */
  Fps.ENTER_FRAME = 'fpsEnterFrame';

  var p = Fps.prototype;

  // mixin
  EventDispatcher.initialize( p );
  p.constructor = Fps;

  /**
   * Fps 計算を開始します
   * @method start
   * @return {boolean} start flag を返します
   */
  p.start = function() {
    if (!this.started) {
      // not started
      this.started = true;
      this.setFps(this.fps);
      // Cycle listener
      Cycle.on(Cycle.UPDATE, this.update);
      Cycle.start();
    }
    return this.started;
  };
  /**
   * Fps 計算を止めます
   * @method stop
   * @return {boolean} start flag を返します
   */
  p.stop = function() {
    if (this.started) {
      // started
      this.started = false;
      Cycle.off(Cycle.UPDATE, this.update);
    }
    this.polling = Number.MAX_VALUE;
    return this.started;
  };
  // /**
  //  * @method fps
  //  * @return {int} 現在 fps を返します
  //  */
  // p.fps = function() {
  //   return this.fps;
  // };
  /**
   * @method setFps
   * @param {int} fps fps を設定します
   * @return {int} 設定した fps を返します
   */
  p.setFps = function(fps) {
    this.startId = this.now();
    this.polling = 1000 / fps;
    this.fps = fps;
    return fps;
  };
  /**
   * Fps.setFps alias
   * @method changeFps
   * @param {int} fps fps を変更します
   * @return {int} 設定した fps を返します
   */
  p.changeFps = function(fps) {
    return this.setFps(fps);
  };
  /**
   * @method now
   * @return {number} 現在時間(timestamp)を返します
   */
  p.now = function() {
    return dateNow();
  };
  /**
   * Cycle.update event handler
   * @method update
   * @param {{type: string, scope: Cycle, time: number, interval: number}} event Cycle event
   */
  p.update = function(event) {
    // var
    //   now = this.now(),
    //   event;
    var now = event.time;
    if ((now - this.startId) >= this.polling) {
      this.startId = now;
      // event = this.event;
      this.event.current = now;
      this.event.time = now;
      this.event.interval = event.interval;
      this.dispatchEvent(this.event);
    }
  };
  // export
  Gasane.Fps = Fps;
}(window));

/**
 * Fps, Polling 時間管理eventを発行します
 *
 * @module Gasane
 */
(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    
    EventDispatcher = Gasane.EventDispatcher,
    Cycle = Gasane.Cycle,
    dateNow = Date.now;
  /**
   * polling指定時間（ミリセカンド）毎に通知を行います
   *
   *      // 1sec(1000ms)毎に実行する
   *      var polling = new Gasane.Polling( 1000 );
   *      polling.on( Gasane.Polling.PAST, function() {
   *        //
   *      } );
   *
   *      polling.start();
   *
   * @class Polling
   * @uses EventDispatcher
   * @param {number} polling milliseconds
   * @constructor
   */
  function Polling(polling) {
    /**
     * interval milliseconds
     * @property polling
     * @type {number}
     */
    this.polling = polling;
    /**
     * @property started
     * @type {boolean}
     */
    this.started = false;
    /**
     * frame 開始時間, frame rate 計算に使用
     * @property startId
     * @type {number}
     */
    this.startId = 0;
    /**
     * Cycle.UPDATE event handler binding
     * @property boundUpdate
     * @type {function(this:Fps)|*}
     */
    this.boundUpdate = this.update.bind( this );
    /**
     * @property event
     * @type {{type: string, scope: Polling}}
     */
    this.event = { type: Polling.PAST, scope: this };
  }

  /**
   * @event PAST
   * @static
   * @type {string}
   */
  Polling.PAST = 'pollingPast';
  var p = Polling.prototype;

  // mixin
  EventDispatcher.initialize( p );
  p.constructor = Polling;

  /**
   * polling 計算を開始します
   * @method start
   * @return {boolean} started flag を返します
   */
  p.start = function() {
    if (!this.started) {
      // not started
      this.started = true;
      this.setPolling( this.polling );
      // Cycle listener
      Cycle.on(Cycle.UPDATE, this.boundUpdate);
      Cycle.start();
    }
    return this.started;
  };
  /**
   * polling 計算を止めます
   * @method stop
   * @return {boolean} started flag を返します
   */
  p.stop = function() {
    if (this.started) {
      // started
      this.started = false;
      Cycle.off(Cycle.UPDATE, this.boundUpdate);
    }
    return this.started;
  };
  // /**
  //  * @method polling
  //  * @return {Number}
  //  */
  // p.polling = function() {
  //   return this.polling;
  // };
  /**
   * polling 時間を変更します
   * @method setPolling
   * @param {number} polling 変更する polling 時間
   * @return {number} 設定した polling
   */
  p.setPolling = function(polling) {
    this.startId = this.now();
    this.polling = polling;
    return polling;
  };
  /**
   * Polling.setPolling alias
   * @method changePolling
   * @param {number} polling 変更する polling 時間
   * @return {number} 設定した polling
   */
  p.changePolling = function(polling) {
    return this.setPolling(polling);
  };
  /**
   * @method now
   * @return {number} 現在時間(timestamp)を返します
   */
  p.now = function() {
    return dateNow();
  };
  /**
   * Cycle.update event handler
   * @method update
   */
  p.update = function() {
    var
      now = this.now(),
      event;

    if ((now - this.startId) >= this.polling) {
      this.startId = now;
      event = this.event;
      event.current = now;
      this.dispatchEvent(event);
    }
  };
  Gasane.Polling = Polling;
}(window));

/*!
 * Copyright (c) 2011-2021 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build 2021-1-8 17:38:57
 * version 0.5.3
 * github: https://github.com/taikiken/sagen.js
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

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 12:39
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Browser 機能を調べます
 *
 * 互換のために Browser を基点にした Class が存在します
 *
 * @module wakegi
 * @submodule Browser
 */
(function(window) {
  'use strict';

  var
    navigator = window.navigator,
    ua,
    app;

  /**
   * Browser 基本機能
   *
   * 主要Classの親になります
   *
   * @class Browser
   * @static
   * @constructor
   */
  function Browser() {
    throw new Error('Browser can\'t create instance.');
  }

  var p = Browser.prototype;

  p.constructor = Browser;
  /**
   * @method init
   * @static
   */
  Browser.init = function() {
    if (typeof ua === 'undefined' || typeof app === 'undefined') {
      // ua undefined
      ua = navigator.userAgent;
      app = navigator.appVersion;
    }
  };
  /**
   * @method navigator
   * @static
   * @return {Navigator} window.navigator オブジェクトを返します
   */
  Browser.navigator = function() {
    return navigator;
  };
  /**
   * @method ua
   * @static
   * @return {*|string} navigator.userAgent を返します
   */
  Browser.ua = function() {
    Browser.init();
    return ua;
  };
  /**
   * @method app
   * @static
   * @return {*|string} navigator.appVersion を返します
   */
  Browser.app = function() {
    Browser.init();
    return app;
  };
  /**
   * userAgent regular expression of Safari
   * @method matchSafari
   * @static
   * @return {boolean} true: Safari
   */
  Browser.matchSafari = function() {
    Browser.init();
    return !!ua.match(/safari/i);
  };

  window.wakegi.Browser = Browser;
}(window));

/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/19 - 16:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * rgb, hsl, hsv
 *
 * Color 関連 utilities
 *
 * @module wakegi
 * @submodule Iro
 *
 * */
( function( window ) {
  'use strict';

  var
    wakegi = window.wakegi,
    Math = window.Math,

    mathFloor = Math.floor,
    mathMax = Math.max,
    mathMin = Math.min,
    mathInt = window.parseInt;

  /**
   * 色設定 utility
   *
   * - http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
   * - http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * - https://github.com/mbostock/d3/tree/master/src/color
   *
   * `not found`
   * - https://github.com/less/less.js/blob/master/lib/less/functions.js
   *
   * @class Iro
   * @static
   * @constructor
   */
  function Iro() {
    throw new Error('Iro can\'t create instance');
  }

  var p = Iro.prototype;
  p.constructor = Iro;

  // https://github.com/less/less.js/blob/master/lib/less/functions.js
  // http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
  /**
   * R, G, B to HSL
   * @method rgb2hsl
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, l: number}
   */
  Iro.rgb2hsl = function(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var
      max = mathMax(r, g, b),
      min = mathMin(r, g, b),
      h, s, l, d;

    l = (max + min) / 2;

    if ( max === min ) {
      // achromatic
      h = 0;
      s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch(max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = ((b - r) / d) + 2;
          break;

        case b:
          h = ((r - g) / d) + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, l: l };
  };

  /**
   * HUE を RGB 変換します
   * @param {number} point 変換変数
   * @param {number} q 変換変数
   * @param {number} t 変換変数
   * @return {number} 色成分数値を返します 0 ~ 255
   */
  Iro.hue2rgb = function(point, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return point + (q - point) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return point + (q - point) * ((2 / 3) - t) * 6;
    }
    return point;
  };

  /**
   * HSL を RGB 変換します
   * @method hsl2rgb
   * @static
   * @param {number} h Hue
   * @param {number} s Saturation
   * @param {number} l luminance
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsl2rgb = function(h, s, l) {
    var r, g, b, q, point;

    if(s === 0) {
      // achromatic
      r = g = b = l;
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
      point = (2 * l) - q;

      r = Iro.hue2rgb(point, q, h + (1 / 3));
      g = Iro.hue2rgb(point, q, h);
      b = Iro.hue2rgb(point, q, h - (1 / 3));
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  /**
   * RGB を HSV 変換します
   * @method rgb2hsv
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, v: number}
   */
  Iro.rgb2hsv = function(r, g, b) {
    var red = r / 255;
    var green = g / 255;
    var blue = b / 255;

    var
      max = mathMax(red, green, blue),
      min = mathMin(red, green, blue),
      h, s,
      v = max,
      d = max - min;

    s = max === 0 ? 0 : d / max;

    if (max === min) {
      // achromatic
      h = 0;
    } else {

      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;

        case green:
          h = (blue - red) / d + 2;
          break;

        case blue:
          h = (red - green) / d + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, v: v };
  };

  /**
   * HSV を RGB 変換します
   * @method hsv2rgb
   * @static
   * @param {number} h Hue 色相
   * @param {number} s Saturation 彩度
   * @param {number} v Value 明度
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsv2rgb = function( h, s, v ) {
    var
      r, g, b,
      i = mathFloor(h * 6),
      f = h * 6 - i,
      point = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s);

    switch ( i % 6 ) {
      case 0:
        r = v;
        g = t;
        b = point;
        break;

      case 1:
        r = q;
        g = v;
        b = point;
        break;

      case 2:
        r = point;
        g = v;
        b = t;
        break;

      case 3:
        r = point;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = point;
        b = v;
        break;

      case 5:
        r = v;
        g = point;
        b = q;
        break;

      default:
        r = 0;
        g = 0;
        b = 0;
        break;
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  /**
   * hex CSS shorthand to normal (#0ef -> #00eeff)
   * @method hexShort
   * @static
   * @param {string} hex CSS color 形式
   * @return {string|null} CSS short hand color 形式をフル変換します
   * @see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   */
  Iro.hexShort = function(hex) {
    if (typeof hex !== 'string') {
      // order string
      return null;
    }

    var
      shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    return hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  };
  /**
   * CSS color 形式文字列を RGB 分解し Object 変換します
   * @method hex2rgb
   * @static
   * @param {string} hex CSS 色設定文字 #ff0000
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hex2rgb = function(hex) {
    var hexString = Iro.hexShort( hex );
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return result ?
      {
        r: mathInt(result[1], 16),
        g: mathInt(result[2], 16),
        b: mathInt(result[3], 16)
      } : null;
  };

  /**
   * color(red, green, blue) number を 16進数変換し2桁文字列に変換します
   * @method componentToHex
   * @static
   * @param {number} color color(red, green, blue) number
   * @return {string} 2桁を保障し文字列変換し返します
   */
  Iro.componentToHex = function(color) {
    var hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  /**
   * color(red, green, blue) number を CSS color 形式文字列へ変換します
   * @method rgb2hex
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {string} CSS color 形式文字列を返します
   */
  Iro.rgb2hex = function(r, g, b) {
    var
      red = Iro.componentToHex(r),
      green = Iro.componentToHex(g),
      blue = Iro.componentToHex(b);
    return '#' + red + green + blue;
  };

  /**
   * convert int to hex, 16777215 -> #ffffff
   * @method int2hex
   * @static
   * @param {number} num 変換元 10進数
   * @return {string} CSS color 16進数型文字列を返します
   */
  Iro.int2hex = function(num) {
    var
      numFloor = mathFloor(num),
      hex = numFloor.toString(16),
      sub,
      i;

    if (hex.length < 6) {
      i = hex.length;
      sub = 6 - i;

      while(sub) {
        hex = '0' + hex;
        --sub;
      }
    }
    return '#' + hex;
  };

  /**
   * convert hex to int, #fff -> 16777215
   * @method hex2int
   * @static
   * @param {string} hex `#fff` な 16進・文字列
   * @return {int|null} hex 文字列を10進数変換し返します
   */
  Iro.hex2int = function(hex) {
    var hexString = Iro.hexShort(hex);
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    return mathInt(hexString, 16);
  };

  wakegi.Iro = Iro;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 20:26
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */

/**
 * 文字列操作に使用します
 *
 * @module wakegi
 * @submodule Util
 */
( function(window) {
  'use strict';
  var wakegi = window.wakegi;

  /**
   * ユーティリティ
   * @class Util
   * @static
   * @constructor
   */
  function Util() {}

  var p = Util.prototype;
  p.constructor = Util;

  /**
   * abc-def を abcDef にします
   *
   * @method camelize
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash(-)連結 word を camel case へ変換し返します。
   */
  Util.camelize = function( str ) {
    return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  };

  /**
   * abcDef を abc-def にします
   *
   * @method dash
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash 変換後文字列を返します
   */
  Util.dash = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  };

  wakegi.Util = Util;
}(window));


/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/20 - 19:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * CSS shorthand property pattern
 *
 * @module wakegi
 * @submodule Patterns
 *
 * */
(function(window) {
  'use strict';

  var
    /**
     * @property patterns
     * @static @private
     * @type {{padding: [*], margin: [*], border-color: [*], border-style: [*], border-width: [*]}}
     */
    patterns = {
      padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      'border-color': ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
      'border-style': ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
      'border-width': ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
    };

  /**
   * @class Patterns
   * @static
   * @constructor
   */
  function Patterns() {
    throw new Error('Patterns can\'t create instance');
  }

  var p = Patterns.prototype;
  p.constructor = Patterns;

  /**
   * camel を hyphen に変換
   * @method hyphen
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {string} hyphen 変換後文字列を返します
   */
  Patterns.hyphen = function(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  };
  /**
   * 引数 key 名称が patterns に存在するかを調べます
   * @method has
   * @static
   * @param {string} key 調べる key 名称(CSS property name)
   * @return {boolean} true: 存在する
   */
  Patterns.has = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns.hasOwnProperty(keyName);
  };
  /**
   * @method get
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {Array|undefined} CSS short hand 配列を返します
   */
  Patterns.get = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns[keyName];
  };
  
  window.wakegi.Patterns = Patterns;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:24
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * CSS3 機能（一部のみ）が使用可能かを調べます
 *
 * @module Browser
 * @submodule Css3
 */
(function(window) {
  'use strict';

  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    transition,
    transform,
    matchMedia,
    onorientationchange,
    orientation,
    backgroundSize;

  /**
   * CSS3 detection
   * @class Css3
   * @static
   * @constructor
   */
  function Css3() {
    throw new Error('Css3 can\'t create instance.');
  }

  var p = Css3.prototype;
  p.constructor = Css3;

  /**
   * CSS3 transition detection
   *
   * @method transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Css3.transition = function() {
    var tagP;
    if ( typeof transition === 'undefined' ) {
      // transition undefined
      tagP = document.createElement('p').style;
      transition = 'transition' in tagP ||
        'WebkitTransition' in tagP ||
        'MozTransition' in tagP ||
        'msTransition' in tagP ||
        'OTransition' in tagP;
    }
    return transition;
  };
  /**
   * CSS3 transform detection
   *
   * @method transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Css3.transform = function() {
    var tagP;
    if (typeof transform === 'undefined') {
      // transform undefined
      tagP = document.createElement('p').style;
      transform = 'transform' in tagP ||
        'WebkitTransform' in tagP ||
        'MozTransform' in tagP ||
        'OTransform' in tagP ||
        'msTransform' in tagP;
    }
    return transform;
  };

  /**
   * matchMedia が使用可能かを調べます
   *
   * @method matchMedia
   * @static
   * @return {boolean} true: matchMedia が使用可能
   */
  Css3.matchMedia = function() {
    if (typeof matchMedia === 'undefined') {
      // matchMedia undefined
      matchMedia = typeof window.matchMedia === 'function';
    }
    return matchMedia;
  };
  /**
   * onorientationchange が使用可能かを調べます
   *
   * @method orientationChange
   * @static
   * @return {boolean} true: onorientationchange が使用可能
   */
  Css3.orientationChange = function() {
    if (typeof onorientationchange === 'undefined') {
      // onorientationchange undefined
      onorientationchange = 'onorientationchange' in window;
    }
    return onorientationchange;
  };
  /**
   * orientation が使用可能かを調べます
   *
   * @method orientation
   * @static
   * @return {boolean} true: orientation が使用可能
   */
  Css3.orientation = function() {
    if (typeof orientation === 'undefined') {
      // orientation undefined
      orientation = 'orientation' in window;
    }
    return orientation;
  };
  /**
   * backgroundSize が使用可能かを調べます
   *
   * @method backgroundSize
   * @static
   * @return {boolean} true: backgroundSize が使用可能
   */
  Css3.backgroundSize = function() {
    if (typeof backgroundSize === 'undefined') {
      // backgroundSize undefined
      backgroundSize = 'backgroundSize' in document.documentElement.style;
    }
    return backgroundSize;
  };
  
  Browser.Css3 = Css3;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:54
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * CSS3 transition 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transition
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;

  /**
   * @deprecated instead of Css3
   * @class Transition
   * @static
   * @constructor
   */
  function Transition() {
    throw new Error('Transition can\'t create instance.');
  }

  var p = Transition.prototype;
  p.constructor = Transition;
  /**
   * CSS3 transition 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Transition.is = function() {
    console.warn('[Transition] deprecated, instead use Css3');
    return Css3.transition();
  };
  Browser.Transition = Transition;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:57
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * CSS3 transform 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transform
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;
  /**
   * CSS3 transform 使用可能かを判定します
   * @deprecated instead of Css3
   * @class Transform
   * @static
   * @constructor
   */
  function Transform() {
    throw new Error('Transform can\'t create instance.');
  }

  var p = Transform.prototype;

  p.constructor = Transform;
  /**
   * CSS3 transform 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Transform.is = function() {
    console.warn('[Transform] deprecated, instead use Css3');
    return Css3.transform();
  };
  Browser.Transform = Transform;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/18 - 13:09
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Browser 毎の Element 機能を調べます
 *
 * @module Browser
 * @submodule Element
 * */
(function(window) {
  'use strict';
  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    touch,
    querySelector,
    canvas,
    webgl;

  /**
   * HTMLElement detection
   * @class Element
   * @static
   * @constructor
   */
  function Element() {
    throw new Error('Element can\'t create instance.');
  }

  var p = Element.prototype;
  p.constructor = Element;

  /**
   * touch event が使用可能かを調べます
   *
   * @method touch
   * @static
   * @return {boolean} true: touch event が使用可能
   */
  Element.touch = function() {
    if (typeof touch === 'undefined') {
      // touch undefined
      // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
      // http://stackoverflow.com/questions/2915833/how-to-check-browser-for-touchstart-support-using-js-jquery#answer-2915912
      touch = 'ontouchstart' in document.documentElement;
    }
    return touch;
  };

  /**
   * document.querySelector が使用可能かを調べます
   *
   * @method querySelector
   * @static
   * @return {boolean} true: querySelector が使用可能
   */
  Element.querySelector = function() {
    if (typeof querySelector === 'undefined') {
      // querySelector undefined
      querySelector = typeof document.querySelector !== 'undefined';
    }
    return querySelector;
  };

  /**
   * canvas 2D が使用可能かを調べます
   *
   * @method canvas
   * @static
   * @return {boolean} true: canvas 使用可能
   */
  Element.canvas = function() {
    if (typeof canvas === 'undefined') {
      // querySelector undefined
      canvas = !!window.CanvasRenderingContext2D;
    }
    return canvas;
  };

  /**
   * canvas WebGL が使用可能かを調べます
   *
   * @method webgl
   * @static
   * @return {boolean} true: webgl 使用可能
   */
  Element.webgl = function() {
    if (typeof webgl === 'undefined') {
      // webgl undefined
      webgl = Element.canvas();
      // canvas が使用可能時に webgl 機能を調べる
      if (webgl) {
        try {
          webgl = !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
        } catch(e) {
          webgl = false;
        }
      }
    }
    return webgl;
  };

  /**
   * querySelector が使えるブラウザだけ使用可能
   *
   * @method find
   * @static
   * @param {string} searchKey `querySelector` で使用するセレクター
   * @return {*} HTMLElement を返します
   */
  Element.find = function(searchKey) {
    var result;
    if (Element.querySelector()) {
      result = document.querySelector(searchKey);
    }
    return result;
  };

  Browser.Element = Element;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/02 - 20:40
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * HTMLElement へ class を追加・削除・存在確認を行います
 *
 * @module wakegi
 * @submodule Dom
 *
 * */

(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Patterns = wakegi.Patterns;

  /**
   * HTML Element style / class を操作します
   * @class Dom
   * @static
   * @constructor
   * @param {HTMLElement} element 操作対象 Element
   */
  function Dom(element) {
    /**
     * @property element
     * @type {HTMLElement}
     * @private
     */
    this.element = element;
  }
  // -------------------------------------------
  // STATIC METHOD
  // -------------------------------------------
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 調査する class name
   * @return {boolean} true: 存在する
   */
  Dom.hasClass = function(element, className) {
    if (element.classList && element.classList.contains) {
      return element.classList.contains(className);
    }
    // legacy
    // categoryX があって category で検索すると match するのまずい
    // return !!element.className.match( new RegExp( className, 'i' ) );
    // return !!element.className.match( new RegExp( '^' + className + '$', 'g' ) );
    // return !!element.className.match( new RegExp( '\\' + className + '\\w', 'g' ) );
    var
      elementClass = element.className,
      classes = elementClass.split(' ');

    return classes.indexOf(className) !== -1;
  };
  /**
   * css class を追加します
   * @method addClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 追加する class name
   * @return {boolean} true: 追加した
   */
  Dom.addClass = function(element, className) {
    // exist check
    if (Dom.hasClass(element, className)) {
      return false;
    }
    if (element.classList && element.classList.add) {
      element.classList.add(className);
      return true;
    }
    // legacy
    var
      names = element.className,
      space = '';

    if (names !== '') {
      // 既に class 設定されているので 1 space を付与する
      space = ' ';
    }

    names += space + className;
    names = names.split('  ').join(' ');
    element.className = names;

    return true;
  };
  /**
   * element から class を削除します
   * @method removeClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 削除対象 class name
   * @return {boolean} true: 削除した
   */
  Dom.removeClass = function( element, className ) {
    if (!Dom.hasClass(element, className)) {
      return false;
    }
    // modern
    if (element.classList && element.classList.remove) {
      element.classList.remove(className);
      return true;
    }
    // legacy
    var
      result = false,
      names,
      elementClass,
      classes,
      i, limit,
      currentClass;

    // @type {string}
    elementClass = element.className;
    // @type {array<string>}
    classes = elementClass.split(' ');
    for (i = 0, limit = classes.length; i < limit; i = (i + 1) | 0) {
      currentClass = classes[i];
      if (!currentClass) {
        continue;
      }
      if (currentClass === className) {
        result = true;
        classes[i] = 'XXX_XXX_XXX';
      }
    }
    // XXX_XXX_XXX を削除して 2 spaces を 1 space へ
    names = classes.join(' ').replace('XXX_XXX_XXX', '').split('  ').join(' ');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    // remove, start / last white space
    names = names.trim();
    element.className = names;
    return result;
  };
  /**
   * getComputedStyle を使い HTMLElement style value を取得します
   * @method styleCompute
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {CSSStyleDeclaration|*|String}
   *    styleProp が null or undefined or "" の時は CSSStyleDeclaration Object<br>
   *    指定されている時は CSS 設定値(string)を返します
   */
  Dom.styleCompute = function(defaultView, el, styleProp) {
    var
      style = defaultView.getComputedStyle(el, null);

    if (!!styleProp) {
      styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
      return style.getPropertyValue( styleProp );
    }
    return style;
  };
  /**
   * currentStyle を使い HTMLElement style value を取得します
   * @method styleCurrent
   * @static
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement style value を返します
   */
  Dom.styleCurrent = function(el, styleProp) {
    var
      style = el.currentStyle,
      value;

    if (!!styleProp) {
      // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/-(\w)/g, function(str, letter) {
        return letter.toUpperCase();
      });

      value = style[styleProp];

      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        // return (function() {
        //   var
        //     oldLeft = el.style.left,
        //     oldRsLeft = el.runtimeStyle.left;
        //
        //   el.runtimeStyle.left = el.currentStyle.left;
        //   el.style.left = value || 0;
        //   value = el.style.pixelLeft + 'px';
        //   el.style.left = oldLeft;
        //   el.runtimeStyle.left = oldRsLeft;
        //
        //   return value;
        // })();
        return Dom.styleValue(el, value);
      }
      return value;
    }
    return style;
  };
  /**
   * HTMLElement style value を取得します
   * @param {HTMLElement} el 調査対象 Element
   * @param {*} value CSS 値
   * @return {string|*} HTMLElement style value を返します
   */
  Dom.styleValue = function(el, value) {
    var
      oldLeft = el.style.left,
      oldRsLeft = el.runtimeStyle.left;

    el.runtimeStyle.left = el.currentStyle.left;
    el.style.left = value || 0;
    value = el.style.pixelLeft + 'px';
    el.style.left = oldLeft;
    el.runtimeStyle.left = oldRsLeft;

    return value;
  };

  /**
   * CSS 値を取得します
   * @method shortHand
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {Array} patterns [string, ...]
   * @return {string} CSS 値を返します
   */
  Dom.shortHand = function(defaultView, el, patterns) {
    var
      top = Dom.styleCompute(defaultView, el, patterns[0]),
      right = Dom.styleCompute(defaultView, el, patterns[1]),
      bottom = Dom.styleCompute(defaultView, el, patterns[2]),
      left = Dom.styleCompute(defaultView, el, patterns[3]),
      result = '';

    if (top === bottom) {
      if (right === left) {
        if (top === right) {
          result = top;
        } else {
          result = top + ' ' + right;
        }
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    } else {
      if (right === left) {
        result = top + ' ' + right + ' ' + bottom;
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    }
    return result;
  };
  /**
   * HTMLElement の css style を取得します
   *
   * @TODO: background していない時の background-color が rgb(0, 0, 0) になるのを解決する
   * @method getStyle
   * @static
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement の css style を返します
   */
  Dom.getStyle = function(el, styleProp) {
    var
      ownerDocument = el.ownerDocument,
      defaultView,
      result;

    if (!!ownerDocument) {
      defaultView = ownerDocument.defaultView;
    }

    if (!!defaultView && !!defaultView.getComputedStyle) {
      result = Dom.styleCompute(defaultView, el, styleProp);

      // Firefox, shorthand css property が常に空になる
      // 再計算を行う
      if (result === '' && !!styleProp && Patterns.has(styleProp)) {
        result = Dom.shortHand(defaultView, el, Patterns.get(styleProp));
      }
    } else if (!!el.currentStyle) {
      result = Dom.styleCurrent(el, styleProp);
    }
    return result;
  };
  // -------------------------------------------
  // METHOD
  // -------------------------------------------
  var p = Dom.prototype;
  p.constructor = Dom;

  // /**
  //  * 使用 Element を返します
  //  * @method element
  //  * @return {HTMLElement}
  //  */
  // p.element = function() {
  //   return this.element;
  // };
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @param {string} className 調査する class name
   * @return {boolean} true CSS class が存在する
   */
  p.hasClass = function(className) {
    return Dom.hasClass(this.element, className);
  };
  /**
   * @method addClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return Dom.addClass(this.element, className);
  };
  /**
   * @method removeClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function( className ) {
    return Dom.removeClass(this.element, className);
  };
  /**
   * element の 指定 css property 値を取得します
   * @method style
   * @param {string} [styleProp=''] css property name
   * @return {*} CSS 値
   */
  p.style = function(styleProp) {
    return Dom.getStyle(this.element, styleProp);
  };
  wakegi.Dom = Dom;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 19:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */
/**
 * data-xxx を key, value に分解します
 *
 * @module wakegi
 * @submodule Dataset
 */
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Util = wakegi.Util;

  /**
   * tag の data属性を key: value 形式に分解します
   * @class Dataset
   * @static
   * @constructor
   */
  function Dataset() {}

  var p = Dataset.prototype;
  p.constructor = Dataset;

  /**
   * 引数 element(HTMLElement) の data属性を object にして返す
   * @method parse
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.parse = function( element ) {
    // if (typeof element.dataset !== 'undefined') {
    //   // dataset property が存在するモダンブラウザの処理
    //   return Dataset.modern(element);
    // } else {
    //   // レガシーブラウザ処理
    //   return Dataset.legacy(element);
    // }
    return element.dataset ? Dataset.modern(element) : Dataset.legacy(element);
  };

  /**
   * dataset を取得し key: value Object にします: モダンブラウザ
   * @method modern
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.modern = function(element) {
    var
      data = element.dataset,
      found = false,
      results = {},
      key, value,
      keyName;
    // eslint-disable-next-line guard-for-in
    for (key in data) {
      keyName = '';
      value = '';

      // Android 2.3 under, dataset object の hasOwnProperty が String型, バカでしょー
      // hasOwnProperty が使えない, function check
      if (typeof data.hasOwnProperty === 'function') {
        if (data.hasOwnProperty(key)) {
          value = data[key];
          keyName = key;
        }
      } else {
        value = data[key];
        keyName = key;
      }
      // keyName exist check
      if (keyName) {
        found = true;
        results[keyName] = value;
      }
    }
    return found ? results : null;
  };

  /**
   * dataset を取得し key: value Object にします: レガシーブラウザ
   * @method legacy
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.legacy = function(element) {
    var
      data = element.attributes,
      found = false,
      results = {},
      i, limit, attribute, nodeName, dataKey;

    for (i = 0, limit = data.length; i < limit; i = (i + 1) | 0) {
      attribute = data[ i ];
      nodeName = attribute.nodeName.toLowerCase();

      if (nodeName.indexOf('data-') !== -1) {
        dataKey = nodeName.replace('data-', '');
        dataKey = Util.camelize( dataKey );
        found = true;
        results[dataKey] = attribute.nodeValue.toLowerCase();
      }
    }// for
    return found ? results : null;
  };
  wakegi.Dataset = Dataset;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:05
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Windows OS チェックを行います
 *
 * @module Browser
 * @submodule Windows
 */
( function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    phone,
    windows;

  /**
   * windows OS detection
   *
   * @class Windows
   * @static
   * @constructor
   */
  function Windows() {
    throw new Error('Windows can\'t create instance.');
  }

  var p = Windows.prototype;
  p.constructor = Windows;

  /**
   * @method init
   * @static
   */
  Windows.init = function() {
    var ua;

    if (typeof windows === 'undefined') {
      // windows undefined
      ua = Browser.ua();
      windows = !!ua.match(/windows/i);

      if (windows) {
        // 2015-10 windows phone detect added
        // https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx
        // Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>
        phone = !!ua.match(/windows phone/i);
      } else {
        phone = false;
      }
    }
  };
  /**
   * Windows OS 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Windows OS
   */
  Windows.is = function() {
    Windows.init();
    return windows;
  };
  /**
   * Windows phone 判定を行います
   * @method phone
   * @static
   * @return {boolean} true: Windows phone
   */
  Windows.phone = function() {
    Windows.init();
    return phone;
  };
  Browser.Windows = Windows;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 19:34
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * iOS バージョンチェック他を行います
 *
 * @module Browser
 * @submodule iOS
 */

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1, -1],
    ios,
    iphone,
    ipod,
    ipad,
    webView,
    version, major, build;

  /**
   * iOS detection
   * @class iOS
   * @static
   * @constructor
   */
  function iOS() {
    throw new Error('iOS can\'t create instance.');
  }

  var p = iOS.prototype;
  p.constructor = iOS;

  /**
   * iOS 判定を行います
   * @method init
   * @static
   */
  iOS.init = function() {
    var ua;

    if (typeof ios === 'undefined') {
      // need initialize
      ua = Browser.ua();

      ipad = !!ua.match(/ipad/i);
      ipod = !!ua.match(/ipod/i);
      iphone = !!ua.match(/iphone/i) && !ipad && !ipod;

      ios = ipad || ipod || iphone;

      // アプリ内コンテンツ
      webView = ios && !iOS.standalone() && !Browser.matchSafari();
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  iOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (iOS.is()) {
        nums = Browser.app().match(/OS (\d+)_(\d+)_?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[ i ];

            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2]);
        }// Array
      }// iOS
    }// undefined
  };
  /**
   * iOS 判定
   * @method is
   * @static
   * @return {boolean} true: iOS
   */
  iOS.is = function() {
    iOS.init();
    return ios;
  };
  /**
   * iPhone 判定
   * @method iPhone
   * @static
   * @return {boolean} true: iPhone
   */
  iOS.iPhone = function() {
    iOS.init();
    return iphone;
  };
  /**
   * iPad 判定
   * @method iPad
   * @static
   * @return {boolean} true: iPad
   */
  iOS.iPad = function() {
    iOS.init();
    return ipad;
  };
  /**
   * iPod 判定します
   * @method iPod
   * @static
   * @return {boolean} true: iPod
   */
  iOS.iPod = function() {
    iOS.init();
    return ipod;
  };
  /**
   * standalone で表示しているかを判定します
   * @method standalone
   * @static
   * @return {boolean} true: standalone で表示
   */
  iOS.standalone = function() {
    var navigator = Browser.navigator();
    return !!navigator.standalone ? navigator.standalone : false;
  };

  /**
   * standalone で表示しているかを判定します
   * @method fullScreen
   * @deprecated instead of iOS.standalone
   * @static
   * @return {boolean} true: standalone で表示
   */
  iOS.fullScreen = function() {
    return iOS.standalone();
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  iOS.version = function() {
    iOS.calculate();
    return version;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN 型（文字）で返します
   */
  iOS.build = function() {
    iOS.calculate();
    return build;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  iOS.major = function() {
    iOS.calculate();
    return major;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  iOS.numbers = function() {
    iOS.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Safari.numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  iOS.number = function() {
    // 互換のために残します
    return iOS.numbers();
  };
  /**
   * アプリ内ブラウザかどうかを返します
   * **注意** アプリ内ブラウザ(webView)は UA 偽装可能
   * @method webView
   * @static
   * @return {boolean} true: アプリ内ブラウザ
   */
  iOS.webView = function() {
    iOS.init();
    return webView;
  };

  Browser.iOS = iOS;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:00
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Mac OS チェックを行います
 *
 * @module Browser
 * @submodule Mac
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    iOS = Browser.iOS,
    mac;

  /**
   * Mac OS detection
   * @class Mac
   * @static
   * @constructor
   */
  function Mac() {
    throw new Error('Mac can\'t create instance.');
  }
  var p = Mac.prototype;
  p.constructor = Mac;
  /**
   * @method init
   * @static
   */
  Mac.init = function() {
    if (typeof mac === 'undefined') {
      // mac undefined
      mac = !iOS.is() && !!Browser.ua().match(/mac os x/i);
    }
  };
  /**
   * Mac OS 判定します
   * @method is
   * @static
   * @return {boolean} true Mac OS
   */
  Mac.is = function() {
    Mac.init();
    return mac;
  };
  Browser.Mac = Mac;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 21:16
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Android のバージョンチェック他を行います
 *
 * @module Browser
 * @submodule Android
 */

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    Windows = Browser.Windows,
    mathMax = Math.max,
    numbers = [-1, -1, -1],
    standard,
    android,
    phone,
    tablet,
    hd,
    version, major, build;

  /**
   * Android detection
   * @static
   * @class Android
   * @constructor
   */
  function Android() {
    throw new Error('Android can\'t create instance.');
  }

  var p = Android.prototype;
  p.constructor = Android;

  /**
   * Android 判定を行います
   * @method init
   * @static
   */
  Android.init = function() {
    var ua, max;

    if (typeof android === 'undefined') {
      // need initialize
      ua = Browser.ua();

      android = !!ua.match(/android/i);
      phone = false;
      tablet = false;
      standard = false;
      hd = false;

      if (Windows.phone()) {
        android = false;
      } else if (android) {
        max = mathMax(window.innerWidth, window.innerHeight);
        hd = max >= 1024;
        // http://googlewebmastercentral.blogspot.jp/2011/03/mo-better-to-also-detect-mobile-user.html
        // Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
        // Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

        // 2015-10 windows phone detect added
        // https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx
        // Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>

        // ua に mobile があり windows phone がない時 Android phone
        phone = !!ua.match(/mobile/i);
        if (!phone) {
          tablet = true;
        }// phone
        // Android 標準ブラウザ
        standard = Browser.matchSafari() && ( !!ua.match(/version/i) || !!ua.match(/samsungbrowser/i) );
      }// android
    }// undefined
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Android.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Android.is()) {
        nums = Browser.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/);

        if ( Array.isArray( nums ) ) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[i];

            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2]);
        }// Array
      }// Android
    }// undefined
  };
  /**
   * Android 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Android
   */
  Android.is = function() {
    Android.init();
    return android;
  };
  /**
   * Android 標準ブラウザ
   * @method standard
   * @static
   * @return {boolean} true: Android 標準ブラウザ
   */
  Android.standard = function() {
    Android.init();
    return standard;
  };
  /**
   * Android Phone
   * @method phone
   * @static
   * @return {boolean} true: Android phone
   */
  Android.phone = function() {
    Android.init();
    return phone;
  };
  /**
   * Android Tablet
   * @method tablet
   * @static
   * @return {boolean} true: Android tablet
   */
  Android.tablet = function() {
    Android.init();
    return tablet;
  };
  /**
   * Android HD 端末
   * @method hd
   * @static
   * @return {boolean} true: Android HD
   */
  Android.hd = function() {
    Android.init();
    return hd;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Android.version = function() {
    Android.calculate();
    return version;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN 型（文字）で返します
   */
  Android.build = function() {
    Android.calculate();
    return build;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Android.major = function() {
    Android.calculate();
    return major;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Android.numbers = function() {
    Android.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Android.numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Android.number = function() {
    // 互換のために残します
    return Android.numbers();
  };
  /**
   * window width / height を取得します
   * @method rect
   * @static
   * @return {{width: Number, height: Number}} width / height を Object 形式で返します
   */
  Android.rect = function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
  Browser.Android = Android;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:16
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * touch event が利用可能かを調べます
 *
 * @module Browser
 * @submodule Touch
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Element = Browser.Element;
  /**
   * touch event が利用可能かを調べます
   * @class Touch
   * @static
   * @deprecated instead of Element
   * @constructor
   */
  function Touch() {
    throw new Error('Touch can\'t create instance.');
  }

  var p = Touch.prototype;
  p.constructor = Touch;

  /**
   * touch event が利用可能かを調べます
   * @method is
   * @deprecated instead of Element.touch
   * @static
   * @return {boolean} true: touch event が利用可能
   */
  Touch.is = function() {
    console.warn('[Touch] deprecated, instead use Element');
    return Element.touch();
  };
  Browser.Touch = Touch;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:29
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * mobile (phone, tablet) チェックを行います
 *
 * @module Browser
 * @submodule Mobile
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    iOS = Browser.iOS,
    Android = Browser.Android,
    Windows = Browser.Windows;

  /**
   * Mobile detection, iOS or Android
   * @class Mobile
   * @static
   * @constructor
   */
  function Mobile() {
    throw new Error('Mobile can\'t create instance.');
  }

  var p = Mobile.prototype;
  p.constructor = Mobile;

  /**
   * iOS / Android / Windows phone 判定
   * @method is
   * @static
   * @return {boolean} true: iOS / Android / Windows phone
   */
  Mobile.is = function() {
    return iOS.is() || Android.is() || Windows.phone();
  };
  /**
   * スマホ・iPod touch 判定を行います
   * @method phone
   * @static
   * @return {boolean} true: スマホ・iPod touch
   */
  Mobile.phone = function() {
    return iOS.iPhone() || iOS.iPod() || Android.phone() || Windows.phone();
  };
  /**
   * tablet 判定を行います
   * @method tablet
   * @static
   * @return {boolean} true: tablet
   */
  Mobile.tablet = function() {
    return iOS.iPad() || Android.tablet();
  };
  /**
   * 強制的にスクロールさせ URL bar を非表示（のように）します
   *
   * **注意** window.onload 後に実行して下さい
   *
   * iOS 9 以降では実行しても無駄（有効動作しません）です
   * @method hideBar
   * @static
   * @return {number} timer id を返します
   */
  Mobile.hideBar = function() {
    return setTimeout(function() {
      scrollBy(0, 1);
    }, 0);
  };
  /**
   * 強制的にスクロールさせ URL bar を非表示（のように）します
   * @deprecated instead of Mobile.hideBar
   * @method hideURLBar
   * @static
   * @return {number} timer id を返します
   */
  Mobile.hideURLBar = function() {
    return Mobile.hideBar();
  };
  Browser.Mobile = Mobile;
}(window));

/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * author (at)taikiken / http://inazumatv.com
 * date 2015/11/18 - 14:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* jslint -W016 */
/**
 * iOS Firefox チェックを行います
 *
 * @module Browser
 * @submodule FxiOS
 */
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1],
    fxi, version, major, build;

  /**
   * @class FxiOS
   * @static
   * @constructor
   */
  function FxiOS() {
    throw new Error('FxiOS can\'t create instance.');
  }

  var p = FxiOS.prototype;
  p.constructor = FxiOS;

  /**
   * iOS Firefox 判定を行います
   * @method init
   * @static
   */
  FxiOS.init = function() {
    if ( typeof fxi === 'undefined' ) {
      // need initialize
      // check userAgent
      fxi = !!Browser.ua().match(/fxios/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  FxiOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (FxiOS.is()) {
        // firefox os
        nums = Browser.ua().match(/FxiOS\/(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float(versions[0] + '.' + versions[1]);
          numbers = versions;
        }
      }
    }
  };

  /**
   * iOS Firefox 判定を行います
   * @method is
   * @static
   * @return {boolean} true: iOS Firefox
   */
  FxiOS.is = function() {
    FxiOS.init();
    return fxi;
  };

  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  FxiOS.version = function() {
    FxiOS.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  FxiOS.major = function() {
    FxiOS.calculate();
    return major;
  };

  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  FxiOS.build = function() {
    FxiOS.calculate();
    return build;
  };

  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  FxiOS.numbers = function() {
    FxiOS.calculate();
    return numbers;
  };

  Browser.FxiOS = FxiOS;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/07/30 - 17:59
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Windows 10 ~ Edge Browser チェックを行います
 *
 * @module Browser
 * @submodule Edge
 */

( function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    edge,
    numbers = [-1, -1],
    version, major, build;

  /**
   * Windows 10 Edge Browser チェックを行います
   *
   * @class Edge
   * @static
   * @constructor
   */
  function Edge() {
    throw new Error('Edge can\'t create instance.');
  }

  var p = Edge.prototype;
  p.constructor = Edge;

  /**
   * edge 判定を行います
   * @method init
   * @static
   */
  Edge.init = function() {
    if (typeof edge === 'undefined') {
      edge = !!Browser.ua().match(/edge/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Edge.calculate = function() {

    var
      versions = [],
      nums, int, float, i, limit;

    if ( typeof version === 'undefined' ) {

      build = '';
      version = -1;
      major = -1;

      if (Edge.is()) {
        nums = Browser.ua().match(/edge\/(\d+)\.?(\d+)?/i);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          // 先頭削除 Edge/12.n
          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float( versions[0] + '.' + versions[1 ] );
          numbers = versions;
        }
      }
    }
  };

  /**
   * edge 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Edge
   */
  Edge.is = function() {
    Edge.init();
    return edge;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Edge.version = function() {
    Edge.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Edge.major = function() {
    Edge.calculate();
    return major;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN 型（文字）で返します
   */
  Edge.build = function() {
    Edge.calculate();
    return build;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {[]} [major: int, minor: int] 形式で返します
   */
  Edge.numbers = function() {
    Edge.calculate();
    return numbers;
  };

  Browser.Edge = Edge;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 14:16
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * IE チェックを行います
 *
 * @module Browser
 * @submodule IE
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    ie6, ie7, ie8, ie9, ie10, ie11, ie, version;

  /**
   * IE detection
   * @class IE
   * @static
   * @constructor
   */
  function IE() {
    throw new Error('IE can\'t create instance.');
  }

  var p = IE.prototype;
  p.constructor = IE;

  /**
   * IE 判定を行います
   * @method init
   * @static
   */
  IE.init = function() {
    var ua;

    if (
      typeof ie === 'undefined' ||
      typeof ie6 === 'undefined' ||
      typeof ie7 === 'undefined' ||
      typeof ie8 === 'undefined' ||
      typeof ie9 === 'undefined' ||
      typeof ie10 === 'undefined' ||
      typeof ie11 === 'undefined'
    ) {
      // need initialize
      ua = Browser.ua();

      ie6 = false;
      ie7 = false;
      ie8 = false;
      ie9 = false;
      ie10 = false;
      ie11 = false;

      ie = !!ua.match(/msie/i);

      if (ie) {
        ie10 = !!ua.match(/msie [10]/i);
        if (!ie10) {
          ie9 = !!ua.match(/msie [9]/i);
          if (!ie9) {
            ie8 = !!ua.match(/msie [8]/i);
            if (!ie8) {
              ie7 = !!ua.match(/msie [7]/i);
              if (!ie7) {
                ie6 = !!ua.match(/msie [6]/i);
              }// ie7
            }// ie8
          }// ie9
        }// ie10
      } else {
        // not /msie/
        ie11 = !!ua.match(/trident\/[7]/i) && !!ua.match(/rv:[11]/i);
        ie = ie11;
      }
    }
  };
  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  IE.calculate = function() {
    IE.init();

    if (typeof version === 'undefined') {
      // version undefined
      version = -1;

      if ( IE.is() ) {
        // IE
        if (ie11) {
          version = 11;
        } else if (ie10) {
          version = 10;
        } else if (ie9) {
          version = 9;
        } else if (ie8) {
          version = 8;
        } else if (ie7) {
          version = 7;
        } else if (ie6) {
          version = 6;
        }
      }// IE
    }// undefined
  };
  /**
   * IE 判定
   * @method is
   * @static
   * @return {boolean} true: IE
   */
  IE.is = function() {
    IE.init();
    return ie;
  };
  /**
   * IE 6判定
   * @method is6
   * @static
   * @return {boolean} true: IE 6
   */
  IE.is6 = function() {
    IE.init();
    return ie6;
  };
  /**
   * IE 7判定
   * @method is7
   * @static
   * @return {boolean} true: IE 7
   */
  IE.is7 = function() {
    IE.init();
    return ie7;
  };
  /**
   * IE 8判定
   * @method is8
   * @static
   * @return {boolean} true: IE 8
   */
  IE.is8 = function() {
    IE.init();
    return ie8;
  };
  /**
   * IE 9判定
   * @method is9
   * @static
   * @return {boolean} true: IE 9
   */
  IE.is9 = function() {
    IE.init();
    return ie9;
  };
  /**
   * IE 10判定
   * @method is10
   * @static
   * @return {boolean} true: IE 10
   */
  IE.is10 = function() {
    IE.init();
    return ie10;
  };
  /**
   * IE 11判定
   * @method is11
   * @static
   * @return {boolean} true: IE11
   */
  IE.is11 = function() {
    IE.init();
    return ie11;
  };
  /**
   * version float型
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  IE.version = function() {
    IE.calculate();
    return version;
  };
  /**
   * version 正数
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  IE.major = function() {
    return parseInt(IE.version(), 10);
  };
  /**
   * IE 8 or 7 or 6 判定
   * @method legacy
   * @static
   * @return {boolean} true: IE 6 | 7 | 8
   */
  IE.legacy = function() {
    IE.init();
    return ie6 || ie7 || ie8;
  };
  Browser.IE = IE;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 14:43
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * iOS Chrome
 *
 *
 */

/**
 * iOS Chrome チェックを行います
 *
 * @module Browser
 * @submodule CriOS
 */
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [ -1, -1, -1, -1 ],
    crios, version, major, build;

  /**
   * iOS Chrome 判定
   *
   * @class CriOS
   * @static
   * @constructor
   */
  function CriOS() {
    throw new Error('CriOS can\'t create instance.');
  }

  var p = CriOS.prototype;
  p.constructor = CriOS;

  /**
   * @method init
   * @static
   */
  CriOS.init = function() {
    if (typeof crios === 'undefined') {
      crios = !!Browser.ua().match(/crios/i);
    }
  };

  /**
   * @method calculate
   * @static
   */
  CriOS.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (CriOS.is()) {
        nums = Browser.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          numbers = versions;
          version = float(versions[0] + '.' + versions[1] + versions[2] + versions[3]);
        }
      }// crios
    }// undefined
  };
  /**
   * iOS Chrome 判定を行います
   * @method is
   * @static
   * @return {boolean} true: iOS Chrome
   */
  CriOS.is = function() {
    CriOS.init();
    return crios;
  };

  /**
   * version float 形式で取得します
   * @method version
   * @static
   * @return {float} N.NNN で返します
   */
  CriOS.version = function() {
    CriOS.calculate();
    return version;
  };
  /**
   * version: build No. を含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  CriOS.build = function() {
    CriOS.calculate();
    return build;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version major を返します
   */
  CriOS.major = function() {
    CriOS.calculate();
    return major;
  };
  /**
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  CriOS.numbers = function() {
    CriOS.calculate();
    return numbers;
  };
  
  Browser.CriOS = CriOS;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 17:32
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Chrome チェックを行います
 *
 * @module Browser
 * @submodule Chrome
 */

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    
    CriOS = Browser.CriOS,
    Android = Browser.Android,
    Edge = Browser.Edge,
    numbers = [ -1, -1, -1, -1 ],
    crios,
    edge,
    chrome, version, major, build;

  /**
   * Chrome 判定
   *
   * iOS Chrome も含まれます
   *
   * @class Chrome
   * @static
   * @constructor
   */
  function Chrome() {
    throw new Error('Chrome can\'t create instance.');
  }

  var p = Chrome.prototype;
  p.constructor = Chrome;

  /**
   * @method init
   * @static
   */
  Chrome.init = function() {
    if (typeof chrome === 'undefined') {
      // need initialize
      crios = CriOS.is();
      edge = Edge.is();
      chrome = false;

      if (!edge) {
        if (crios) {
          // iOS Chrome
          chrome = true;
        } else if (!Android.standard()) {
          // check userAgent
          chrome = !!Browser.ua().match(/chrome/i);
        }
      }
    }
  };

  /**
   * @method calculate
   * @static
   */
  Chrome.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Chrome.is()) {
        // Chrome

        if (!crios) {
          // not CriOS
          nums = Browser.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);

          if (Array.isArray(nums)) {
            // 結果が配列
            int = wakegi.int;
            float = wakegi.float;

            for (i = 1, limit = nums.length; i < limit; i = ( i + 1 ) | 0 ) {
              versions.push( int(nums[i], 10));
            }

            build = versions.join('.');
            major = versions[0];
            numbers = versions;
            version = float(versions[0] + '.' + versions[1] + versions[2] + versions[3]);
          }// Array
        } else {
          // CriOS からコピー
          build = CriOS.build();
          major = CriOS.major();
          numbers = CriOS.numbers();
          version = CriOS.version();
        }
      }// chrome
    }// undefined
  };

  /**
   * Chrome 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Chrome
   */
  Chrome.is = function() {
    Chrome.init();
    return chrome;
  };

  /**
   * version N.NNN を取得します
   * @method version
   * @static
   * @return {float} N.NNN で返します
   */
  Chrome.version = function() {
    Chrome.calculate();
    return version;
  };

  /**
   * version: build type を含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Chrome.build = function() {
    Chrome.calculate();
    return build;
  };
  /**
   * version NN を取得します
   * @method major
   * @static
   * @return {int} version NN を返します
   */
  Chrome.major = function() {
    Chrome.calculate();
    return major;
  };
  /**
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Chrome.numbers = function() {
    Chrome.calculate();
    return numbers;
  };

  Browser.Chrome = Chrome;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 18:29
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Firefox チェックを行います
 *
 * @module Browser
 * @submodule Firefox
 */

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    numbers = [-1, -1],
    firefox, version, major, build;

  /**
   * Firefox detection
   * @class Firefox
   * @static
   * @constructor
   */
  function Firefox() {
    throw new Error('Firefox can\'t create instance.');
  }

  var p = Firefox.prototype;
  p.constructor = Firefox;

  /**
   * Firefox 判定を行います
   * @method init
   * @static
   */
  Firefox.init = function() {
    if (typeof firefox === 'undefined') {
      // need initialize
      // check userAgent
      firefox = !!Browser.ua().match(/firefox/i);
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Firefox.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit;

    if ( typeof version === 'undefined' ) {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Firefox.is()) {
        // firefox
        nums = Browser.ua().match(/Firefox\/(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            versions.push(int(nums[i], 10));
          }

          build = versions.join('.');
          major = versions[0];
          version = float(versions[0] + '.' + versions[1]);
          numbers = versions;
        }
      }// firefox
    }// undefined
  };

  /**
   * Firefox 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Firefox
   */
  Firefox.is = function() {
    Firefox.init();
    return firefox;
  };

  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Firefox.version = function() {
    Firefox.calculate();
    return version;
  };

  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Firefox.major = function() {
    Firefox.calculate();
    return major;
  };

  /**
   *  version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Firefox.build = function() {
    Firefox.calculate();
    return build;
  };

  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Firefox.numbers = function() {
    Firefox.calculate();
    return numbers;
  };

  Browser.Firefox = Firefox;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 18:06
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 *
 */

/**
 * Safari チェックを行います
 *
 * @module Browser
 * @submodule Safari
 */

(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    CriOS = Browser.CriOS,
    Chrome = Browser.Chrome,
    Android = Browser.Android,
    FxiOS = Browser.FxiOS,
    Edge = Browser.Edge,
    numbers = [-1, -1, -1],
    crios, chrome, edge, fxios,
    safari, version, major, build;

  /**
   * Safari detection
   * @class Safari
   * @static
   * @constructor
   */
  function Safari() {
    throw new Error('Safari can\'t create instance.');
  }

  var p = Safari.prototype;
  p.constructor = Safari;

  /**
   * Safari 判定を行います
   *
   * Chrome, Edge, iOS Chrome, iOS Firefox の UA が近似しているので比較し判定します
   * @method init
   * @static
   */
  Safari.init = function() {
    if (typeof safari === 'undefined') {
      // need initialize
      crios = CriOS.is();
      chrome = Chrome.is();
      edge = Edge.is();
      fxios = FxiOS.is();

      if (crios || chrome || edge || Android.standard() || fxios) {
        // Chrome(iOS, Android), Android standard
        safari = false;
      } else {
        // check userAgent
        safari = Browser.matchSafari();
      }
    }
  };

  /**
   * version No. を計算します
   * @method calculate
   * @static
   */
  Safari.calculate = function() {
    var
      versions = [],
      nums, int, float, i, limit, num;

    if (typeof version === 'undefined') {
      // version undefined
      build = '';
      version = -1;
      major = -1;

      if (Safari.is()) {
        // Safari
        nums = Browser.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);

        if (Array.isArray(nums)) {
          // 結果が配列
          int = wakegi.int;
          float = wakegi.float;

          for (i = 1, limit = nums.length; i < limit; i = (i + 1) | 0) {
            num = nums[ i ];
            if (typeof num !== 'undefined') {
              // num defined
              versions.push(int(num, 10));
            } else {
              versions.push(0);
            }
          }
          build = versions.join('.');
          version = float( versions[0] + '.' + versions[1] + versions[2] );
          major = versions[0];
          numbers = versions;
        }// Array
      }// safari
    }// undefined
  };
  /**
   * Safari 判定を行います
   * @method is
   * @static
   * @return {boolean} true: Safari
   */
  Safari.is = function() {
    Safari.init();
    return safari;
  };
  /**
   * Safari 判定値を設定します
   * @method set
   * @static
   * @param {boolean} bool 判定フラッグ
   * @return {boolean} 設置値を返します
   */
  Safari.set = function(bool) {
    Safari.init();
    safari = bool;
    return bool;
  };
  /**
   * version: float型で取得します
   * @method version
   * @static
   * @return {float} N.NN で返します
   */
  Safari.version = function() {
    Safari.calculate();
    return version;
  };
  /**
   * version: major を取得します
   * @method major
   * @static
   * @return {int} version: major を返します
   */
  Safari.major = function() {
    Safari.calculate();
    return major;
  };
  /**
   * version: build ナンバーを含み取得します
   * @method build
   * @static
   * @return {string} NN.NN.NN.NN 型（文字）で返します
   */
  Safari.build = function() {
    Safari.calculate();
    return build;
  };
  /**
   * version を配列形式で取得します
   * @method numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Safari.numbers = function() {
    Safari.calculate();
    return numbers;
  };
  /**
   * version を配列形式で取得します
   * @method number
   * @deprecated instead of Safari.numbers
   * @static
   * @return {Array<number>} [major: int, minor: int, build: int] 形式で返します
   */
  Safari.number = function() {
    // 互換のために残します
    return Safari.numbers();
  };

  Browser.Safari = Safari;
}(window));

/**
 * Copyright (c) 2011-2021 inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * @license MIT
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Sagen
 * version 0.5.3
 * build 2021-1-8 17:38:57
 * github: https://github.com/taikiken/sagen.js
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 */

/**
 * ## Browser detect helper
 *
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします<br>
 *
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-browser="true">
 *      </script>
 *
 *
 *      // html へ class を追加した例
 *      // OS X Chrome
 *
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 *
 *      // Browser / 端末判定にも使えます
 *
 *      if ( Sagen.Browser.iOS.is() ) {
 *        // iOS
 *      }
 *
 *
 *      // orientation 監視にも使えます(iOS, Android)
 *      var Orientation = Sagen.Orientation;
 *
 *
 *      Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {
 *
 *        var direction = event.direction;
 *
 *        if ( direction === 'portrait' ) {
 *          // portrait
 *        }
 *
 *        if ( direction === 'landscape' ) {
 *          // landscape
 *        }
 *
 *      } );
 *
 *      Orientation.listen();
 *
 * @module Sagen
 * @type {{}}
 *
 * */
var Sagen = window.Sagen || {};

(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,
    dataSet = {},
    flag = false,
    selector = 'sagen';

  // copy Class
  /**
   * wakegi.Browser
   * @class Browser
   * @type {wakegi.Browser}
   */
  Sagen.Browser = wakegi.Browser;
  /**
   * wakegi.Dom
   * @class Dom
   * @type {wakegi.Dom}
   */
  Sagen.Dom = wakegi.Dom;
  /**
   * Gasane.EventDispatcher
   * @class EventDispatcher
   * @type {Gasane.EventDispatcher}
   */
  Sagen.EventDispatcher = Gasane.EventDispatcher;
  /**
   * script#sagen data 属性を捜査しオプションフラッグを調べます
   * @method init
   * @param {string} id - script tag selector id - default `sagen`
   * @static
   * @private
   * @returns {*} Object を保障します
   */
  function init(id) {
    var
      element = document.getElementById(id),
      // element = document.getElementById('sagen'),
      data,
      results,
      key,
      val;
    if (!element) {
      return {};
    }
    data = wakegi.Dataset.parse(element);
    if (!data) {
      return {};
    }
    results = {};
    // loop
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        val = data[key].toLowerCase();
        results[key] = val === 'true';
      }
    }
    return results;
  }

  /**
   * data option が存在するかを調べます
   * @method check
   * @private
   * @static
   * @param {object} data data 属性パース済み object
   * @return {boolean} true: data 属性あり
   */
  function check(data) {
    var result;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        result = data[key];
        if (result) {
          break;
        }
      }
    }
    return result;
  }
  // 初期処理を行います
  dataSet = init(selector);
  flag = check(dataSet);

  /**
   * data 属性オプション を調べます
   * @method dataSet
   * @static
   * @for Sagen
   * @param {string} type data key 名称 `data-xxx` `xxx` 部分
   * @return {boolean} オプション有無
   */
  Sagen.dataSet = function(type) {
    return !!dataSet[type];
  };
  /**
   * data 属性オプションが存在するかを調べます
   * @method flag
   * @static
   * @return {boolean} true: 存在します
   */
  Sagen.flag = function() {
    return flag;
  };
  /**
   * 外部解放初期化関数
   * @method start
   * @param {string} id script selector id
   */
  Sagen.start = function(id) {
    dataSet = init(id);
    flag = check(dataSet);
  };

  window.Sagen = Sagen;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 19:33
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * orientation 監視
 *
 * @module Sagen
 * @submodule Orientation
 * */
(function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,

    EventDispatcher = Sagen.EventDispatcher,
    Browser = Sagen.Browser,
    Css3 = Browser.Css3,
    iOS = Browser.iOS,
    Android = Browser.Android,

    mathAbs = Math.abs,
    mathInt = parseInt,
    /**
     * orientation 可能フラッグ
     * @property orientation
     * @static
     * @type {boolean}
     * @private
     */
    orientation,
    /**
     * 監視するイベント種類
     * @property eventType
     * @static
     * @type {string}
     * @private
     */
    eventType,
    /**
     * 監視イベントハンドラ
     * @property handler
     * @static
     * @type {Function}
     * @private
     */
    handler,
    /**
     * matchMedia object
     * @property mediaQuery
     * @static
     * @type {MediaQueryList}
     * @private
     */
    mediaQuery,
    /**
     * start flag
     * @property started
     * @static
     * @private
     * @type {boolean}
     */
    started;

  /**
   * portrait / landscape 切替を監視
   * @class Orientation
   * @uses EventDispatcher
   * @static
   * @constructor
   */
  function Orientation() {
    throw new Error('Orientation can\'t create instance.');
  }

  var p = Orientation.prototype;
  p.constructor = Orientation;

  /**
   * orientation change event
   * @event CHANGE_ORIENTATION
   * @static
   * @type {string}
   */
  Orientation.CHANGE_ORIENTATION = 'changeOrientation';
  // mixin
  EventDispatcher.initialize(Orientation);

  /**
   * orientation event 監視を開始します
   * @method init
   * @static
   */
  Orientation.init = function() {
    Orientation.listen();
    Orientation.fire();
  };
  /**
   * orientation event を使用可能か調べます
   * @method canOrientation
   * @static
   * @return {boolean} true: orientation event を使用可能
   */
  Orientation.canOrientation = function() {
    if (typeof orientation === 'undefined') {
      orientation = Css3.orientation();
    }
    return orientation;
  };
  /**
   * 監視する event type, orientation event を使用不可の時は resize を監視します
   * @method eventType
   * @static
   * @return {string} orientationchange or resize
   */
  Orientation.eventType = function() {
    if (typeof eventType === 'undefined') {
      eventType = Css3.orientationChange() ? 'orientationchange' : 'resize';
    }
    return eventType;
  };
  /**
   * Orientation.CHANGE_ORIENTATION を dispatchし directionを "portrait" にします
   * @method portrait
   * @static
   */
  Orientation.portrait = function() {
    Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation });
  };
  /**
   * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "landscape" にします
   * @method landscape
   * @static
   */
  Orientation.landscape = function() {
    Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation });
  };
  /**
   * orientation event 監視を開始します
   * @method listen
   * @static
   * @return {Orientation} method chain 可能にします
   */
  Orientation.listen = function() {
    // var
    // handler;
    if (!started) {
      started = true;
      // addEventListener が使えるは必須
      if (typeof window.addEventListener !== 'undefined') {
        // console.log('Css3.matchMedia()', Css3.matchMedia());
        if (Css3.matchMedia()) {
          // can use matchMedia
          // handler = Orientation.listenMatchMedia;
          Orientation.listenMatchMedia();
        } else {
          // matchMediaが使えないので代わりに window.orientationあるいは window 縦横比を使い判定します
          handler = Orientation.listenOrientation;
          // handler = handler;
          window.addEventListener(Orientation.eventType(), handler, false);
        }
      }
    }
    return Orientation;
  };
  /**
   * イベント監視を停止します
   * @method abort
   * @static
   */
  Orientation.abort = function() {
    if (!!handler && typeof window.addEventListener !== 'undefined') {
      window.removeEventListener(Orientation.eventType(), handler);
    }
  };
  /**
   * イベントを強制的に発火させます
   * @method fire
   * @static
   */
  Orientation.fire = function() {
    if (!!handler) {
      handler();
    } else if (!!mediaQuery) {
      Orientation.onRotate(mediaQuery);
    }
  };
  /**
   * orientation 監視を開始します
   * @method listenOrientation
   * @static
   */
  Orientation.listenOrientation = function() {
    if (Orientation.canOrientation()) {
      // window.orientation が使える
      // degree check
      if (Orientation.checkDegree()) {
        // portrait
        Orientation.portrait();
      } else {
        Orientation.landscape();
      }
    } else {
      // window 幅,高さを使う
      // aspect check
      if (Orientation.checkAspect()) {
        // portrait
        Orientation.portrait();
      } else {
        Orientation.landscape();
      }
    }
  };
  /**
   * 角度を測ります
   * @method checkDegree
   * @static
   * @return {boolean} true: 90degree
   */
  Orientation.checkDegree = function() {
    return mathAbs(window.orientation) !== 90;
  };
  /**
   * 縦横比を測ります
   * @method checkAspect
   * @static
   * @return {boolean} true: portrait
   */
  Orientation.checkAspect = function() {
    var
      w = mathInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10),
      h = mathInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10);
    return h > w;
  };
  /**
   * Experia Z(Sony Tablet), portrait / landscape 表示が逆なのでwindow比率で判定する
   * @method onExperiaZ
   * @static
   */
  Orientation.onExperiaZ = function() {
    // window 幅,高さを使う
    // aspect check
    if (Orientation.checkAspect()) {
      // portrait
      Orientation.portrait();
    } else {
      Orientation.landscape();
    }
  };

  /**
   * window.matchMedia listener handler
   * @method onRotate
   * @static
   * @param {MediaQueryList} mediaQueryList MediaQueryList object
   */
  Orientation.onRotate = function(mediaQueryList) {
    // console.log('Orientation.onRotate', mediaQueryList.matches, mediaQueryList);
    // use matchMedia
    if (mediaQueryList.matches) {
      // portrait
      // Orientation.portrait();
      Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation });
    } else {
      // landscape
      // Orientation.landscape();
      Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation });
    }
  };
  /**
   * orientation change event handler
   * @method onOrientationChange
   * @static
   */
  Orientation.onOrientationChange = function() {
    if (Orientation.checkDegree()) {
      // portrait
      Orientation.portrait();
    } else {
      // landscape
      Orientation.landscape();
    }
  };
  /**
   * matchMedia 監視を開始します
   * @method listenMatchMedia
   * @static
   */
  Orientation.listenMatchMedia = function() {
    var
      mql = window.matchMedia('(orientation: portrait)'),
      sgp312 = !!navigator.userAgent.match(/sgp312/i);

    mediaQuery = mql;

    // if ( ( iOS.is() && iOS.version() < 6 ) || ( Android.is() && Android.version() < 4.2 ) ) {
    if (sgp312) {
      // experia z
      window.addEventListener(Orientation.eventType(), Orientation.onExperiaZ, false);
    } else if (Android.standard() || (iOS.is() && iOS.version() < 6)) {
      // iOS 5 以下だと mql.addListener が作動しないのでorientationchangeを使用します
      window.addEventListener(Orientation.eventType(), Orientation.onOrientationChange, false);
    } else {
      // console.log('mql', mql);
      mql.addListener(Orientation.onRotate);
    }
  };

  Sagen.Orientation = Orientation;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 16:02
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * html tag へ class を付与します
 *
 * @requires Sagen.Dom
 *
 * @module Sagen
 * @submodule Classes
 * */
( function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,
    Dom = Sagen.Dom;
  /**
   * html tag へ class を追加・削除します
   * @class Classes
   * @param {Array} [classes=[]] 処理クラス名称配列
   * @param {Element} [dom=document.documentElement] CSS Class Add target HTML Element, default document.documentElement (html)
   * @constructor
   */
  function Classes(classes, dom) {
    classes = Array.isArray(classes) ? classes : [];
    // dom = !!dom || document.documentElement;
    if (!dom) {
      dom = document.documentElement;
    }

    /**
     * 処理クラス名称配列
     * @property classes
     * @type {Array}
     */
    this.classes = classes;
    /**
     * class tag を追加する element を wakegi.Dom instance
     * @property dom
     * @type {Dom}
     */
    this.dom = new Dom(dom);
    /**
     * class を追加する Element
     * @property tag
     * @type {Element}
     */
    this.tag = dom;
  }

  var p = Classes.prototype;
  p.constructor = Classes;

  /**
   * 不正値を削除します
   * @method clean
   * @return {Array} クリーン後の classes 配列
   */
  p.clean = function() {
    var
      classes = this.classes,
      alt = [],
      i = 0,
      limit = classes.length,
      value;
    for (;i < limit; i = (i + 1) | 0) {
      value = classes[i];
      if (!!value && value !== ' ') {
        alt.push(value);
      }
    }
    this.classes = alt;
    return alt;
  };
  /**
   * class 追加
   * @method add
   * @param {string} className 追加するクラス名称
   * @return {boolean} true: added
   */
  p.add = function(className) {
    var
      classes = this.classes,
      result = false;

    if (classes.indexOf(className) === -1) {
      classes.push(className);
      result = true;
    }

    return result;
  };
  /**
   * tag へクラスを書き込みます
   * @method write
   * @return {string} write したクラス名称
   */
  p.write = function() {
    // return this.dom.addClass(this.classes.join(' '));
    // var classNames = this.classes.join(' ');
    var
      classes = this.classes,
      classNames = classes.join(' '),
      dom = this.dom,
      i = 0,
      limit = classes.length;
    for(;i < limit; i = (i + 1) | 0) {
      dom.addClass(classes[i]);
    }
    // this.tag.className = classNames;
    return classNames;
  };
  /**
   * tag へ class を追加します
   * @method addClass
   * @param {string} className 追加する class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return this.dom.addClass(className);
  };
  /**
   * tag から class を削除します
   * @method removeClass
   * @param {string} className 削除する class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function(className) {
    return this.dom.removeClass(className);
  };
  Sagen.Classes = Classes;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:34
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * @module Sagen
 * @submodule Device
 * */
(function(window) {
  'use strict';
  var
    Sagen = window.Sagen,
    Browser = Sagen.Browser,
    Android = Browser.Android,
    iOS = Browser.iOS,
    Mac = Browser.Mac,
    Windows = Browser.Windows,
    Css3 = Browser.Css3,
    Element = Browser.Element,
    Safari = Browser.Safari,
    Chrome = Browser.Chrome,
    Firefox = Browser.Firefox,
    FxiOS = Browser.FxiOS,
    IE = Browser.IE,
    Edge = Browser.Edge,
    Orientation = Sagen.Orientation,

    Classes = Sagen.Classes,
    /**
     * @property classSymbol
     * @static
     * @private
     * @type {Classes|undefined}
     */
    classSymbol;

  /**
   * 端末判定を行います
   * @class Device
   * @static
   * @constructor
   */
  function Device() {
    throw new Error('Device can\'t create instance.');
  }

  var p = Device.prototype;
  p.constructor = Device;
  /**
   * 端末判定処理を始めます
   * @method init
   * @static
   */
  Device.init = function() {
    var
      classes = new Classes([]);

    classSymbol = classes;

    Device
      .standard(classes)
      .option(classes)
      .execute(function() {
        classes.write();
      });
  };
  /**
   * 引数関数を実行します
   * @method execute
   * @static
   * @param {function} func 実行する関数
   */
  Device.execute = function(func) {
    func();
  };

  /**
   * 端末 OS 判定処理を行います
   * @method standard
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.standard = function(classes) {
    // standard
    if (Sagen.flag()) {
      Device.ios(classes)
        .android(classes)
        .css3(classes)
        .os(classes);
    }

    return Device;
  };
  /**
   * dataset-browser, dataset-canvas, dataset-orientation option 処理を行います
   * @method option
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.option = function(classes) {
    if (Sagen.dataSet('browser')) {
      // dataset-browser true
      Device.ie(classes)
        .chrome(classes)
        .safari(classes)
        .firefox(classes)
        .edge(classes)
        .fxios(classes);
    }

    if (Sagen.dataSet('canvas')) {
      // dataset-canvas
      Device.canvas(classes);
    }

    // orientation
    // ToDo: orientation change
    // console.log('Sagen.dataSet("orientation")', Sagen.dataSet('orientation'), iOS.is());
    if (Sagen.dataSet('orientation') && (iOS.is() || Android.is())) {
      Orientation.on(Orientation.CHANGE_ORIENTATION, Device.onOrientation);
      Orientation.init();
    }
    return Device;
  };

  /**
   * browser / OS version を書き込みます
   * @method version
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @param {string} prefix iphone, ipad... な端末識別子
   * @param {Array} numbers version を配列形式
   * @return {Device} method chain 可能にします
   */
  Device.version = function(classes, prefix, numbers) {
    var
      version = '',
      underScore = '_',
      i, limit;

    for (i = 0, limit = numbers.length; i < limit; i = (i + 1) | 0) {
      version += numbers[i] + '';
      classes.add( prefix + version );
      version += underScore;
    }

    return Device;
  };
  /**
   * iOS 関連を判定します
   * @method ios
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.ios = function(classes) {
    var
      prefix;

    if (iOS.is()) {
      // iOS
      prefix = 'ios';
      classes.add(prefix);
      if (iOS.iPad()) {
        // ipad
        classes.add('ipad');
        classes.add('tablet');
      } else if (iOS.iPod()) {
        // ipod
        classes.add('ipod');
        classes.add('mobile');
      } else if (iOS.iPhone()) {
        // iphone
        classes.add('iphone' );
        classes.add( 'mobile' );
      }
      // version
      Device.version(classes, prefix, iOS.numbers());
    }

    return Device;
  };
  /**
   * Android 関連を判定します
   * @method android
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.android = function(classes) {
    var
      prefix;

    if (Android.is()) {
      // Android
      prefix = 'android';
      classes.add(prefix);

      if (Android.tablet()) {
        // Android.tablet
        classes.add('tablet');
      } else if (Android.phone()) {
        // Android.phone
        classes.add('mobile');
      }

      if (Android.standard()) {
        classes.add('android-standard');
      }

      if (Android.hd()) {
        classes.add('android-hd');
      }

      // version
      Device.version(classes, prefix, Android.numbers());
    }

    return Device;
  };
  /**
   * CSS3 判定を行います
   * @method css3
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.css3 = function(classes) {
    if (Css3.transition()) {
      classes.add('transition');
    }

    if (Css3.transform()) {
      classes.add('transform');
    }

    if (Css3.matchMedia()) {
      classes.add('matchMedia');
    }

    if (Css3.orientation()) {
      classes.add('orientation');
    }

    if (Css3.orientationChange()) {
      classes.add('orientation-change');
    }

    if (Css3.backgroundSize()) {
      classes.add('background-size');
    }

    return Device;
  };
  /**
   * element 関連判定を行います
   * @method element
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.element = function(classes) {
    if (Element.touch()) {
      classes.add( 'touch' );
    }

    if (Element.querySelector()) {
      classes.add( 'querySelector' );
    }

    return Device;
  };
  /**
   * OS 関連判定を行います
   * @method os
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.os = function( classes ) {
    var
      pc = false;

    if (Mac.is()) {
      classes.add('mac');
      pc = true;
    }

    if (Windows.is()) {
      classes.add('windows');
      pc = true;

      if (Windows.phone()) {
        // windows phone は pc false
        pc = false;
        classes.add('windows-phone');
        classes.add('mobile');
      }
    }

    if (pc) {
      classes.add('other');
    }

    return Device;
  };
  /**
   * Safari 判定を行います
   * @method safari
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.safari = function(classes) {
    var
      prefix;

    if (Safari.is()) {
      prefix = 'safari';
      classes.add(prefix);
      // version
      Device.version(classes, prefix, Safari.numbers());
    }

    return Device;
  };
  /**
   * Chrome 判定を行います
   * @method chrome
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.chrome = function(classes) {
    var
      prefix;

    if (Chrome.is()) {
      prefix = 'chrome';
      classes.add( prefix );

      // version
      Device.version(classes, prefix, Chrome.numbers());
    }

    return Device;
  };
  /**
   * Firefox 判定を行います
   * @method firefox
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.firefox = function(classes) {
    var
      prefix;

    if (Firefox.is()) {
      prefix = 'firefox';
      classes.add( prefix );
      // version
      Device.version(classes, prefix, Firefox.numbers());
    }

    return Device;
  };
  /**
   * Edge 判定を行います
   * @method edge
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.edge = function(classes) {
    var
      prefix;
    if (Edge.is()) {
      prefix = 'edge';
      classes.add(prefix);

      // version
      Device.version(classes, prefix, Edge.numbers());
    }

    return Device;
  };
  /**
   * iOS Firefox check
   * @method fxios
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.fxios = function(classes) {
    var
      prefix;

    if (FxiOS.is()) {
      // FxiOS is true
      prefix = 'fxios';
      classes.add( prefix );
      // version
      Device.version(classes, prefix, FxiOS.numbers());
    }

    return Device;
  };
  /**
   * IE 判定を行います
   * @method ie
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.ie = function(classes) {
    var
      prefix;

    if (IE.is()) {
      prefix = 'ie';
      classes.add(prefix);
      // version
      Device.version(classes, prefix, String(IE.version()).split('.'));
    }

    return Device;
  };
  /**
   * canvas 判定を行います
   * @method canvas
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.canvas = function(classes) {
    if (Element.canvas()) {
      classes.add('canvas');

      if (Element.webgl()) {
        classes.add('webgl');
      }
    }

    return Device;
  };

  /**
   * orientation event handler
   * @method onOrientation
   * @static
   * @param {Object} event orientation event
   */
  Device.onOrientation = function(event) {
    var
      direction = event.direction;
    // console.log('Device.onOrientation', event, direction, direction === 'portrait');
    if (direction === 'portrait') {
      classSymbol.removeClass('landscape');
      classSymbol.addClass('portrait');
    } else if (direction === 'landscape') {
      classSymbol.removeClass('portrait');
      classSymbol.addClass('landscape');
    }
  };

  Sagen.Device = Device;
}(window));

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 18:48
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * meta viewport rewrite / write
 *
 * @module Sagen
 * @submodule Viewport
 * */
(function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,

    Browser = Sagen.Browser,
    iOS = Browser.iOS,
    Element = Browser.Element,
    /**
     * viewport tag
     * @property viewport
     * @static
     * @type {HTMLElement|String}
     * @private
     */
    viewport,
    /**
     * viewport.content
     * @property content
     * @static
     * @type {string}
     * @private
     */
    content;

  /**
   * viewport 関連処理を行います
   * @class Viewport
   * @static
   * @constructor
   */
  function Viewport() {
    throw new Error('Viewport can\'t create instance.');
  }

  var p = Viewport.prototype;
  p.constructor = Viewport;

  /**
   * data-ios が true の時に minimalUi を実行します
   * @method init
   * @static
   */
  Viewport.init = function() {
    if (Sagen.dataSet('ios')) {
      Viewport.minimalUi();
    }
  };
  /**
   * viewport tag と viewport.content を取得します
   * @method find
   * @static
   * @return {Viewport} method chain 可能にします
   */
  Viewport.find = function() {
    if (typeof viewport === 'undefined') {
      // viewport undefined
      viewport = Element.find('meta[name=\'viewport\']');
    }

    if (!!viewport) {
      content = viewport.content;
    } else {
      viewport = '';
      content = '';
    }

    return Viewport;
  };
  /**
   * viewport tag を取得します
   * @method Viewport
   * @static
   * @return {HTMLElement|*} viewport tag
   */
  Viewport.meta = function() {
    Viewport.find();
    return viewport;
  };
  /**
   * viewport.content を取得します
   * @method content
   * @static
   * @return {string} viewport.content
   */
  Viewport.content = function() {
    Viewport.find();
    return content;
  };
  /**
   * viewport tag を書き込みます
   * @method write
   * @static
   * @param {String} contentOption viewport.content データ
   * @return {Viewport} method chain 可能にします
   */
  Viewport.write = function(contentOption) {
    var
      meta;
    Viewport.find();
    if (!viewport) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = contentOption;
      viewport = meta;
      content = contentOption;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    return Viewport;
  };
  /**
   * viewport に追加します
   * @method add
   * @static
   * @param {string} option 追加オプション
   * @return {Viewport} method chain 可能にします
   */
  Viewport.add = function(option) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(option) === -1) {
        viewport.content = contentOption + ', ' + option;
      }
    }
    return Viewport;
  };
  /**
   * viewport を一部書き換えます
   * @method replace
   * @static
   * @param {string} oldOption 置換え元
   * @param {string} newOption 置換える viewport
   * @return {Viewport} method chain 可能にします
   */
  Viewport.replace = function(oldOption, newOption) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(oldOption) !== -1) {
        contentOption.split(oldOption).join(newOption);
        viewport.content = contentOption;
      }
    }
    return Viewport;
  };
  /**
   * viewport content 引数で書換
   * @method rewrite
   * @static
   * @param {string} contentOption 新規 content 文字列
   * @return {Viewport} method chain 可能にします
   */
  Viewport.rewrite = function(contentOption) {
    Viewport.find();
    if (!!viewport) {
      viewport.content = contentOption;
    }
    return Viewport;
  };
  /**
   * `minimal-ui` を追加します, iOS 7.1 ~ 8.0未満の時に実行されます
   * @method minimalUi
   * @static
   */
  Viewport.minimalUi = function() {
    var version = iOS.version();
    if (version >= 7.1 && version < 8.0) {
      Viewport.add('minimal-ui');
    }
  };

  Sagen.Viewport = Viewport;
}( window ) );

/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * execute Sagen default method
 */
(function(window) {
  'use strict';
  var
    Sagen = window.Sagen,
    Device = Sagen.Device,
    Viewport = Sagen.Viewport;

  // execute Sagen
  // insert class at html
  Device.init();
  Viewport.init();
}(window));
