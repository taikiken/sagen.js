/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/24 - 12:06
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
//  Gulp Module
// ----------------------------------------------------------------
var gulp = require( 'gulp' );

var runSequence = require('run-sequence');
var size = require('gulp-size');
var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
var uglifyJs = require( 'gulp-uglifyjs' );
var uglify = require( 'gulp-uglify' );
var shell = require( 'gulp-shell' );
var plumber = require( 'gulp-plumber' );
var changed = require('gulp-changed');
var cache = require('gulp-cache');
var rimraf = require('rimraf');
var del = require('del');
var path = require( 'path' );
var cached = require( 'gulp-cached' );
var yuidoc = require( 'gulp-yuidoc' );
var replace = require('gulp-replace-task');
var sourceMaps = require( 'gulp-sourcemaps' );
var requireDir = require('require-dir');
var jshint = require('gulp-jshint');

// ----------------------------------------------------------------
//  project directory list
// ----------------------------------------------------------------

var src = '../src';
var libs = '../libs';
var old = '../old';
var docs = '../_docs';
var example = '../example';
var dependencies = '../dependencies';

// ----------------------------------------------------------------
// package.json
var pkg = require( './package.json' );
var url = pkg.repository.url;
var version = pkg.version;

module.exports = {
  dir: {
    src: src,
    libs: libs,
    docs: docs,
    old: old,
    example: example,
    dependencies: dependencies
  },
  pkg: pkg,
  version: version,
  url: url,
  gulp: gulp,
  plugin: {
    runSequence: runSequence,
    size: size,
    concat: concat,
    rename: rename,
    uglifyJs: uglifyJs,
    uglify: uglify,
    plumber: plumber,
    shell: shell,
    changed: changed,
    cache: cache,
    rimraf: rimraf,
    del: del,
    path: path,
    cached: cached,
    yuidoc: yuidoc,
    sourceMaps: sourceMaps,
    replace: replace,
    requireDir: requireDir,
    jshint: jshint
  },
  patterns: [
    {
      match: 'buildTime',
      replacement: new Date().toLocaleString()
    },
    {
      match: 'year',
      replacement: new Date().getFullYear()
    },
    {
      match: 'version',
      replacement: version
    },
    {
      match: 'url',
      replacement: url
    }
  ],
  AUTOPREFIXER_BROWSERS: [
    'ie >= 8',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.0'
  ]
};
