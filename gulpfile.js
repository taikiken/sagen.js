/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/16 - 14:54
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/*jslint node: true */

// ----------------------------------------------------------------
"use strict";
var settings = require( './gulp_setting.js');

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
// import task directory
// $.requireDir('./task', { recurse: true });
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// scripts
var patterns = settings.patterns;

var libName = 'sagen.js';
var scripts = [];

// dependencies
// scripts.push( dir.dependencies + '/kaketsugi.min.js');
// scripts.push( dir.dependencies + '/gasane.min.js');
// scripts.push( dir.dependencies + '/wakegi.min.js');

// kaketsugi
scripts.push(dir.src + '/kaketsgi/kaketsugi.js');

// gasane
scripts.push(dir.src + '/gasane/Gasane.js');
scripts.push(dir.src + '/gasane/event/EventDispatcher.js');
scripts.push(dir.src + '/gasane/event/Cycle.js');
scripts.push(dir.src + '/gasane/event/Fps.js');
scripts.push(dir.src + '/gasane/event/Polling.js');

// wakegi
scripts.push(dir.src + '/wakegi/wakegi.js');

// Browser
scripts.push(dir.src + '/wakegi/Browser.js');

// Utility
scripts.push(dir.src + '/wakegi/util/Iro.js');
scripts.push(dir.src + '/wakegi/util/Util.js');

// CSS3
scripts.push(dir.src + '/wakegi/css/Patterns.js');
scripts.push(dir.src + '/wakegi/css/Css3.js');
scripts.push(dir.src + '/wakegi/css/Transition.js');
scripts.push(dir.src + '/wakegi/css/Transform.js');

// document
scripts.push(dir.src + '/wakegi/document/Element.js');
scripts.push(dir.src + '/wakegi/document/Dom.js');
scripts.push(dir.src + '/wakegi/document/Dataset.js');

// device
scripts.push(dir.src + '/wakegi/device/Windows.js');

scripts.push(dir.src + '/wakegi/device/iOS.js');

scripts.push(dir.src + '/wakegi/device/Mac.js');

scripts.push(dir.src + '/wakegi/device/Android.js');
scripts.push(dir.src + '/wakegi/device/Touch.js');
scripts.push(dir.src + '/wakegi/device/Mobile.js');

// ua
scripts.push(dir.src + '/wakegi/browser/FxiOS.js');
scripts.push(dir.src + '/wakegi/browser/Edge.js');
scripts.push(dir.src + '/wakegi/browser/IE.js');
scripts.push(dir.src + '/wakegi/browser/CriOS.js');
scripts.push(dir.src + '/wakegi/browser/Chrome.js');
scripts.push(dir.src + '/wakegi/browser/Firefox.js');
scripts.push(dir.src + '/wakegi/browser/Safari.js');

// Sagen
scripts.push(dir.src + '/Sagen.js');

// device
scripts.push(dir.src + '/sagen/device/Orientation.js');
scripts.push(dir.src + '/sagen/device/Classes.js');
scripts.push(dir.src + '/sagen/device/Device.js');
scripts.push(dir.src + '/sagen/device/Viewport.js');

scripts.push(dir.src + '/sagen/execute.js');

// ----------------------------------------------------------------
// task
// ----------------------------------------------------------------

// move old folder
gulp.task('script:move:old', function() {
  return gulp.src(dir.libs + '/*')
    .pipe(gulp.dest(dir.old))
    .pipe($.size( { title: '*** script:move:old ***' }));
});

gulp.task('script:clean:libs', function() {
  //$.del.bind(null,
  //  [ dir.libs + '/*' ],
  //  {
  //    base: process.cwd(),
  //    dot:true,
  //    force: true
  //  }
  //);
  $.del(
    [
      dir.libs + '/*',
    ],
    {
      base: process.cwd(),
      dot: true,
      force: true,
    },
    function(err, deletedFiles) {
      console.log('files deleted:' + deletedFiles.length + "\n" + deletedFiles.join("\n"));
    });

});

// build
gulp.task('script:min', function() {
  return gulp.src(scripts)
    .pipe($.concat(libName))
    .pipe($.replace({ patterns: patterns }))
    // concat libName
    .pipe(gulp.dest(dir.libs))
    .pipe($.rename(function(path) {
      path.basename = path.basename + '-' + version;
    } ))
    // concat libName-version
    .pipe(gulp.dest(dir.libs))
    // .pipe( $.uglify( { preserveComments: 'some' } ) )
    .pipe($.uglify(
      {
        output: {
          comments: 'some',
          // comments: /^!|^\*!/,
          // comments: 'license',
        }
      }
    ))
    .pipe($.rename({ suffix: '.min' }))
    // minified libName-version.min
    .pipe(gulp.dest(dir.libs))
    .pipe($.rename(function(path) {
      path.basename = path.basename.replace( '-' + version, '');
    }))
    // minified libName.min
    .pipe(gulp.dest(dir.libs))
    .pipe($.size({ title: '*** script-min ***' }));
});

// api
gulp.task('script:api', function() {
  return gulp.src([
    // dir.src + '/Sagen.js',
    // dir.src + '/execute.js',
    // dir.src + '/device/*.js',
    dir.src + '/**/*.js',
  ] )
    .pipe($.yuidoc())
    .pipe($.yuidoc.parser())
    .pipe(gulp.dest(dir.docs));

});


// // Lint JavaScript
// gulp.task('script-hint', function () {
//   return gulp.src( [
//     dir.src + '/**/*.js',
//     '!' + dir.src + '/dependencies/**/*.js'
//   ] )
//     .pipe( $.jshint() )
//     .pipe( $.jshint.reporter('jshint-stylish'));
// });


// ESLint
gulp.task('js:eslint', function() {
  return gulp.src(dir.src + '/**/*.js')
    .pipe($.eslint({
      useEslintrc: false,
      configFile: './eslint.es5.yml'
    }))
    .pipe($.eslint.format())
    .pipe($.size( { title: '*** js:eslint ***' } ));
});



// ----------------------------------------------------------------
// sequence
// compile & api
gulp.task('script:build', function() {

  $.runSequence(
    'js:eslint',
    'script:move:old',
    'script:clean:libs',
    'script:min'
 );

});


// ----------------------------------------------------------------
//  task
// ----------------------------------------------------------------
gulp.task('build', ['script:build'], function() {});
