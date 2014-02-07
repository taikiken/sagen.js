/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:55
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

        abs = window.Math.abs,

        Browser = Sagen.Browser,
        iOS = Browser.iOS,
        Android = Browser.Android,
        Canvas = Browser.Canvas,

        _is_orientation_change = "onorientationchange" in window,
        _is_orientation = "orientation" in window,
        _orientation_event = _is_orientation_change ? "orientationchange" : "resize",

        _element = document.documentElement
    ;

    function _initialize () {
        var class_names = [],
            number;

        // write class
        if ( iOS.is() ) {
            // iOS
            if ( iOS.iPad() ) {
                // iPad
                class_names.push( "ios" );
                class_names.push( "ipad" );
                class_names.push( "tablet" );
            } else if ( iOS.iPod() ) {
                // iPod
                class_names.push( "ios" );
                class_names.push( "ipod" );
                class_names.push( "mobile" );
            } else if ( iOS.iPhone() ) {
                // iPhone
                class_names.push( "ios" );
                class_names.push( "iphone" );
                class_names.push( "mobile" );
            }

            if ( iOS.fullScreen() ) {
                // standalone
                class_names.push( "standalone" );
            }

            // version
            number =  iOS.number();
            class_names.push( "ios" + number.join("") );
            class_names.push( "ios" + number[ 0 ] );
            class_names.push( "ios" + number[ 0 ] + number[ 1 ] );

        } else if ( Android.is() ) {
            // Android
            if ( Android.phone() ) {
                // phone
                class_names.push( "android" );
                class_names.push( "mobile" );
            } else if ( Android.tablet() ) {
                // tablet
                class_names.push( "android" );
                class_names.push( "tablet" );
            }

            // version
            number = Android.number();
            class_names.push( "android" + number.join( "" ) );
            class_names.push( "android" + number[ 0 ] );
            class_names.push( "android" + number[ 0 ] + number[ 1 ] );
        }

        if ( Browser.Touch.is() ) {
            // touch device
            class_names.push( "touch" );
        }

        if ( _is_orientation_change ) {
            // orientation change
            class_names.push( "orientation-change" );
        }

        if ( _is_orientation ) {
            // orientation
            class_names.push( "orientation" );
        }

        _addClass( class_names.join( " " ) );
    }

    function _addClass ( class_name ) {

        Sagen.addClass( _element, class_name );
    }

    function _removeClass ( class_name ) {

        Sagen.removeClass( _element, class_name );
    }

    // check portrait
    function _portrait () {
        return abs( window.orientation ) !== 90;
    }

    // check landscape
    function _landscape () {
        return abs( window.orientation ) === 90;
    }

    // event handler
    function _onOrientation () {
        var direction;

        if ( _portrait() ) {
            // portrait
            _removeClass( "landscape" );
            _addClass( "portrait" );
            direction = "portrait"
        } else if ( _landscape() ) {
            // landscape
            _removeClass( "portrait" );
            _addClass( "landscape" );
            direction = "landscape"
        }

        Device.onOrientation( direction );
    }

    /**
     * Device 情報に基づきhtml tagへCSSクラスネームを書き込みます
     * @class Device
     * @constructor
     */
    var Device = function () {
        throw "Viewport cannot be instantiated";
    };

    Device = {
        /**
         * orientation 監視を開始します。
         * @for Device
         * @method listen
         * @static
         */
        listen: function (){
            // orientation check start
            window.addEventListener( _orientation_event, _onOrientation, false );
        },
        /**
         * orientation 監視を止めます。
         * @for Device
         * @method abort
         * @static
         */
        abort: function (){
            // orientation check stop
            window.removeEventListener( _orientation_event, _onOrientation, false );
        },
        /**
         * portraitか否かを返します。
         * @for Device
         * @method portrait
         * @return {Boolean} portraitならばtrue
         * @static
         */
        portrait: function (){
            return _portrait();
        },
        /**
         * landscapeか否かを返します。
         * @for Device
         * @method landscape
         * @return {Boolean} landscapeならばtrue
         * @static
         */
        landscape: function (){
            return _landscape();
        },
        /**
         * canvas, webglが使用可能かを調べcss classを書き込みます
         * @for Device
         * @method canvas
         * @static
         */
        canvas: function (){
            if ( Canvas.is() ) {
                // canvas enable
                _addClass( "canvas" );

                if ( Canvas.webgl() ) {
                    _addClass( "webgl" );
                }
            }
        }
    };

    /**
     * orientation が変更されると実行されます。
     * 上書きし使用します。
     * for Device
     * @method onOrientation
     * @static
     */
    Device.onOrientation = function ( direction ){};

    Sagen.Device = Device;

    // write action
    _initialize();
    _onOrientation();

    if ( Sagen.orientation() ) {
        // orientation check
        Device.listen();
    }

    if ( Sagen.canvas() ) {
        Device.canvas();
    }

}( window, this.Sagen || {} ) );