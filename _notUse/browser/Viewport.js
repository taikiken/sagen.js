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