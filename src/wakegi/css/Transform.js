/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:57
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
 * CSS3 transform 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transform
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;
  /**
   * CSS3 transform 使用可能かを判定します
   * @deprecated instead of Css3
   * @class Transform
   * @static
   * @constructor
   */
  function Transform() {
    throw new Error('Transform can\'t create instance.');
  }

  var p = Transform.prototype;

  p.constructor = Transform;
  /**
   * CSS3 transform 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Transform.is = function() {
    console.warn('[Transform] deprecated, instead use Css3');
    return Css3.transform();
  };
  Browser.Transform = Transform;
}(window));
