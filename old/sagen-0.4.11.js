/*!
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/16 - 14:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Polyfill
 *
 * build: 2015-11-24 20:21:10
 * version: 1.0.0
 * url https://github.com/taikiken/kaketsugi.js
 *
 */
!function(t){"use strict";var r=Math.max,e=Math.abs,n=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){for(var t=0,r=["ms","moz","webkit","o"],e=0;e<r.length&&!n.requestAnimationFrame;++e)n.requestAnimationFrame=n[r[e]+"RequestAnimationFrame"],n.cancelAnimationFrame=n[r[e]+"CancelAnimationFrame"]||n[r[e]+"CancelRequestAnimationFrame"];void 0===n.requestAnimationFrame&&void 0!==n.setTimeout&&(n.requestAnimationFrame=function(r){var e=Date.now(),o=Math.max(0,16-(e-t)),i=n.setTimeout(function(){r(e+o)},o);return t=e+o,i}),void 0===n.cancelAnimationFrame&&void 0!==n.clearTimeout&&(n.cancelAnimationFrame=function(t){n.clearTimeout(t)})}(),"function"!=typeof Object.create&&(Object.create=function(){function t(){}var r=Object.prototype.hasOwnProperty;return function(e){if("object"!=typeof e)throw new TypeError("Object prototype may only be an Object or null");t.prototype=e;var n=new t;if(t.prototype=null,arguments.length>1){var o=Object(arguments[1]);for(var i in o)r.call(o,i)&&(n[i]=o[i])}return n}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,n){var o;if(null===this||"undefined"==typeof this)throw new TypeError('"this" is null or not defined');var i=Object(this),a=i.length>>>0;if(0===a)return-1;var u=+n||0;if(e(u)===1/0&&(u=0),u>=a)return-1;for(o=r(u>=0?u:a-e(u),0);a>o;){if(o in i&&i[o]===t)return o;o++}return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(t,r){var e,n;if(null===this||"undefined"==typeof this)throw new TypeError(" this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=r),n=0;i>n;){var a;n in o&&(a=o[n],t.call(e,a,n,o)),n++}}),"undefined"===Array.prototype.reduce&&(Array.prototype.reduce=function(t){if(void 0===this||null===this)throw new TypeError;var r,e=Object(this),n=e.length>>>0,o=0;if("function"!=typeof t)throw new TypeError;if(0===n&&1===arguments.length)throw new TypeError;if(arguments.length>=2)r=arguments[1];else for(;;){if(o in e){r=e[o++];break}if(++o>=n)throw new TypeError}for(;n>o;)o in e&&(r=t.call(void 0,r,e[o],o,e)),o++;return r}),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var r=Array.prototype.slice.call(arguments,1),e=this,n=function(){},o=function(){return e.apply(this instanceof n&&t?this:t,r.concat(Array.prototype.slice.call(arguments)))};return n.prototype=this.prototype,o.prototype=new n,o}),String.prototype.trim||!function(){var t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(t,"")}}(),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,t.URL=t.URL||t.webkitURL||t.mozURL||t.msURL,n.console||(n.console={info:function(){},log:function(){},debug:function(){},warn:function(){},error:function(){},table:function(){}})}(window);
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
 * @build 2015-11-02 15:12:21
 * @version 0.9.4
 * @git https://github.com/taikiken/gasane.js
 *
 */
var Gasane=Gasane||{};!function(t){"use strict";var n=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){var t,e,i,s,r,o,a=0,u=["ms","moz","webkit","o"];for(t=0,e=u.length;e>t&&!n.requestAnimationFrame;++t)n.requestAnimationFrame=n[u[t]+"RequestAnimationFrame"],n.cancelAnimationFrame=n[u[t]+"CancelAnimationFrame"]||n[u[t]+"CancelRequestAnimationFrame"];void 0===n.requestAnimationFrame&&void 0!==n.setTimeout&&(o=Math.max,n.requestAnimationFrame=function(t){return i=Date.now(),s=o(0,16-(i-a)),r=n.setTimeout(function(){t(i+s)},s),a=i+s,r}),void 0===n.cancelAnimationFrame&&void 0!==n.clearTimeout&&(n.cancelAnimationFrame=function(t){n.clearTimeout(t)})}()}(window),function(t){"use strict";var n=t.Gasane;n.EventDispatcher=function(){function t(){}var n=t.prototype;return n.constructor=t,n.addEventListener=function(t,n){this.on(t,n)},n.on=function(t,n){if("undefined"!=typeof n){"undefined"==typeof this._listeners&&(this._listeners={});var e=this._listeners;"undefined"==typeof e[t]&&(e[t]=[]),-1===e[t].indexOf(n)&&e[t].push(n)}},n.hasEventListener=function(t,n){return this.has(t,n)},n.has=function(t,n){var e=this._listeners;return"undefined"==typeof e?!1:"undefined"!=typeof n[t]&&-1!==e[t].indexOf(n)?!0:!1},n.removeEventListener=function(t,n){this.off(t,n)},n.off=function(t,n){var e,i,s,r,o,a=this._listeners;if("undefined"!=typeof a&&(e=a[t],"undefined"!=typeof e&&(i=e.indexOf(n),-1!==i))){for(e[i]=null,o=!1,s=0,r=e.length;r>s;s=s+1|0)if(null!==e[s]){o=!0;break}o||(this._listeners[t]=[])}},n.dispatchEvent=function(t){var n,e,i,s,r=this._listeners;if("undefined"!=typeof r&&"undefined"!=typeof t.type&&(n=r[t.type],"undefined"!=typeof n))for(t.target=this,i=0,s=n.length;s>i;i=i+1|0)e=n[i],e&&e.call(this,t)},t.initialize=function(t){t.addEventListener=n.addEventListener,t.on=n.on,t.hasEventListener=n.hasEventListener,t.has=n.has,t.removeEventListener=n.removeEventListener,t.off=n.off,t.dispatchEvent=n.dispatchEvent},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Cycle=function(){function e(){throw new Error("Cycle can't create instance.")}var i=n.EventDispatcher,s=t.self.requestAnimationFrame,r=t.self.cancelAnimationFrame;e.started=!1,e.id=0,e.UPDATE="cycleUpdate",e.event={type:e.UPDATE,scope:e},i.initialize(e);var o=e.prototype;return o.constructor=e,e.start=function(){e.started||(e.started=!0,e.update())},e.stop=function(){e.started&&(r(e.id),e.started=!1,e.id=0)},e.update=function(){e.id=s(e.update),e.dispatchEvent(e.event)},e}()}(window),function(t){"use strict";var n=t.Gasane;n.Polling=function(){function t(n){this._polling=n,this._started=!1,this._start=0,this._boundUpdate=this.update.bind(this),this._event={type:t.PAST,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.PAST="pollingPast";var r=t.prototype;return e.initialize(r),r.constructor=t,r.start=function(){return this._started||(this._started=!0,this.setPolling(this._polling),i.on(i.UPDATE,this._boundUpdate),i.start()),this},r.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this},r.polling=function(){return this._polling},r.setPolling=function(t){return this._start=this.now(),this._polling=t,this},r.changePolling=function(t){return this.setPolling(t),this},r.now=function(){return s()},r.update=function(){var t,n=this.now();n-this._start>=this._polling&&(this._start=n,t=this._event,t.current=n,this.dispatchEvent(t))},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Fps=function(){function t(n){this._fps=n,this._started=!1,this._start=0,this._polling=0,this._boundUpdate=this.update.bind(this),this._event={type:t.ENTER_FRAME,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.ENTER_FRAME="enterFrame";var r=t.prototype;return e.initialize(r),r.constructor=t,r.start=function(){return this._started||(this._started=!0,this.setFps(this._fps),i.on(i.UPDATE,this._boundUpdate),i.start()),this},r.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this._polling=Number.MAX_VALUE,this},r.fps=function(){return this._fps},r.setFps=function(t){return this._start=this.now(),this._polling=1e3/t,this._fps=t,this},r.changeFps=function(t){return this.setFps(t),this},r.now=function(){return s()},r.update=function(){var t,n=this.now();n-this._start>=this._polling&&(this._start=n,t=this._event,t.current=n,this.dispatchEvent(t))},t}()}(window);
/*!
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build 2015-11-20 22:14:24
 * version 0.9.80
 * github: https://github.com/taikiken/wakegi.js
 */
var wakegi=wakegi||{};wakegi["int"]=parseInt,wakegi["float"]=parseFloat,function(){"use strict";Array.isArray||(Array.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)})}(),function(n){"use strict";var t=n.wakegi;t.Browser=function(){function t(){throw new Error("Browser can't create instance.")}var r,e,i=n.navigator,o=t.prototype;return o.constructor=t,t.init=function(){("undefined"==typeof r||"undefined"==typeof e)&&(r=i.userAgent,e=i.appVersion)},t.navigator=function(){return i},t.ua=function(){return t.init(),r},t.app=function(){return t.init(),e},t.matchSafari=function(){return t.init(),!!r.match(/safari/i)},t}()}(window),function(n){"use strict";var t=n.Math;n.wakegi.Iro=function(){function r(){throw new Error("Iro can't create instance")}var e=t.floor,i=t.max,o=t.min,u=n.parseInt,a=r.prototype;return a.constructor=r,r.rgb2hsl=function(n,t,r){n/=255,t/=255,r/=255;var e,u,a,c,f=i(n,t,r),s=o(n,t,r);if(a=(f+s)/2,f===s)e=u=0;else{switch(c=f-s,u=a>.5?c/(2-f-s):c/(f+s),f){case n:e=(t-r)/c+(r>t?6:0);break;case t:e=(r-n)/c+2;break;case r:e=(n-t)/c+4}e/=6}return{h:e,s:u,l:a}},r.hsl2rgb=function(n,t,r){function e(n,t,r){return 0>r&&(r+=1),r>1&&(r-=1),1/6>r?n+6*(t-n)*r:.5>r?t:2/3>r?n+(t-n)*(2/3-r)*6:n}var i,o,a,c,f;return 0===t?i=o=a=r:(c=.5>r?r*(1+t):r+t-r*t,f=2*r-c,i=e(f,c,n+1/3),o=e(f,c,n),a=e(f,c,n-1/3)),{r:u(255*i,10),g:u(255*o,10),b:u(255*a,10)}},r.rgb2hsv=function(n,t,r){n/=255,t/=255,r/=255;var e,u,a=i(n,t,r),c=o(n,t,r),f=a,s=a-c;if(u=0===a?0:s/a,a===c)e=0;else{switch(a){case n:e=(t-r)/s+(r>t?6:0);break;case t:e=(r-n)/s+2;break;case r:e=(n-t)/s+4}e/=6}return{h:e,s:u,v:f}},r.hsv2rgb=function(n,t,r){var i,o,a,c=e(6*n),f=6*n-c,s=r*(1-t),d=r*(1-f*t),l=r*(1-(1-f)*t);switch(c%6){case 0:i=r,o=l,a=s;break;case 1:i=d,o=r,a=s;break;case 2:i=s,o=r,a=l;break;case 3:i=s,o=d,a=r;break;case 4:i=l,o=s,a=r;break;case 5:i=r,o=s,a=d}return{r:u(255*i,10),g:u(255*o,10),b:u(255*a,10)}},r.hex2rgb=function(n){if("string"!=typeof n)return null;var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;return n=n.replace(r,function(n,t,r,e){return t+t+r+r+e+e}),t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),t?{r:u(t[1],16),g:u(t[2],16),b:u(t[3],16)}:null},r.rgb2hex=function(n,t,r){function e(n){var t=n.toString(16);return 1===t.length?"0"+t:t}return"#"+e(n)+e(t)+e(r)},r.int2hex=function(n){n=e(n);var t,r,i=n.toString(16);if(i.length<6)for(r=i.length,t=6-r;t;)i="0"+i,--t;return"#"+i},r}()}(window),function(n){"use strict";n.wakegi.Patterns=function(){function n(){throw new Error("Patterns can't create instance")}var t={padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"],margin:["marginTop","marginRight","marginBottom","marginLeft"],"border-color":["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],"border-style":["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"],"border-width":["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"]},r=n.prototype;return r.constructor=n,n.hyphen=function(n){return n.replace(/([A-Z])/g,"-$1").toLowerCase()},n.has=function(r){return r=n.hyphen(r),t.hasOwnProperty(r)},n.get=function(r){return r=n.hyphen(r),t[r]},n}()}(window),function(n){"use strict";var t=n.document,r=n.wakegi,e=r.Browser;e.Css3=function(){function r(){throw new Error("Css3 can't create instance.")}var e,i,o,u,a,c,f=r.prototype;return f.constructor=r,r.transition=function(){var n;return"undefined"==typeof e&&(n=t.createElement("p").style,e="transition"in n||"WebkitTransition"in n||"MozTransition"in n||"msTransition"in n||"OTransition"in n),e},r.transform=function(){var n;return"undefined"==typeof i&&(n=t.createElement("p").style,i="transform"in n||"WebkitTransform"in n||"MozTransform"in n||"OTransform"in n||"msTransform"in n),i},r.matchMedia=function(){return"undefined"==typeof o&&(o="function"==typeof n.matchMedia),o},r.orientationChange=function(){return"undefined"==typeof u&&(u="onorientationchange"in n),u},r.orientation=function(){return"undefined"==typeof a&&(a="orientation"in n),a},r.backgroundSize=function(){return"undefined"==typeof c&&(c="backgroundSize"in t.documentElement.style),c},r}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Transition=function(){function n(){throw new Error("Transition can't create instance.")}var t=r.Css3,e=n.prototype;return e.constructor=n,n.is=function(){return t.transition()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Transform=function(){function n(){throw new Error("Transform can't create instance.")}var t=r.Css3,e=n.prototype;return e.constructor=n,n.is=function(){return t.transform()},n}()}(window),function(n){"use strict";var t=n.document,r=n.wakegi,e=r.Browser;e.Element=function(){function r(){throw new Error("Element can't create instance.")}var e,i,o,u,a=r.prototype;return a.constructor=r,r.touch=function(){return"undefined"==typeof e&&(e="ontouchstart"in t.documentElement),e},r.querySelector=function(){return"undefined"==typeof i&&(i="undefined"!=typeof t.querySelector),i},r.canvas=function(){return"undefined"==typeof o&&(o=!!n.CanvasRenderingContext2D),o},r.webgl=function(){if("undefined"==typeof u&&(u=r.canvas()))try{u=!!n.WebGLRenderingContext&&!!t.createElement("canvas").getContext("experimental-webgl")}catch(e){u=!1}return u},r.find=function(n){var e;return r.querySelector()&&(e=t.querySelector(n)),e},r}()}(window),function(n){"use strict";var t=n.wakegi;t.Dom=function(){function n(n){this._element=n}var r=t.Patterns,e=n.prototype;return e.constructor=n,e.element=function(){return this._element},e.hasClass=function(t){return n.hasClass(this._element,t)},e.addClass=function(t){return n.addClass(this._element,t),this},e.removeClass=function(t){return n.removeClass(this._element,t),this},e.style=function(t){return n.getStyle(this._element,t)},n.hasClass=function(n,t){return!!n.className.match(new RegExp(t,"i"))},n.addClass=function(t,r){var e,i="";return n.hasClass(t,r)||(e="",i=t.className,""!==i&&(e=" "),i+=e+r,i=i.split("  ").join(" "),t.className=i),n},n.removeClass=function(t,r){var e="";return n.hasClass(t,r)&&(e=t.className,e=e.replace(r,"").split("  ").join(" ")," "===e.substr(0,1)&&(e=e.substr(1))," "===e&&(e=""),t.className=e),n},n.styleCompute=function(n,t,r){var e=n.getComputedStyle(t,null);return r?(r=r.replace(/([A-Z])/g,"-$1").toLowerCase(),e.getPropertyValue(r)):e},n.styleCurrent=function(n,t){var r,e=n.currentStyle;return t?(t=t.replace(/\-(\w)/g,function(n,t){return t.toUpperCase()}),r=e[t],/^\d+(em|pt|%|ex)?$/i.test(r)?function(t){var r=n.style.left,e=n.runtimeStyle.left;return n.runtimeStyle.left=n.currentStyle.left,n.style.left=t||0,t=n.style.pixelLeft+"px",n.style.left=r,n.runtimeStyle.left=e,t}(r):r):e},n.shortHand=function(t,r,e){var i=n.styleCompute(t,r,e[0]),o=n.styleCompute(t,r,e[1]),u=n.styleCompute(t,r,e[2]),a=n.styleCompute(t,r,e[3]),c="";return c=i===u?o===a?i===o?i:i+" "+o:i+" "+o+" "+u+" "+a:o===a?i+" "+o+" "+u:i+" "+o+" "+u+" "+a},n.getStyle=function(t,e){var i,o,u=t.ownerDocument;return u&&(i=u.defaultView),i&&i.getComputedStyle?(o=n.styleCompute(i,t,e),""===o&&e&&r.has(e)&&(o=n.shortHand(i,t,r.get(e)))):t.currentStyle&&(o=n.styleCurrent(t,e)),o},n}()}(window),function(n){"use strict";n.wakegi.Util=function(){function n(){}var t=n.prototype;return t.constructor=n,n.camelize=function(n){return n.toLowerCase().replace(/-(.)/g,function(n,t){return t.toUpperCase()})},n.dash=function(n){return n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},n}()}(window),function(n){"use strict";var t=n.wakegi;t.Dataset=function(){function n(){}var r=t.Util,e=n.prototype;return e.constructor=n,n.parse=function(t){return"undefined"!=typeof t.dataset?n.modern(t):n.legacy(t)},n.modern=function(n){var t,r,e,i=n.dataset,o=!1,u={};for(t in i)e="",r="","function"==typeof i.hasOwnProperty?i.hasOwnProperty(t)&&(r=i[t],e=t):(r=i[t],e=t),e&&(o=!0,u[e]=r);return o?u:null},n.legacy=function(n){var t,e,i,o,u,a=n.attributes,c=!1,f={};for(t=0,e=a.length;e>t;t+=1)i=a[t],o=i.nodeName.toLowerCase(),-1!==o.indexOf("data-")&&(u=o.replace("data-",""),u=r.camelize(u),c=!0,f[u]=i.nodeValue.toLowerCase());return c?f:null},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Windows=function(){function n(){throw new Error("Windows can't create instance.")}var t,e,i=n.prototype;return i.constructor=n,n.init=function(){var n;"undefined"==typeof e&&(n=r.ua(),e=!!n.match(/windows/i),e?(t=!!n.match(/windows phone/i),t&&(e=!1)):t=!1)},n.is=function(){return n.init(),e},n.phone=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.iOS=function(){function n(){throw new Error("iOS can't create instance.")}var e,i,o,u,a,c,f,s,d=[-1,-1,-1],l=n.prototype;return l.constructor=n,n.init=function(){var t;"undefined"==typeof e&&(t=r.ua(),u=!!t.match(/ipad/i),o=!!t.match(/ipod/i),i=!!t.match(/iphone/i)&&!u&&!o,e=u||o||i,a=e&&!n.standalone()&&!r.matchSafari())},n.calculate=function(){var e,i,o,u,a,l,p=[];if("undefined"==typeof c&&(s="",c=-1,f=-1,n.is()&&(e=r.app().match(/OS (\d+)_(\d+)_?(\d+)?/),Array.isArray(e)))){for(i=t["int"],o=t["float"],u=1,a=e.length;a>u;u=u+1|0)l=e[u],p.push("undefined"!=typeof l?i(l,10):0);s=p.join("."),f=p[0],d=p,c=o(p[0]+"."+p[1]+p[2])}},n.is=function(){return n.init(),e},n.iPhone=function(){return n.init(),i},n.iPad=function(){return n.init(),u},n.iPod=function(){return n.init(),o},n.standalone=function(){var n=r.navigator();return n.standalone?n.standalone:!1},n.fullScreen=function(){return n.standalone()},n.version=function(){return n.calculate(),c},n.build=function(){return n.calculate(),s},n.major=function(){return n.calculate(),f},n.numbers=function(){return n.calculate(),d},n.number=function(){return n.numbers()},n.webView=function(){return n.init(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Mac=function(){function n(){throw new Error("Mac can't create instance.")}var t,e=r.iOS,i=n.prototype;return i.constructor=n,n.init=function(){"undefined"==typeof t&&(t=!e.is()&&!!r.ua().match(/mac os x/i))},n.is=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Android=function(){function e(){throw new Error("Android can't create instance.")}var i,o,u,a,c,f,s,d,l=r.Windows,p=Math.max,w=[-1,-1,-1],h=e.prototype;return h.constructor=e,e.init=function(){var t,e;"undefined"==typeof o&&(t=r.ua(),o=!!t.match(/android/i),u=!1,a=!1,i=!1,c=!1,o&&(e=p(n.innerWidth,n.innerHeight),c=e>=1024,u=!!t.match(/mobile/i)||l.phone(),u||(a=!0),i=r.matchSafari()&&(!!t.match(/version/i)||!!t.match(/samsungbrowser/i))))},e.calculate=function(){var n,i,o,u,a,c,l=[];if("undefined"==typeof f&&(d="",f=-1,s=-1,e.is()&&(n=r.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(i=t["int"],o=t["float"],u=1,a=n.length;a>u;u=u+1|0)c=n[u],l.push("undefined"!=typeof c?i(c,10):0);d=l.join("."),s=l[0],w=l,f=o(l[0]+"."+l[1]+l[2])}},e.is=function(){return e.init(),o},e.standard=function(){return e.init(),i},e.phone=function(){return e.init(),u},e.tablet=function(){return e.init(),a},e.hd=function(){return e.init(),c},e.version=function(){return e.calculate(),f},e.build=function(){return e.calculate(),d},e.major=function(){return e.calculate(),s},e.numbers=function(){return e.calculate(),w},e.number=function(){return e.numbers()},e}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Touch=function(){function n(){throw new Error("Touch can't create instance.")}var t=n.prototype;return t.constructor=n,n.is=function(){return Element.touch()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Mobile=function(){function n(){throw new Error("Mobile can't create instance.")}var t=r.iOS,e=r.Android,i=r.Windows,o=n.prototype;return o.constructor=n,n.is=function(){return t.is()||e.is()||i.phone()},n.phone=function(){return t.iPhone()||t.iPod()||e.phone()},n.tablet=function(){return t.iPad()||e.tablet()},n.hideBar=function(){setTimeout(function(){scrollBy(0,1)},0)},n.hideURLBar=function(){n.hideBar()},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.FxiOS=function(){function n(){throw new Error("FxiOS can't create instance.")}var e,i,o,u,a=[-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/fxios/i))},n.calculate=function(){var e,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.ua().match(/FxiOS\/(\d+)\.?(\d+)?/),Array.isArray(e)))){for(c=t["int"],f=t["float"],s=1,d=e.length;d>s;s=s+1|0)l.push(c(e[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),a=l}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Edge=function(){function n(){throw new Error("Edge can't create instance.")}var e,i,o,u,a=[-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/edge/i))},n.calculate=function(){var e,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.ua().match(/edge\/(\d+)\.?(\d+)?/i),Array.isArray(e)))){for(c=t["int"],f=t["float"],s=1,d=e.length;d>s;s=s+1|0)l.push(c(e[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),a=l}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.IE=function(){function n(){throw new Error("IE can't create instance.")}var t,e,i,o,u,a,c,f,s=n.prototype;return s.constructor=n,n.init=function(){var n;("undefined"==typeof c||"undefined"==typeof t||"undefined"==typeof e||"undefined"==typeof i||"undefined"==typeof o||"undefined"==typeof u||"undefined"==typeof a)&&(n=r.ua(),t=!1,e=!1,i=!1,o=!1,u=!1,a=!1,c=!!n.match(/msie/i),c?(u=!!n.match(/msie [10]/i),u||(o=!!n.match(/msie [9]/i),o||(i=!!n.match(/msie [8]/i),i||(e=!!n.match(/msie [7]/i),e||(t=!!n.match(/msie [6]/i)))))):(a=!!n.match(/trident\/[7]/i)&&!!n.match(/rv:[11]/i),c=a))},n.calculate=function(){n.init(),"undefined"==typeof f&&(f=-1,n.is()&&(a?f=11:u?f=10:o?f=9:i?f=8:e?f=7:t&&(f=6)))},n.is=function(){return n.init(),c},n.is6=function(){return n.init(),t},n.is7=function(){return n.init(),e},n.is8=function(){return n.init(),i},n.is9=function(){return n.init(),o},n.is10=function(){return n.init(),u},n.is11=function(){return n.init(),a},n.version=function(){return n.calculate(),f},n.major=function(){return n.version()},n.legacy=function(){return n.init(),t||e||i},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.CriOS=function(){function n(){throw new Error("CriOS can't create instance.")}var e,i,o,u,a=[-1,-1,-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/crios/i))},n.calculate=function(){var e,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(e)))){for(c=t["int"],f=t["float"],s=1,d=e.length;d>s;s=s+1|0)l.push(c(e[s],10));u=l.join("."),o=l[0],a=l,i=f(l[0]+"."+l[1]+l[2]+l[3])}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.build=function(){return n.calculate(),u},n.major=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Chrome=function(){function n(){throw new Error("Chrome can't create instance.")}var e,i,o,u,a,c,f=r.CriOS,s=r.Android,d=r.Edge,l=[-1,-1,-1,-1],p=n.prototype;return p.constructor=n,n.init=function(){"undefined"==typeof o&&(e=f.is(),i=d.is(),o=!1,i||(e?o=!0:s.standard()||(o=!!r.ua().match(/chrome/i))))},n.calculate=function(){var i,o,s,d,p,w=[];if("undefined"==typeof u&&(c="",u=-1,a=-1,n.is()))if(e)c=f.build(),a=f.major(),l=f.numbers(),u=f.version();else if(i=r.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(i)){for(o=t["int"],s=t["float"],d=1,p=i.length;p>d;d=d+1|0)w.push(o(i[d],10));c=w.join("."),a=w[0],l=w,u=s(w[0]+"."+w[1]+w[2]+w[3])}},n.is=function(){return n.init(),o},n.version=function(){return n.calculate(),u},n.build=function(){return n.calculate(),c},n.major=function(){return n.calculate(),a},n.numbers=function(){return n.calculate(),l},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Firefox=function(){function n(){throw new Error("Firefox can't create instance.")}var e,i,o,u,a=[-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof e&&(e=!!r.ua().match(/firefox/i))},n.calculate=function(){var e,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(e=r.ua().match(/Firefox\/(\d+)\.?(\d+)?/),Array.isArray(e)))){for(c=t["int"],f=t["float"],s=1,d=e.length;d>s;s=s+1|0)l.push(c(e[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),a=l}},n.is=function(){return n.init(),e},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,r=t.Browser;r.Safari=function(){function n(){throw new Error("Safari can't create instance.")}var e,i,o,u,a,c,f,s,d=r.CriOS,l=r.Chrome,p=r.Android,w=r.FxiOS,h=r.Edge,m=[-1,-1,-1],y=n.prototype;return y.constructor=n,n.init=function(){"undefined"==typeof a&&(e=d.is(),i=l.is(),o=h.is(),u=w.is(),a=e||i||o||p.standard()||u?!1:r.matchSafari())},n.calculate=function(){var e,i,o,u,a,d,l=[];if("undefined"==typeof c&&(s="",c=-1,f=-1,n.is()&&(e=r.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(e)))){for(i=t["int"],o=t["float"],u=1,a=e.length;a>u;u=u+1|0)d=e[u],l.push("undefined"!=typeof d?i(d,10):0);s=l.join("."),c=o(l[0]+"."+l[1]+l[2]),f=l[0],m=l}},n.is=function(){return n.init(),a},n.set=function(t){n.init(),a=t},n.version=function(){return n.calculate(),c},n.major=function(){return n.calculate(),f},n.build=function(){return n.calculate(),s},n.numbers=function(){return n.calculate(),m},n.number=function(){return n.numbers()},n}()}(window);
/*!
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * version 0.4.11
 * build 2015-11-24 20:23:00
 * github: https://github.com/taikiken/sagen.js
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 */

/**
 *
 *
 * ## Browser detect helper
 *
 * htmlタグへCSS classをセットします。<br>
 * scriptタグdata属性から追加classをセットします<br>
 *
 *
 *      <script type="text/javascript" src="/js/sagen.min.js"
 *          id="sagen"
 *          data-orientation="true"
 *          data-browser="true">
 *      </script>
 *
 *
 *      // html へ class を追加した例
 *      // OS X Chrome
 *
 *      <html class="transition transform matchMedia background-size mac other chrome chrome41 chrome41_0 chrome41_0_2272 chrome41_0_2272_118 canvas webgl">
 *
 *
 *      // Browser / 端末判定にも使えます
 *
 *      if ( Sagen.Browser.iOS.is() ) {
 *        // iOS
 *      }
 *
 *
 *      // orientation 監視にも使えます(iOS, Android)
 *      var Orientation = Sagen.Orientation;
 *
 *
 *      Orientation.on( Orientation.CHANGE_ORIENTATION, function ( event ) {
 *
 *        var direction = event.direction;
 *
 *        if ( direction === 'portrait' ) {
 *          // portrait
 *        }
 *
 *        if ( direction === 'landscape' ) {
 *          // landscape
 *        }
 *
 *      } );
 *
 *      Orientation.listen();
 *
 * @module Sagen
 * @type {{}}
 *
 * */
var Sagen = window.Sagen || {};

( function ( window, Sagen ){
  'use strict';

  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,

    //option = [
    //  "orientation",
    //  "ios",
    //  "canvas",
    //  "browser"
    //],
    dataSet = ( function ( window ){

      var
        document = window.document,
        element = document.getElementById( 'sagen' ),
        results = {},
        data;

      function modern ( result, data ) {
        var
          key,
          //dataKey,
          val;

        for ( key in data ) {

          if ( typeof data.hasOwnProperty === 'function' && data.hasOwnProperty( key ) ) {

            //dataKey = key;

            val = data[ key ].toLowerCase();
            results[ key ] = val === 'true';

          } else {

            val = data[ key ].toLowerCase();
            results[ key ] = val === 'true';

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

          if ( nodeName.indexOf( 'data-' ) !== -1 ) {

            dataKey = nodeName.replace( 'data-', '' );
            results[ dataKey ] = attribute.nodeValue.toLowerCase() === 'true';

          }

        }

        return result;
      }

      if ( !!element ) {
        // id: sagen defined

        if ( typeof element.dataset !== 'undefined' ) {
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
 */
/**
 * orientation 監視
 *
 * @module Sagen
 * @submodule Orientation
 * */
( function ( window ){
  'use strict';

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
      throw new Error( 'Orientation can\'t create instance.' );
    }

    var p = Orientation.prototype;

    p.constructor = Orientation;

    /**
     * @event CHANGE_ORIENTATION
     * @static
     * @type {string}
     */
    Orientation.CHANGE_ORIENTATION = 'changeOrientation';

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

      if ( typeof _orientation === 'undefined' ) {

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

      if ( typeof _eventType === 'undefined' ) {

        _eventType = Css3.orientationChange() ? 'orientationchange' : 'resize';

      }

      return _eventType;

    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "portrait" にします
     * @method portrait
     * @static
     */
    Orientation.portrait = function () {

      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation } );

    };
    /**
     * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "landscape" にします
     * @method landscape
     * @static
     */
    Orientation.landscape = function () {

      Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation } );

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

        if ( typeof window.addEventListener !== 'undefined' ) {

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

      if ( !!_handler && typeof window.addEventListener !== 'undefined' ) {

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
        Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation } );

      } else {
        // landscape
        //Orientation.landscape();
        Orientation.dispatchEvent( { type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation } );

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
        mql = window.matchMedia( '(orientation: portrait)' ),
        sgp312 = !!navigator.userAgent.match(/sgp312/i);

      _mediaQuery = mql;

      //if ( ( iOS.is() && iOS.version() < 6 ) || ( Android.is() && Android.version() < 4.2 ) ) {
      if ( sgp312 ) {
        // experia z
        window.addEventListener( Orientation.eventType(), Orientation._experiaZ, false );

      }
      //else if ( iOS.is() && iOS.version() < 6 ) {
      else if ( (iOS.is() && iOS.version() < 6)  || Android.standard() ) {
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
 */
/**
 * html tag へ class を付与します
 *
 * @module Sagen
 * @submodule Classes
 * */
( function ( window ){
  'use strict';

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
      this._dom.addClass( this._classes.join( ' ' ) );
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
 */
/**
 * @module Sagen
 * @submodule Device
 * */
( function ( window ){
  'use strict';

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
      FxiOS = Browser.FxiOS,
      IE = Browser.IE,
      Edge = Browser.Edge,
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
      throw new Error( 'Device can\'t create instance.' );
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

      if ( Sagen.dataSet( 'browser' ) ) {

        Device._ie( classes )
          ._chrome( classes )
          ._safari( classes )
          ._firefox( classes )
          ._edge( classes )
          ._fxios( classes );

      }

      if ( Sagen.dataSet( 'canvas' ) ) {

        Device._canvas( classes );

      }

      // orientation
      // ToDo: orientation change
      if ( Sagen.dataSet( 'orientation' ) && ( iOS.is() || Android.is()) ) {

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
     * @param {Array} numbers
     * @return {Device}
     * @private
     */
    Device._version = function ( classes, prefix, numbers ) {
      var
        version = '',
        _ = '_',
        i, limit;

      for ( i = 0, limit = numbers.length; i < limit; i = i + 1 ) {

        version += numbers[ i ] + '';
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
        prefix = 'ios';

        classes.add( prefix );

        if ( iOS.iPad() ) {
          // ipad
          classes.add( 'ipad' ).add( 'tablet' );

        } else if ( iOS.iPod() ) {
          // ipod
          classes.add( 'ipod' ).add( 'mobile' );


        } else if ( iOS.iPhone() ) {
          // ipod
          classes.add( 'iphone' ).add( 'mobile' );

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
        prefix = 'android';

        classes.add( prefix );

        if ( Android.tablet() ) {
          // ipad
          classes.add( 'tablet' );

        } else if ( Android.phone() ) {
          // ipod
          classes.add( 'mobile' );

        }

        if ( Android.standard() ) {

          classes.add( 'android-standard' );

        }

        if ( Android.hd() ) {

          classes.add( 'android-hd' );

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

        classes.add( 'transition' );

      }

      if ( Css3.transform() ) {

        classes.add( 'transform' );

      }

      if ( Css3.matchMedia() ) {

        classes.add( 'matchMedia' );

      }

      if ( Css3.orientation() ) {

        classes.add( 'orientation' );

      }

      if ( Css3.orientationChange() ) {

        classes.add( 'orientation-change' );

      }

      if ( Css3.backgroundSize() ) {

        classes.add( 'background-size' );

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

        classes.add( 'touch' );

      }

      if ( Element.querySelector() ) {

        classes.add( 'querySelector' );

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

        classes.add( 'mac' );
        pc = true;

      }

      if ( Windows.is() ) {

        classes.add( 'windows' );
        pc = true;

      }

      if ( pc ) {

        classes.add( 'other' );

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

        prefix = 'safari';
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

        prefix = 'chrome';
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

        prefix = 'firefox';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Firefox.numbers() );

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
    Device._edge = function ( classes ) {

      var
        prefix;

      if ( Edge.is() ) {

        prefix = 'edge';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, Edge.numbers() );

      }

      return Device;

    };
    /**
     * @method _fxios
     * @static
     * @param {Classes} classes
     * @return {Device}
     * @private
     */
    Device._fxios = function ( classes ) {

      var
        prefix;

      if ( FxiOS.is() ) {

        // FxiOS is true
        prefix = 'fxios';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, FxiOS.numbers() );

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

        prefix = 'ie';
        classes.add( prefix );

        // version
        Device._version( classes, prefix, String( IE.version() ).split( '.' ) );

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

        classes.add( 'canvas' );

        if ( Element.webgl() ) {

          classes.add( 'webgl' );

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

      if ( direction === 'portrait' ) {

        _classes.removeClass( 'landscape' ).addClass( 'portrait' );

      } else if ( direction === 'landscape' ) {

        _classes.removeClass( 'portrait' ).addClass( 'landscape' );

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
 */
/**
 * meta viewport rewrite / write
 *
 * @module Sagen
 * @submodule Viewport
 * */
( function ( window ){
  'use strict';

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
      throw new Error( 'Viewport can\'t create instance.' );
    }

    var p = Viewport.prototype;

    p.constructor = Viewport;

    /**
     * @method init
     * @static
     */
    Viewport.init = function () {

      if ( Sagen.dataSet( 'ios' ) ) {

        Viewport.minimalUi();

      }

    };
    /**
     * @method find
     * @static
     * @return {Viewport}
     */
    Viewport.find = function () {

      if ( typeof _viewport === 'undefined' ) {
        // _viewport undefined
        _viewport = Element.find( 'meta[name=\'viewport\']' );

      }

      if ( !!_viewport ) {

        _content = _viewport.content;

      } else {

        _viewport = '';
        _content = '';

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

        meta = document.createElement( 'meta' );
        meta.name = 'viewport';
        meta.content = content;
        _viewport = meta;
        _content = content;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( meta );

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

          _viewport.content = content + ', ' + option;

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

        Viewport.add( 'minimal-ui' );

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
 */
/**
 * execute Sagen default method
 *
 *
 */
( function ( window ){
  'use strict';

  var
    Sagen = window.Sagen,

    Device = Sagen.Device,
    Viewport = Sagen.Viewport;

  // execute Sagen
  // insert class at html
  Device.init();
  Viewport.init();

}( window ) );
