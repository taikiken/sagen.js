/**
 * Fps, Polling 時間管理eventを発行します
 *
 * @module Gasane
 */
(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    EventDispatcher = Gasane.EventDispatcher,
    Cycle = Gasane.Cycle,
    dateNow = Date.now;

  /**
   * 指定 fps(frame rate per second)毎にeventを通知します
   *
   * 24fps毎に実行する
   *
   *      var fps = new Gasane.Fps( 24 );
   *      fps.on( Gasane.Fps.ENTER_FRAME, function() {
   *        //
   *      } );
   *
   *      fps.start();
   *
   * @class Fps
   * @uses EventDispatcher
   * @param {int} [fps=24] frame rate
   * @constructor
   */
  function Fps(fps) {
    /**
     * frame rate
     * @property fps
     * @type {Number}
     */
    this.fps = fps || 24;
    /**
     * start flag
     * @property started
     * @type {boolean}
     */
    this.started = false;
    /**
     * frame 開始時間, frame rate 計算に使用
     * @property startId
     * @type {number}
     */
    this.startId = 0;
    /**
     * frame 間時間, frame rate 計算に使用。 1000 / fps
     * @property polling
     * @type {number}
     */
    this.polling = 0;
    /**
     * Cycle.UPDATE event handler binding
     * @property boundUpdate
     * @type {function(this:Fps)|*}
     */
    this.update = this.update.bind( this );
    /**
     * @property event
     * @type {{type: string, scope: Fps, time: number, interval: number}}
     */
    this.event = { type: Fps.ENTER_FRAME, scope: this, time: 0, interval: -1, current: 0 };
  }

  /**
   * @event ENTER_FRAME
   * @static
   * @type {string}
   */
  Fps.ENTER_FRAME = 'fpsEnterFrame';

  var p = Fps.prototype;

  // mixin
  EventDispatcher.initialize( p );
  p.constructor = Fps;

  /**
   * Fps 計算を開始します
   * @method start
   * @return {boolean} start flag を返します
   */
  p.start = function() {
    if (!this.started) {
      // not started
      this.started = true;
      this.setFps(this.fps);
      // Cycle listener
      Cycle.on(Cycle.UPDATE, this.update);
      Cycle.start();
    }
    return this.started;
  };
  /**
   * Fps 計算を止めます
   * @method stop
   * @return {boolean} start flag を返します
   */
  p.stop = function() {
    if (this.started) {
      // started
      this.started = false;
      Cycle.off(Cycle.UPDATE, this.update);
    }
    this.polling = Number.MAX_VALUE;
    return this.started;
  };
  // /**
  //  * @method fps
  //  * @return {int} 現在 fps を返します
  //  */
  // p.fps = function() {
  //   return this.fps;
  // };
  /**
   * @method setFps
   * @param {int} fps fps を設定します
   * @return {int} 設定した fps を返します
   */
  p.setFps = function(fps) {
    this.startId = this.now();
    this.polling = 1000 / fps;
    this.fps = fps;
    return fps;
  };
  /**
   * Fps.setFps alias
   * @method changeFps
   * @param {int} fps fps を変更します
   * @return {int} 設定した fps を返します
   */
  p.changeFps = function(fps) {
    return this.setFps(fps);
  };
  /**
   * @method now
   * @return {number} 現在時間(timestamp)を返します
   */
  p.now = function() {
    return dateNow();
  };
  /**
   * Cycle.update event handler
   * @method update
   * @param {{type: string, scope: Cycle, time: number, interval: number}} event Cycle event
   */
  p.update = function(event) {
    // var
    //   now = this.now(),
    //   event;
    var now = event.time;
    if ((now - this.startId) >= this.polling) {
      this.startId = now;
      // event = this.event;
      this.event.current = now;
      this.event.time = now;
      this.event.interval = event.interval;
      this.dispatchEvent(this.event);
    }
  };
  // export
  Gasane.Fps = Fps;
}(window));
