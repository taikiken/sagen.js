/**
 * @license inazumatv.com
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @version @@version
 * @build @@buildTime
 * @github: @@url
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 *
 * @module Sagen
 */

/**
 *
 * @example
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-ios="true"
 *          data-canvas="true">
 *      </script>
 *
 *      ( function ( window ){
 *         "use strict";
 *         var Sagen = window.Sagen;
 *
 *         if ( Sagen.Browser.iOS.is() ) {
 *              // iOS
 *         }
 *
 *      }( window ) );
 *
 *
 */
var Sagen = window.Sagen || {};

( function ( window, Sagen ){
  "use strict";

  //// trim
  //// three.js
  //String.prototype.trim = String.prototype.trim || function () {
  //  return this.replace( /^\s+|\s+$/g, '' );
  //};
  //
  //// Array.isArray
  //// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  //if(!Array.isArray) {
  //  Array.isArray = function (vArg) {
  //    return Object.prototype.toString.call(vArg) === "[object Array]";
  //  };
  //}
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method hasClass
  // * @param {HTMLElement} element
  // * @param {String} class_name CSS class name
  // * @returns {boolean} 指定 CSS class が存在するか否かの真偽値を返します
  // */
  //Sagen.hasClass = function( element, class_name ) {
  //  var regex;
  //  regex = new RegExp(class_name, 'i');
  //  return !!element.className.match(regex);
  //};
  ///**
  // * @for Sagen
  // * @static
  // * @method addClass
  // * @param {HTMLElement} element 対象 tag element
  // * @param {String} class_name 追加 CSS class name, 1件だけ指定可能です
  // * @returns {string} 追加後の CSS class を返します
  // */
  //Sagen.addClass = function( element, class_name ) {
  //  if ( !Sagen.hasClass( element, class_name ) ) {
  //    // class が無かったら
  //    var className = element.className,
  //      pre_space = "";
  //    if ( className !== "" ) {
  //      pre_space = " ";
  //    }
  //    return element.className += pre_space + class_name;
  //  }
  //};
  //
  ///**
  // *
  // * @for Sagen
  // * @static
  // * @method removeClass
  // * @param {HTMLElement} element 対象 tag element
  // * @param {String} class_name 削除 CSS class name, 1件だけ指定可能です
  // * @returns {string} 削除後の CSS class を返します
  // */
  //Sagen.removeClass = function( element, class_name ) {
  //  if ( Sagen.hasClass( element, class_name ) ) {
  //    // class があれば
  //    element.className = element.className.replace( class_name, "" ).trim().split( "  " ).join( " " );
  //    return element.className;
  //  }
  //};

  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,

    option = [
      "orientation",
      "ios",
      "canvas",
      "browser",
      "transition",
      "transform",
      "bgSize"
    ],
    dataSet = ( function ( window ){

      var
        document = window.document,
        sagen = document.getElementById( "sagen" ),

        //data_orientation = false,
        //data_android = false,
        //data_ios = false,
        //data_canvas = false,
        //data_browser = false,
        //data_transition = false,
        //data_transform = false,

        results = {},
        attributes = false,
        data,
        key,
        dataKey,
        val;

      if ( !!sagen ) {
        // id: sagen defined

        if ( typeof sagen.dataset !== "undefined" ) {
          // can use dataset
          data = sagen.dataset;

        } else {
          // use attributes
          data = sagen.attributes;
          attributes = true;

        }

        for ( key in data ) {

          if ( data.hasOwnProperty( key ) ) {

            if ( attributes ) {
              // attribute の場合は data- を削除
              dataKey = key.replace( "data-", "" );

            } else {

              dataKey = key;

            }

            if ( option.indexOf( dataKey ) !== -1 ) {

              val = data[ dataKey ].toLowerCase();

              results[ key ] = val === "true";

            }

          }
        }

      }// sagen

      return results;

    //if ( sagen ) {
    //  if ( typeof sagen.dataset !== "undefined" ) {
    //    // sagan.dataset defined
    //    if ( typeof sagen.dataset.orientation !== "undefined" ) {
    //      data_orientation = ( sagen.dataset.orientation.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.android !== "undefined" ) {
    //      data_android = ( sagen.dataset.android.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.ios !== "undefined" ) {
    //      data_ios = ( sagen.dataset.ios.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.canvas !== "undefined" ) {
    //      data_canvas = ( sagen.dataset.canvas.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.browser !== "undefined" ) {
    //      data_browser = ( sagen.dataset.browser.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.transition !== "undefined" ) {
    //      data_transition = ( sagen.dataset.transition.toLowerCase() === "true" );
    //    }
    //
    //    if ( typeof sagen.dataset.transform !== "undefined" ) {
    //      data_transform = ( sagen.dataset.transform.toLowerCase() === "true" );
    //    }
    //  } else {
    //    var
    //      attributes = sagen.attributes,
    //      attribute,
    //      node_name;
    //
    //    for ( var j = attributes.length; --j >= 0; ) {
    //
    //      attribute = attributes[ j ];
    //      node_name = attribute.nodeName.toLowerCase();
    //
    //      if ( node_name === 'data-orientation' ) {
    //
    //        data_orientation = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-android' ) {
    //
    //        data_android = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-ios' ) {
    //
    //        data_ios = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-canvas' ) {
    //
    //        data_canvas = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-browser' ) {
    //
    //        data_browser = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-transition' ) {
    //
    //        data_transition = attribute.nodeValue.toLowerCase() === "true";
    //      } else if ( node_name === 'data-transform' ) {
    //
    //        data_transform = attribute.nodeValue.toLowerCase() === "true";
    //      }
    //    }
    //  }
    //}

    //return {
    //  orientation: data_orientation,
    //  android: data_android,
    //  ios: data_ios,
    //  canvas: data_canvas,
    //  browser: data_browser,
    //  transition: data_transition,
    //  transform: data_transform
    //};

  }( window ) );


  Sagen.Browser = wakegi.Browser;

  Sagen.Dom = wakegi.Dom;

  Sagen.EventDispatcher = Gasane.EventDispatcher;

  /**
   * @method dataset
   * @static
   * @for Sagen
   * @param {string} type
   */
  Sagen.dataset = function ( type ) {

    return dataSet[ type ];

  };
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method orientation
  // * @returns {Boolean} orientation checkするか否かの真偽値
  // */
  //Sagen.orientation = function (){
  //  return data_set.orientation;
  //};
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method android
  // * @returns {Boolean} android checkするか否かの真偽値
  // */
  //Sagen.android = function (){
  //  return data_set.android;
  //};
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method ios
  // * @returns {Boolean} ios checkするか否かの真偽値
  // */
  //Sagen.ios = function (){
  //  return data_set.ios;
  //};
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method canvas
  // * @returns {Boolean} canvas checkするか否かの真偽値
  // */
  //Sagen.canvas = function (){
  //  return data_set.canvas;
  //};
  //
  ///**
  // * @for Sagen
  // * @static
  // * @method browser
  // * @return {Boolean} Browser checkするか否かの真偽値
  // */
  //Sagen.browser = function () {
  //  return data_set.browser;
  //};
  ///**
  // * @for Sagen
  // * @static
  // * @method transition
  // * @return {Boolean} CSS3 transition checkするか否かの真偽値
  // */
  //Sagen.transition = function () {
  //
  //  return data_set.transition;
  //};
  ///**
  // * @for Sagen
  // * @static
  // * @method transform
  // * @return {Boolean} CSS3 transform checkするか否かの真偽値
  // */
  //Sagen.transform = function () {
  //
  //  return data_set.transform;
  //};

}( window, Sagen ) );