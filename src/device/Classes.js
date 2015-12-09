/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 16:02
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
 * html tag へ class を付与します
 *
 * @requires Sagen.Dom
 *
 * @module Sagen
 * @submodule Classes
 * */
( function ( window ){
  'use strict';

  var
    document = window.document,
    Sagen = window.Sagen;

  Sagen.Classes = ( function (){

    var
      Dom = Sagen.Dom;

    /**
     * @class Classes
     * @param {Array} [classes]
     * @default []
     * @param {Element} [dom] CSS Class Add target HTML Element, default document.documentElement (html)
     * @default document.documentElement
     * @constructor
     */
    function Classes ( classes, dom ) {

      classes = Array.isArray( classes ) ? classes : [];
      dom = !!dom || document.documentElement;

      /**
       * @property _classes
       * @type {Array}
       * @private
       */
      this._classes = classes;
      /**
       * @property _dom
       * @type {Dom}
       * @private
       */
      this._dom = new Dom( dom );

    }

    var p = Classes.prototype;
    p.constructor = Classes;
    /**
     * @method add
     * @param className
     * @return {Classes}
     */
    p.add = function ( className ) {

      var
        classes = this._classes;

      if ( classes.indexOf( className ) === -1 ) {

        classes.push( className );

      }

      return this;

    };
    /**
     * @method write
     * @return {Classes}
     */
    p.write = function () {

      this._dom.addClass( this._classes.join( ' ' ) );
      return this;

    };

    /**
     * @method addClass
     * @param {string} className
     * @return {Classes}
     */
    p.addClass = function ( className ) {

      this._dom.addClass( className );
      return this;

    };
    /**
     * @method removeClass
     * @param {string} className
     * @return {Classes}
     */
    p.removeClass = function ( className ) {

      this._dom.removeClass( className );
      return this;

    };

    return Classes;
  }() );
}( window ) );
