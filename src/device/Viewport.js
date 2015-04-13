/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 18:48
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

  Sagen.Viewport = ( function (){
    var
      Browser = Sagen.Browser,
      iOS = Browser.iOS,
      Element = Browser.Element,
      /**
       * @property _viewport
       * @static
       * @type {HTMLElement}
       * @private
       */
      _viewport,
      /**
       * @property _content
       * @static
       * @type {string}
       * @private
       */
      _content;

    /**
     * @class Viewport
     * @static
     * @constructor
     */
    function Viewport () {
      throw new Error( "Viewport can't create instance." );
    }

    var p = Viewport.prototype;

    p.constructor = Viewport;

    /**
     * @method init
     * @static
     */
    Viewport.init = function () {

      if ( Sagen.dataset( "ios" ) ) {

        Viewport.minimalUi();

      }

    };
    /**
     * @method find
     * @static
     * @return {Viewport}
     */
    Viewport.find = function () {

      if ( typeof _viewport === "undefined" ) {
        // _viewport undefined
        _viewport = Element.find( "meta[name='viewport']" );

        if ( !!_viewport ) {

          _content = _viewport.content;

        } else {

          _viewport = "";
          _content = "";

        }

      }

      return Viewport;

    };
    /**
     * @method add
     * @static
     * @param {string} option
     * @return {Viewport}
     */
    Viewport.add = function ( option ) {
      var
        content;

      Viewport.find();

      if ( !!_viewport ) {

        content = _viewport.content;

        if ( content.indexOf( option ) === -1 ) {

          _viewport.content = content + ", " + option;

        }

      }

      return Viewport;

    };
    /**
     * @method replace
     * @static
     * @param {string} oldOption
     * @param {string} newOption
     * @return {Viewport}
     */
    Viewport.replace = function ( oldOption, newOption ) {
      var
        content;

      Viewport.find();

      if ( !!_viewport ) {

        content = _viewport.content;

        if ( content.indexOf( oldOption ) !== -1 ) {

          content.split( oldOption ).join( newOption );

        }

      }

      return Viewport;

    };
    /**
     * @method minimalUi
     * @static
     */
    Viewport.minimalUi = function () {
      var version = iOS.version();

      if ( version >= 7.1 && version < 8.0 ) {

        Viewport.add( "minimal-ui" );

      }

    };

    return Viewport;
  }() );

}( window ) );