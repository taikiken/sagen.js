/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 18:48
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
 * meta viewport rewrite / write
 *
 * @module Sagen
 * @submodule Viewport
 * */
(function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,

    Browser = Sagen.Browser,
    iOS = Browser.iOS,
    Element = Browser.Element,
    /**
     * viewport tag
     * @property viewport
     * @static
     * @type {HTMLElement|String}
     * @private
     */
    viewport,
    /**
     * viewport.content
     * @property content
     * @static
     * @type {string}
     * @private
     */
    content;

  /**
   * viewport 関連処理を行います
   * @class Viewport
   * @static
   * @constructor
   */
  function Viewport() {
    throw new Error('Viewport can\'t create instance.');
  }

  var p = Viewport.prototype;
  p.constructor = Viewport;

  /**
   * data-ios が true の時に minimalUi を実行します
   * @method init
   * @static
   */
  Viewport.init = function() {
    if (Sagen.dataSet('ios')) {
      Viewport.minimalUi();
    }
  };
  /**
   * viewport tag と viewport.content を取得します
   * @method find
   * @static
   * @return {Viewport} method chain 可能にします
   */
  Viewport.find = function() {
    if (typeof viewport === 'undefined') {
      // viewport undefined
      viewport = Element.find('meta[name=\'viewport\']');
    }

    if (!!viewport) {
      content = viewport.content;
    } else {
      viewport = '';
      content = '';
    }

    return Viewport;
  };
  /**
   * viewport tag を取得します
   * @method Viewport
   * @static
   * @return {HTMLElement|*} viewport tag
   */
  Viewport.meta = function() {
    Viewport.find();
    return viewport;
  };
  /**
   * viewport.content を取得します
   * @method content
   * @static
   * @return {string} viewport.content
   */
  Viewport.content = function() {
    Viewport.find();
    return content;
  };
  /**
   * viewport tag を書き込みます
   * @method write
   * @static
   * @param {String} contentOption viewport.content データ
   * @return {Viewport} method chain 可能にします
   */
  Viewport.write = function(contentOption) {
    var
      meta;
    Viewport.find();
    if (!viewport) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = contentOption;
      viewport = meta;
      content = contentOption;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    return Viewport;
  };
  /**
   * viewport に追加します
   * @method add
   * @static
   * @param {string} option 追加オプション
   * @return {Viewport} method chain 可能にします
   */
  Viewport.add = function(option) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(option) === -1) {
        viewport.content = contentOption + ', ' + option;
      }
    }
    return Viewport;
  };
  /**
   * viewport を一部書き換えます
   * @method replace
   * @static
   * @param {string} oldOption 置換え元
   * @param {string} newOption 置換える viewport
   * @return {Viewport} method chain 可能にします
   */
  Viewport.replace = function(oldOption, newOption) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(oldOption) !== -1) {
        contentOption.split(oldOption).join(newOption);
        viewport.content = contentOption;
      }
    }
    return Viewport;
  };
  /**
   * viewport content 引数で書換
   * @method rewrite
   * @static
   * @param {string} contentOption 新規 content 文字列
   * @return {Viewport} method chain 可能にします
   */
  Viewport.rewrite = function(contentOption) {
    Viewport.find();
    if (!!viewport) {
      viewport.content = contentOption;
    }
    return Viewport;
  };
  /**
   * `minimal-ui` を追加します, iOS 7.1 ~ 8.0未満の時に実行されます
   * @method minimalUi
   * @static
   */
  Viewport.minimalUi = function() {
    var version = iOS.version();
    if (version >= 7.1 && version < 8.0) {
      Viewport.add('minimal-ui');
    }
  };

  Sagen.Viewport = Viewport;
}( window ) );
