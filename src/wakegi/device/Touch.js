/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 23:16
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
 * touch event が利用可能かを調べます
 *
 * @module Browser
 * @submodule Touch
 */
(function(window) {
  'use strict';
  var
    wakegi = window.wakegi,
    Browser = wakegi.Browser,
    Element = Browser.Element;
  /**
   * touch event が利用可能かを調べます
   * @class Touch
   * @static
   * @deprecated instead of Element
   * @constructor
   */
  function Touch() {
    throw new Error('Touch can\'t create instance.');
  }

  var p = Touch.prototype;
  p.constructor = Touch;

  /**
   * touch event が利用可能かを調べます
   * @method is
   * @deprecated instead of Element.touch
   * @static
   * @return {boolean} true: touch event が利用可能
   */
  Touch.is = function() {
    console.warn('[Touch] deprecated, instead use Element');
    return Element.touch();
  };
  Browser.Touch = Touch;
}(window));
