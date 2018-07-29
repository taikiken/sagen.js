/**
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/11/19 - 16:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * rgb, hsl, hsv
 *
 * Color 関連 utilities
 *
 * @module wakegi
 * @submodule Iro
 *
 * */
( function( window ) {
  'use strict';

  var
    wakegi = window.wakegi,
    Math = window.Math,

    mathFloor = Math.floor,
    mathMax = Math.max,
    mathMin = Math.min,
    mathInt = window.parseInt;

  /**
   * 色設定 utility
   *
   * - http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
   * - http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * - https://github.com/mbostock/d3/tree/master/src/color
   *
   * `not found`
   * - https://github.com/less/less.js/blob/master/lib/less/functions.js
   *
   * @class Iro
   * @static
   * @constructor
   */
  function Iro() {
    throw new Error('Iro can\'t create instance');
  }

  var p = Iro.prototype;
  p.constructor = Iro;

  // https://github.com/less/less.js/blob/master/lib/less/functions.js
  // http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
  /**
   * R, G, B to HSL
   * @method rgb2hsl
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, l: number}
   */
  Iro.rgb2hsl = function(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var
      max = mathMax(r, g, b),
      min = mathMin(r, g, b),
      h, s, l, d;

    l = (max + min) / 2;

    if ( max === min ) {
      // achromatic
      h = 0;
      s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch(max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = ((b - r) / d) + 2;
          break;

        case b:
          h = ((r - g) / d) + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, l: l };
  };

  /**
   * HUE を RGB 変換します
   * @param {number} point 変換変数
   * @param {number} q 変換変数
   * @param {number} t 変換変数
   * @return {number} 色成分数値を返します 0 ~ 255
   */
  Iro.hue2rgb = function(point, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return point + (q - point) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return point + (q - point) * ((2 / 3) - t) * 6;
    }
    return point;
  };

  /**
   * HSL を RGB 変換します
   * @method hsl2rgb
   * @static
   * @param {number} h Hue
   * @param {number} s Saturation
   * @param {number} l luminance
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsl2rgb = function(h, s, l) {
    var r, g, b, q, point;

    if(s === 0) {
      // achromatic
      r = g = b = l;
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
      point = (2 * l) - q;

      r = Iro.hue2rgb(point, q, h + (1 / 3));
      g = Iro.hue2rgb(point, q, h);
      b = Iro.hue2rgb(point, q, h - (1 / 3));
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  /**
   * RGB を HSV 変換します
   * @method rgb2hsv
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {object} {h: number, s: number, v: number}
   */
  Iro.rgb2hsv = function(r, g, b) {
    var red = r / 255;
    var green = g / 255;
    var blue = b / 255;

    var
      max = mathMax(red, green, blue),
      min = mathMin(red, green, blue),
      h, s,
      v = max,
      d = max - min;

    s = max === 0 ? 0 : d / max;

    if (max === min) {
      // achromatic
      h = 0;
    } else {

      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;

        case green:
          h = (blue - red) / d + 2;
          break;

        case blue:
          h = (red - green) / d + 4;
          break;

        default:
          h = 0;
          break;
      }
      h /= 6;
    }
    return { h: h, s: s, v: v };
  };

  /**
   * HSV を RGB 変換します
   * @method hsv2rgb
   * @static
   * @param {number} h Hue 色相
   * @param {number} s Saturation 彩度
   * @param {number} v Value 明度
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hsv2rgb = function( h, s, v ) {
    var
      r, g, b,
      i = mathFloor(h * 6),
      f = h * 6 - i,
      point = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s);

    switch ( i % 6 ) {
      case 0:
        r = v;
        g = t;
        b = point;
        break;

      case 1:
        r = q;
        g = v;
        b = point;
        break;

      case 2:
        r = point;
        g = v;
        b = t;
        break;

      case 3:
        r = point;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = point;
        b = v;
        break;

      case 5:
        r = v;
        g = point;
        b = q;
        break;

      default:
        r = 0;
        g = 0;
        b = 0;
        break;
    }

    return {
      r: mathInt(r * 255, 10),
      g: mathInt(g * 255, 10),
      b: mathInt(b * 255, 10)
    };
  };

  // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  /**
   * hex CSS shorthand to normal (#0ef -> #00eeff)
   * @method hexShort
   * @static
   * @param {string} hex CSS color 形式
   * @return {string|null} CSS short hand color 形式をフル変換します
   * @see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   */
  Iro.hexShort = function(hex) {
    if (typeof hex !== 'string') {
      // order string
      return null;
    }

    var
      shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    return hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  };
  /**
   * CSS color 形式文字列を RGB 分解し Object 変換します
   * @method hex2rgb
   * @static
   * @param {string} hex CSS 色設定文字 #ff0000
   * @return {object} {r: number, g: number, b: number}
   */
  Iro.hex2rgb = function(hex) {
    var hexString = Iro.hexShort( hex );
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return result ?
    {
      r: mathInt(result[1], 16),
      g: mathInt(result[2], 16),
      b: mathInt(result[3], 16)
    } : null;
  };

  /**
   * color(red, green, blue) number を 16進数変換し2桁文字列に変換します
   * @method componentToHex
   * @static
   * @param {number} color color(red, green, blue) number
   * @return {string} 2桁を保障し文字列変換し返します
   */
  Iro.componentToHex = function(color) {
    var hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  /**
   * color(red, green, blue) number を CSS color 形式文字列へ変換します
   * @method rgb2hex
   * @static
   * @param {int} r red color number
   * @param {int} g green color number
   * @param {int} b blue color number
   * @return {string} CSS color 形式文字列を返します
   */
  Iro.rgb2hex = function(r, g, b) {
    var
      red = Iro.componentToHex(r),
      green = Iro.componentToHex(g),
      blue = Iro.componentToHex(b);
    return '#' + red + green + blue;
  };

  /**
   * convert int to hex, 16777215 -> #ffffff
   * @method int2hex
   * @static
   * @param {number} num 変換元 10進数
   * @return {string} CSS color 16進数型文字列を返します
   */
  Iro.int2hex = function(num) {
    var
      numFloor = mathFloor(num),
      hex = numFloor.toString(16),
      sub,
      i;

    if (hex.length < 6) {
      i = hex.length;
      sub = 6 - i;

      while(sub) {
        hex = '0' + hex;
        --sub;
      }
    }
    return '#' + hex;
  };

  /**
   * convert hex to int, #fff -> 16777215
   * @method hex2int
   * @static
   * @param {string} hex `#fff` な 16進・文字列
   * @return {int|null} hex 文字列を10進数変換し返します
   */
  Iro.hex2int = function(hex) {
    var hexString = Iro.hexShort(hex);
    if (typeof hexString !== 'string') {
      // order string
      return null;
    }
    return mathInt(hexString, 16);
  };

  wakegi.Iro = Iro;
}(window));
