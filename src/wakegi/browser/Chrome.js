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
