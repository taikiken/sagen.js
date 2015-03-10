/**
 * @module Sagen
 */
(function( Sagen ) {
  "use strict";

  /**
   * Static class holding library specific information such as the version and buildDate of
   * the library.
   * @class Sagen
   **/
  var s = Sagen.build = Sagen.build || {};

  /**
   * The version string for this release.
   * @property version
   * @type String
   * @static
   **/
  s.version = /*version*/"0.2.23"; // injected by build process

  /**
   * The build date for this release in UTC format.
   * @property buildDate
   * @type String
   * @static
   **/
  s.buildDate = /*date*/"Mon, 09 Mar 2015 14:22:10 GMT"; // injected by build process

})( this.Sagen );
