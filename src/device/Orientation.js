/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 19:33
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
  "use strict";

  var
    document = window.document,
    Sagen = window.Sagen;

  Sagen.Orientation = ( function (){
    var
      EventDispatcher = Sagen.EventDispatcher,
      Browser = Sagen.Browser,
      Css3 = Browser.Css3,
      iOS = Browser.iOS,

      _abs = Math.abs,
      _int = parseInt,
      /**
       * @property _orientation
       * @static
       * @type {boolean}
       * @private
       */
      _orientation,
      /**
       * @property _eventType
       * @static
       * @type {string}
       * @private
       */
      _eventType,
      /**
       * @property _handler
       * @static
       * @type {Function}
       * @private
       */
      _handler,
      /**
       * @property _mediaQuery
       * @static
       * @type {MediaQueryList}
       * @private
       */
      _mediaQuery,

      _start;

    /**
     * @class Orientation
     * @use EventDispatcher
     * @static
     * @constructor
     */
    function Orientation () {
      throw new Error( "Orientation can't create instance." );
    }

    var p = Orientation.prototype;

    p.constructor = Orientation;

    /**
     * @event CHANGE_ORIENTATION
     * @static
     * @type {string}
     */
    Orientation.CHANGE_ORIENTATION = "changeOrientation";

    EventDispatcher.initialize( Orientation );

    /**
     * @method init
     * @static
     */
    Orientation.init = function () {

      Orientation.listen().fire();

    };

    /**
     * @method canOrientation
     * @static
     * @return {boolean}
     */
    Orientation.canOrientation = function () {

      if ( typeof _orientation === "undefined" ) {

        _orientation = Css3.orientation();

      }

      return _orientation;

    };
    /**
     * @method eventType
     * @static
     * @return {string}
     */
    Orientation.eventType = function () {

      if ( typeof _eventType === "undefined" ) {

        _eventType = Css3.orientationChange() ? "orientationchange" : "resize";

      }

      return _eventType;

    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "portrait" にします
     * @method portrait
     * @static
     */
    Orientation.portrait = function () {
      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "portrait", scope: Orientation } );
    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "landscape" にします
     * @method landscape
     * @static
     */
    Orientation.landscape = function () {
      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "landscape", scope: Orientation } );
    };
    /**
     * @method listen
     * @static
     * @return {Orientation}
     */
    Orientation.listen = function () {
      var
        handler;

      if ( !_start ) {

        _start = true;

        if ( typeof window.addEventListener !== "undefined" ) {

          if ( Css3.matchMedia() ) {
            // can use matchMedia
            //handler = Orientation._listenMatchMedia;

            Orientation._listenMatchMedia();

          } else {
            // matchMediaが使えないので代わりに window.orientationあるいは window 縦横比を使い判定します
            handler = Orientation._listenOrientation;
            _handler = handler;
            window.addEventListener( Orientation.eventType(), handler, false );

          }

        }

      }

      return Orientation;

    };
    /**
     * @method abort
     * @static
     */
    Orientation.abort = function () {

      if ( !!_handler && typeof window.addEventListener !== "undefined" ) {

        window.removeEventListener( Orientation.eventType(), _handler );

      }

    };
    /**
     * イベントを強制的に発火させます
     * @method fire
     * @static
     */
    Orientation.fire = function () {

      if ( !!_handler ) {

        _handler();

      } else if ( !!_mediaQuery ) {

        Orientation._onRotate( _mediaQuery );

      }

    };
    /**
     * @method _listenOrientation
     * @static
     * @private
     */
    Orientation._listenOrientation = function () {

      if ( Orientation.canOrientation() ) {
        // window.orientation が使える
        // degree check

        if ( Orientation._checkDegree() ) {
          // portrait
          Orientation.portrait();

        } else {

          Orientation.landscape();

        }

      } else {
        // window 幅,高さを使う
        // aspect check
        if ( Orientation._checkAspect() ) {
          // portrait
          Orientation.portrait();

        } else {

          Orientation.landscape();

        }

      }

    };
    /**
     * @method _checkDegree
     * @static
     * @return {boolean}
     * @private
     */
    Orientation._checkDegree = function () {

      return _abs( window.orientation ) !== 90;

    };
    /**
     * @method _checkAspect
     * @static
     * @return {boolean}
     * @private
     */
    Orientation._checkAspect = function () {

      var
        w = _int( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10 ),
        h = _int( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10 );

      return h > w;

    };

    /**
     * window.matchMedia listener handler
     * @method _onRotate
     * @static
     * @param {MediaQueryList} mediaQuery
     * @private
     */
    Orientation._onRotate = function ( mediaQuery ) {

      // use matchMediaå
      if ( mediaQuery.matches ) {
        // portrait
        Orientation.portrait();

      } else {
        // landscape
        Orientation.landscape();

      }
    };
    /**
     * @method _onOrientationChange
     * @static
     * @private
     */
    Orientation._onOrientationChange = function () {

      if ( Orientation._checkDegree() ) {
        // portrait
        Orientation.portrait();

      } else {
        // landscape
        Orientation.landscape();

      }

    };

    /**
     * @method _listenMatchMedia
     * @static
     * @private
     */
    Orientation._listenMatchMedia = function () {

      var mql = window.matchMedia( "(orientation: portrait)" );
      _mediaQuery = mql;

      if ( iOS.is() && iOS.version() < 6 ) {
        // iOS 5 以下だと mql.addListener が作動しないのでorientationchangeを使用します
        window.addEventListener( Orientation.eventType(), Orientation._onOrientationChange, false );

      } else {

        mql.addListener( Orientation._onRotate );

      }

    };

    return Orientation;

  }() );

}( window ) );