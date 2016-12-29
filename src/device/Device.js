/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:34
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * @module Sagen
 * @submodule Device
 * */
(function(window) {
  'use strict';
  var
    Sagen = window.Sagen,
    Browser = Sagen.Browser,
    Android = Browser.Android,
    iOS = Browser.iOS,
    Mac = Browser.Mac,
    Windows = Browser.Windows,
    Css3 = Browser.Css3,
    Element = Browser.Element,
    Safari = Browser.Safari,
    Chrome = Browser.Chrome,
    Firefox = Browser.Firefox,
    FxiOS = Browser.FxiOS,
    IE = Browser.IE,
    Edge = Browser.Edge,
    Orientation = Sagen.Orientation,

    Classes = Sagen.Classes,
    /**
     * @property classSymbol
     * @static
     * @private
     * @type {Classes}
     */
    classSymbol;

  /**
   * 端末判定を行います
   * @class Device
   * @static
   * @constructor
   */
  function Device() {
    throw new Error('Device can\'t create instance.');
  }

  var p = Device.prototype;
  p.constructor = Device;
  /**
   * 端末判定処理を始めます
   * @method init
   * @static
   */
  Device.init = function() {
    var
      classes = new Classes([]);

    classSymbol = classes;

    Device
      .default(classes)
      .option(classes)
      .execute(function() {
        classes.write();
      });
  };
  /**
   * 引数関数を実行します
   * @method execute
   * @static
   * @param {function} func 実行する関数
   */
  Device.execute = function(func) {
    func();
  };

  /**
   * 端末 OS 判定処理を行います
   * @method default
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.default = function(classes) {
    // default
    if (Sagen.flag()) {
      Device.ios(classes)
        .android(classes)
        .css3(classes)
        .os(classes);
    }

    return Device;
  };
  /**
   * dataset-browser, dataset-canvas, dataset-orientation option 処理を行います
   * @method option
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.option = function(classes) {
    if (Sagen.dataSet('browser')) {
      // dataset-browser true
      Device.ie(classes)
        .chrome(classes)
        .safari(classes)
        .firefox(classes)
        .edge(classes)
        .fxios(classes);
    }

    if (Sagen.dataSet('canvas')) {
      // dataset-canvas
      Device.canvas(classes);
    }

    // orientation
    // ToDo: orientation change
    if (Sagen.dataSet('orientation') && (iOS.is() || Android.is())) {
      Orientation.on(Orientation.CHANGE_ORIENTATION, Device.onOrientation);
      Orientation.init();
    }
    return Device;
  };

  /**
   * browser / OS version を書き込みます
   * @method version
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @param {string} prefix iphone, ipad... な端末識別子
   * @param {Array} numbers version を配列形式
   * @return {Device} method chain 可能にします
   */
  Device.version = function(classes, prefix, numbers) {
    var
      version = '',
      underScore = '_',
      i, limit;

    for (i = 0, limit = numbers.length; i < limit; i = (i + 1) | 0) {
      version += numbers[i] + '';
      classes.add( prefix + version );
      version += underScore;
    }

    return Device;
  };
  /**
   * iOS 関連を判定します
   * @method ios
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.ios = function(classes) {
    var
      prefix;

    if (iOS.is()) {
      // iOS
      prefix = 'ios';
      classes.add(prefix);
      if (iOS.iPad()) {
        // ipad
        classes.add('ipad');
        classes.add('tablet');
      } else if (iOS.iPod()) {
        // ipod
        classes.add('ipod');
        classes.add('mobile');
      } else if (iOS.iPhone()) {
        // iphone
        classes.add('iphone' );
        classes.add( 'mobile' );
      }
      // version
      Device.version(classes, prefix, iOS.numbers());
    }

    return Device;
  };
  /**
   * Android 関連を判定します
   * @method android
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.android = function(classes) {
    var
      prefix;

    if (Android.is()) {
      // Android
      prefix = 'android';
      classes.add(prefix);

      if (Android.tablet()) {
        // Android.tablet
        classes.add('tablet');
      } else if (Android.phone()) {
        // Android.phone
        classes.add('mobile');
      }

      if (Android.standard()) {
        classes.add('android-standard');
      }

      if (Android.hd()) {
        classes.add('android-hd');
      }

      // version
      Device.version(classes, prefix, Android.numbers());
    }

    return Device;
  };
  /**
   * CSS3 判定を行います
   * @method css3
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.css3 = function(classes) {
    if (Css3.transition()) {
      classes.add('transition');
    }

    if (Css3.transform()) {
      classes.add('transform');
    }

    if (Css3.matchMedia()) {
      classes.add('matchMedia');
    }

    if (Css3.orientation()) {
      classes.add('orientation');
    }

    if (Css3.orientationChange()) {
      classes.add('orientation-change');
    }

    if (Css3.backgroundSize()) {
      classes.add('background-size');
    }

    return Device;
  };
  /**
   * element 関連判定を行います
   * @method element
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.element = function(classes) {
    if (Element.touch()) {
      classes.add( 'touch' );
    }

    if (Element.querySelector()) {
      classes.add( 'querySelector' );
    }

    return Device;
  };
  /**
   * OS 関連判定を行います
   * @method os
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.os = function( classes ) {
    var
      pc = false;

    if (Mac.is()) {
      classes.add('mac');
      pc = true;
    }

    if (Windows.is()) {
      classes.add('windows');
      pc = true;

      if (Windows.phone()) {
        // windows phone は pc false
        pc = false;
        classes.add('windows-phone');
        classes.add('mobile');
      }
    }

    if (pc) {
      classes.add('other');
    }

    return Device;
  };
  /**
   * Safari 判定を行います
   * @method safari
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.safari = function(classes) {
    var
      prefix;

    if (Safari.is()) {
      prefix = 'safari';
      classes.add(prefix);
      // version
      Device.version(classes, prefix, Safari.numbers());
    }

    return Device;
  };
  /**
   * Chrome 判定を行います
   * @method chrome
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.chrome = function(classes) {
    var
      prefix;

    if (Chrome.is()) {
      prefix = 'chrome';
      classes.add( prefix );

      // version
      Device.version(classes, prefix, Chrome.numbers());
    }

    return Device;
  };
  /**
   * Firefox 判定を行います
   * @method firefox
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.firefox = function(classes) {
    var
      prefix;

    if (Firefox.is()) {
      prefix = 'firefox';
      classes.add( prefix );
      // version
      Device.version(classes, prefix, Firefox.numbers());
    }

    return Device;
  };
  /**
   * Edge 判定を行います
   * @method edge
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.edge = function(classes) {
    var
      prefix;
    if (Edge.is()) {
      prefix = 'edge';
      classes.add(prefix);

      // version
      Device.version(classes, prefix, Edge.numbers());
    }

    return Device;
  };
  /**
   * iOS Firefox check
   * @method fxios
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.fxios = function(classes) {
    var
      prefix;

    if (FxiOS.is()) {
      // FxiOS is true
      prefix = 'fxios';
      classes.add( prefix );
      // version
      Device.version(classes, prefix, FxiOS.numbers());
    }

    return Device;
  };
  /**
   * IE 判定を行います
   * @method ie
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.ie = function(classes) {
    var
      prefix;

    if (IE.is()) {
      prefix = 'ie';
      classes.add(prefix);
      // version
      Device.version(classes, prefix, String(IE.version()).split('.'));
    }

    return Device;
  };
  /**
   * canvas 判定を行います
   * @method canvas
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.canvas = function(classes) {
    if (Element.canvas()) {
      classes.add('canvas');

      if (Element.webgl()) {
        classes.add('webgl');
      }
    }

    return Device;
  };

  /**
   * orientation event handler
   * @method onOrientation
   * @static
   * @param {Object} event orientation event
   */
  Device.onOrientation = function( event ) {
    var
      direction = event.direction;

    if (direction === 'portrait') {
      classSymbol.removeClass('landscape');
      classSymbol.addClass('portrait');
    } else if (direction === 'landscape') {
      classSymbol.removeClass( 'portrait' );
      classSymbol.addClass( 'landscape' );
    }
  };

  Sagen.Device = Device;
}(window));
