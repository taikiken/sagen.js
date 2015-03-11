/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
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
    var
      document = window.document,
      sagen = document.getElementById( "sagen" ),

      data_orientation = false,
      data_android = false,
      data_ios = false,
      data_canvas = false,
      data_browser = false,
      data_transition = false,
      data_transform = false;

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

        if ( typeof sagen.dataset.transition !== "undefined" ) {
          data_transition = ( sagen.dataset.transition.toLowerCase() === "true" );
        }

        if ( typeof sagen.dataset.transform !== "undefined" ) {
          data_transform = ( sagen.dataset.transform.toLowerCase() === "true" );
        }
      } else {
        var
          attributes = sagen.attributes,
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
          } else if ( node_name === 'data-transition' ) {

            data_transition = attribute.nodeValue.toLowerCase() === "true";
          } else if ( node_name === 'data-transform' ) {

            data_transform = attribute.nodeValue.toLowerCase() === "true";
          }
        }
      }
    }

    return {
      orientation: data_orientation,
      android: data_android,
      ios: data_ios,
      canvas: data_canvas,
      browser: data_browser,
      transition: data_transition,
      transform: data_transform
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
  /**
   * @for Sagen
   * @static
   * @method transition
   * @return {Boolean} CSS3 transition checkするか否かの真偽値
   */
  Sagen.transition = function () {

    return data_set.transition;
  };
  /**
   * @for Sagen
   * @static
   * @method transform
   * @return {Boolean} CSS3 transform checkするか否かの真偽値
   */
  Sagen.transform = function () {

    return data_set.transform;
  };

}( window, Sagen ) );/**
 * @module Sagen
 */
(function( Sagen ) {
  "use strict";

  ///**
  // * Static class holding library specific information such as the version and buildDate of
  // * the library.
  // * @class Sagen
  // **/
  //var s = Sagen.build = Sagen.build || {};
  /**
   * @class Build
   * @constructor
   */
  function Build () {}

  /**
   * The version string for this release.
   * @property version
   * @type String
   * @static
   **/
  Build.version = /*version*/"0.2.24"; // injected by build process

  /**
   * The build date for this release in UTC format.
   * @property buildDate
   * @type String
   * @static
   **/
  Build.buildDate = /*date*/"Wed, 11 Mar 2015 10:11:50 GMT"; // injected by build process

  Sagen.Build = Build;

})( window.Sagen );/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 14:26
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window, Sagen ){
  "use strict";

  // EventDispatcher class from EaselJS.
  // Copyright (c) 2010 gskinner.com, inc.
  // http://createjs.com/
  /**
   * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events. All
   * {{#crossLink "DisplayObject"}}{{/crossLink}} classes dispatch events, as well as some of the utilities like {{#crossLink "Ticker"}}{{/crossLink}}.
   *
   * You can either extend this class or mix its methods into an existing prototype or instance by using the
   * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
   *
   * <h4>Example</h4>
   * Add EventDispatcher capabilities to the "MyClass" class.
   *
   *      EventDispatcher.initialize(MyClass.prototype);
   *
   * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
   *
   *      instance.addEventListener("eventName", handlerMethod);
   *      function handlerMethod(event) {
     *          console.log(event.target + " Was Clicked");
     *      }
   *
   * <b>Maintaining proper scope</b><br />
   * When using EventDispatcher in a class, you may need to use <code>Function.bind</code> or another approach to
   * maintain you method scope. Note that Function.bind is not supported in some older browsers.
   *
   *      instance.addEventListener("click", handleClick.bind(this));
   *      function handleClick(event) {
     *          console.log("Method called in scope: " + this);
     *      }
   *
   * Please note that currently, EventDispatcher does not support event priority or bubbling. Future versions may add
   * support for one or both of these features.
   *
   * @class EventDispatcher
   * @constructor
   **/
  var EventDispatcher = function() {
    this.initialize();
  };

  var p = EventDispatcher.prototype;

  p.constructor = EventDispatcher;

  /**
   * Static initializer to mix in EventDispatcher methods.
   * @method initialize
   * @static
   * @param {Object} [target] The target object to inject EventDispatcher methods into. This can be an instance or a
   * prototype.
   **/
  EventDispatcher.initialize = function(target) {
    target.addEventListener = p.addEventListener;
    target.removeEventListener = p.removeEventListener;
    target.removeAllEventListeners = p.removeAllEventListeners;
    target.hasEventListener = p.hasEventListener;
    target.dispatchEvent = p.dispatchEvent;
  };

  // private properties:
  /**
   * @protected
   * @property _listeners
   * @type Object
   **/
  p._listeners = null;

  // constructor:
  /**
   * Initialization method.
   * @method initialize
   * @protected
   **/
  p.initialize = function() {};

  // public methods:
  /**
   * Adds the specified event listener.
   * @method addEventListener
   * @param {String} type The string type of the event.
   * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
   * the event is dispatched.
   * @return {Function | Object} Returns the listener for chaining or assignment.
   **/
  p.addEventListener = function(type, listener) {
    var listeners = this._listeners;
    if (!listeners) { listeners = this._listeners = {}; }
    else { this.removeEventListener(type, listener); }
    var arr = listeners[type];
    if (!arr) { arr = listeners[type] = []; }
    arr.push(listener);
    return listener;
  };

  /**
   * Removes the specified event listener.
   * @method removeEventListener
   * @param {String} type The string type of the event.
   * @param {Function | Object} listener The listener function or object.
   **/
  p.removeEventListener = function(type, listener) {
    var listeners = this._listeners;
    if (!listeners) { return; }
    var arr = listeners[type];
    if (!arr) { return; }
    for (var i=0,l=arr.length; i<l; i++) {
      if (arr[i] === listener) {
        if (l===1) { delete(listeners[type]); } // allows for faster checks.
        else { arr.splice(i,1); }
        break;
      }
    }
  };

  /**
   * Removes all listeners for the specified type, or all listeners of all types.
   * @method removeAllEventListeners
   * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
   **/
  p.removeAllEventListeners = function(type) {
    if (!type) { this._listeners = null; }
    else if (this._listeners) { delete(this._listeners[type]); }
  };

  /**
   * Dispatches the specified event.
   * @method dispatchEvent
   * @param {Object | String} eventObj An object with a "type" property, or a string type. If a string is used,
   * dispatchEvent will construct a generic event object with "type" and "params" properties.
   * @param {Object} [target] The object to use as the target property of the event object. This will default to the
   * dispatching object.
   * @return {Boolean} Returns true if any listener returned true.
   **/
  p.dispatchEvent = function(eventObj, target) {
    var ret=false, listeners = this._listeners;
    if (eventObj && listeners) {
      if (typeof eventObj === "string") { eventObj = {type:eventObj}; }
      var arr = listeners[eventObj.type];
      if (!arr) { return ret; }
      eventObj.target = target||this;
      arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
      for (var i=0,l=arr.length; i<l; i++) {
        var o = arr[i];
        if (o.handleEvent) { ret = ret||o.handleEvent(eventObj); }
        else { ret = ret||o(eventObj); }
      }
    }
    return !!ret;
  };

  /**
   * Indicates whether there is at least one listener for the specified event type.
   * @method hasEventListener
   * @param {String} type The string type of the event.
   * @return {Boolean} Returns true if there is at least one listener for the specified event.
   **/
  p.hasEventListener = function(type) {
    var listeners = this._listeners;
    return !!(listeners && listeners[type]);
  };

  /**
   * @method toString
   * @return {String} a string representation of the instance.
   **/
  p.toString = function() {
    return "[EventDispatcher]";
  };

  Sagen.EventDispatcher = EventDispatcher;
}( window, window.Sagen ) );/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 14:34
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window, Sagen ){
  "use strict";

  /**
   * @class EventObject
   * @param {String} eventType Event Type
   * @param {*} [params] String || Array eventHandler へ送る値をセット。複数の時は配列にセットする
   * @constructor
   */
  var EventObject = function ( eventType, params ){
    if ( typeof params === "undefined" || params === null ) {

      params = [];
    } else if ( !Array.isArray( params ) ) {
      // 配列へ
      params = [ params ];
    }

    this.type = eventType;
    this.params = params;
  };

  var p = EventObject.prototype;

  p.constructor = EventObject;

  /**
   * パラメタ取出し
   * @method getParams
   * @returns {*} 配列を返します
   */
  p.getParams = function (){
    return this.params;
  };

  Sagen.EventObject = EventObject;

}( window, window.Sagen ) );/**
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
  var
    _float = parseFloat,
    _int = parseInt,

    navigator = window.navigator,
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

    // for ios chrome
    _crios = !!_ua.match(/crios/i),

    _chrome = !!_ua.match(/chrome/i),
    _firefox = !!_ua.match(/firefox/i),
    _safari = !!_ua.match(/safari/i),
    _android_standard = _android && _safari && !!_ua.match(/version/i),

    _windows = !!_ua.match(/windows/i),
    _mac = !!_ua.match(/mac os x/i),

    _touch = typeof window.ontouchstart !== "undefined",

    _fullScreen = typeof navigator.standalone !== "undefined" ? navigator.standalone : false,

    _android_phone = false,
    _android_tablet = false,
    _ios_version = -1,
    _safari_version = -1,

    _safari_versions = [ -1, 0, 0 ],
    _ios_versions = [ -1, 0, 0 ],

    _android_version = -1,
    _android_versions = [ -1, 0, 0 ],

    _chrome_version = -1,

    _crios_version = -1,

    _canvas = !!window.CanvasRenderingContext2D,

    _transition,
    _transform;

  if ( _android ) {
    _android_phone = !!_ua.match(/mobile/i);

    if ( !_android_phone ) {
      _android_tablet = true;
    }
  }

  if ( _android_standard ) {
    _chrome = false;
    _safari = false;
  }

  if ( _chrome ) {
    _safari = false;
  }

  // ios chrome
  if ( _crios ) {

    _chrome = true;
    _safari = false;
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
    var v, versions;

    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    versions = [_int(v[1], 10), _int(v[2], 10), _int(v[3] || 0, 10)];
    _ios_version = _float( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );

    return versions;
  }

  if ( _ios ) {
    _ios_versions = _iosVersion();
    _mac = false;
  }

  /**
   * Android version detection
   * @for Browser
   * @method _get_androidVersion
   * @returns {Array} Android version 配列 3桁
   * @private
   */
  function _get_androidVersion () {
    var v, versions;
    v = (navigator.appVersion).match(/Android (\d+)\.(\d+)\.?(\d+)?/);
    versions = [_int(v[1], 10), _int(v[2], 10), _int(v[3] || 0, 10)];
    _android_version = _float( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );

    return versions;
  }

  if ( _android ) {
    _android_versions = _get_androidVersion();
  }

  // Safari version
  /**
   * Safari version detection
   * @returns {Array} Safari version 配列 2桁~3桁
   * @private
   */
  function _safariVersion () {
    var v, versions;

    v = (navigator.appVersion).match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);
    versions = [_int(v[1], 10), _int(v[2], 10), _int(v[3] || 0, 10)];
    _safari_version = _float( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
    return versions;
  }

  //if ( _safari && !_mobile ) {
  if ( _safari ) {
    //// not _mobile and _safari
    // _safari, include mobile
    _safari_versions = _safariVersion();
  }

  function _chromeVersion () {
    var v, versions;

    v = (navigator.appVersion).match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);
    versions = [_int(v[1], 10), _int(v[2], 10), _int(v[3], 10), _int(v[4], 10)];
    return versions.join( "." );
  }

  // exclude iOS chrome
  if ( _chrome && !_crios ) {
    _chrome_version = _chromeVersion();
  }

  function _criosVersion () {
    var v, versions;

    v = (navigator.appVersion).match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/);
    versions = [_int(v[1], 10), _int(v[2], 10), _int(v[3], 10), _int(v[4], 10)];
    return versions.join( "." );
  }

  if ( _crios ) {

    _crios_version = _criosVersion();
    _chrome_version = _crios_version;
  }

  // transition support
  // http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
  _transition = ( function (){
    var p = document.createElement( "p" ).style;

    return "transition" in p || "WebkitTransition" in p || "MozTransition" in p || "msTransition" in p || "OTransition" in p;

  }() );

  // transform support
  _transform = ( function (){
    var p = document.createElement( "p" ).style;

    return "transform" in p || "WebkitTransform" in p || "MozTransform" in p || "OTransform" in p || "msTransform" in p;

  }() );

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
        return _android_versions[ 0 ];
      },
      /**
       * @for Browser.Android
       * @method version
       * @returns {Number} Android version を返します 9.99
       * @static
       */
      version: function (){
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
      },
      /**
       * @for Browser.Android
       * @method standard
       * @returns {boolean} Android standard Browser か否かを返します
       * @static
       */
      standard: function () {
        return _android_standard;
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
      },
      /**
       * @for Browser.Chrome
       * @method version
       * @returns {string|number}
       */
      version: function () {
        return _chrome_version;
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
      },
      /**
       * @for Browser.Mobile
       * @method phone
       * @returns {boolean} Smart Phone(include iPod)か否かを返します
       * @static
       */
      phone: function (){
        return _ipod || _iphone || _android_phone;
      },
      /**
       * @for Browser.Mobile
       * @method tablet
       * @returns {boolean} tablet か否かを返します
       * @static
       */
      tablet: function (){
        return _ipad || _android_tablet;
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
    },
    Mac: {
      /**
       * @for Browser.Mac
       * @method is
       * @return {boolean} Mac OS X or not
       * @static
       */
      is: function () {
        return _mac;
      }
    },
    Windows: {
      /**
       * @for Browser.Windows
       * @method is
       * @return {boolean} Windows or not
       */
      is: function () {
        return _windows;
      }
    },
    Transition: {
      /**
       * @for Browser.Transition
       * @method is
       * @return {boolean} CSS3 transition support or not
       */
      is: function () {

        return _transition;
      }
    },
    Transform: {
      /**
       * @for Browser.Transition
       * @method is
       * @return {boolean} CSS3 transition support or not
       */
      is: function () {

        return _transform;
      }
    }
  };

  Sagen.Browser = Browser;

}( window, window.Sagen ) );/**
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
    use_matchmedia = typeof window.matchMedia !== "undefined";

  function _initialize () {
    var
      class_names = [],
      number,
      version,
      versions,
      version_major;

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

    if ( Sagen.browser() ) {
      // browser check
      if ( Browser.IE.is() ) {
        // IE
        version = Browser.IE.version();

        class_names.push( "ie" );
        class_names.push( "ie" + version );

      } else if ( Browser.Chrome.is() ) {
        // chrome
        version = Browser.Chrome.version() + "";
        versions = version.split( "." );
        version_major = versions.shift();

        class_names.push( "chrome" );
        class_names.push( "chrome" + version_major );
        class_names.push( "chrome" + version.split( "." ).join( "_" ) );

      } else if ( Browser.Safari.is() ) {
        // safari
        version = Browser.Safari.version() + "";
        versions = version.split( "." );
        version_major = versions.shift();

        class_names.push( "safari" );
        class_names.push( "safari" + version_major );
        class_names.push( "safari" + version.split( "." ).join( "_" ) );

      } else if ( Browser.Firefox.is() ) {

        class_names.push( "firefox" );
      }

      if ( Browser.Mac.is() ) {

        class_names.push( "mac" );
      }
      if ( Browser.Windows.is() ) {

        class_names.push( "windows" );
      }
      // Sagen.transition() block へ移動
      //if ( Browser.Transition.is() ) {
      //
      //  class_names.push( "transition" );
      //}
    }

    if ( Sagen.transition() ) {

      if ( Browser.Transition.is() ) {

        class_names.push( "transition" );
      }
    }

    if ( Sagen.transform() ) {

      if ( Browser.Transform.is() ) {

        class_names.push( "transform" );
      }
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

    var direction = "";

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
   * @for Device
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

  /**
   * @for Device
   * @method getElement
   * @returns {HTMLElement} html tag element を返します
   * @static
   */
  Device.getElement = function () {
    return _element;
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

}( window, window.Sagen ) );/**
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

    _viewport = meta;

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

  /**
   * viewport へ設定を追加します
   * @for Viewport
   * @method add
   * @param {String} option
   * @static
   */
  Viewport.add = function ( option ) {
    if ( _viewport && _content && option ) {
      _viewport.content = _viewport.content + ", " + option;
    }
  };

  /**
   * viewport へ設定を置き換えます
   * @for Viewport
   * @method replace
   * @param {String} old_option 置換前の文字列
   * @param {String} [new_option] 置換後の文字列 optional
   * @static
   */
  Viewport.replace = function ( old_option, new_option ){
    new_option = new_option || "";

    if ( _viewport && _content && old_option ) {
      _viewport.content = _viewport.content.split( old_option ).join( new_option );
    }
  };

  /**
   * viewport タグを書き込みます
   * @for Viewport
   * @method write
   * @param {String} viewport viewport content部Text
   * @static
   */
  Viewport.write = function ( viewport ) {
    document.getElementsByTagName( "head" )[ 0 ].appendChild( _createMeta( viewport ) );
  };
  /**
   * viewport content を全て書き換えます
   * @for Viewport
   * @method rewrite
   * @param {string} content
   * @static
   */
  Viewport.rewrite = function ( content ){
    _viewport.content = content;
  };

  /**
   * @for Viewport
   * @static
   */
  Viewport.Android = {
    /**
     * target-densitydpi=device-dpi option を viewport content 属性に追加します
     * @for Viewport.Android
     * @method targetDensity
     * @static
     */
    targetDensity: function (){
      Viewport.add( "target-densitydpi=device-dpi" );
    }
  };

  /**
   * @for Viewport
   * @static
   */
  Viewport.iOS = {
    /**
     * minimal-ui option を viewport content 属性に追加します
     * @for Viewport.iOS
     * @method minimalUI
     * @static
     */
    minimalUI: function (){
      Viewport.add( "minimal-ui" );
    }
  };

  /**
   * @for Viewport
   * @method getMeta
   * @returns {DOMElement} meta: viewport DOMElement を返します
   */
  Viewport.getMeta = function (){
    return _viewport;
  };

  Sagen.Viewport = Viewport;

  if ( Sagen.android() && !Browser.Chrome.is() ) {
    // android viewport added
    if ( Browser.Android.is() ) {
      Viewport.Android.targetDensity();
    }
  }

  if ( Sagen.ios() ) {
    // iOS 7.1 viewport added
    // and iOS 8 under
    var ios_version = Browser.iOS.version();

    if ( Browser.iOS.is() && ios_version >= 7.1 && ios_version < 8.0 ) {
      Viewport.iOS.minimalUI();
    }
  }

}( window, window.Sagen ) );