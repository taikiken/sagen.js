/**
 * @module Sagen
 */
(function( Sagen ) {
  "use strict";

  ///**
  // * Static class holding library specific information such as the version and buildDate of
  // * the library.
  // * @class Sagen
  // **/
  //var s = Sagen.build = Sagen.build || {};
  /**
   * @class Build
   * @constructor
   */
  function Build () {}

  /**
   * The version string for this release.
   * @property version
   * @type String
   * @static
   **/
  Build.version = /*version*/"0.2.25"; // injected by build process

  /**
   * The build date for this release in UTC format.
   * @property buildDate
   * @type String
   * @static
   **/
  Build.buildDate = /*date*/"Wed, 11 Mar 2015 10:16:32 GMT"; // injected by build process

  Sagen.Build = Build;

})( window.Sagen );