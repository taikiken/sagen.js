/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:30
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window, Sagen ){
    "use strict";
    var document = window.document,

        Browser = Sagen.Browser,

        _contents = [],
        _viewport,
        _content
    ;

    // get viewport content
    ( function (){
        var contents;

        if ( typeof document.querySelector !== "undefined" ) {
            _viewport = document.querySelector( "meta[name='viewport']" );

            if ( _viewport ) {

                _content = _viewport.content;
                // ToDo
                // for remove setting
//                contents = _content.split( "," );
//
//                for ( var i = 0, limit = contents.length; i < limit; i++ ) {
//                    var con = contents[ i ];
//                    _contents.push( con.split( " " ).join("") );
//                }
            }
        }
    }() );

    /**
     *
     * @param {String} content
     * @returns {HTMLElement}
     * @private
     */
    function _createMeta ( content ) {
        var meta = document.createElement( "meta" );

        meta.name = "viewport";
        meta.content = content;

        return meta;
    }


    /**
    * Viewport 情報を管理します
    * @class Viewport
    * @constructor
    */
    var Viewport = function () {
        throw "Viewport cannot be instantiated";
    };

    Viewport = {
        /**
         * viewport へ設定を追加します
         * @for Viewport
         * @method add
         * @param {String} option
         * @static
         */
        add: function ( option ){
            if ( _viewport && _content && option ) {
                _viewport.content = _viewport.content + ", " + option;
            }
        },
        /**
         * viewport へ設定を置き換えます
         * @for Viewport
         * @method replace
         * @param {String} old_option 置換前の文字列
         * @param {String} [new_option] 置換後の文字列 optional
         * @static
         */
        replace: function ( old_option, new_option ){
            new_option = new_option || "";

            if ( _viewport && _content && old_option ) {
                _viewport.content = _viewport.content.split( old_option ).join( new_option );
            }
        },
        /**
         * viewport タグを書き込みます
         * @for Viewport
         * @method write
         * @param {String} viewport viewport content部Text
         * @static
         */
        write: function ( viewport ){
            document.getElementsByTagName( "head" )[ 0 ].appendChild( _createMeta( viewport ) );
        },

        /**
         * @for Viewport
         * @static
         */
        Android: {
            /**
             * target-densitydpi=device-dpi option を viewport content 属性に追加します
             * @for Viewport.Android
             * @method targetDensity
             * @static
             */
            targetDensity: function (){
                Viewport.add( "target-densitydpi=device-dpi" );
            }
        },
        /**
         * @for Viewport
         * @static
         */
        iOS: {
            /**
             * minimal-ui option を viewport content 属性に追加します
             * @for Viewport.iOS
             * @method minimalUI
             * @static
             */
            minimalUI: function (){
                Viewport.add( "minimal-ui" );
            }
        }
    };

    Sagen.Viewport = Viewport;

    if ( Sagen.android() && !Browser.Chrome.is() ) {
        // android viewport added
        if ( Browser.Android.is() && !Browser.Chrome.is() ) {
            Viewport.Android.targetDensity();
        }
    }

    if ( Sagen.ios() ) {
        // iOS 7.1 viewport added
        if ( Browser.iOS.is() && Browser.iOS.version() >= 7.1 ) {
            Viewport.iOS.minimalUI();
        }
    }

}( window, this.Sagen || {} ) );