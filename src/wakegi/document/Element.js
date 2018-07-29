/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/03/18 - 13:09
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Browser 毎の Element 機能を調べます
 *
 * @module Browser
 * @submodule Element
 * */
(function(window) {
  'use strict';
  var
    document = window.document,
    wakegi = window.wakegi,
    Browser = wakegi.Browser,

    touch,
    querySelector,
    canvas,
    webgl;

  /**
   * HTMLElement detection
   * @class Element
   * @static
   * @constructor
   */
  function Element() {
    throw new Error('Element can\'t create instance.');
  }

  var p = Element.prototype;
  p.constructor = Element;

  /**
   * touch event が使用可能かを調べます
   *
   * @method touch
   * @static
   * @return {boolean} true: touch event が使用可能
   */
  Element.touch = function() {
    if (typeof touch === 'undefined') {
      // touch undefined
      // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
      // http://stackoverflow.com/questions/2915833/how-to-check-browser-for-touchstart-support-using-js-jquery#answer-2915912
      touch = 'ontouchstart' in document.documentElement;
    }
    return touch;
  };

  /**
   * document.querySelector が使用可能かを調べます
   *
   * @method querySelector
   * @static
   * @return {boolean} true: querySelector が使用可能
   */
  Element.querySelector = function() {
    if (typeof querySelector === 'undefined') {
      // querySelector undefined
      querySelector = typeof document.querySelector !== 'undefined';
    }
    return querySelector;
  };

  /**
   * canvas 2D が使用可能かを調べます
   *
   * @method canvas
   * @static
   * @return {boolean} true: canvas 使用可能
   */
  Element.canvas = function() {
    if (typeof canvas === 'undefined') {
      // querySelector undefined
      canvas = !!window.CanvasRenderingContext2D;
    }
    return canvas;
  };

  /**
   * canvas WebGL が使用可能かを調べます
   *
   * @method webgl
   * @static
   * @return {boolean} true: webgl 使用可能
   */
  Element.webgl = function() {
    if (typeof webgl === 'undefined') {
      // webgl undefined
      webgl = Element.canvas();
      // canvas が使用可能時に webgl 機能を調べる
      if (webgl) {
        try {
          webgl = !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
        } catch(e) {
          webgl = false;
        }
      }
    }
    return webgl;
  };

  /**
   * querySelector が使えるブラウザだけ使用可能
   *
   * @method find
   * @static
   * @param {string} searchKey `querySelector` で使用するセレクター
   * @return {*} HTMLElement を返します
   */
  Element.find = function(searchKey) {
    var result;
    if (Element.querySelector()) {
      result = document.querySelector(searchKey);
    }
    return result;
  };

  Browser.Element = Element;
}(window));
