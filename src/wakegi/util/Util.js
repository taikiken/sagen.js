/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 20:26
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */

/**
 * 文字列操作に使用します
 *
 * @module wakegi
 * @submodule Util
 */
( function(window) {
  'use strict';
  var wakegi = window.wakegi;

  /**
   * ユーティリティ
   * @class Util
   * @static
   * @constructor
   */
  function Util() {}

  var p = Util.prototype;
  p.constructor = Util;

  /**
   * abc-def を abcDef にします
   *
   * @method camelize
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash(-)連結 word を camel case へ変換し返します。
   */
  Util.camelize = function( str ) {
    return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  };

  /**
   * abcDef を abc-def にします
   *
   * @method dash
   * @static
   * @param {string} str 変換元文字列
   * @return {string} dash 変換後文字列を返します
   */
  Util.dash = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  };

  wakegi.Util = Util;
}(window));

