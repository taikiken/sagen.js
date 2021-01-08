/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:54
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
 * CSS3 transition 使用可能かを判定します
 *
 * @module Browser
 * @submodule Transition
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Css3 = Browser.Css3;

  /**
   * @deprecated instead of Css3
   * @class Transition
   * @static
   * @constructor
   */
  function Transition() {
    throw new Error('Transition can\'t create instance.');
  }

  var p = Transition.prototype;
  p.constructor = Transition;
  /**
   * CSS3 transition 使用可能かを判定します
   * @method is
   * @deprecated instead of Css3.transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Transition.is = function() {
    console.warn('[Transition] deprecated, instead use Css3');
    return Css3.transition();
  };
  Browser.Transition = Transition;
}(window));
