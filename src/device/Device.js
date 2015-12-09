/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:34
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * @module Sagen
 * @submodule Device
 * */
( function ( window ){
  'use strict';

  var
    Sagen = window.Sagen;

  Sagen.Device = ( function (){
    var
      Browser = Sagen.Browser,
      Android = Browser.Android,
      iOS = Browser.iOS,
      Mac = Browser.Mac,
      Windows = Browser.Windows,
      Css3 = Browser.Css3,
      Element = Browser.Element,
      Safari = Browser.Safari,
      Chrome = Browser.Chrome,
      Firefox = Browser.Firefox,
      FxiOS = Browser.FxiOS,
      IE = Browser.IE,
      Edge = Browser.Edge,
      Orientation = Sagen.Orientation,

      Classes = Sagen.Classes,
      /**
       * @property _classes
       * @static
       * @private
       * @type {Classes}
       */
      _classes;

    /**
     * @class Device
     * @static
     * @constructor
     */
    function Device () {
      throw new Error( 'Device can\'t create instance.' );
    }

    var p = Device.prototype;

    p.constructor = Device;
    /**
     * @method init
     * @static
     */
    Device.init = function () {

      var
        classes = new Classes( [] );

      _classes = classes;

      Device._default( classes )
        ._option( classes )
        .call( function () {

          classes.write();

        } );

    };
    /**
     * @method call
     * @static
     * @param {function} func
     */
    Device.call = function ( func ) {

      func();

    };

    /**
     * @method _default
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._default = function ( classes ) {

      // default
      Device._ios( classes )
        ._android( classes )
        ._css3( classes )
        ._os( classes );

      return Device;

    };
    /**
     * @method _option
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._option = function ( classes ) {

      if ( Sagen.dataSet( 'browser' ) ) {

        Device._ie( classes )
          ._chrome( classes )
          ._safari( classes )
          ._firefox( classes )
          ._edge( classes )
          ._fxios( classes );

      }

      if ( Sagen.dataSet( 'canvas' ) ) {

        Device._canvas( classes );

      }

      // orientation
      // ToDo: orientation change
      if ( Sagen.dataSet( 'orientation' ) && ( iOS.is() || Android.is()) ) {

        Orientation.on( Orientation.CHANGE_ORIENTATION, Device._onOrientation );
        Orientation.init();

      }

      return Device;

    };

    /**
     * @method _version
     * @static
     * @param {Classes} classes
     * @param {string} prefix
     * @param {Array} numbers
     * @return {Device}
     * @private
     */
    Device._version = function ( classes, prefix, numbers ) {

      var
        version = '',
        _ = '_',
        i, limit;

      for ( i = 0, limit = numbers.length; i < limit; i = i + 1 ) {

        version += numbers[ i ] + '';
        classes.add( prefix + version );

        version += _;

      }

      return Device;

    };
    /**
     * @method _ios
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._ios = function ( classes ) {

      var
        prefix;

      if ( iOS.is() ) {

        // iOS
        prefix = 'ios';

        classes.add( prefix );

        if ( iOS.iPad() ) {

          // ipad
          classes.add( 'ipad' ).add( 'tablet' );

        } else if ( iOS.iPod() ) {

          // ipod
          classes.add( 'ipod' ).add( 'mobile' );


        } else if ( iOS.iPhone() ) {

          // ipod
          classes.add( 'iphone' ).add( 'mobile' );

        }

        // version
        Device._version( classes, prefix, iOS.numbers() );

      }

      return Device;

    };
    /**
     * @method _android
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._android = function ( classes ) {

      var
        prefix;

      if ( Android.is() ) {

        // Android
        prefix = 'android';

        classes.add( prefix );

        if ( Android.tablet() ) {

          // Android.tablet
          classes.add( 'tablet' );

        } else if ( Android.phone() ) {

          // Android.phone
          classes.add( 'mobile' );

        }

        if ( Android.standard() ) {

          classes.add( 'android-standard' );

        }

        if ( Android.hd() ) {

          classes.add( 'android-hd' );

        }

        // version
        Device._version( classes, prefix, Android.numbers() );

      }

      return Device;

    };
    /**
     * @method _css3
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._css3 = function ( classes ) {

      if ( Css3.transition() ) {

        classes.add( 'transition' );

      }

      if ( Css3.transform() ) {

        classes.add( 'transform' );

      }

      if ( Css3.matchMedia() ) {

        classes.add( 'matchMedia' );

      }

      if ( Css3.orientation() ) {

        classes.add( 'orientation' );

      }

      if ( Css3.orientationChange() ) {

        classes.add( 'orientation-change' );

      }

      if ( Css3.backgroundSize() ) {

        classes.add( 'background-size' );

      }

      return Device;

    };
    /**
     * @method _element
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._element = function ( classes ) {

      if ( Element.touch() ) {

        classes.add( 'touch' );

      }

      if ( Element.querySelector() ) {

        classes.add( 'querySelector' );

      }

      return Device;

    };
    /**
     * @method _os
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._os = function ( classes ) {

      var
        pc = false;

      if ( Mac.is() ) {

        classes.add( 'mac' );
        pc = true;

      }

      if ( Windows.is() ) {

        classes.add( 'windows' );
        pc = true;

        if ( Windows.phone() ) {

          // windows phone は pc false
          pc = false;
          classes.add( 'windows-phone' );
          classes.add( 'mobile' );

        }

      }

      if ( pc ) {

        classes.add( 'other' );

      }

      return Device;

    };
    /**
     * @method _safari
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._safari = function ( classes ) {

      var
        prefix;

      if ( Safari.is() ) {

        prefix = 'safari';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Safari.numbers() );

      }

      return Device;

    };
    /**
     * @method _chrome
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._chrome = function ( classes ) {

      var
        prefix;

      if ( Chrome.is() ) {

        prefix = 'chrome';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Chrome.numbers() );

      }

      return Device;

    };
    /**
     * @method _firefox
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._firefox = function ( classes ) {

      var
        prefix;

      if ( Firefox.is() ) {

        prefix = 'firefox';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Firefox.numbers() );

      }

      return Device;

    };
    /**
     * @method _firefox
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._edge = function ( classes ) {

      var
        prefix;

      if ( Edge.is() ) {

        prefix = 'edge';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Edge.numbers() );

      }

      return Device;

    };
    /**
     * Mac Firefox check
     * @method _fxios
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._fxios = function ( classes ) {

      var
        prefix;

      if ( FxiOS.is() ) {

        // FxiOS is true
        prefix = 'fxios';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, FxiOS.numbers() );

      }

      return Device;

    };
    /**
     * @method _ie
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._ie = function ( classes ) {

      var
        prefix;

      if ( IE.is() ) {

        prefix = 'ie';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, String( IE.version() ).split( '.' ) );

      }

      return Device;

    };
    /**
     * @method _canvas
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._canvas = function ( classes ) {

      if ( Element.canvas() ) {

        classes.add( 'canvas' );

        if ( Element.webgl() ) {

          classes.add( 'webgl' );

        }

      }

      return Device;

    };

    /**
     * orientation event handler
     * @method _onOrientation
     * @static
     * @param {Object} event
     * @private
     */
    Device._onOrientation = function ( event ) {

      var
        direction = event.direction;

      if ( direction === 'portrait' ) {

        _classes.removeClass( 'landscape' ).addClass( 'portrait' );

      } else if ( direction === 'landscape' ) {

        _classes.removeClass( 'portrait' ).addClass( 'landscape' );

      }

    };

    return Device;

  }() );

}( window ) );
