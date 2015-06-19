/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Sagen
 */
( function ( window ){
  "use strict";

  var
    Sagen = window.Sagen,

    Device = Sagen.Device,
    Viewport = Sagen.Viewport;

  // execute Sagen
  // insert class at html
  Device.init();
  Viewport.init();

}( window ) );