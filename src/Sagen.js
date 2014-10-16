/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 *
 *
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

/**
 * global object
 *
 * @example
 *
 *      <script type="text/javascript" src="/js/sagen-VERSION.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-android="true"
 *          data-ios="true"
 *          data-canvas="true">
 *      </script>
 *
 *      ( function ( window ){
 *         "use strict";
 *         var Sagen = window.Sagen
 *         ;
 *
 *         if ( Sagen.Browser.iOS.is() ) {
 *              // iOS
 *         }
 *
 *      }( window ) );
 *
 *
 * @module Sagen
 * @type {object}
 */
var Sagen = {};

( function ( window, Sagen ){
    "use strict";

    // trim
    // three.js
    String.prototype.trim = String.prototype.trim || function () {
        return this.replace( /^\s+|\s+$/g, '' );
    };

    // Array.isArray
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if(!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    /**
     * @for Sagen
     * @static
     * @method hasClass
     * @param {HTMLElement} element
     * @param {String} class_name CSS class name
     * @returns {boolean} 指定 CSS class が存在するか否かの真偽値を返します
     */
    Sagen.hasClass = function( element, class_name ) {
        var regex;
        regex = new RegExp(class_name, 'i');
        return !!element.className.match(regex);
    };
    /**
     * @for Sagen
     * @static
     * @method addClass
     * @param {HTMLElement} element 対象 tag element
     * @param {String} class_name 追加 CSS class name, 1件だけ指定可能です
     * @returns {string} 追加後の CSS class を返します
     */
    Sagen.addClass = function( element, class_name ) {
        if ( !Sagen.hasClass( element, class_name ) ) {
            // class が無かったら
            var className = element.className,
                pre_space = "";
            if ( className !== "" ) {
                pre_space = " ";
            }
            return element.className += pre_space + class_name;
        }
    };

    /**
     *
     * @for Sagen
     * @static
     * @method removeClass
     * @param {HTMLElement} element 対象 tag element
     * @param {String} class_name 削除 CSS class name, 1件だけ指定可能です
     * @returns {string} 削除後の CSS class を返します
     */
    Sagen.removeClass = function( element, class_name ) {
        if ( Sagen.hasClass( element, class_name ) ) {
            // class があれば
            element.className = element.className.replace( class_name, "" ).trim().split( "  " ).join( " " );
            return element.className;
        }
    };

    var data_set = ( function ( window ){
        var document = window.document,
            sagen = document.getElementById( "sagen" ),

            data_orientation = false,
            data_android = false,
            data_ios = false,
            data_canvas = false,
            data_browser = false
        ;

        if ( sagen ) {
            if ( typeof sagen.dataset !== "undefined" ) {
                // sagan.dataset defined
                if ( typeof sagen.dataset.orientation !== "undefined" ) {
                    data_orientation = ( sagen.dataset.orientation.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.android !== "undefined" ) {
                    data_android = ( sagen.dataset.android.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.ios !== "undefined" ) {
                    data_ios = ( sagen.dataset.ios.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.canvas !== "undefined" ) {
                    data_canvas = ( sagen.dataset.canvas.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.browser !== "undefined" ) {
                    data_browser = ( sagen.dataset.browser.toLowerCase() === "true" );
                }
            } else {
                var attributes = sagen.attributes,
                    attribute,
                    node_name;

                for ( var j = attributes.length; --j >= 0; ) {

                    attribute = attributes[ j ];
                    node_name = attribute.nodeName.toLowerCase();

                    if ( node_name === 'data-orientation' ) {

                        data_orientation = attribute.nodeValue.toLowerCase() === "true";
                    } else if ( node_name === 'data-android' ) {

                        data_android = attribute.nodeValue.toLowerCase() === "true";
                    } else if ( node_name === 'data-ios' ) {

                        data_ios = attribute.nodeValue.toLowerCase() === "true";
                    } else if ( node_name === 'data-canvas' ) {

                        data_canvas = attribute.nodeValue.toLowerCase() === "true";
                    } else if ( node_name === 'data-browser' ) {

                        data_browser = attribute.nodeValue.toLowerCase() === "true";
                    }
                }
            }
        }

        return {
            orientation: data_orientation,
            android: data_android,
            ios: data_ios,
            canvas: data_canvas,
            browser: data_browser
        };

    }( window ) );

    /**
     * @for Sagen
     * @static
     * @method orientation
     * @returns {Boolean} orientation checkするか否かの真偽値
     */
    Sagen.orientation = function (){
        return data_set.orientation;
    };

    /**
     * @for Sagen
     * @static
     * @method android
     * @returns {Boolean} android checkするか否かの真偽値
     */
    Sagen.android = function (){
        return data_set.android;
    };

    /**
     * @for Sagen
     * @static
     * @method ios
     * @returns {Boolean} ios checkするか否かの真偽値
     */
    Sagen.ios = function (){
        return data_set.ios;
    };

    /**
     * @for Sagen
     * @static
     * @method canvas
     * @returns {Boolean} canvas checkするか否かの真偽値
     */
    Sagen.canvas = function (){
        return data_set.canvas;
    };

    /**
     * @for Sagen
     * @static
     * @method browser
     * @return {Boolean} Browser checkするか否かの真偽値
     */
    Sagen.browser = function () {
        return data_set.browser;
    };

}( window, Sagen ) );