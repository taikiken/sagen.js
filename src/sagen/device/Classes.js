/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 16:02
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
 * html tag へ class を付与します
 *
 * @requires Sagen.Dom
 *
 * @module Sagen
 * @submodule Classes
 * */
( function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,
    Dom = Sagen.Dom;
  /**
   * html tag へ class を追加・削除します
   * @class Classes
   * @param {Array} [classes=[]] 処理クラス名称配列
   * @param {Element} [dom=document.documentElement] CSS Class Add target HTML Element, default document.documentElement (html)
   * @constructor
   */
  function Classes(classes, dom) {
    classes = Array.isArray(classes) ? classes : [];
    // dom = !!dom || document.documentElement;
    if (!dom) {
      dom = document.documentElement;
    }

    /**
     * 処理クラス名称配列
     * @property classes
     * @type {Array}
     */
    this.classes = classes;
    /**
     * class tag を追加する element を wakegi.Dom instance
     * @property dom
     * @type {Dom}
     */
    this.dom = new Dom(dom);
    /**
     * class を追加する Element
     * @property tag
     * @type {Element}
     */
    this.tag = dom;
  }

  var p = Classes.prototype;
  p.constructor = Classes;

  /**
   * 不正値を削除します
   * @method clean
   * @return {Array} クリーン後の classes 配列
   */
  p.clean = function() {
    var
      classes = this.classes,
      alt = [],
      i = 0,
      limit = classes.length,
      value;
    for (;i < limit; i = (i + 1) | 0) {
      value = classes[i];
      if (!!value && value !== ' ') {
        alt.push(value);
      }
    }
    this.classes = alt;
    return alt;
  };
  /**
   * class 追加
   * @method add
   * @param {string} className 追加するクラス名称
   * @return {boolean} true: added
   */
  p.add = function(className) {
    var
      classes = this.classes,
      result = false;

    if (classes.indexOf(className) === -1) {
      classes.push(className);
      result = true;
    }

    return result;
  };
  /**
   * tag へクラスを書き込みます
   * @method write
   * @return {string} write したクラス名称
   */
  p.write = function() {
    // return this.dom.addClass(this.classes.join(' '));
    // var classNames = this.classes.join(' ');
    var
      classes = this.classes,
      classNames = classes.join(' '),
      dom = this.dom,
      i = 0,
      limit = classes.length;
    for(;i < limit; i = (i + 1) | 0) {
      dom.addClass(classes[i]);
    }
    // this.tag.className = classNames;
    return classNames;
  };
  /**
   * tag へ class を追加します
   * @method addClass
   * @param {string} className 追加する class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return this.dom.addClass(className);
  };
  /**
   * tag から class を削除します
   * @method removeClass
   * @param {string} className 削除する class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function(className) {
    return this.dom.removeClass(className);
  };
  Sagen.Classes = Classes;
}(window));
