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
