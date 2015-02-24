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
  s.version = /*version*/"0.2.22"; // injected by build process

  /**
   * The build date for this release in UTC format.
   * @property buildDate
   * @type String
   * @static
   **/
  s.buildDate = /*date*/"Tue, 24 Feb 2015 06:52:52 GMT"; // injected by build process

})( this.Sagen );
