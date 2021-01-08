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
