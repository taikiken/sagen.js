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
