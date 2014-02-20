/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 14:34
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window, Sagen ){
    "use strict";

    /**
     * @class EventObject
     * @param {String} eventType Event Type
     * @param {*} [params] String || Array eventHandler へ送る値をセット。複数の時は配列にセットする
     * @constructor
     */
    var EventObject = function ( eventType, params ){
        if ( typeof params === "undefined" || params === null ) {

            params = [];
        } else if ( !Array.isArray( params ) ) {
            // 配列へ
            params = [ params ];
        }

        this.type = eventType;
        this.params = params;
    };

    var p = EventObject.prototype;

    p.constructor = EventObject;

    /**
     * パラメタ取出し
     * @method getParams
     * @returns {*} 配列を返します
     */
    p.getParams = function (){
        return this.params;
    };

    Sagen.EventObject = EventObject;

}( window, this.Sagen || {} ) );