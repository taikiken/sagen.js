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
