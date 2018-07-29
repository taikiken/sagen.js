/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/02 - 20:40
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
 * HTMLElement へ class を追加・削除・存在確認を行います
 *
 * @module wakegi
 * @submodule Dom
 *
 * */

(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Patterns = wakegi.Patterns;

  /**
   * HTML Element style / class を操作します
   * @class Dom
   * @static
   * @constructor
   * @param {HTMLElement} element 操作対象 Element
   */
  function Dom(element) {
    /**
     * @property element
     * @type {HTMLElement}
     * @private
     */
    this.element = element;
  }
  // -------------------------------------------
  // STATIC METHOD
  // -------------------------------------------
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 調査する class name
   * @return {boolean} true: 存在する
   */
  Dom.hasClass = function(element, className) {
    if (element.classList && element.classList.contains) {
      return element.classList.contains(className);
    }
    // legacy
    // categoryX があって category で検索すると match するのまずい
    // return !!element.className.match( new RegExp( className, 'i' ) );
    // return !!element.className.match( new RegExp( '^' + className + '$', 'g' ) );
    // return !!element.className.match( new RegExp( '\\' + className + '\\w', 'g' ) );
    var
      elementClass = element.className,
      classes = elementClass.split(' ');

    return classes.indexOf(className) !== -1;
  };
  /**
   * css class を追加します
   * @method addClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 追加する class name
   * @return {boolean} true: 追加した
   */
  Dom.addClass = function(element, className) {
    // exist check
    if (Dom.hasClass(element, className)) {
      return false;
    }
    if (element.classList && element.classList.add) {
      element.classList.add(className);
      return true;
    }
    // legacy
    var
      names = element.className,
      space = '';

    if (names !== '') {
      // 既に class 設定されているので 1 space を付与する
      space = ' ';
    }

    names += space + className;
    names = names.split('  ').join(' ');
    element.className = names;

    return true;
  };
  /**
   * element から class を削除します
   * @method removeClass
   * @static
   * @param {HTMLElement} element 操作対象 Element
   * @param {string} className 削除対象 class name
   * @return {boolean} true: 削除した
   */
  Dom.removeClass = function( element, className ) {
    if (!Dom.hasClass(element, className)) {
      return false;
    }
    // modern
    if (element.classList && element.classList.remove) {
      element.classList.remove(className);
      return true;
    }
    // legacy
    var
      result = false,
      names,
      elementClass,
      classes,
      i, limit,
      currentClass;

    // @type {string}
    elementClass = element.className;
    // @type {array<string>}
    classes = elementClass.split(' ');
    for (i = 0, limit = classes.length; i < limit; i = (i + 1) | 0) {
      currentClass = classes[i];
      if (!currentClass) {
        continue;
      }
      if (currentClass === className) {
        result = true;
        classes[i] = 'XXX_XXX_XXX';
      }
    }
    // XXX_XXX_XXX を削除して 2 spaces を 1 space へ
    names = classes.join(' ').replace('XXX_XXX_XXX', '').split('  ').join(' ');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    // remove, start / last white space
    names = names.trim();
    element.className = names;
    return result;
  };
  /**
   * getComputedStyle を使い HTMLElement style value を取得します
   * @method styleCompute
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {CSSStyleDeclaration|*|String}
   *    styleProp が null or undefined or "" の時は CSSStyleDeclaration Object<br>
   *    指定されている時は CSS 設定値(string)を返します
   */
  Dom.styleCompute = function(defaultView, el, styleProp) {
    var
      style = defaultView.getComputedStyle(el, null);

    if (!!styleProp) {
      styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
      return style.getPropertyValue( styleProp );
    }
    return style;
  };
  /**
   * currentStyle を使い HTMLElement style value を取得します
   * @method styleCurrent
   * @static
   * @param {HTMLElement} el 調査対象 Element
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement style value を返します
   */
  Dom.styleCurrent = function(el, styleProp) {
    var
      style = el.currentStyle,
      value;

    if (!!styleProp) {
      // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/-(\w)/g, function(str, letter) {
        return letter.toUpperCase();
      });

      value = style[styleProp];

      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        // return (function() {
        //   var
        //     oldLeft = el.style.left,
        //     oldRsLeft = el.runtimeStyle.left;
        //
        //   el.runtimeStyle.left = el.currentStyle.left;
        //   el.style.left = value || 0;
        //   value = el.style.pixelLeft + 'px';
        //   el.style.left = oldLeft;
        //   el.runtimeStyle.left = oldRsLeft;
        //
        //   return value;
        // })();
        return Dom.styleValue(el, value);
      }
      return value;
    }
    return style;
  };
  /**
   * HTMLElement style value を取得します
   * @param {HTMLElement} el 調査対象 Element
   * @param {*} value CSS 値
   * @return {string|*} HTMLElement style value を返します
   */
  Dom.styleValue = function(el, value) {
    var
      oldLeft = el.style.left,
      oldRsLeft = el.runtimeStyle.left;

    el.runtimeStyle.left = el.currentStyle.left;
    el.style.left = value || 0;
    value = el.style.pixelLeft + 'px';
    el.style.left = oldLeft;
    el.runtimeStyle.left = oldRsLeft;

    return value;
  };

  /**
   * CSS 値を取得します
   * @method shortHand
   * @static
   * @param {Object} defaultView `defaultView.getComputedStyle` します
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {Array} patterns [string, ...]
   * @return {string} CSS 値を返します
   */
  Dom.shortHand = function(defaultView, el, patterns) {
    var
      top = Dom.styleCompute(defaultView, el, patterns[0]),
      right = Dom.styleCompute(defaultView, el, patterns[1]),
      bottom = Dom.styleCompute(defaultView, el, patterns[2]),
      left = Dom.styleCompute(defaultView, el, patterns[3]),
      result = '';

    if (top === bottom) {
      if (right === left) {
        if (top === right) {
          result = top;
        } else {
          result = top + ' ' + right;
        }
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    } else {
      if (right === left) {
        result = top + ' ' + right + ' ' + bottom;
      } else {
        result = top + ' ' + right + ' ' + bottom + ' ' + left;
      }
    }
    return result;
  };
  /**
   * HTMLElement の css style を取得します
   *
   * @TODO: background していない時の background-color が rgb(0, 0, 0) になるのを解決する
   * @method getStyle
   * @static
   * @param {HTMLElement} el 調査対象 HTML tag
   * @param {string} [styleProp] CSS property name
   * @return {*} HTMLElement の css style を返します
   */
  Dom.getStyle = function(el, styleProp) {
    var
      ownerDocument = el.ownerDocument,
      defaultView,
      result;

    if (!!ownerDocument) {
      defaultView = ownerDocument.defaultView;
    }

    if (!!defaultView && !!defaultView.getComputedStyle) {
      result = Dom.styleCompute(defaultView, el, styleProp);

      // Firefox, shorthand css property が常に空になる
      // 再計算を行う
      if (result === '' && !!styleProp && Patterns.has(styleProp)) {
        result = Dom.shortHand(defaultView, el, Patterns.get(styleProp));
      }
    } else if (!!el.currentStyle) {
      result = Dom.styleCurrent(el, styleProp);
    }
    return result;
  };
  // -------------------------------------------
  // METHOD
  // -------------------------------------------
  var p = Dom.prototype;
  p.constructor = Dom;

  // /**
  //  * 使用 Element を返します
  //  * @method element
  //  * @return {HTMLElement}
  //  */
  // p.element = function() {
  //   return this.element;
  // };
  /**
   * CSS class が存在するかを調べます
   * @method hasClass
   * @param {string} className 調査する class name
   * @return {boolean} true CSS class が存在する
   */
  p.hasClass = function(className) {
    return Dom.hasClass(this.element, className);
  };
  /**
   * @method addClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return Dom.addClass(this.element, className);
  };
  /**
   * @method removeClass
   * @param {string} className 対象 class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function( className ) {
    return Dom.removeClass(this.element, className);
  };
  /**
   * element の 指定 css property 値を取得します
   * @method style
   * @param {string} [styleProp=''] css property name
   * @return {*} CSS 値
   */
  p.style = function(styleProp) {
    return Dom.getStyle(this.element, styleProp);
  };
  wakegi.Dom = Dom;
}(window));
