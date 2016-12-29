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
    Orientation.listen().fire();
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
    if ( Orientation.checkDegree() ) {
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
      mql.addListener(Orientation.onRotate);
    }
  };

  Sagen.Orientation = Orientation;
}(window));
