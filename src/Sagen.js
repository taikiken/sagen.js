/**
 * @license inazumatv.com
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Copyright (c) 2011-@@year inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @version @@version
 * @build @@buildTime
 * @github: @@url
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 *
 * @module Sagen
 */
/**
 * @example
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-ios="true"
 *          data-canvas="true">
 *      </script>
 *
 *      <!--OS X Chrome-->
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 * Browser / 端末判定にも使えます
 *
 *      ( function ( window ){
 *         "use strict";
 *         var Sagen = window.Sagen;
 *
 *         if ( Sagen.Browser.iOS.is() ) {
 *              // iOS
 *         }
 *
 *      }( window ) );
 */

var Sagen = window.Sagen || {};

( function ( window, Sagen ){
  "use strict";

  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,

    option = [
      "orientation",
      "ios",
      "canvas",
      "browser"
    ],
    dataSet = ( function ( window ){

      var
        document = window.document,
        sagen = document.getElementById( "sagen" ),
        results = {},
        data;

      function modern ( result, data ) {
        var
          key, dataKey, val;

        for ( key in data ) {
          //alert( key + ":" + typeof data.hasOwnProperty );
          //if ( data.hasOwnProperty( key ) ) {

            dataKey = key;

            val = data[ dataKey ].toLowerCase();
            results[ key ] = val === "true";

          //}
        }

        return result;
      }

      function legacy ( result, data ) {
        var
          i, limit, attribute, nodeName, dataKey;

        for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {

          attribute = data[ i ];
          nodeName = attribute.nodeName.toLowerCase();

          if ( nodeName.indexOf( "data-" ) !== -1 ) {

            dataKey = nodeName.replace( "data-", "" );
            results[ dataKey ] = attribute.nodeValue.toLowerCase() === "true";

          }

        }

        return result;
      }

      if ( !!sagen ) {
        // id: sagen defined

        if ( typeof sagen.dataset !== "undefined" ) {
          // can use dataset
          data = sagen.dataset;
          results = modern( results, data );

        } else {
          // use attributes
          data = sagen.attributes;
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
   * @method dataset
   * @static
   * @for Sagen
   * @param {string} type
   */
  Sagen.dataset = function ( type ) {

    return dataSet[ type ];

  };

}( window, Sagen ) );