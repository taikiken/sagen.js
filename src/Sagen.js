/*!
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * version @@version
 * build @@buildTime
 * github: @@url
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 */

/**
 *
 *
 * ## Browser detect helper
 *
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします<br>
 *
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-browser="true">
 *      </script>
 *
 *
 *      // html へ class を追加した例
 *      // OS X Chrome
 *
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 *
 *      // Browser / 端末判定にも使えます
 *
 *      if ( Sagen.Browser.iOS.is() ) {
 *        // iOS
 *      }
 *
 *
 *      // orientation 監視にも使えます(iOS, Android)
 *      var Orientation = Sagen.Orientation;
 *
 *
 *      Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {
 *
 *        var direction = event.direction;
 *
 *        if ( direction === 'portrait' ) {
 *          // portrait
 *        }
 *
 *        if ( direction === 'landscape' ) {
 *          // landscape
 *        }
 *
 *      } );
 *
 *      Orientation.listen();
 *
 * @module Sagen
 * @type {{}}
 *
 * */
var Sagen = window.Sagen || {};

( function ( window, Sagen ){
  'use strict';

  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,

    //option = [
    //  "orientation",
    //  "ios",
    //  "canvas",
    //  "browser"
    //],
    dataSet = ( function ( window ){

      var
        document = window.document,
        element = document.getElementById( 'sagen' ),
        results = {},
        data;

      function modern ( result, data ) {
        var
          key,
          //dataKey,
          val;

        for ( key in data ) {

          if ( typeof data.hasOwnProperty === 'function' && data.hasOwnProperty( key ) ) {

            //dataKey = key;

            val = data[ key ].toLowerCase();
            results[ key ] = val === 'true';

          } else {

            val = data[ key ].toLowerCase();
            results[ key ] = val === 'true';

          }
        }

        return result;
      }

      function legacy ( result, data ) {
        var
          i, limit, attribute, nodeName, dataKey;

        for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {

          attribute = data[ i ];
          nodeName = attribute.nodeName.toLowerCase();

          if ( nodeName.indexOf( 'data-' ) !== -1 ) {

            dataKey = nodeName.replace( 'data-', '' );
            results[ dataKey ] = attribute.nodeValue.toLowerCase() === 'true';

          }

        }

        return result;
      }

      if ( !!element ) {
        // id: sagen defined

        if ( typeof element.dataset !== 'undefined' ) {
          // can use dataset
          data = element.dataset;
          results = modern( results, data );

        } else {
          // use attributes
          data = element.attributes;
          //attributes = true;
          results = legacy( results, data );

        }

      }// sagen

      return results;

  }( window ) );


  Sagen.Browser = wakegi.Browser;

  Sagen.Dom = wakegi.Dom;

  Sagen.EventDispatcher = Gasane.EventDispatcher;

  /**
   * @method dataSet
   * @static
   * @for Sagen
   * @param {string} type
   */
  Sagen.dataSet = function ( type ) {

    return dataSet[ type ];

  };

  /**
   * dataSet alias
   * @deprecated instead use dataSet
   * @method dataset
   * @static
   * @for Sagen
   * @type {Function|*}
   */
  Sagen.dataset = Sagen.dataSet;

}( window, Sagen ) );
