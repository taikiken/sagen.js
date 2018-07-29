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
    animation = window.requestAnimationFrame,
    cancel = window.cancelAnimationFrame;

  /**
   * requestAnimationFrame Event を発火します
   * @class Cycle
   * @static
   * @constructor
   */
  function Cycle() {
    throw new Error('Cycle can\'t create instance.');
  }

  /**
   * @property started
   * @static
   * @type {boolean}
   */
  Cycle.started = false;

  /**
   * @property id
   * @static
   * @type {number}
   */
  Cycle.id = 0;

  /**
   * @event UPDATE
   * @static
   * @type {string}
   */
  Cycle.UPDATE = 'cycleUpdate';

  /**
   * @property event
   * @static
   * @type {{type: string, scope: Cycle, time: number, interval: number}}
   */
  Cycle.event = { type: Cycle.UPDATE, scope: Cycle, time: Date.now(), interval: -1 };

  // mixin
  EventDispatcher.initialize(Cycle);

  var p = Cycle.prototype;
  p.constructor = Cycle;

  /**
   * requestAnimationFrame を開始します
   * @method start
   * @static
   */
  Cycle.start = function() {
    if (!Cycle.started) {
      // start when not started
      Cycle.started = true;
      Cycle.event.time = Date.now();
      Cycle.update();
    }
  };

  /**
   * requestAnimationFrame を停止します
   * - 全てのlistener handlerに影響します
   * - 個別に止める場合は listener を off(removeEventListener) して下さい
   *
   * @method stop
   * @static
   */
  Cycle.stop = function() {
    // if (Cycle.started) {
    //   // cancel when started
    //   cancel(Cycle.id);
    //   Cycle.started = false;
    //   Cycle.id = 0;
    // }
    // cancel
    cancel(Cycle.id);
    Cycle.started = false;
    Cycle.id = 0;
  };

  /**
   * requestAnimationFrame event handler
   * - fire Cycle event
   * @method update
   * @static
   */
  Cycle.update = function() {
    // requestAnimationFrame loop
    Cycle.id = animation(Cycle.update);
    // event fire
    var present = Date.now();
    Cycle.event.interval = present - Cycle.event.time;
    Cycle.event.time = present;
    Cycle.dispatchEvent(Cycle.event);
  };

  Gasane.Cycle = Cycle;
}(window));
