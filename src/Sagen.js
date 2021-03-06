/**
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * @license MIT
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Sagen
 * version @@version
 * build @@buildTime
 * github: @@url
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 */

/**
 * ## Browser detect helper
 *
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします<br>
 *
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-browser="true">
 *      </script>
 *
 *
 *      // html へ class を追加した例
 *      // OS X Chrome
 *
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 *
 *      // Browser / 端末判定にも使えます
 *
 *      if ( Sagen.Browser.iOS.is() ) {
 *        // iOS
 *      }
 *
 *
 *      // orientation 監視にも使えます(iOS, Android)
 *      var Orientation = Sagen.Orientation;
 *
 *
 *      Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {
 *
 *        var direction = event.direction;
 *
 *        if ( direction === 'portrait' ) {
 *          // portrait
 *        }
 *
 *        if ( direction === 'landscape' ) {
 *          // landscape
 *        }
 *
 *      } );
 *
 *      Orientation.listen();
 *
 * @module Sagen
 * @type {{}}
 *
 * */
var Sagen = window.Sagen || {};

(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,
    dataSet = {},
    flag = false,
    selector = 'sagen';

  // copy Class
  /**
   * wakegi.Browser
   * @class Browser
   * @type {wakegi.Browser}
   */
  Sagen.Browser = wakegi.Browser;
  /**
   * wakegi.Dom
   * @class Dom
   * @type {wakegi.Dom}
   */
  Sagen.Dom = wakegi.Dom;
  /**
   * Gasane.EventDispatcher
   * @class EventDispatcher
   * @type {Gasane.EventDispatcher}
   */
  Sagen.EventDispatcher = Gasane.EventDispatcher;
  /**
   * script#sagen data 属性を捜査しオプションフラッグを調べます
   * @method init
   * @param {string} id - script tag selector id - default `sagen`
   * @static
   * @private
   * @returns {*} Object を保障します
   */
  function init(id) {
    var
      element = document.getElementById(id),
      // element = document.getElementById('sagen'),
      data,
      results,
      key,
      val;
    if (!element) {
      return {};
    }
    data = wakegi.Dataset.parse(element);
    if (!data) {
      return {};
    }
    results = {};
    // loop
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        val = data[key].toLowerCase();
        results[key] = val === 'true';
      }
    }
    return results;
  }

  /**
   * data option が存在するかを調べます
   * @method check
   * @private
   * @static
   * @param {object} data data 属性パース済み object
   * @return {boolean} true: data 属性あり
   */
  function check(data) {
    var result;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        result = data[key];
        if (result) {
          break;
        }
      }
    }
    return result;
  }
  // 初期処理を行います
  dataSet = init(selector);
  flag = check(dataSet);

  /**
   * data 属性オプション を調べます
   * @method dataSet
   * @static
   * @for Sagen
   * @param {string} type data key 名称 `data-xxx` `xxx` 部分
   * @return {boolean} オプション有無
   */
  Sagen.dataSet = function(type) {
    return !!dataSet[type];
  };
  /**
   * data 属性オプションが存在するかを調べます
   * @method flag
   * @static
   * @return {boolean} true: 存在します
   */
  Sagen.flag = function() {
    return flag;
  };
  /**
   * 外部解放初期化関数
   * @method start
   * @param {string} id script selector id
   */
  Sagen.start = function(id) {
    dataSet = init(id);
    flag = check(dataSet);
  };
}(window));
