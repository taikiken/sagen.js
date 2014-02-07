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

}( Sagen ) );/**
 * @module Sagen
 */
(function( Sagen ) {
    "use strict";

    /**
     * Static class holding library specific information such as the version and buildDate of
     * the library.
     * @class Sagen
     **/
    var s = Sagen.build = Sagen.build || {};

    /**
     * The version string for this release.
     * @property version
     * @type String
     * @static
     **/
    s.version = /*version*/"0.0.3"; // injected by build process

    /**
     * The build date for this release in UTC format.
     * @property buildDate
     * @type String
     * @static
     **/
    s.buildDate = /*date*/"Fri, 07 Feb 2014 05:35:13 GMT"; // injected by build process

})( this.Sagen );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/12 - 17:25
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Browser class from inazumatv.util
 */
( function ( window, Sagen ){
    "use strict";
    var navigator = window.navigator,
        _ua = navigator.userAgent,

        _ie6 = !!_ua.match(/msie [6]/i),
        _ie7 = !!_ua.match(/msie [7]/i),
        _ie8 = !!_ua.match(/msie [8]/i),
        _ie9 = !!_ua.match(/msie [9]/i),
        _ie10 = !!_ua.match(/msie [10]/i),
        _ie11 = !!_ua.match(/trident\/[7]/i) && !!_ua.match(/rv:[11]/i),
        _ie = !!_ua.match(/msie/i) || _ie11,
        _legacy = _ie6 || _ie7|| _ie8,

        _ipad = !!_ua.match(/ipad/i),
        _ipod = !!_ua.match(/ipod/i),
        _iphone = !!_ua.match(/iphone/i) && !_ipad && !_ipod,
        _ios = _ipad || _ipod || _iphone,

        _android = !!_ua.match(/android/i),
        _mobile = _ios || _android,

        _chrome = !!_ua.match(/chrome/i),
        _firefox = !!_ua.match(/firefox/i),
        _safari = !!_ua.match(/safari/i) && !_chrome,

        _touch = typeof window.ontouchstart !== "undefined",

        _fullScreen = typeof navigator.standalone !== "undefined" ? navigator.standalone : false,

        _android_phone = false,
        _android_tablet = false,
        _ios_version = -1,
//        _android_version = -1,
//        _android_version_major = -1,
//        _android_version_num = -1,
        _safari_version = -1,

        _safari_versions = [ -1, 0, 0 ],
        _ios_versions,

        _android_version,
        _android_versions,

        _canvas = !!window.CanvasRenderingContext2D
    ;

    if ( _android ) {
        _android_phone = !!_ua.match(/mobile/i);

        if ( !_android_phone ) {
            _android_tablet = true;
        }
    }
    // private
    // iOS version
    // http://stackoverflow.com/questions/8348139/detect-_ios-version-less-than-5-with-javascript
    /**
     * iOS version detection
     * @for Browser
     * @method _iosVersion
     * @returns {Array} iOS version 配列 3桁
     * @private
     */
    function _iosVersion () {
        var v, versions = [ -1, 0, 0 ];
        if ( _ios ) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            _ios_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        }

        return versions;
    }
    _ios_versions = _iosVersion();

    // Android version
//    /**
//     * Android version detection
//     * @for Browser
//     * @method _get_androidVersion
//     * @returns {Array} Android version 配列 2桁~3桁
//     * @private
//     */
//    function _androidVersion () {
//        var ua_lower = _ua.toLowerCase(),
//            version,
//            versions = [ -1, 0, 0 ];
//
//        if ( _android && !_firefox ) {
//
//            version = ua_lower.substr( ua_lower.indexOf( "_android" ) + 8, 5 ).split( "." );
//            versions = [
//                parseInt( version[ 0 ], 10 ),
//                parseInt( version[ 1 ], 10 ),
//                parseInt( version[ 2 ], 10 )
//            ];
//
//            _android_version_major = versions[ 0 ];
//
//            var a_num = versions[ 0 ] + "." + versions[ 1 ];
//
//            if ( versions[ 2 ] ) {
//                // has small version
//                a_num += versions[ 2 ];
//            }
//
//            _android_version_num = parseFloat( a_num );
//
//            _android_version = versions;
//        }
//        return versions;
//    }
//    _android_versions = _androidVersion();

    /**
     * Android version detection
     * @for Browser
     * @method _get_androidVersion
     * @returns {Array} Android version 配列 3桁
     * @private
     */
    function _get_androidVersion () {
        var v, versions = [ -1, 0, 0 ];
        if ( _android ) {
            v = (navigator.appVersion).match(/Android (\d+)\.(\d+)\.?(\d+)?/);
            versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            _android_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        }

        return versions;
    }
    _android_versions = _get_androidVersion();

    // Safari version
    /**
     * Safari version detection
     * @returns {Array} Safari version 配列 2桁~3桁
     * @private
     */
    function _safariVersion () {
        var v, versions;

        v = (navigator.appVersion).match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);
        versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        _safari_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        return versions;
    }

    if ( _safari && !_mobile ) {
        // not _mobile and _safari
        _safari_versions = _safariVersion();
    }

    /**
     * Browser 情報を管理します
     * @class Browser
     * @constructor
     */
    var Browser = function () {
        throw "Browser cannot be instantiated";
    };

    /**
     *
     * @type {{iOS: {is: Function, number: Function, major: Function, version: Function}, Android: {is: Function, number: Function, major: Function, version: Function}, IE: {is: Function, version: Function}, Chrome: {is: Function}, Safari: {is: Function}, Firefox: {is: Function}, _ie: Function, _ie6: Function, _ie7: Function, _ie8: Function, _ie9: Function, _ie10: Function, _ie11: Function, _chrome: Function, _firefox: Function, _safari: Function, _legacy: Function, _mobile: Function, _ios: Function, _ios_version: Function, _android_version: Function, _android_version_major: Function, _android_version_num: Function, _android: Function, _iphone: Function, _ipad: Function, _ipod: Function, hideURLBar: Function}}
     */
    Browser = {
        // new version
        /**
         * iOS に関する情報
         * @for Browser
         * @property iOS
         * @type Object
         * @static
         */
        iOS: {
            /**
             * @for Browser.iOS
             * @method is
             * @returns {boolean} iOS か否かを返します
             * @static
             */
            is: function (){
                return _ios;
            },
            /**
             * @for Browser.iOS
             * @method number
             * @returns {Array} iOS version number を返します [ major, minor, build ]
             * @static
             */
            number: function (){
                return _ios_versions;
            },
            /**
             * @for Browser.iOS
             * @method major
             * @returns {Number} iOS major version number を返します
             * @static
             */
            major: function (){
                return _ios_versions[ 0 ];
            },
            /**
             * @for Browser.iOS
             * @method version
             * @returns {Number} iOS version を返します 9.99
             * @static
             */
            version: function (){
                return _ios_version;
            },
            /**
             * @for Browser.iOS
             * @method iPhone
             * @returns {Boolean} iPhone か否かを返します
             * @static
             */
            iPhone: function (){
                return _iphone;
            },
            /**
             * @for Browser.iOS
             * @method iPad
             * @returns {Boolean} iPad か否かを返します
             * @static
             */
            iPad: function (){
                return _ipad;
            },
            /**
             * @for Browser.iOS
             * @method iPod
             * @returns {Boolean} iPod か否かを返します
             * @static
             */
            iPod: function (){
                return _ipod;
            },
            /**
             * @for Browser.iOS
             * @method fullScreen
             * @returns {boolean} standalone mode か否かを返します
             * @static
             */
            fullScreen: function (){
                return _fullScreen;
            }
        },
        /**
         * Android に関する情報
         * @for Browser
         * @property Android
         * @type Object
         * @static
         */
        Android: {
            /**
             * @for Browser.Android
             * @method is
             * @returns {boolean} Android か否かを返します
             * @static
             */
            is: function (){
                return _android;
            },
            /**
             * @for Browser.Android
             * @method number
             * @returns {Array} Android version number を返します [ major, minor, build ]
             * @static
             */
            number: function (){
                return _android_versions;
            },
            /**
             * @for Browser.Android
             * @method major
             * @returns {Number} Android major version number を返します
             * @static
             */
            major: function (){
//                return _android_version_major;
                return _android_versions[ 0 ];
            },
            /**
             * @for Browser.Android
             * @method version
             * @returns {Number} Android version を返します 9.99
             * @static
             */
            version: function (){
//                return _android_version_num;
                return _android_version;
            },
            /**
             * @for Browser.Android
             * @method phone
             * @returns {boolean} Android Phone か否かを返します
             * @static
             */
            phone: function (){
                return _android_phone;
            },
            /**
             * @for Browser.Android
             * @method tablet
             * @returns {boolean} Android Tablet か否かを返します
             * @static
             */
            tablet: function (){
                return _android_tablet;
            }
        },
        /**
         * IE に関する情報
         * @for Browser
         * @property IE
         * @type Object
         * @static
         */
        IE: {
            /**
             * @for Browser.IE
             * @method is
             * @returns {boolean} IE か否かを返します
             * @static
             */
            is: function (){
                return _ie;
            },
            /**
             * @for Browser.IE
             * @method is6
             * @returns {boolean} IE 6 か否かを返します
             */
            is6: function (){
                return _ie6;
            },
            /**
             * @for Browser.IE
             * @method is7
             * @returns {boolean} IE 7 か否かを返します
             */
            is7: function (){
                return _ie7;
            },
            /**
             * @for Browser.IE
             * @method is8
             * @returns {boolean} IE 8 か否かを返します
             */
            is8: function (){
                return _ie8;
            },
            /**
             * @for Browser.IE
             * @method is9
             * @returns {boolean} IE 9 か否かを返します
             */
            is9: function (){
                return _ie9;
            },
            /**
             * @for Browser.IE
             * @method is10
             * @returns {boolean} IE 10 か否かを返します
             */
            is10: function (){
                return _ie10;
            },
            /**
             * @for Browser.IE
             * @method is11
             * @returns {boolean} IE 11 か否かを返します
             */
            is11: function (){
                return _ie11;
            },
            /**
             * @for Browser.IE
             * @method _legacy
             * @returns {boolean} IE 6 or 7 or 8 か否かを返します
             */
            legacy: function (){
                return _legacy;
            },
            /**
             * @for Browser.IE
             * @method version
             * @returns {Number} IE version を返します int 6 ~ 11, IE 6 ~ IE 11 でない場合は -1 を返します
             * @static
             */
            version: function (){
                var v = -1;
                if ( _ie11 ) {
                    v = 11;
                } else if ( _ie10 ) {
                    v = 10;
                } else if ( _ie9 ) {
                    v = 9;
                } else if ( _ie8 ) {
                    v = 8;
                } else if ( _ie7 ) {
                    v = 7;
                } else if ( _ie6 ) {
                    v = 6;
                }
                return v;
            }
        },
        /**
         * Chrome に関する情報
         * @for Browser
         * @property Chrome
         * @type Object
         * @static
         */
        Chrome: {
            /**
             * @for Browser.Chrome
             * @method is
             * @returns {boolean} Chrome か否かを返します
             * @static
             */
            is: function (){
                return _chrome;
            }
        },
        /**
         * Safari に関する情報
         * @for Browser
         * @property Safari
         * @type Object
         * @static
         */
        Safari: {
            /**
             * @for Browser.Safari
             * @method is
             * @returns {boolean} Safari か否かを返します
             * @static
             */
            is: function (){
                return _safari;
            },
            /**
             * @for Browser.Safari
             * @method number
             * @returns {Array} Safari version number を返します [ major, minor, build ]
             * @static
             */
            number: function (){
                return _safari_versions;
            },
            /**
             * @for Browser.Safari
             * @method major
             * @returns {Number} Safari major version number を返します
             * @static
             */
            major: function (){
                return _safari_versions[ 0 ];
            },
            /**
             * @for Browser.Safari
             * @method version
             * @returns {Number} Safari version を返します 9.99
             * @static
             */
            version: function (){
                return _safari_version;
            }
        },
        /**
         * Firefox に関する情報
         * @for Browser
         * @property Firefox
         * @type Object
         * @static
         */
        Firefox: {
            /**
             * @for Browser.Firefox
             * @method is
             * @returns {boolean} Firefox か否かを返します
             * @static
             */
            is: function (){
                return _firefox;
            }
        },
        /**
         * Touch action に関する情報
         * @for Browser
         * @property Touch
         * @type Object
         * @static
         */
        Touch: {
            /**
             * @for Browser.Touch
             * @method is
             * @returns {boolean} Touch 可能か否かを返します
             * @static
             */
            is: function (){
                return _touch;
            }
        },
        /**
         * Mobile action に関する情報
         * @for Browser
         * @property Mobile
         * @type Object
         * @static
         */
        Mobile: {
            /**
             * @for Browser.Mobile
             * @method is
             * @returns {boolean} mobile(smart phone) か否かを返します
             * @static
             */
            is: function (){
                return _mobile;
            },
            /**
             * iPhone, Android phone. URL bar 下へスクロールさせます。<br>
             * window.onload 後に実行します。<br>
             * iOS 7 mobile Safari, Android Chrome and iOS Chrome では動作しません。
             *
             *     function onLoad () {
             *          window.removeEventListener( "load", onLoad );
             *          Browser.Mobile.hideURLBar();
             *     }
             *     window.addEventListener( "load", onLoad, false );
             *
             * @for Browser.Mobile
             * @method hideURLBar
             * @static
             */
            hideURLBar : function (){
                setTimeout( function (){ scrollBy( 0, 1 ); }, 0);
            }
        },
        /**
         * Canvas に関する情報
         * @for Browser
         * @property Canvas
         * @type Object
         * @static
         */
        Canvas: {
            /**
             * @for Browser.Canvas
             * @method is
             * @returns {boolean} canvas 2D が使用可能か否かを返します
             * @static
             */
            is: function (){
                return _canvas;
            },
            /**
             * @for Browser.Canvas
             * @method webgl
             * @returns {boolean} canvas webgl 使用可能か否かを返します
             * @static
             */
            webgl: function (){
                if ( !_canvas ) {
                    return false;
                }

                try {
                    return !!window.WebGLRenderingContext && !!document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
                } catch( e ) {
                    return false;
                }
            }
        }
    };

    Sagen.Browser = Browser;

}( window, this.Sagen || {} ) );/**
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

}( window, this.Sagen || {} ) );/**
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
                _viewport.content = _content + ", " + option;
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
                _viewport.content = _content.split( old_option ).join( new_option );
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
        // android viewport added
        if ( Browser.iOS.is() && Browser.iOS.version() >= 7.1 ) {
            Viewport.iOS.minimalUI();
        }
    }

}( window, this.Sagen || {} ) );