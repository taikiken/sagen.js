/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/04/10 - 15:06
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/*jslint node: true */
"use strict";

// ----------------------------------------------------------------
// setting
var settings = require( '../setting.js' );

// ----------------------------------------------------------------
// Directory
var dir = settings.dir;

// ----------------------------------------------------------------
// package
var pkg = settings.pkg;
var url = settings.url;
var version = settings.version;

// ----------------------------------------------------------------
// gulp
var gulp = settings.gulp;
var $ = settings.plugin;

// ----------------------------------------------------------------
// scripts
var patterns = settings.patterns;

var libName = 'sagen.js';
var scripts = [];

// dependencies
scripts.push( dir.dependencies + '/kaketsugi.min.js' );
scripts.push( dir.dependencies + '/gasane.min.js' );
scripts.push( dir.dependencies + '/wakegi.min.js' );

// Sagen
scripts.push( dir.src + '/Sagen.js' );

// device
scripts.push( dir.src + '/device/Orientation.js' );
scripts.push( dir.src + '/device/Classes.js' );
scripts.push( dir.src + '/device/Device.js' );
scripts.push( dir.src + '/device/Viewport.js' );

scripts.push( dir.src + '/execute.js' );

// ----------------------------------------------------------------
// task
// ----------------------------------------------------------------

// build
gulp.task( 'script-build', function () {

  return gulp.src( scripts )
    .pipe( $.concat( libName ) )
    .pipe( $.replace( { patterns: patterns } ) )
    // concat libName
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.rename( function ( path ) {

      path.basename = path.basename + '-' + version;

    } ) )
    // concat libName-version
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.uglify( { preserveComments: 'some' } ) )
    .pipe( $.rename( { suffix: '.min' } ) )
    // minified libName-version.min
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.rename( function ( path ) {
      path.basename = path.basename.replace( '-' + version, '' );
    }) )
    // minified libName.min
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.size( { title: '*** script-build ***' } ) );
} );

// api
gulp.task( 'script-api', function () {

  return gulp.src( [

    dir.src + '/Sagen.js',
    dir.src + '/execute.js',
    dir.src + '/device/*.js'

  ] )
    .pipe( $.yuidoc() )
    .pipe( gulp.dest( dir.docs ) );

} );

// compile & api
gulp.task( 'script-build-api', function () {

  $.runSequence(
    'script-build',
    'script-api'
  );

} );