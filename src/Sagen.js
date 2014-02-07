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
 * This notice shall be included in all copies or substantial portions of the Software.
 */
var Sagen = {};

( function ( Sagen ){
    "use strict";

    /**
     * @for Sagen
     * @static
     * @method hasClass
     * @param {DOMElement} element
     * @param {String} class_name
     * @returns {Array|{index: number, input: string}\*}
     */
    Sagen.hasClass = function( element, class_name ) {
        var regex;
        regex = new RegExp(class_name, 'i');
        return element.className.match(regex);
    };
    /**
     * @for Sagen
     * @static
     * @method addClass
     * @param {DOMElement} element
     * @param {String} class_name
     * @returns {Array|{index: number, input: string}\*}
     */
    Sagen.addClass = function( element, class_name ) {
        if ( !Sagen.hasClass( element, class_name ) ) {
            // class が無かったら
            return element.className += " " + class_name;
        }
    };
    /**
     * @for Sagen
     * @static
     * @method removeClass
     * @param {DOMElement} element
     * @param {String} class_name
     * @returns {Array|{index: number, input: string}\*}
     */
    Sagen.removeClass = function( element, class_name ) {
        if ( Sagen.hasClass( element, class_name ) ) {
            // class があれば
            return element.className = element.className.replace( class_name, "" );
        }
    };

    var dataset = ( function ( window ){
        var document = window.document,
            sagen = document.getElementById( "sagen" ),

            data_orientation = false,
            data_android = false,
            data_ios = false,
            data_canvas = false
        ;

        if ( sagen ) {
            if ( typeof sagen.dataset !== "undefined" ) {
                // sagan.dataset defined
                if ( typeof sagen.dataset.orientation !== "undefined" ) {
                    data_orientation = !!( sagen.dataset.orientation.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.android !== "undefined" ) {
                    data_android = !!( sagen.dataset.android.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.ios !== "undefined" ) {
                    data_ios = !!( sagen.dataset.ios.toLowerCase() === "true" );
                }

                if ( typeof sagen.dataset.canvas !== "undefined" ) {
                    data_canvas = !!( sagen.dataset.canvas.toLowerCase() === "true" );
                }
            }
        }

        return {
            orientation: data_orientation,
            android: data_android,
            ios: data_ios,
            canvas: data_canvas
        };

    }( window ) );

    /**
     * @for Sagen
     * @static
     * @method orientation
     * @returns {Boolean} orientation checkするかの真偽値
     */
    Sagen.orientation = function (){
        return dataset.orientation;
    };

    /**
     * @for Sagen
     * @static
     * @method android
     * @returns {Boolean} android checkするかの真偽値
     */
    Sagen.android = function (){
        return dataset.android;
    };

    /**
     * @for Sagen
     * @static
     * @method ios
     * @returns {Boolean} ios checkするかの真偽値
     */
    Sagen.ios = function (){
        return dataset.android;
    };

    /**
     * @for Sagen
     * @static
     * @method canvas
     * @returns {Boolean} canvas checkするかの真偽値
     */
    Sagen.canvas = function (){
        return dataset.canvas;
    };

}( Sagen ) );