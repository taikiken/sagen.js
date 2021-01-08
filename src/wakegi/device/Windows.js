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
