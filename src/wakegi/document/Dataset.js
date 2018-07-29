/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 15/08/20 - 19:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for wakegi.js
 */
/**
 * data-xxx を key, value に分解します
 *
 * @module wakegi
 * @submodule Dataset
 */
(function(window) {
  'use strict';

  var
    wakegi = window.wakegi,
    Util = wakegi.Util;

  /**
   * tag の data属性を key: value 形式に分解します
   * @class Dataset
   * @static
   * @constructor
   */
  function Dataset() {}

  var p = Dataset.prototype;
  p.constructor = Dataset;

  /**
   * 引数 element(HTMLElement) の data属性を object にして返す
   * @method parse
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.parse = function( element ) {
    // if (typeof element.dataset !== 'undefined') {
    //   // dataset property が存在するモダンブラウザの処理
    //   return Dataset.modern(element);
    // } else {
    //   // レガシーブラウザ処理
    //   return Dataset.legacy(element);
    // }
    return element.dataset ? Dataset.modern(element) : Dataset.legacy(element);
  };

  /**
   * dataset を取得し key: value Object にします: モダンブラウザ
   * @method modern
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.modern = function(element) {
    var
      data = element.dataset,
      found = false,
      results = {},
      key, value,
      keyName;
    // eslint-disable-next-line guard-for-in
    for (key in data) {
      keyName = '';
      value = '';

      // Android 2.3 under, dataset object の hasOwnProperty が String型, バカでしょー
      // hasOwnProperty が使えない, function check
      if (typeof data.hasOwnProperty === 'function') {
        if (data.hasOwnProperty(key)) {
          value = data[key];
          keyName = key;
        }
      } else {
        value = data[key];
        keyName = key;
      }
      // keyName exist check
      if (keyName) {
        found = true;
        results[keyName] = value;
      }
    }
    return found ? results : null;
  };

  /**
   * dataset を取得し key: value Object にします: レガシーブラウザ
   * @method legacy
   * @static
   * @param {Element} element HTML document
   * @return {object} dataset を取得し key: value Objectを返します
   */
  Dataset.legacy = function(element) {
    var
      data = element.attributes,
      found = false,
      results = {},
      i, limit, attribute, nodeName, dataKey;

    for (i = 0, limit = data.length; i < limit; i = (i + 1) | 0) {
      attribute = data[ i ];
      nodeName = attribute.nodeName.toLowerCase();

      if (nodeName.indexOf('data-') !== -1) {
        dataKey = nodeName.replace('data-', '');
        dataKey = Util.camelize( dataKey );
        found = true;
        results[dataKey] = attribute.nodeValue.toLowerCase();
      }
    }// for
    return found ? results : null;
  };
  wakegi.Dataset = Dataset;
}(window));
