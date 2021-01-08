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
