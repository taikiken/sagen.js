/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/17 - 22:24
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
 * CSS3 機能（一部のみ）が使用可能かを調べます
 *
 * @module Browser
 * @submodule Css3
 */
(function(window) {
  'use strict';

  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    transition,
    transform,
    matchMedia,
    onorientationchange,
    orientation,
    backgroundSize;

  /**
   * CSS3 detection
   * @class Css3
   * @static
   * @constructor
   */
  function Css3() {
    throw new Error('Css3 can\'t create instance.');
  }

  var p = Css3.prototype;
  p.constructor = Css3;

  /**
   * CSS3 transition detection
   *
   * @method transition
   * @static
   * @return {boolean} true: CSS3 transition 使用可能
   */
  Css3.transition = function() {
    var tagP;
    if ( typeof transition === 'undefined' ) {
      // transition undefined
      tagP = document.createElement('p').style;
      transition = 'transition' in tagP ||
        'WebkitTransition' in tagP ||
        'MozTransition' in tagP ||
        'msTransition' in tagP ||
        'OTransition' in tagP;
    }
    return transition;
  };
  /**
   * CSS3 transform detection
   *
   * @method transform
   * @static
   * @return {boolean} true: CSS3 transform 使用可能
   */
  Css3.transform = function() {
    var tagP;
    if (typeof transform === 'undefined') {
      // transform undefined
      tagP = document.createElement('p').style;
      transform = 'transform' in tagP ||
        'WebkitTransform' in tagP ||
        'MozTransform' in tagP ||
        'OTransform' in tagP ||
        'msTransform' in tagP;
    }
    return transform;
  };

  /**
   * matchMedia が使用可能かを調べます
   *
   * @method matchMedia
   * @static
   * @return {boolean} true: matchMedia が使用可能
   */
  Css3.matchMedia = function() {
    if (typeof matchMedia === 'undefined') {
      // matchMedia undefined
      matchMedia = typeof window.matchMedia === 'function';
    }
    return matchMedia;
  };
  /**
   * onorientationchange が使用可能かを調べます
   *
   * @method orientationChange
   * @static
   * @return {boolean} true: onorientationchange が使用可能
   */
  Css3.orientationChange = function() {
    if (typeof onorientationchange === 'undefined') {
      // onorientationchange undefined
      onorientationchange = 'onorientationchange' in window;
    }
    return onorientationchange;
  };
  /**
   * orientation が使用可能かを調べます
   *
   * @method orientation
   * @static
   * @return {boolean} true: orientation が使用可能
   */
  Css3.orientation = function() {
    if (typeof orientation === 'undefined') {
      // orientation undefined
      orientation = 'orientation' in window;
    }
    return orientation;
  };
  /**
   * backgroundSize が使用可能かを調べます
   *
   * @method backgroundSize
   * @static
   * @return {boolean} true: backgroundSize が使用可能
   */
  Css3.backgroundSize = function() {
    if (typeof backgroundSize === 'undefined') {
      // backgroundSize undefined
      backgroundSize = 'backgroundSize' in document.documentElement.style;
    }
    return backgroundSize;
  };
  
  Browser.Css3 = Css3;
}(window));
