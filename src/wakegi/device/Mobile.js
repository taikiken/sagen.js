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
