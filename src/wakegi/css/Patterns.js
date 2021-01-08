/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/20 - 19:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * CSS shorthand property pattern
 *
 * @module wakegi
 * @submodule Patterns
 *
 * */
(function(window) {
  'use strict';

  var
    /**
     * @property patterns
     * @static @private
     * @type {{padding: [*], margin: [*], border-color: [*], border-style: [*], border-width: [*]}}
     */
    patterns = {
      padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      'border-color': ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
      'border-style': ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
      'border-width': ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
    };

  /**
   * @class Patterns
   * @static
   * @constructor
   */
  function Patterns() {
    throw new Error('Patterns can\'t create instance');
  }

  var p = Patterns.prototype;
  p.constructor = Patterns;

  /**
   * camel を hyphen に変換
   * @method hyphen
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {string} hyphen 変換後文字列を返します
   */
  Patterns.hyphen = function(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  };
  /**
   * 引数 key 名称が patterns に存在するかを調べます
   * @method has
   * @static
   * @param {string} key 調べる key 名称(CSS property name)
   * @return {boolean} true: 存在する
   */
  Patterns.has = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns.hasOwnProperty(keyName);
  };
  /**
   * @method get
   * @static
   * @param {string} key key 名称(CSS property name)
   * @return {Array|undefined} CSS short hand 配列を返します
   */
  Patterns.get = function(key) {
    var keyName = Patterns.hyphen(key);
    return patterns[keyName];
  };
  
  window.wakegi.Patterns = Patterns;
}(window));
