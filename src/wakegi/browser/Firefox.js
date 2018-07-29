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
