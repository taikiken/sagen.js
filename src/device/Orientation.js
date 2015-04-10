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
      Css3 = Sagen.Browser.Css3,

      _abs = Math.abs,
      _int = parseInt,

      _orientation,

      _eventType,
      _handler;

    function Orientation () {

    }

    var p = Orientation.prototype;

    p.constructor = Orientation;

    /**
     * @event CHANGE_ORIENTATION
     * @type {string}
     */
    Orientation.CHANGE_ORIENTATION = "changeOrientation";

    EventDispatcher.initialize( Orientation );


    Orientation.init = function () {

      Orientation.listen().fire();

    };

    Orientation.canOrientation = function () {

      if ( typeof _orientation === "undefined" ) {

        _orientation = Css3.orientation();

      }

      return _orientation;

    };

    Orientation.eventType = function () {

      if ( typeof _eventType === "undefined" ) {

        _eventType = Css3.orientationChange() ? "orientationchange" : "resize";

      }

      return _eventType;

    };

    Orientation.portrait = function () {
      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "portrait", scope: Orientation } );
    };

    Orientation.landscape = function () {
      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "landscape", scope: Orientation } );
    };

    Orientation.listen = function () {
      var
        handler;

      if ( typeof window.addEventListener !== "undefined" ) {

        if ( Css3.matchMedia() ) {
          // can use matchMedia
          handler = Orientation._listenMatchMedia;

        } else {
          // matchMediaが使えないので代わりに window.orientation, window 縦横比を使う
          handler = Orientation._listenOrientation;

        }

        _handler = handler;
        window.addEventListener( Orientation.eventType(), handler, false );

      }

      return Orientation;

    };

    Orientation.abort = function () {

      if ( !!_handler && typeof window.addEventListener !== "undefined" ) {

        window.removeEventListener( Orientation.eventType(), _handler );

      }

    };

    Orientation.fire = function () {

      if ( !!_handler ) {

        _handler();

      }

    };

    Orientation._listenOrientation = function () {

      if ( Orientation.canOrientation() ) {
        // window.orientation が使える
        // degree check

        if ( Orientation._checkDegree ) {
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

    Orientation._checkDegree = function () {

      return _abs( window.orientation ) !== 90;

    };

    Orientation._checkAspect = function () {

      var
        w = _int( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10 ),
        h = _int( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10 );

      return h > w;

    };

    Orientation._listenMatchMedia = function () {
      // use matchMedia
      if ( window.matchMedia( "(orientation: portrait)" ).matches ) {
        // portrait
        Orientation.portrait();

      } else {
        // landscape
        Orientation.landscape();

      }

    };


    return Orientation;
  }() );

}( window ) );