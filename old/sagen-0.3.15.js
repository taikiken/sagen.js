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
 * @build: 7/4/2015, 5:37:44 PM
 * @version: 1.0.0
 */
!function(t){"use strict";var n=(t.document,Math.max),e=Math.abs,r=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){for(var t=0,n=["ms","moz","webkit","o"],e=0;e<n.length&&!r.requestAnimationFrame;++e)r.requestAnimationFrame=r[n[e]+"RequestAnimationFrame"],r.cancelAnimationFrame=r[n[e]+"CancelAnimationFrame"]||r[n[e]+"CancelRequestAnimationFrame"];void 0===r.requestAnimationFrame&&void 0!==r.setTimeout&&(r.requestAnimationFrame=function(n){var e=Date.now(),o=Math.max(0,16-(e-t)),i=r.setTimeout(function(){n(e+o)},o);return t=e+o,i}),void 0===r.cancelAnimationFrame&&void 0!==r.clearTimeout&&(r.cancelAnimationFrame=function(t){r.clearTimeout(t)})}(),"function"!=typeof Object.create&&(Object.create=function(){function t(){}var n=Object.prototype.hasOwnProperty;return function(e){if("object"!=typeof e)throw new TypeError("Object prototype may only be an Object or null");t.prototype=e;var r=new t;if(t.prototype=null,arguments.length>1){var o=Object(arguments[1]);for(var i in o)n.call(o,i)&&(r[i]=o[i])}return r}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,r){var o;if(null===this||"undefined"==typeof this)throw new TypeError('"this" is null or not defined');var i=Object(this),a=i.length>>>0;if(0===a)return-1;var c=+r||0;if(1/0===e(c)&&(c=0),c>=a)return-1;for(o=n(c>=0?c:a-e(c),0);a>o;){if(o in i&&i[o]===t)return o;o++}return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(t,n){var e,r;if(null===this||"undefined"==typeof this)throw new TypeError(" this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(e=n),r=0;i>r;){var a;r in o&&(a=o[r],t.call(e,a,r,o)),r++}}),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var n=Array.prototype.slice.call(arguments,1),e=this,r=function(){},o=function(){return e.apply(this instanceof r&&t?this:t,n.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,o.prototype=new r,o}),String.prototype.trim||!function(){var t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;String.prototype.trim=function(){return this.replace(t,"")}}(),navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,t.URL=t.URL||t.webkitURL||t.mozURL||t.msURL,r.console||(r.console={info:function(){},log:function(){},debug:function(){},warn:function(){},error:function(){},table:function(){}})}(window);
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
 * @build 2015-11-02 14:52:32
 * @version 0.9.3
 * @git https://github.com/taikiken/gasane.js
 *
 */
var Gasane=Gasane||{};!function(t){"use strict";var n=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){var t,e,i,s,o,r,a=0,u=["ms","moz","webkit","o"];for(t=0,e=u.length;e>t&&!n.requestAnimationFrame;++t)n.requestAnimationFrame=n[u[t]+"RequestAnimationFrame"],n.cancelAnimationFrame=n[u[t]+"CancelAnimationFrame"]||n[u[t]+"CancelRequestAnimationFrame"];void 0===n.requestAnimationFrame&&void 0!==n.setTimeout&&(r=Math.max,n.requestAnimationFrame=function(t){return i=Date.now(),s=r(0,16-(i-a)),o=n.setTimeout(function(){t(i+s)},s),a=i+s,o}),void 0===n.cancelAnimationFrame&&void 0!==n.clearTimeout&&(n.cancelAnimationFrame=function(t){n.clearTimeout(t)})}()}(window),function(t){"use strict";var n=t.Gasane;n.EventDispatcher=function(){function t(){}var n=t.prototype;return n.constructor=t,n.addEventListener=function(t,n){this.on(t,n)},n.on=function(t,n){if("undefined"!=typeof n){"undefined"==typeof this._listeners&&(this._listeners={});var e=this._listeners;"undefined"==typeof e[t]&&(e[t]=[]),-1===e[t].indexOf(n)&&e[t].push(n)}},n.hasEventListener=function(t,n){var e=this._listeners;return"undefined"==typeof e?!1:"undefined"!=typeof n[t]&&-1!==e[t].indexOf(n)?!0:!1},n.removeEventListener=function(t,n){this.off(t,n)},n.off=function(t,n){var e,i,s=this._listeners;"undefined"!=typeof s&&(e=s[t],"undefined"!=typeof e&&(i=e.indexOf(n),-1!==i&&e.splice(i,1)))},n.dispatchEvent=function(t){var n,e,i,s,o=this._listeners;if("undefined"!=typeof o&&"undefined"!=typeof t.type&&(n=o[t.type],"undefined"!=typeof n))for(t.target=this,console.log("dispatch start -------------- ",n.length),i=0,s=n.length;s>i;i=i+1|0)e=n[i],console.log("dispatchEvent ",t.type,n.length,n),e?e.call(this,t):console.log("dispatchEvent undefined ",t.type,s,n.length,n)},t.initialize=function(t){t.addEventListener=n.addEventListener,t.on=n.on,t.hasEventListener=n.hasEventListener,t.removeEventListener=n.removeEventListener,t.off=n.off,t.dispatchEvent=n.dispatchEvent},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Cycle=function(){function e(){throw new Error("Cycle can't create instance.")}var i=n.EventDispatcher,s=t.self.requestAnimationFrame,o=t.self.cancelAnimationFrame;e.started=!1,e.id=0,e.UPDATE="cycleUpdate",e.event={type:e.UPDATE,scope:e},i.initialize(e);var r=e.prototype;return r.constructor=e,e.start=function(){e.started||(e.started=!0,e.update())},e.stop=function(){e.started&&(o(e.id),e.started=!1,e.id=0)},e.update=function(){e.id=s(e.update),e.dispatchEvent(e.event)},e}()}(window),function(t){"use strict";var n=t.Gasane;n.Polling=function(){function t(n){this._polling=n,this._started=!1,this._start=0,this._boundUpdate=this.update.bind(this),this._event={type:t.PAST,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.PAST="pollingPast";var o=t.prototype;return e.initialize(o),o.constructor=t,o.start=function(){return this._started||(this._started=!0,this.setPolling(this._polling),i.on(i.UPDATE,this._boundUpdate),i.start()),this},o.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this},o.polling=function(){return this._polling},o.setPolling=function(t){return this._start=this.now(),this._polling=t,this},o.changePolling=function(t){return this.setPolling(t),this},o.now=function(){return s()},o.update=function(){var t,n=this.now();n-this._start>=this._polling&&(this._start=n,t=this._event,t.current=n,this.dispatchEvent(t))},t}()}(window),function(t){"use strict";var n=t.Gasane;n.Fps=function(){function t(n){this._fps=n,this._started=!1,this._start=0,this._polling=0,this._boundUpdate=this.update.bind(this),this._event={type:t.ENTER_FRAME,scope:this}}var e=n.EventDispatcher,i=n.Cycle,s=Date.now;t.ENTER_FRAME="enterFrame";var o=t.prototype;return e.initialize(o),o.constructor=t,o.start=function(){return this._started||(this._started=!0,this.setFps(this._fps),i.on(i.UPDATE,this._boundUpdate),i.start()),this},o.stop=function(){return this._started&&(this._started=!1,i.off(i.UPDATE,this._boundUpdate)),this._polling=Number.MAX_VALUE,this},o.fps=function(){return this._fps},o.setFps=function(t){return this._start=this.now(),this._polling=1e3/t,this._fps=t,this},o.changeFps=function(t){return this.setFps(t),this},o.now=function(){return s()},o.update=function(){var t,n=this.now();n-this._start>=this._polling&&(this._start=n,t=this._event,t.current=n,this.dispatchEvent(t))},t}()}(window);
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
 * @build 2015-10-27 20:58:23
 * @version 0.9.6
 *
 */
var wakegi=wakegi||{};wakegi["int"]=parseInt,wakegi["float"]=parseFloat,function(){"use strict";Array.isArray||(Array.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)})}(),function(n){"use strict";var t=n.wakegi;t.Browser=function(){function t(){throw new Error("Browser can't create instance.")}var e,r,i=n.navigator,o=t.prototype;return o.constructor=t,t.init=function(){("undefined"==typeof e||"undefined"==typeof r)&&(e=i.userAgent,r=i.appVersion)},t.navigator=function(){return i},t.ua=function(){return t.init(),e},t.app=function(){return t.init(),r},t.matchSafari=function(){return t.init(),!!e.match(/safari/i)},t}()}(window),function(n){"use strict";var t=n.document,e=n.wakegi,r=e.Browser;r.Css3=function(){function e(){throw new Error("Css3 can't create instance.")}var r,i,o,u,a,c,f=e.prototype;return f.constructor=e,e.transition=function(){var n;return"undefined"==typeof r&&(n=t.createElement("p").style,r="transition"in n||"WebkitTransition"in n||"MozTransition"in n||"msTransition"in n||"OTransition"in n),r},e.transform=function(){var n;return"undefined"==typeof i&&(n=t.createElement("p").style,i="transform"in n||"WebkitTransform"in n||"MozTransform"in n||"OTransform"in n||"msTransform"in n),i},e.matchMedia=function(){return"undefined"==typeof o&&(o="function"==typeof n.matchMedia),o},e.orientationChange=function(){return"undefined"==typeof u&&(u="onorientationchange"in n),u},e.orientation=function(){return"undefined"==typeof a&&(a="orientation"in n),a},e.backgroundSize=function(){return"undefined"==typeof c&&(c="backgroundSize"in t.documentElement.style),c},e}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Transition=function(){function n(){throw new Error("Transition can't create instance.")}var t=e.Css3,r=n.prototype;return r.constructor=n,n.is=function(){return t.transition()},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Transform=function(){function n(){throw new Error("Transform can't create instance.")}var t=e.Css3,r=n.prototype;return r.constructor=n,n.is=function(){return t.transform()},n}()}(window),function(n){"use strict";var t=n.document,e=n.wakegi,r=e.Browser;r.Element=function(){function e(){throw new Error("Element can't create instance.")}var r,i,o,u,a=e.prototype;return a.constructor=e,e.touch=function(){return"undefined"==typeof r&&(r="ontouchstart"in t.documentElement),r},e.querySelector=function(){return"undefined"==typeof i&&(i="undefined"!=typeof t.querySelector),i},e.canvas=function(){return"undefined"==typeof o&&(o=!!n.CanvasRenderingContext2D),o},e.webgl=function(){if("undefined"==typeof u&&(u=e.canvas()))try{u=!!n.WebGLRenderingContext&&!!t.createElement("canvas").getContext("experimental-webgl")}catch(r){u=!1}return u},e.find=function(n){var r;return e.querySelector()&&(r=t.querySelector(n)),r},e}()}(window),function(n){"use strict";var t=n.wakegi;t.Dom=function(){function n(n){this._element=n}var t=n.prototype;return t.constructor=n,t.element=function(){return this._element},t.hasClass=function(t){return n.hasClass(this._element,t)},t.addClass=function(t){return n.addClass(this._element,t),this},t.removeClass=function(t){return n.removeClass(this._element,t),this},t.style=function(t){return n.getStyle(this._element,t)},n.hasClass=function(n,t){return!!n.className.match(new RegExp(t,"i"))},n.addClass=function(t,e){var r,i="";return n.hasClass(t,e)||(r="",i=t.className,""!==i&&(r=" "),i+=r+e,i=i.split("  ").join(" "),t.className=i),n},n.removeClass=function(t,e){var r="";return n.hasClass(t,e)&&(r=t.className,r=r.replace(e,"").split("  ").join(" ")," "===r.substr(0,1)&&(r=r.substr(1))," "===r&&(r=""),t.className=r),n},n.styleCompute=function(n,t,e){var r=n.getComputedStyle(t,null);return e?(e=e.replace(/([A-Z])/g,"-$1").toLowerCase(),r.getPropertyValue(e)):r},n.styleCurrent=function(n,t){var e,r=n.currentStyle;return t?(t=t.replace(/\-(\w)/g,function(n,t){return t.toUpperCase()}),e=r[t],/^\d+(em|pt|%|ex)?$/i.test(e)?function(t){var e=n.style.left,r=n.runtimeStyle.left;return n.runtimeStyle.left=n.currentStyle.left,n.style.left=t||0,t=n.style.pixelLeft+"px",n.style.left=e,n.runtimeStyle.left=r,t}(e):e):r},n.getStyle=function(t,e){var r,i,o=t.ownerDocument;return o&&(r=o.defaultView),r&&r.getComputedStyle?i=n.styleCompute(r,t,e):t.currentStyle&&(i=n.styleCurrent(t,e)),i},n}()}(window),function(n){"use strict";n.wakegi.Util=function(){function n(){}var t=n.prototype;return t.constructor=n,n.camelize=function(n){return n.toLowerCase().replace(/-(.)/g,function(n,t){return t.toUpperCase()})},n.dash=function(n){return n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},n}()}(window),function(n){"use strict";var t=n.wakegi;t.Dataset=function(){function n(){}var e=t.Util,r=n.prototype;return r.constructor=n,n.parse=function(t){return"undefined"!=typeof t.dataset?n.modern(t):n.legacy(t)},n.modern=function(n){var t,e,r,i=n.dataset,o=!1,u={};for(t in i)r="",e="","function"==typeof i.hasOwnProperty?i.hasOwnProperty(t)&&(e=i[t],r=t):(e=i[t],r=t),r&&(o=!0,u[r]=e);return o?u:null},n.legacy=function(n){var t,r,i,o,u,a=n.attributes,c=!1,f={};for(t=0,r=a.length;r>t;t+=1)i=a[t],o=i.nodeName.toLowerCase(),-1!==o.indexOf("data-")&&(u=o.replace("data-",""),u=e.camelize(u),c=!0,f[u]=i.nodeValue.toLowerCase());return c?f:null},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Windows=function(){function n(){throw new Error("Windows can't create instance.")}var t,r,i=n.prototype;return i.constructor=n,n.init=function(){var n;"undefined"==typeof r&&(n=e.ua(),r=!!n.match(/windows/i),r?(t=!!n.match(/windows phone/i),t&&(r=!1)):t=!1)},n.is=function(){return n.init(),r},n.phone=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.iOS=function(){function n(){throw new Error("iOS can't create instance.")}var r,i,o,u,a,c,f,s,d=[-1,-1,-1],l=n.prototype;return l.constructor=n,n.init=function(){var t;"undefined"==typeof r&&(t=e.ua(),u=!!t.match(/ipad/i),o=!!t.match(/ipod/i),i=!!t.match(/iphone/i)&&!u&&!o,r=u||o||i,a=r&&!n.standalone()&&!e.matchSafari())},n.calculate=function(){var r,i,o,u,a,l,p=[];if("undefined"==typeof c&&(s="",c=-1,f=-1,n.is()&&(r=e.app().match(/OS (\d+)_(\d+)_?(\d+)?/),Array.isArray(r)))){for(i=t["int"],o=t["float"],u=1,a=r.length;a>u;u=u+1|0)l=r[u],p.push("undefined"!=typeof l?i(l,10):0);s=p.join("."),f=p[0],d=p,c=o(p[0]+"."+p[1]+p[2])}},n.is=function(){return n.init(),r},n.iPhone=function(){return n.init(),i},n.iPad=function(){return n.init(),u},n.iPod=function(){return n.init(),o},n.standalone=function(){var n=e.navigator();return n.standalone?n.standalone:!1},n.fullScreen=function(){return n.standalone()},n.version=function(){return n.calculate(),c},n.build=function(){return n.calculate(),s},n.major=function(){return n.calculate(),f},n.numbers=function(){return n.calculate(),d},n.number=function(){return n.numbers()},n.webView=function(){return n.init(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Mac=function(){function n(){throw new Error("Mac can't create instance.")}var t,r=e.iOS,i=n.prototype;return i.constructor=n,n.init=function(){"undefined"==typeof t&&(t=!r.is()&&!!e.ua().match(/mac os x/i))},n.is=function(){return n.init(),t},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Android=function(){function r(){throw new Error("Android can't create instance.")}var i,o,u,a,c,f,s,d,l=e.Windows,p=Math.max,w=[-1,-1,-1],m=r.prototype;return m.constructor=r,r.init=function(){var t,r;"undefined"==typeof o&&(t=e.ua(),o=!!t.match(/android/i),u=!1,a=!1,i=!1,c=!1,o&&(r=p(n.innerWidth,n.innerHeight),c=r>=1024,u=!!t.match(/mobile/i)||l.phone(),u||(a=!0),i=e.matchSafari()&&!!t.match(/version/i)))},r.calculate=function(){var n,i,o,u,a,c,l=[];if("undefined"==typeof f&&(d="",f=-1,s=-1,r.is()&&(n=e.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(i=t["int"],o=t["float"],u=1,a=n.length;a>u;u=u+1|0)c=n[u],l.push("undefined"!=typeof c?i(c,10):0);d=l.join("."),s=l[0],w=l,f=o(l[0]+"."+l[1]+l[2])}},r.is=function(){return r.init(),o},r.standard=function(){return r.init(),i},r.phone=function(){return r.init(),u},r.tablet=function(){return r.init(),a},r.hd=function(){return r.init(),c},r.version=function(){return r.calculate(),f},r.build=function(){return r.calculate(),d},r.major=function(){return r.calculate(),s},r.numbers=function(){return r.calculate(),w},r.number=function(){return r.numbers()},r}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Touch=function(){function n(){throw new Error("Touch can't create instance.")}var t=n.prototype;return t.constructor=n,n.is=function(){return Element.touch()},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Mobile=function(){function n(){throw new Error("Mobile can't create instance.")}var t=e.iOS,r=e.Android,i=e.Windows,o=n.prototype;return o.constructor=n,n.is=function(){return t.is()||r.is()||i.phone()},n.phone=function(){return t.iPhone()||t.iPod()||r.phone()},n.tablet=function(){return t.iPad()||r.tablet()},n.hideBar=function(){setTimeout(function(){scrollBy(0,1)},0)},n.hideURLBar=function(){n.hideBar()},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Edge=function(){function n(){throw new Error("Edge can't create instance.")}var r,i,o,u,a=[-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof r&&(r=!!e.ua().match(/edge/i))},n.calculate=function(){var r,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(r=e.ua().match(/edge\/(\d+)\.?(\d+)?/i),Array.isArray(r)))){for(c=t["int"],f=t["float"],s=1,d=r.length;d>s;s=s+1|0)l.push(c(r[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),a=l}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.IE=function(){function n(){throw new Error("IE can't create instance.")}var t,r,i,o,u,a,c,f,s=n.prototype;return s.constructor=n,n.init=function(){var n;("undefined"==typeof c||"undefined"==typeof t||"undefined"==typeof r||"undefined"==typeof i||"undefined"==typeof o||"undefined"==typeof u||"undefined"==typeof a)&&(n=e.ua(),t=!1,r=!1,i=!1,o=!1,u=!1,a=!1,c=!!n.match(/msie/i),c?(u=!!n.match(/msie [10]/i),u||(o=!!n.match(/msie [9]/i),o||(i=!!n.match(/msie [8]/i),i||(r=!!n.match(/msie [7]/i),r||(t=!!n.match(/msie [6]/i)))))):(a=!!n.match(/trident\/[7]/i)&&!!n.match(/rv:[11]/i),c=a))},n.calculate=function(){n.init(),"undefined"==typeof f&&(f=-1,n.is()&&(a?f=11:u?f=10:o?f=9:i?f=8:r?f=7:t&&(f=6)))},n.is=function(){return n.init(),c},n.is6=function(){return n.init(),t},n.is7=function(){return n.init(),r},n.is8=function(){return n.init(),i},n.is9=function(){return n.init(),o},n.is10=function(){return n.init(),u},n.is11=function(){return n.init(),a},n.version=function(){return n.calculate(),f},n.major=function(){return n.version()},n.legacy=function(){return n.init(),t||r||i},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.CriOS=function(){function n(){throw new Error("CriOS can't create instance.")}var r,i,o,u,a=[-1,-1,-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof r&&(r=!!e.ua().match(/crios/i))},n.calculate=function(){var r,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(r=e.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(r)))){for(c=t["int"],f=t["float"],s=1,d=r.length;d>s;s=s+1|0)l.push(c(r[s],10));u=l.join("."),o=l[0],a=l,i=f(l[0]+"."+l[1]+l[2]+l[3])}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),i},n.build=function(){return n.calculate(),u},n.major=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Chrome=function(){function n(){throw new Error("Chrome can't create instance.")}var r,i,o,u,a,c,f=e.CriOS,s=e.Android,d=e.Edge,l=[-1,-1,-1,-1],p=n.prototype;return p.constructor=n,n.init=function(){"undefined"==typeof o&&(r=f.is(),i=d.is(),o=!1,i||(r?o=!0:s.standard()||(o=!!e.ua().match(/chrome/i))))},n.calculate=function(){var i,o,s,d,p,w=[];if("undefined"==typeof u&&(c="",u=-1,a=-1,n.is()))if(r)c=f.build(),a=f.major(),l=f.numbers(),u=f.version();else if(i=e.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(i)){for(o=t["int"],s=t["float"],d=1,p=i.length;p>d;d=d+1|0)w.push(o(i[d],10));c=w.join("."),a=w[0],l=w,u=s(w[0]+"."+w[1]+w[2]+w[3])}},n.is=function(){return n.init(),o},n.version=function(){return n.calculate(),u},n.build=function(){return n.calculate(),c},n.major=function(){return n.calculate(),a},n.numbers=function(){return n.calculate(),l},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Firefox=function(){function n(){throw new Error("Firefox can't create instance.")}var r,i,o,u,a=[-1,-1],c=n.prototype;return c.constructor=n,n.init=function(){"undefined"==typeof r&&(r=!!e.ua().match(/firefox/i))},n.calculate=function(){var r,c,f,s,d,l=[];if("undefined"==typeof i&&(u="",i=-1,o=-1,n.is()&&(r=e.ua().match(/Firefox\/(\d+)\.?(\d+)?/),Array.isArray(r)))){for(c=t["int"],f=t["float"],s=1,d=r.length;d>s;s=s+1|0)l.push(c(r[s],10));u=l.join("."),o=l[0],i=f(l[0]+"."+l[1]),a=l}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),i},n.major=function(){return n.calculate(),o},n.build=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),a},n}()}(window),function(n){"use strict";var t=n.wakegi,e=t.Browser;e.Safari=function(){function n(){throw new Error("Safari can't create instance.")}var r,i,o,u,a,c,f,s=e.CriOS,d=e.Chrome,l=e.Android,p=e.Edge,w=[-1,-1,-1],m=n.prototype;return m.constructor=n,n.init=function(){"undefined"==typeof u&&(r=s.is(),i=d.is(),o=p.is(),u=r||i||o||l.standard()?!1:e.matchSafari())},n.calculate=function(){var r,i,o,u,s,d,l=[];if("undefined"==typeof a&&(f="",a=-1,c=-1,n.is()&&(r=e.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(r)))){for(i=t["int"],o=t["float"],u=1,s=r.length;s>u;u=u+1|0)d=r[u],l.push("undefined"!=typeof d?i(d,10):0);f=l.join("."),a=o(l[0]+"."+l[1]+l[2]),c=l[0],w=l}},n.is=function(){return n.init(),u},n.set=function(t){n.init(),u=t},n.version=function(){return n.calculate(),a},n.major=function(){return n.calculate(),c},n.build=function(){return n.calculate(),f},n.numbers=function(){return n.calculate(),w},n.number=function(){return n.numbers()},n}()}(window);
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
 * version 0.3.15
 * build 2015-11-02 14:52:36
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
          ._edge( classes );

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
