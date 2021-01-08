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
   * polling指定時間（ミリセカンド）毎に通知を行います
   *
   *      // 1sec(1000ms)毎に実行する
   *      var polling = new Gasane.Polling( 1000 );
   *      polling.on( Gasane.Polling.PAST, function() {
   *        //
   *      } );
   *
   *      polling.start();
   *
   * @class Polling
   * @uses EventDispatcher
   * @param {number} polling milliseconds
   * @constructor
   */
  function Polling(polling) {
    /**
     * interval milliseconds
     * @property polling
     * @type {number}
     */
    this.polling = polling;
    /**
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
     * Cycle.UPDATE event handler binding
     * @property boundUpdate
     * @type {function(this:Fps)|*}
     */
    this.boundUpdate = this.update.bind( this );
    /**
     * @property event
     * @type {{type: string, scope: Polling}}
     */
    this.event = { type: Polling.PAST, scope: this };
  }

  /**
   * @event PAST
   * @static
   * @type {string}
   */
  Polling.PAST = 'pollingPast';
  var p = Polling.prototype;

  // mixin
  EventDispatcher.initialize( p );
  p.constructor = Polling;

  /**
   * polling 計算を開始します
   * @method start
   * @return {boolean} started flag を返します
   */
  p.start = function() {
    if (!this.started) {
      // not started
      this.started = true;
      this.setPolling( this.polling );
      // Cycle listener
      Cycle.on(Cycle.UPDATE, this.boundUpdate);
      Cycle.start();
    }
    return this.started;
  };
  /**
   * polling 計算を止めます
   * @method stop
   * @return {boolean} started flag を返します
   */
  p.stop = function() {
    if (this.started) {
      // started
      this.started = false;
      Cycle.off(Cycle.UPDATE, this.boundUpdate);
    }
    return this.started;
  };
  // /**
  //  * @method polling
  //  * @return {Number}
  //  */
  // p.polling = function() {
  //   return this.polling;
  // };
  /**
   * polling 時間を変更します
   * @method setPolling
   * @param {number} polling 変更する polling 時間
   * @return {number} 設定した polling
   */
  p.setPolling = function(polling) {
    this.startId = this.now();
    this.polling = polling;
    return polling;
  };
  /**
   * Polling.setPolling alias
   * @method changePolling
   * @param {number} polling 変更する polling 時間
   * @return {number} 設定した polling
   */
  p.changePolling = function(polling) {
    return this.setPolling(polling);
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
   */
  p.update = function() {
    var
      now = this.now(),
      event;

    if ((now - this.startId) >= this.polling) {
      this.startId = now;
      event = this.event;
      event.current = now;
      this.dispatchEvent(event);
    }
  };
  Gasane.Polling = Polling;
}(window));
