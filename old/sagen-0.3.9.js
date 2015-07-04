/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/16 - 14:02
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Polyfill
 *
 * @build: 5/17/2015, 1:05:45 AM
 * @version: 1.0.0
 */
!function(t){"use strict";var n=(t.document,Math.max),e=Math.abs,r=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){for(var t=0,n=["ms","moz","webkit","o"],e=0;e<n.length&&!r.requestAnimationFrame;++e)r.requestAnimationFrame=r[n[e]+"RequestAnimationFrame"],r.cancelAnimationFrame=r[n[e]+"CancelAnimationFrame"]||r[n[e]+"CancelRequestAnimationFrame"];void 0===r.requestAnimationFrame&&void 0!==r.setTimeout&&(r.requestAnimationFrame=function(n){var e=Date.now(),o=Math.max(0,16-(e-t)),i=r.setTimeout(function(){n(e+o)},o);return t=e+o,i}),void 0===r.cancelAnimationFrame&&void 0!==r.clearTimeout&&(r.cancelAnimationFrame=function(t){r.clearTimeout(t)})}(),"function"!=typeof Object.create&&(Object.create=function(){var t=function(){};return function(n){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof n)throw TypeError("Argument must be an object");t.prototype=n;var e=new t;return t.prototype=null,e}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,r){var o;if(null===this||"undefined"==typeof this)throw new TypeError('"this" is null or not defined');var i=Object(this),a=i.length>>>0;if(0===a)return-1;var u=+r||0;if(1/0===e(u)&&(u=0),u>=a)return-1;for(o=n(u>=0?u:a-e(u),0);a>o;){if(o in i&&i[o]===t)return o;o++}return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(t,n){var e,r;if(null===this||"undefined"==typeof this)throw new TypeError(" this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=n),r=0;i>r;){var a;r in o&&(a=o[r],t.call(e,a,r,o)),r++}}),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var n=Array.prototype.slice.call(arguments,1),e=this,r=function(){},o=function(){return e.apply(this instanceof r&&t?this:t,n.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,o.prototype=new r,o}),String.prototype.trim||!function(){var t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(t,"")}}(),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,t.URL=t.URL||t.webkitURL||t.mozURL||t.msURL,r.console||(r.console={info:function(){},log:function(){},debug:function(){},warn:function(){},error:function(){},table:function(){}})}(window);
/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/24 - 12:10
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2015-06-19 14:46:50
 * @version 0.9.0
 * @git https://github.com/taikiken/gasane.js
 *
 * @module Gasane
 */
var Gasane=Gasane||{};!function(t){"use strict";var n=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){var t,e,i,s,r,o,a=0,u=["ms","moz","webkit","o"];for(t=0,e=u.length;e>t&&!n.requestAnimationFrame;++t)n.requestAnimationFrame=n[u[t]+"RequestAnimationFrame"],n.cancelAnimationFrame=n[u[t]+"CancelAnimationFrame"]||n[u[t]+"CancelRequestAnimationFrame"];void 0===n.requestAnimationFrame&&void 0!==n.setTimeout&&(o=Math.max,n.requestAnimationFrame=function(t){return i=Date.now(),s=o(0,16-(i-a)),r=n.setTimeout(function(){t(i+s)},s),a=i+s,r}),void 0===n.cancelAnimationFrame&&void 0!==n.clearTimeout&&(n.cancelAnimationFrame=function(t){n.clearTimeout(t)})}()}(window),function(t){"use strict";var n=t.Gasane;n.EventDispatcher=function(){function t(){}var n=t.prototype;return n.constructor=t,n.addEventListener=function(t,n){this.on(t,n)},n.on=function(t,n){"undefined"==typeof this._listeners&&(this._listeners={});var e=this._listeners;"undefined"==typeof e[t]&&(e[t]=[]),-1===e[t].indexOf(n)&&e[t].push(n)},n.hasEventListener=function(t,n){var e=this._listeners;return"undefined"==typeof e?!1:"undefined"!=typeof n[t]&&-1!==e[t].indexOf(n)?!0:!1},n.removeEventListener=function(t,n){this.off(t,n)},n.off=function(t,n){var e,i,s=this._listeners;"undefined"!=typeof s&&(e=s[t],"undefined"!=typeof e&&(i=e.indexOf(n),-1!==i&&e.splice(i,1)))},n.dispatchEvent=function(t){var n,e,i,s=this._listeners;if("undefined"!=typeof s&&"undefined"!=typeof t.type&&(n=s[t.type],"undefined"!=typeof n))for(t.target=this,e=0,i=n.length;i>e;e++)n[e].call(this,t)},t.initialize=function(t){t.addEventListener=n.addEventListener,t.on=n.on,t.hasEventListener=n.hasEventListener,t.removeEventListener=n.removeEventListener,t.off=n.off,t.dispatchEvent=n.dispatchEvent},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Cycle=function(){function e(){throw new Error("Cycle can't create instance.")}var i=n.EventDispatcher,s=t.self.requestAnimationFrame,r=t.self.cancelAnimationFrame;e.started=!1,e.id=0,e.UPDATE="cycleUpdate",e.event={type:e.UPDATE,scope:e},i.initialize(e);var o=e.prototype;return o.constructor=e,e.start=function(){e.started||(e.started=!0,e.update())},e.stop=function(){e.started&&(r(e.id),e.started=!1,e.id=0)},e.update=function(){e.id=s(e.update),e.dispatchEvent(e.event)},e}()}(window),function(t){"use strict";var n=t.Gasane;n.Polling=function(){function t(n){this._polling=n,this._started=!1,this._start=0,this._boundUpdate=this.update.bind(this),this._event={type:t.PAST,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.PAST="pollingPast";var r=t.prototype;return e.initialize(r),r.constructor=t,r.start=function(){return this._started||(this._started=!0,this.setPolling(this._polling),i.on(i.UPDATE,this._boundUpdate),i.start()),this},r.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this},r.polling=function(){return this._polling},r.setPolling=function(t){return this._start=this.now(),this._polling=t,this},r.changePolling=function(t){return this.setPolling(t),this},r.now=function(){return s()},r.update=function(){var t=this.now();t-this._start>=this._polling&&(this._start=t,this.dispatchEvent(this._event))},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Fps=function(){function t(n){this._fps=n,this._started=!1,this._start=0,this._polling=0,this._boundUpdate=this.update.bind(this),this._event={type:t.ENTER_FRAME,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.ENTER_FRAME="enterFrame";var r=t.prototype;return e.initialize(r),r.constructor=t,r.start=function(){return this._started||(this._started=!0,this.setFps(this._fps),i.on(i.UPDATE,this._boundUpdate),i.start()),this},r.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this._polling=Number.MAX_VALUE,this},r.fps=function(){return this._fps},r.setFps=function(t){return this._start=this.now(),this._polling=1e3/t,this._fps=t,this},r.changeFps=function(t){return this.setFps(t),this},r.now=function(){return s()},r.update=function(){var t=this.now();t-this._start>=this._polling&&(this._start=t,this.dispatchEvent(this._event))},t}()}(window);
/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2015-06-19 14:38:03
 * @version 0.9.21
 *
 * @module wakegi
 */
var wakegi=wakegi||{};wakegi["int"]=parseInt,wakegi["float"]=parseFloat,function(){"use strict";Array.isArray||(Array.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)})}(),function(n){"use strict";var t=n.wakegi;t.Browser=function(){function t(){throw new Error("Browser can't create instance.")}var r,e,i=n.navigator,o=t.prototype;return o.constructor=t,t.init=function(){("undefined"==typeof r||"undefined"==typeof e)&&(r=i.userAgent,e=i.appVersion)},t.navigator=function(){return i},t.ua=function(){return t.init(),r},t.app=function(){return t.init(),e},t.matchSafari=function(){return t.init(),!!r.match(/safari/i)},t}()}(window),function(n){"use strict";var t=n.document,r=n.wakegi,e=r.Browser;e.Css3=function(){function r(){throw new Error("Css3 can't create instance.")}var e,i,o,u,c,a,f=r.prototype;return f.constructor=r,r.transition=function(){var n;return"undefined"==typeof e&&(n=t.createElement("p").style,e="transition"in n||"WebkitTransition"in n||"MozTransition"in n||"msTransition"in n||"OTransition"in n),e},r.transform=function(){var n;return"undefined"==typeof i&&(n=t.createElement("p").style,i="transform"in n||"WebkitTransform"in n||"MozTransform"in n||"OTransform"in n||"msTransform"in n),i},r.matchMedia=function(){return"undefined"==typeof o&&(o="function"==typeof n.matchMedia),o},r.orientationChange=function(){return"undefined"==typeof u&&(u="onorientationchange"in n),u},r.orientation=function(){return"undefined"==typeof c&&(c="orientation"in n),c},r.backgroundSize=function(){return"undefined"==typeof a&&(a="backgroundSize"in t.documentElement.style),a},r}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Transition=function(){function n(){throw new Error("Transition can't create instance.")}var t=r.Css3,e=n.prototype;return e.constructor=n,n.is=function(){return t.transition()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Transform=function(){function n(){throw new Error("Transform can't create instance.")}var t=r.Css3,e=n.prototype;return e.constructor=n,n.is=function(){return t.transform()},n}()}(window),function(n){"use strict";var t=n.document,r=n.wakegi,e=r.Browser;e.Element=function(){function r(){throw new Error("Element can't create instance.")}var e,i,o,u,c=r.prototype;return c.constructor=r,r.touch=function(){return"undefined"==typeof e&&(e="ontouchstart"in t.documentElement),e},r.querySelector=function(){return"undefined"==typeof i&&(i="undefined"!=typeof t.querySelector),i},r.canvas=function(){return"undefined"==typeof o&&(o=!!n.CanvasRenderingContext2D),o},r.webgl=function(){if("undefined"==typeof u&&(u=r.canvas()))try{u=!!n.WebGLRenderingContext&&!!t.createElement("canvas").getContext("experimental-webgl")}catch(e){u=!1}return u},r.find=function(n){var e;return r.querySelector()&&(e=t.querySelector(n)),e},r}()}(window),function(n){"use strict";var t=(n.document,n.wakegi);t.Dom=function(){function n(n){this._element=n}var t=n.prototype;return t.constructor=n,t.hasClass=function(t){return n.hasClass(this._element,t)},t.addClass=function(t){return n.addClass(this._element,t),this},t.removeClass=function(t){return n.removeClass(this._element,t),this},t.style=function(t){return n.getStyle(this._element,t)},n.hasClass=function(n,t){return!!n.className.match(new RegExp(t,"i"))},n.addClass=function(t,r){var e,i="";return n.hasClass(t,r)||(e="",i=t.className,""!==i&&(e=" "),i+=e+r,i=i.split("  ").join(" "),t.className=i),n},n.removeClass=function(t,r){var e="";return n.hasClass(t,r)&&(e=t.className,e=e.replace(r,"").split("  ").join(" ")," "===e.substr(0,1)&&(e=e.substr(1))," "===e&&(e=""),t.className=e),n},n.styleCompute=function(n,t,r){var e=n.getComputedStyle(t,null);return r?(r=r.replace(/([A-Z])/g,"-$1").toLowerCase(),e.getPropertyValue(r)):e},n.styleCurrent=function(n,t){var r,e=n.currentStyle;return t?(t=t.replace(/\-(\w)/g,function(n,t){return t.toUpperCase()}),r=e[t],/^\d+(em|pt|%|ex)?$/i.test(r)?function(t){var r=n.style.left,e=n.runtimeStyle.left;return n.runtimeStyle.left=n.currentStyle.left,n.style.left=t||0,t=n.style.pixelLeft+"px",n.style.left=r,n.runtimeStyle.left=e,t}(r):r):e},n.getStyle=function(t,r){var e,i=t.ownerDocument.defaultView;return i&&i.getComputedStyle?e=n.styleCompute(i,t,r):t.currentStyle&&(e=n.styleCurrent(t,r)),e},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.iOS=function(){function n(){throw new Error("iOS can't create instance.")}var e,i,o,u,c,a,f,s,d=[-1,-1,-1],l=n.prototype;return l.constructor=n,n.init=function(){var t;"undefined"==typeof e&&(t=r.ua(),u=!!t.match(/ipad/i),o=!!t.match(/ipod/i),i=!!t.match(/iphone/i)&&!u&&!o,e=u||o||i,c=e&&!n.standalone()&&!r.matchSafari())},n.calculate=function(){var e,i,o,u,c,l,p=[];if("undefined"==typeof a&&(s="",a=-1,f=-1,n.is()&&(e=r.app().match(/OS (\d+)_(\d+)_?(\d+)?/),Array.isArray(e)))){for(i=t["int"],o=t["float"],u=1,c=e.length;c>u;u++)l=e[u],p.push("undefined"!=typeof l?i(l,10):0);s=p.join("."),f=p[0],d=p,a=o(p[0]+"."+p[1]+p[2])}},n.is=function(){return n.init(),e},n.iPhone=function(){return n.init(),i},n.iPad=function(){return n.init(),u},n.iPod=function(){return n.init(),o},n.standalone=function(){var n=r.navigator();return n.standalone?n.standalone:!1},n.fullScreen=function(){return n.standalone()},n.version=function(){return n.calculate(),a},n.build=function(){return n.calculate(),s},n.major=function(){return n.calculate(),f},n.numbers=function(){return n.calculate(),d},n.number=function(){return n.numbers()},n.webView=function(){return n.init(),c},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Android=function(){function e(){throw new Error("Android can't create instance.")}var i,o,u,c,a,f,s,d,l=Math.max,p=[-1,-1,-1],w=e.prototype;return w.constructor=e,e.init=function(){var t,e;"undefined"==typeof o&&(t=r.ua(),o=!!t.match(/android/i),u=!1,c=!1,i=!1,a=!1,o&&(e=l(n.innerWidth,n.innerHeight),a=e>=1024,u=!!t.match(/mobile/i),u||(c=!0),i=r.matchSafari()&&!!t.match(/version/i)))},e.calculate=function(){var n,i,o,u,c,a,l=[];if("undefined"==typeof f&&(d="",f=-1,s=-1,e.is()&&(n=r.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(i=t["int"],o=t["float"],u=1,c=n.length;c>u;u++)a=n[u],l.push("undefined"!=typeof a?i(a,10):0);d=l.join("."),s=l[0],p=l,f=o(l[0]+"."+l[1]+l[2])}},e.is=function(){return e.init(),o},e.standard=function(){return e.init(),i},e.phone=function(){return e.init(),u},e.tablet=function(){return e.init(),c},e.hd=function(){return e.init(),a},e.version=function(){return e.calculate(),f},e.build=function(){return e.calculate(),d},e.major=function(){return e.calculate(),s},e.numbers=function(){return e.calculate(),p},e.number=function(){return e.numbers()},e}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Touch=function(){function n(){throw new Error("Touch can't create instance.")}var t=n.prototype;return t.constructor=n,n.is=function(){return r.touch()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Mobile=function(){function n(){throw new Error("Mobile can't create instance.")}var t=r.iOS,e=r.Android,i=n.prototype;return i.constructor=n,n.is=function(){return t.is()||e.is()},n.phone=function(){return t.iPhone()||t.iPod()||e.phone()},n.tablet=function(){return t.iPad()||e.tablet()},n.hideBar=function(){setTimeout(function(){scrollBy(0,1)},0)},n.hideURLBar=function(){n.hideBar()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Mac=function(){function n(){throw new Error("Mac can't create instance.")}var t,e=r.iOS,i=n.prototype;return i.constructor=n,n.init=function(){"undefined"==typeof t&&(t=!e.is()&&!!r.ua().match(/mac os x/i))},n.is=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Windows=function(){function n(){throw new Error("Windows can't create instance.")}var t,e=n.prototype;return e.constructor=n,n.init=function(){"undefined"==typeof t&&(t=!!r.ua().match(/windows/i))},n.is=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.IE=function(){function n(){throw new Error("IE can't create instance.")}var t,e,i,o,u,c,a,f,s=n.prototype;return s.constructor=n,n.init=function(){var n;("undefined"==typeof a||"undefined"==typeof t||"undefined"==typeof e||"undefined"==typeof i||"undefined"==typeof o||"undefined"==typeof u||"undefined"==typeof c)&&(n=r.ua(),t=!1,e=!1,i=!1,o=!1,u=!1,c=!1,a=!!n.match(/msie/i),a?(u=!!n.match(/msie [10]/i),u||(o=!!n.match(/msie [9]/i),o||(i=!!n.match(/msie [8]/i),i||(e=!!n.match(/msie [7]/i),e||(t=!!n.match(/msie [6]/i)))))):(c=!!n.match(/trident\/[7]/i)&&!!n.match(/rv:[11]/i),a=c))},n.calculate=function(){n.init(),"undefined"==typeof f&&(f=-1,n.is()&&(c?f=11:u?f=10:o?f=9:i?f=8:e?f=7:t&&(f=6)))},n.is=function(){return n.init(),a},n.is6=function(){return n.init(),t},n.is7=function(){return n.init(),e},n.is8=function(){return n.init(),i},n.is9=function(){return n.init(),o},n.is10=function(){return n.init(),u},n.is11=function(){return n.init(),c},n.version=function(){return n.calculate(),f},n.major=function(){return n.version()},n.legacy=function(){return n.init(),t||e||i},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.CriOS=function(){function n(){throw new Error("CriOS can't create instance.")}var e,i,o,u,c=[-1,-1,-1,-1],a=n.prototype;return a.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/crios/i))},n.calculate=function(){var e,a,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(e)))){for(a=t["int"],f=t["float"],s=1,d=e.length;d>s;s++)l.push(a(e[s],10));u=l.join("."),o=l[0],c=l,i=f(l[0]+"."+l[1]+l[2]+l[3])}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.build=function(){return n.calculate(),u},n.major=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),c},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Chrome=function(){function n(){throw new Error("Chrome can't create instance.")}var e,i,o,u,c,a=r.CriOS,f=r.Android,s=[-1,-1,-1,-1],d=n.prototype;return d.constructor=n,n.init=function(){"undefined"==typeof i&&(e=a.is(),i=!1,e?i=!0:f.standard()||(i=!!r.ua().match(/chrome/i)))},n.calculate=function(){var i,f,d,l,p,w=[];if("undefined"==typeof o&&(c="",o=-1,u=-1,n.is()))if(e)c=a.build(),u=a.major(),s=a.numbers(),o=a.version();else if(i=r.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(i)){for(f=t["int"],d=t["float"],l=1,p=i.length;p>l;l++)w.push(f(i[l],10));c=w.join("."),u=w[0],s=w,o=d(w[0]+"."+w[1]+w[2]+w[3])}},n.is=function(){return n.init(),i},n.version=function(){return n.calculate(),o},n.build=function(){return n.calculate(),c},n.major=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),s},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Firefox=function(){function n(){throw new Error("Firefox can't create instance.")}var e,i,o,u,c=[-1,-1],a=n.prototype;return a.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/firefox/i))},n.calculate=function(){var e,a,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.ua().match(/Firefox\/(\d+)\.?(\d+)?/),Array.isArray(e)))){for(a=t["int"],f=t["float"],s=1,d=e.length;d>s;s++)l.push(a(e[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),c=l}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),c},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Safari=function(){function n(){throw new Error("Safari can't create instance.")}var e,i,o,u,c,a,f=r.CriOS,s=r.Chrome,d=r.Android,l=[-1,-1,-1],p=n.prototype;return p.constructor=n,n.init=function(){"undefined"==typeof o&&(e=f.is(),i=s.is(),o=e||i||d.standard()?!1:r.matchSafari())},n.calculate=function(){var e,i,o,f,s,d,p=[];if("undefined"==typeof u&&(a="",u=-1,c=-1,n.is()&&(e=r.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(e)))){for(i=t["int"],o=t["float"],f=1,s=e.length;s>f;f++)d=e[f],p.push("undefined"!=typeof d?i(d,10):0);a=p.join("."),u=o(p[0]+"."+p[1]+p[2]),c=p[0],l=p}},n.is=function(){return n.init(),o},n.set=function(t){n.init(),o=t},n.version=function(){return n.calculate(),u},n.major=function(){return n.calculate(),c},n.build=function(){return n.calculate(),a},n.numbers=function(){return n.calculate(),l},n.number=function(){return n.numbers()},n}()}(window);
/**
 * @license inazumatv.com
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @version 0.3.9
 * @build 6/19/2015, 3:10:43 PM
 * @github: https://github.com/taikiken/sagen.js
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 *
 * @module Sagen
 */

/**
 *
 * @class Sagen
 *
 * @example
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-browser="true"
 *          data-ios="true"
 *          data-canvas="true">
 *      </script>
 *
 *      <!--OS X Chrome-->
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 * Browser / 端末判定にも使えます
 *
 *      ( function ( window ){
 *         "use strict";
 *         var Sagen = window.Sagen;
 *
 *         if ( Sagen.Browser.iOS.is() ) {
 *              // iOS
 *         }
 *
 *      }( window ) );
 *
 *
 */

var Sagen = window.Sagen || {};

( function ( window, Sagen ){
  "use strict";

  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,

    option = [
      "orientation",
      "ios",
      "canvas",
      "browser"
    ],
    dataSet = ( function ( window ){

      var
        document = window.document,
        element = document.getElementById( "sagen" ),
        results = {},
        data;

      function modern ( result, data ) {
        var
          key, dataKey, val;

        for ( key in data ) {

          if ( typeof data.hasOwnProperty === "function" && data.hasOwnProperty( key ) ) {

            //dataKey = key;

            val = data[ key ].toLowerCase();
            results[ key ] = val === "true";

          } else {

            val = data[ key ].toLowerCase();
            results[ key ] = val === "true";

          }
        }

        return result;
      }

      function legacy ( result, data ) {
        var
          i, limit, attribute, nodeName, dataKey;

        for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {

          attribute = data[ i ];
          nodeName = attribute.nodeName.toLowerCase();

          if ( nodeName.indexOf( "data-" ) !== -1 ) {

            dataKey = nodeName.replace( "data-", "" );
            results[ dataKey ] = attribute.nodeValue.toLowerCase() === "true";

          }

        }

        return result;
      }

      if ( !!element ) {
        // id: sagen defined

        if ( typeof element.dataset !== "undefined" ) {
          // can use dataset
          data = element.dataset;
          results = modern( results, data );

        } else {
          // use attributes
          data = element.attributes;
          //attributes = true;
          results = legacy( results, data );

        }

      }// sagen

      return results;

  }( window ) );


  Sagen.Browser = wakegi.Browser;

  Sagen.Dom = wakegi.Dom;

  Sagen.EventDispatcher = Gasane.EventDispatcher;

  /**
   * @method dataSet
   * @static
   * @for Sagen
   * @param {string} type
   */
  Sagen.dataSet = function ( type ) {

    return dataSet[ type ];

  };

  /**
   * dataSet alias
   * @deprecated instead use dataSet
   * @method dataset
   * @static
   * @for Sagen
   * @type {Function|*}
   */
  Sagen.dataset = Sagen.dataSet;

}( window, Sagen ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 19:33
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Sagen
 * @submodule Orientation
 */
( function ( window ){
  "use strict";

  var
    document = window.document,
    Sagen = window.Sagen;

  Sagen.Orientation = ( function (){
    var
      EventDispatcher = Sagen.EventDispatcher,
      Browser = Sagen.Browser,
      Css3 = Browser.Css3,
      iOS = Browser.iOS,
      Android = Browser.Android,

      _abs = Math.abs,
      _int = parseInt,
      /**
       * @property _orientation
       * @static
       * @type {boolean}
       * @private
       */
      _orientation,
      /**
       * @property _eventType
       * @static
       * @type {string}
       * @private
       */
      _eventType,
      /**
       * @property _handler
       * @static
       * @type {Function}
       * @private
       */
      _handler,
      /**
       * @property _mediaQuery
       * @static
       * @type {MediaQueryList}
       * @private
       */
      _mediaQuery,

      _start;

    /**
     * portrait / landscape 切替を監視
     * @class Orientation
     * @uses EventDispatcher
     * @static
     * @constructor
     */
    function Orientation () {
      throw new Error( "Orientation can't create instance." );
    }

    var p = Orientation.prototype;

    p.constructor = Orientation;

    /**
     * @event CHANGE_ORIENTATION
     * @static
     * @type {string}
     */
    Orientation.CHANGE_ORIENTATION = "changeOrientation";

    EventDispatcher.initialize( Orientation );

    /**
     * @method init
     * @static
     */
    Orientation.init = function () {

      Orientation.listen().fire();

    };

    /**
     * @method canOrientation
     * @static
     * @return {boolean}
     */
    Orientation.canOrientation = function () {

      if ( typeof _orientation === "undefined" ) {

        _orientation = Css3.orientation();

      }

      return _orientation;

    };
    /**
     * @method eventType
     * @static
     * @return {string}
     */
    Orientation.eventType = function () {

      if ( typeof _eventType === "undefined" ) {

        _eventType = Css3.orientationChange() ? "orientationchange" : "resize";

      }

      return _eventType;

    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "portrait" にします
     * @method portrait
     * @static
     */
    Orientation.portrait = function () {

      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "portrait", scope: Orientation } );

    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "landscape" にします
     * @method landscape
     * @static
     */
    Orientation.landscape = function () {

      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "landscape", scope: Orientation } );

    };
    /**
     * @method listen
     * @static
     * @return {Orientation}
     */
    Orientation.listen = function () {
      var
        handler;

      if ( !_start ) {

        _start = true;

        if ( typeof window.addEventListener !== "undefined" ) {

          if ( Css3.matchMedia() ) {
            // can use matchMedia
            //handler = Orientation._listenMatchMedia;

            Orientation._listenMatchMedia();

          } else {
            // matchMediaが使えないので代わりに window.orientationあるいは window 縦横比を使い判定します
            handler = Orientation._listenOrientation;
            _handler = handler;
            window.addEventListener( Orientation.eventType(), handler, false );

          }

        }

      }

      return Orientation;

    };
    /**
     * @method abort
     * @static
     */
    Orientation.abort = function () {

      if ( !!_handler && typeof window.addEventListener !== "undefined" ) {

        window.removeEventListener( Orientation.eventType(), _handler );

      }

    };
    /**
     * イベントを強制的に発火させます
     * @method fire
     * @static
     */
    Orientation.fire = function () {

      if ( !!_handler ) {

        _handler();

      } else if ( !!_mediaQuery ) {

        Orientation._onRotate( _mediaQuery );

      }

    };
    /**
     * @method _listenOrientation
     * @static
     * @private
     */
    Orientation._listenOrientation = function () {

      if ( Orientation.canOrientation() ) {
        // window.orientation が使える
        // degree check

        if ( Orientation._checkDegree() ) {
          // portrait
          Orientation.portrait();

        } else {

          Orientation.landscape();

        }

      } else {
        // window 幅,高さを使う
        // aspect check
        if ( Orientation._checkAspect() ) {
          // portrait
          Orientation.portrait();

        } else {

          Orientation.landscape();

        }

      }

    };
    /**
     * @method _checkDegree
     * @static
     * @return {boolean}
     * @private
     */
    Orientation._checkDegree = function () {

      return _abs( window.orientation ) !== 90;

    };
    /**
     * @method _checkAspect
     * @static
     * @return {boolean}
     * @private
     */
    Orientation._checkAspect = function () {

      var
        w = _int( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10 ),
        h = _int( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10 );

      return h > w;

    };
    /**
     * Experia Z(Sony Tablet), portrait / landscape 表示が逆なのでwindow比率で判定する
     * @method _experiaZ
     * @private
     */
    Orientation._experiaZ = function () {

      // window 幅,高さを使う
      // aspect check
      if ( Orientation._checkAspect() ) {
        // portrait
        Orientation.portrait();

      } else {

        Orientation.landscape();

      }

    };

    /**
     * window.matchMedia listener handler
     * @method _onRotate
     * @static
     * @param {MediaQueryList} mediaQuery
     * @private
     */
    Orientation._onRotate = function ( mediaQuery ) {

      // use matchMediaå
      if ( mediaQuery.matches ) {
        // portrait
        //Orientation.portrait();
        Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "portrait", scope: Orientation } );

      } else {
        // landscape
        //Orientation.landscape();
        Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: "landscape", scope: Orientation } );

      }

    };
    /**
     * @method _onOrientationChange
     * @static
     * @private
     */
    Orientation._onOrientationChange = function () {

      if ( Orientation._checkDegree() ) {
        // portrait
        Orientation.portrait();

      } else {
        // landscape
        Orientation.landscape();

      }

    };

    /**
     * @method _listenMatchMedia
     * @static
     * @private
     */
    Orientation._listenMatchMedia = function () {

      var
        mql = window.matchMedia( "(orientation: portrait)" ),
        sgp312 = !!navigator.userAgent.match(/sgp312/i);

      _mediaQuery = mql;

      //if ( ( iOS.is() && iOS.version() < 6 ) || ( Android.is() && Android.version() < 4.2 ) ) {
      if ( sgp312 ) {
        // experia z
        window.addEventListener( Orientation.eventType(), Orientation._experiaZ, false );

      }
      else if ( iOS.is() && iOS.version() < 6 ) {
        // iOS 5 以下だと mql.addListener が作動しないのでorientationchangeを使用します
        window.addEventListener( Orientation.eventType(), Orientation._onOrientationChange, false );

      } else {

        mql.addListener( Orientation._onRotate );

      }

    };

    return Orientation;

  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 16:02
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Sagen
 * @submodule Classes
 */
( function ( window ){
  "use strict";

  var
    document = window.document,
    Sagen = window.Sagen;

  Sagen.Classes = ( function (){
    var
      Dom = Sagen.Dom;

    /**
     * @class Classes
     * @param {Array} classes
     * @constructor
     */
    function Classes ( classes ) {
      /**
       * @property _classes
       * @type {Array}
       * @private
       */
      this._classes = classes;
      /**
       * @property _dom
       * @type {Dom}
       * @private
       */
      this._dom = new Dom( document.documentElement );
    }

    var p = Classes.prototype;

    p.constructor = Classes;
    /**
     * @method add
     * @param className
     * @return {Classes}
     */
    p.add = function ( className ) {
      var
        classes = this._classes;

      if ( classes.indexOf( className ) === -1 ) {

        classes.push( className );

      }

      return this;
    };
    /**
     * @method write
     */
    p.write = function () {
      this._dom.addClass( this._classes.join( " " ) );
    };

    /**
     * @method addClass
     * @param {string} className
     * @return {Classes}
     */
    p.addClass = function ( className ) {

      this._dom.addClass( className );
      return this;

    };
    /**
     * @method removeClass
     * @param {string} className
     * @return {Classes}
     */
    p.removeClass = function ( className ) {

      this._dom.removeClass( className );
      return this;

    };

    return Classes;
  }() );
}( window ) );
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
 * @module Sagen
 * @submodule Device
 */
( function ( window ){
  "use strict";

  var
    Sagen = window.Sagen;

  Sagen.Device = ( function (){
    var
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
      IE = Browser.IE,
      Orientation = Sagen.Orientation,

      Classes = Sagen.Classes,
      /**
       * @property _classes
       * @static
       * @private
       * @type {Classes}
       */
      _classes;

    /**
     * @class Device
     * @static
     * @constructor
     */
    function Device () {
      throw new Error( "Device can't create instance." );
    }

    var p = Device.prototype;

    p.constructor = Device;
    /**
     * @method init
     * @static
     */
    Device.init = function () {
      var
        classes = new Classes( [] );

      _classes = classes;

      Device._default( classes )
        ._option( classes )
        .call( function () {

          classes.write();

        } );

    };
    /**
     * @method call
     * @static
     * @param {function} func
     */
    Device.call = function ( func ) {

      func();

    };

    /**
     * @method _default
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._default = function ( classes ) {
      // default

      Device._ios( classes )
        ._android( classes )
        ._css3( classes )
        ._os( classes );

      return Device;

    };
    /**
     * @method _option
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._option = function ( classes ) {

      if ( Sagen.dataSet( "browser" ) ) {

        Device._ie( classes )
          ._chrome( classes )
          ._safari( classes )
          ._firefox( classes );

      }

      if ( Sagen.dataSet( "canvas" ) ) {

        Device._canvas( classes );

      }

      // orientation
      // ToDo: orientation change
      if ( Sagen.dataSet( "orientation" ) && ( iOS.is() || Android.is()) ) {

        Orientation.on( Orientation.CHANGE_ORIENTATION, Device._onOrientation );
        Orientation.init();

      }

      return Device;

    };

    /**
     * @method _version
     * @static
     * @param {Classes} classes
     * @param {string} prefix
     * @param {array} numbers
     * @return {Device}
     * @private
     */
    Device._version = function ( classes, prefix, numbers ) {
      var
        version = "",
        _ = "_",
        i, limit;

      for ( i = 0, limit = numbers.length; i < limit; i = i + 1 ) {

        version += numbers[ i ] + "";
        classes.add( prefix + version );

        version += _;

      }

      return Device;
    };
    /**
     * @method _ios
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._ios = function ( classes ) {
      var
        prefix;

      if ( iOS.is() ) {

        // iOS
        prefix = "ios";

        classes.add( prefix );

        if ( iOS.iPad() ) {
          // ipad
          classes.add( "ipad" ).add( "tablet" );

        } else if ( iOS.iPod() ) {
          // ipod
          classes.add( "ipod" ).add( "mobile" );


        } else if ( iOS.iPhone() ) {
          // ipod
          classes.add( "iphone" ).add( "mobile" );

        }

        // version
        Device._version( classes, prefix, iOS.numbers() );

      }

      return Device;

    };
    /**
     * @method _android
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._android = function ( classes ) {
      var
        prefix;

      if ( Android.is() ) {

        // iOS
        prefix = "android";

        classes.add( prefix );

        if ( Android.tablet() ) {
          // ipad
          classes.add( "tablet" );

        } else if ( Android.phone() ) {
          // ipod
          classes.add( "mobile" );

        }

        if ( Android.standard() ) {

          classes.add( "android-standard" );

        }

        if ( Android.hd() ) {

          classes.add( "android-hd" );

        }

        // version
        Device._version( classes, prefix, Android.numbers() );

      }

      return Device;
    };
    /**
     * @method _css3
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._css3 = function ( classes ) {

      if ( Css3.transition() ) {

        classes.add( "transition" );

      }

      if ( Css3.transform() ) {

        classes.add( "transform" );

      }

      if ( Css3.matchMedia() ) {

        classes.add( "matchMedia" );

      }

      if ( Css3.orientation() ) {

        classes.add( "orientation" );

      }

      if ( Css3.orientationChange() ) {

        classes.add( "orientation-change" );

      }

      if ( Css3.backgroundSize() ) {

        classes.add( "background-size" );

      }

      return Device;

    };
    /**
     * @method _element
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._element = function ( classes ) {

      if ( Element.touch() ) {

        classes.add( "touch" );

      }

      if ( Element.querySelector() ) {

        classes.add( "querySelector" );

      }

      return Device;

    };
    /**
     * @method _os
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._os = function ( classes ) {

      var
        pc = false;

      if ( Mac.is() ) {

        classes.add( "mac" );
        pc = true;

      }

      if ( Windows.is() ) {

        classes.add( "windows" );
        pc = true;

      }

      if ( pc ) {

        classes.add( "other" );

      }

      return Device;

    };
    /**
     * @method _safari
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._safari = function ( classes ) {
      var
        prefix;

      if ( Safari.is() ) {

        prefix = "safari";
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Safari.numbers() );

      }

      return Device;

    };
    /**
     * @method _chrome
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._chrome = function ( classes ) {

      var
        prefix;

      if ( Chrome.is() ) {

        prefix = "chrome";
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Chrome.numbers() );

      }

      return Device;

    };
    /**
     * @method _firefox
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._firefox = function ( classes ) {

      var
        prefix;

      if ( Firefox.is() ) {

        prefix = "firefox";
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Firefox.numbers() );

      }

      return Device;

    };
    /**
     * @method _ie
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._ie = function ( classes ) {

      var
        prefix;

      if ( IE.is() ) {

        prefix = "ie";
        classes.add( prefix );

        // version
        Device._version( classes, prefix, String( IE.version() ).split( "." ) );

      }

      return Device;

    };
    /**
     * @method _canvas
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._canvas = function ( classes ) {

      if ( Element.canvas() ) {

        classes.add( "canvas" );

        if ( Element.webgl() ) {

          classes.add( "webgl" );

        }

      }

      return Device;

    };

    /**
     * orientation event handler
     * @method _onOrientation
     * @static
     * @param {Object} event
     * @private
     */
    Device._onOrientation = function ( event ) {

      var
        direction = event.direction;

      if ( direction === "portrait" ) {

        _classes.removeClass( "landscape" ).addClass( "portrait" );

      } else if ( direction === "landscape" ) {

        _classes.removeClass( "portrait" ).addClass( "landscape" );

      }

    };

    return Device;
  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 18:48
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Sagen
 * @submodule Viewport
 */
( function ( window ){
  "use strict";

  var
    document = window.document,
    Sagen = window.Sagen;

  Sagen.Viewport = ( function (){
    var
      Browser = Sagen.Browser,
      iOS = Browser.iOS,
      Element = Browser.Element,
      /**
       * @property _viewport
       * @static
       * @type {HTMLElement}
       * @private
       */
      _viewport,
      /**
       * @property _content
       * @static
       * @type {string}
       * @private
       */
      _content;

    /**
     * @class Viewport
     * @static
     * @constructor
     */
    function Viewport () {
      throw new Error( "Viewport can't create instance." );
    }

    var p = Viewport.prototype;

    p.constructor = Viewport;

    /**
     * @method init
     * @static
     */
    Viewport.init = function () {

      if ( Sagen.dataSet( "ios" ) ) {

        Viewport.minimalUi();

      }

    };
    /**
     * @method find
     * @static
     * @return {Viewport}
     */
    Viewport.find = function () {

      if ( typeof _viewport === "undefined" ) {
        // _viewport undefined
        _viewport = Element.find( "meta[name='viewport']" );

      }

      if ( !!_viewport ) {

        _content = _viewport.content;

      } else {

        _viewport = "";
        _content = "";

      }

      return Viewport;

    };
    /**
     * @method Viewport
     * @static
     * @return {HTMLElement|*}
     */
    Viewport.meta = function () {
      Viewport.find();
      return _viewport;
    };
    /**
     * @method content
     * @static
     * @return {string}
     */
    Viewport.content = function () {
      Viewport.find();
      return _content;
    };
    /**
     * @method write
     * @static
     * @param {String} content
     * @return {Viewport}
     */
    Viewport.write = function ( content ) {
      var
        meta;

      Viewport.find();

      if ( !_viewport ) {

        meta = document.createElement( "meta" );
        meta.name = "viewport";
        meta.content = content;
        _viewport = meta;
        _content = content;
        document.getElementsByTagName( "head" )[ 0 ].appendChild( meta );

      }

      return Viewport;
    };
    /**
     * @method add
     * @static
     * @param {string} option
     * @return {Viewport}
     */
    Viewport.add = function ( option ) {
      var
        content;

      Viewport.find();

      if ( !!_viewport ) {

        content = _viewport.content;

        if ( content.indexOf( option ) === -1 ) {

          _viewport.content = content + ", " + option;

        }

      }

      return Viewport;

    };
    /**
     * @method replace
     * @static
     * @param {string} oldOption
     * @param {string} newOption
     * @return {Viewport}
     */
    Viewport.replace = function ( oldOption, newOption ) {
      var
        content;

      Viewport.find();

      if ( !!_viewport ) {

        content = _viewport.content;

        if ( content.indexOf( oldOption ) !== -1 ) {

          content.split( oldOption ).join( newOption );
          _viewport.content = content;

        }

      }

      return Viewport;

    };

    /**
     * viewport content 引数で書換
     * @method rewrite
     * @static
     * @param {string} content
     * @return {Viewport}
     */
    Viewport.rewrite = function ( content ) {

      Viewport.find();

      if ( !!_viewport ) {

        _viewport.content = content;

      }

      return Viewport;

    };
    /**
     * @method minimalUi
     * @static
     */
    Viewport.minimalUi = function () {
      var version = iOS.version();

      if ( version >= 7.1 && version < 8.0 ) {

        Viewport.add( "minimal-ui" );

      }

    };

    return Viewport;
  }() );

}( window ) );
/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/04/10 - 15:42
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @module Sagen
 */
( function ( window ){
  "use strict";

  var
    Sagen = window.Sagen,

    Device = Sagen.Device,
    Viewport = Sagen.Viewport;

  // execute Sagen
  // insert class at html
  Device.init();
  Viewport.init();

}( window ) );