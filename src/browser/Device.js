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

        EventDispatcher = Sagen.EventDispatcher,
        EventObject = Sagen.EventObject,

        _is_orientation_change = "onorientationchange" in window,
        _is_orientation = "orientation" in window,
        _orientation_event = _is_orientation_change ? "orientationchange" : "resize",

        _element = document.documentElement,
        _other = false,

        _orientation_check = Sagen.orientation(),
//        _width_check = _orientation_check && Android.is() && Android.tablet(),

        use_matchmedia = typeof window.matchMedia !== "undefined",
        mql
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

                // hd tablet or not
                if ( window.innerWidth >= 1024 && window.innerHeight >= 1024 ) {
                    class_names.push( "tablet-hd" );
                }
            }

            // version
            number = Android.number();
            class_names.push( "android" + number.join( "" ) );
            class_names.push( "android" + number[ 0 ] );
            class_names.push( "android" + number[ 0 ] + number[ 1 ] );
        } else {
            // not iOS and not Android
            class_names.push( "other" );
            _other = true;
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

    // ------------------
    // for android tablet portrait check

    function _android_portrait () {
        var w = parseInt( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10 ),
            h = parseInt( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10 );

        return h > w;
    }

    function _android_landscape () {
        var w = parseInt( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10 ),
            h = parseInt( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10 );

        return w > h;
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
    function _width_onOrientation () {
        var direction;

        if ( _android_portrait() ) {
            // portrait
            _removeClass( "landscape" );
            _addClass( "portrait" );
            direction = "portrait";
        } else {
            // landscape
            _removeClass( "portrait" );
            _addClass( "landscape" );
            direction = "landscape";
        }

        Device._onOrientation( direction );
    }

    function _onOrientation () {
        if ( !_is_orientation ) {
            _width_onOrientation();
            return;
        }

        var direction;

        function set_portrait () {
            _removeClass( "landscape" );
            _addClass( "portrait" );
            direction = "portrait";
        }

        function set_landscape () {
            _removeClass( "portrait" );
            _addClass( "landscape" );
            direction = "landscape";
        }

        if ( use_matchmedia ) {

            if ( window.matchMedia( "(orientation: portrait)" ).matches ) {
                // portrait
                set_portrait();
            } else {
                // landscape
                set_landscape();
            }

        } else {
            // not matchMedia
            if ( _portrait() ) {
                // portrait
                set_portrait();
            } else if ( _landscape() ) {
                // landscape
                set_landscape();
            }
        }

        Device._onOrientation( direction );
    }

    /**
     * Device 情報に基づきhtml tagへCSSクラスネームを書き込みます
     * @class Device
     * @constructor
     */
    var Device = function () {
        throw "Device cannot be instantiated";
    };

    /**
     * @for Viewport
     * @property CHANGE_ORIENTATION
     * @type {string}
     * @static
     */
    Device.CHANGE_ORIENTATION = "changeOrientation";

    EventDispatcher.initialize( Device );

    Device._onOrientation = function ( direction ){
        Device.dispatchEvent( new EventObject( Device.CHANGE_ORIENTATION, [ direction ] ), this );
    };

    /**
     * orientation 監視を開始します。
     * data-orientation="true"だと自動で実行されます。
     * @for Device
     * @method listen
     * @static
     */
    Device.listen = function (){
        // orientation check start
        if ( typeof window.addEventListener !== "undefined" && !_other ) {
            window.addEventListener( _orientation_event, _onOrientation, false );
        }
    };
    /**
     * orientation 監視を止めます。
     * @for Device
     * @method abort
     * @static
     */
    Device.abort = function (){
        // orientation check stop
        if ( typeof mql !== "undefined" ) {
            // window matchMedia defined
            mql.removeListener( _matchMedia );
        }

        window.removeEventListener( _orientation_event, _onOrientation );
    };

    /**
     * portraitか否かを返します。
     * @for Device
     * @method portrait
     * @return {Boolean} portraitならばtrue
     * @static
     */
    Device.portrait = function (){
        return _portrait();
    };
    /**
     * landscapeか否かを返します。
     * @for Device
     * @method landscape
     * @return {Boolean} landscapeならばtrue
     * @static
     */
    Device.landscape = function (){
        return _landscape();
    };

    /**
     * canvas, webglが使用可能かを調べcss classを書き込みます
     * @for Device
     * @method canvas
     * @static
     */
    Device.canvas = function (){
        if ( Canvas.is() ) {
            // canvas enable
            _addClass( "canvas" );

            if ( Canvas.webgl() ) {
                _addClass( "webgl" );
            }
        }
    };

    /**
     * 強制的にorientation eventを発火します。data-orientationがtrueになっている必要があります。
     * @for Device
     * @method fire
     * @static
     */
    Device.fire = function (){
        if ( _orientation_check && !_other ) {
            _onOrientation();
        }
    };

    Sagen.Device = Device;

    // write action
    _initialize();

    if ( !_other ) {
        _onOrientation();
    } else {
        _orientation_check = false;
    }

    if ( _orientation_check && !_other ) {
        // orientation check
        Device.listen();
    }

    if ( Sagen.canvas() ) {
        Device.canvas();
    }

}( window, this.Sagen || {} ) );