/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/04/22 - 19:35
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * github pages
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
// task
// ----------------------------------------------------------------

gulp.task( 'pages-launch', function () {

  gulp.src( dir.docs + '/**/*' )
    .pipe( gulp.dest( dir.root ) )
    .pipe( $.size( { title: '*** pages-launch ***' } ) );

} );