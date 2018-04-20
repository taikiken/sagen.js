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
/*!
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/24 - 12:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2016-12-29 22:07:42
 * @version 0.9.9
 * @git https://github.com/taikiken/gasane.js
 *
 */
var Gasane=window.Gasane||{};!function(t){"use strict";var e=t.self;Date.now||(Date.now=function(){return(new Date).getTime()}),function(){var t,n,i,s,r,a,o=0,u=["ms","moz","webkit","o"];for(t=0,n=u.length;t<n&&!e.requestAnimationFrame;++t)e.requestAnimationFrame=e[u[t]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[u[t]+"CancelAnimationFrame"]||e[u[t]+"CancelRequestAnimationFrame"];"undefined"==typeof e.requestAnimationFrame&&"undefined"!=typeof e.setTimeout&&(a=Math.max,e.requestAnimationFrame=function(t){return i=Date.now(),s=a(0,16-(i-o)),r=e.setTimeout(function(){t(i+s)},s),o=i+s,r}),"undefined"==typeof e.cancelAnimationFrame&&"undefined"!=typeof e.clearTimeout&&(e.cancelAnimationFrame=function(t){e.clearTimeout(t)})}()}(window),function(t){"use strict";function e(){this.listeners={}}var n=t.Gasane,i=e.prototype;i.constructor=e,i.addEventListener=function(t,e){this.on(t,e)},i.on=function(t,e){if(e){"undefined"==typeof this.listeners&&(this.listeners={});var n=this.listeners;"undefined"==typeof n[t]&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}},i.hasEventListener=function(t,e){return this.has(t,e)},i.has=function(t,e){var n=this.listeners;return"undefined"!=typeof n&&("undefined"!=typeof e[t]&&n[t].indexOf(e)!==-1)},i.removeEventListener=function(t,e){this.off(t,e)},i.off=function(t,e){var n,i,s,r,a,o=this.listeners;if("undefined"!=typeof o&&o.hasOwnProperty(t)&&(n=o[t],i=n.indexOf(e),i!==-1)){for(n[i]=null,a=!1,s=0,r=n.length;s<r;s=s+1|0)if(null!==n[s]){a=!0;break}a||(this.listeners[t]=[])}},i.dispatchEvent=function(t){var e,n,i,s,r=this.listeners;if("undefined"!=typeof r&&"undefined"!=typeof t.type&&(e=r[t.type],r.hasOwnProperty(t.type)))for(t.target=this,i=0,s=e.length;i<s;i=i+1|0)n=e[i],n&&n.call(this,t)},e.initialize=function(t){t.addEventListener=i.addEventListener,t.on=i.on,t.hasEventListener=i.hasEventListener,t.has=i.has,t.removeEventListener=i.removeEventListener,t.off=i.off,t.dispatchEvent=i.dispatchEvent},n.EventDispatcher=e}(window),function(t){"use strict";function e(){throw new Error("Cycle can't create instance.")}var n=t.Gasane,i=n.EventDispatcher,s=t.self.requestAnimationFrame,r=t.self.cancelAnimationFrame;e.started=!1,e.id=0,e.UPDATE="cycleUpdate",e.event={type:e.UPDATE,scope:e},i.initialize(e);var a=e.prototype;a.constructor=e,e.start=function(){e.started||(e.started=!0,e.update())},e.stop=function(){e.started&&(r(e.id),e.started=!1,e.id=0)},e.update=function(){e.id=s(e.update),e.dispatchEvent(e.event)},n.Cycle=e}(window),function(t){"use strict";function e(t){this.polling=t,this.started=!1,this.startId=0,this.boundUpdate=this.update.bind(this),this.event={type:e.PAST,scope:this}}var n=t.Gasane,i=n.EventDispatcher,s=n.Cycle,r=Date.now;e.PAST="pollingPast";var a=e.prototype;i.initialize(a),a.constructor=e,a.start=function(){return this.started||(this.started=!0,this.setPolling(this.polling),s.on(s.UPDATE,this.boundUpdate),s.start()),this.started},a.stop=function(){return this.started&&(this.started=!1,s.off(s.UPDATE,this.boundUpdate)),this.started},a.setPolling=function(t){return this.startId=this.now(),this.polling=t,t},a.changePolling=function(t){return this.setPolling(t)},a.now=function(){return r()},a.update=function(){var t,e=this.now();e-this.startId>=this.polling&&(this.startId=e,t=this.event,t.current=e,this.dispatchEvent(t))},n.Polling=e}(window),function(t){"use strict";function e(t){this.fps=t,this.started=!1,this.startId=0,this.polling=0,this.boundUpdate=this.update.bind(this),this.event={type:e.ENTER_FRAME,scope:this}}var n=t.Gasane,i=n.EventDispatcher,s=n.Cycle,r=Date.now;e.ENTER_FRAME="enterFrame";var a=e.prototype;i.initialize(a),a.constructor=e,a.start=function(){return this.started||(this.started=!0,this.setFps(this.fps),s.on(s.UPDATE,this.boundUpdate),s.start()),this.started},a.stop=function(){return this.started&&(this.started=!1,s.off(s.UPDATE,this.boundUpdate)),this.polling=Number.MAX_VALUE,this.started},a.setFps=function(t){return this.startId=this.now(),this.polling=1e3/t,this.fps=t,t},a.changeFps=function(t){return this.setFps(t)},a.now=function(){return r()},a.update=function(){var t,e=this.now();e-this.startId>=this.polling&&(this.startId=e,t=this.event,t.current=e,this.dispatchEvent(t))},n.Fps=e}(window);
var wakegi=window.wakegi||{};wakegi.int=parseInt,wakegi.float=parseFloat,function(){"use strict";Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,n){var r;if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),i=e.length>>>0;if(0===i)return-1;var o=+n||0;if(Math.abs(o)===1/0&&(o=0),o>=i)return-1;for(r=Math.max(o>=0?o:i-Math.abs(o),0);r<i;){if(r in e&&e[r]===t)return r;r++}return-1}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")})}(),function(t){"use strict";function n(){throw new Error("Browser can't create instance.")}var r,e,i=t.navigator;n.prototype.constructor=n,n.init=function(){void 0!==r&&void 0!==e||(r=i.userAgent,e=i.appVersion)},n.navigator=function(){return i},n.ua=function(){return n.init(),r},n.app=function(){return n.init(),e},n.matchSafari=function(){return n.init(),!!r.match(/safari/i)},t.wakegi.Browser=n}(window),function(t){"use strict";function n(){throw new Error("Iro can't create instance")}var r=t.wakegi,e=t.Math,i=e.floor,o=e.max,a=e.min,c=t.parseInt;n.prototype.constructor=n,n.rgb2hsl=function(t,n,r){var e,i,c,u,s=o(t/=255,n/=255,r/=255),f=a(t,n,r);if(c=(s+f)/2,s===f)e=0,i=0;else{switch(u=s-f,i=c>.5?u/(2-s-f):u/(s+f),s){case t:e=(n-r)/u+(n<r?6:0);break;case n:e=(r-t)/u+2;break;case r:e=(t-n)/u+4;break;default:e=0}e/=6}return{h:e,s:i,l:c}},n.hue2rgb=function(t,n,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*(n-t)*r:r<.5?n:r<2/3?t+(n-t)*(2/3-r)*6:t},n.hsl2rgb=function(t,r,e){var i,o,a,u,s;return 0===r?i=o=a=e:(s=2*e-(u=e<.5?e*(1+r):e+r-e*r),i=n.hue2rgb(s,u,t+1/3),o=n.hue2rgb(s,u,t),a=n.hue2rgb(s,u,t-1/3)),{r:c(255*i,10),g:c(255*o,10),b:c(255*a,10)}},n.rgb2hsv=function(t,n,r){var e,i,c=t/255,u=n/255,s=r/255,f=o(c,u,s),l=a(c,u,s),d=f,h=f-l;if(i=0===f?0:h/f,f===l)e=0;else{switch(f){case c:e=(u-s)/h+(u<s?6:0);break;case u:e=(s-c)/h+2;break;case s:e=(c-u)/h+4;break;default:e=0}e/=6}return{h:e,s:i,v:d}},n.hsv2rgb=function(t,n,r){var e,o,a,u=i(6*t),s=6*t-u,f=r*(1-n),l=r*(1-s*n),d=r*(1-(1-s)*n);switch(u%6){case 0:e=r,o=d,a=f;break;case 1:e=l,o=r,a=f;break;case 2:e=f,o=r,a=d;break;case 3:e=f,o=l,a=r;break;case 4:e=d,o=f,a=r;break;case 5:e=r,o=f,a=l;break;default:e=0,o=0,a=0}return{r:c(255*e,10),g:c(255*o,10),b:c(255*a,10)}},n.hexShort=function(t){if("string"!=typeof t)return null;var n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;return t.replace(n,function(t,n,r,e){return n+n+r+r+e+e})},n.hex2rgb=function(t){var r=n.hexShort(t);if("string"!=typeof r)return null;var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?{r:c(e[1],16),g:c(e[2],16),b:c(e[3],16)}:null},n.componentToHex=function(t){var n=t.toString(16);return 1===n.length?"0"+n:n},n.rgb2hex=function(t,r,e){return"#"+n.componentToHex(t)+n.componentToHex(r)+n.componentToHex(e)},n.int2hex=function(t){var n,r=i(t).toString(16);if(r.length<6)for(n=6-r.length;n;)r="0"+r,--n;return"#"+r},n.hex2int=function(t){var r=n.hexShort(t);return"string"!=typeof r?null:c(r,16)},r.Iro=n}(window),function(t){"use strict";function n(){}var r=t.wakegi;n.prototype.constructor=n,n.camelize=function(t){return t.toLowerCase().replace(/-(.)/g,function(t,n){return n.toUpperCase()})},n.dash=function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},r.Util=n}(window),function(t){"use strict";function n(){throw new Error("Patterns can't create instance")}var r={padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"],margin:["marginTop","marginRight","marginBottom","marginLeft"],"border-color":["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],"border-style":["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"],"border-width":["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"]};n.prototype.constructor=n,n.hyphen=function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()},n.has=function(t){var e=n.hyphen(t);return r.hasOwnProperty(e)},n.get=function(t){var e=n.hyphen(t);return r[e]},t.wakegi.Patterns=n}(window),function(t){"use strict";function n(){throw new Error("Css3 can't create instance.")}var r,e,i,o,a,c,u=t.document,s=t.wakegi.Browser;n.prototype.constructor=n,n.transition=function(){var t;return void 0===r&&(t=u.createElement("p").style,r="transition"in t||"WebkitTransition"in t||"MozTransition"in t||"msTransition"in t||"OTransition"in t),r},n.transform=function(){var t;return void 0===e&&(t=u.createElement("p").style,e="transform"in t||"WebkitTransform"in t||"MozTransform"in t||"OTransform"in t||"msTransform"in t),e},n.matchMedia=function(){return void 0===i&&(i="function"==typeof t.matchMedia),i},n.orientationChange=function(){return void 0===o&&(o="onorientationchange"in t),o},n.orientation=function(){return void 0===a&&(a="orientation"in t),a},n.backgroundSize=function(){return void 0===c&&(c="backgroundSize"in u.documentElement.style),c},s.Css3=n}(window),function(t){"use strict";function n(){throw new Error("Transition can't create instance.")}var r=t.wakegi.Browser,e=r.Css3;n.prototype.constructor=n,n.is=function(){return e.transition()},r.Transition=n}(window),function(t){"use strict";function n(){throw new Error("Transform can't create instance.")}var r=t.wakegi.Browser,e=r.Css3;n.prototype.constructor=n,n.is=function(){return e.transform()},r.Transform=n}(window),function(t){"use strict";function n(){throw new Error("Element can't create instance.")}var r,e,i,o,a=t.document,c=t.wakegi.Browser;n.prototype.constructor=n,n.touch=function(){return void 0===r&&(r="ontouchstart"in a.documentElement),r},n.querySelector=function(){return void 0===e&&(e=void 0!==a.querySelector),e},n.canvas=function(){return void 0===i&&(i=!!t.CanvasRenderingContext2D),i},n.webgl=function(){if(void 0===o&&(o=n.canvas()))try{o=!!t.WebGLRenderingContext&&!!a.createElement("canvas").getContext("experimental-webgl")}catch(t){o=!1}return o},n.find=function(t){var r;return n.querySelector()&&(r=a.querySelector(t)),r},c.Element=n}(window),function(t){"use strict";function n(t){this.element=t}var r=t.wakegi,e=r.Patterns,i=n.prototype;i.constructor=n,i.hasClass=function(t){return n.hasClass(this.element,t)},i.addClass=function(t){return n.addClass(this.element,t)},i.removeClass=function(t){return n.removeClass(this.element,t)},i.style=function(t){return n.getStyle(this.element,t)},n.hasClass=function(t,n){return-1!==t.className.split(" ").indexOf(n)},n.addClass=function(t,r){var e,i="",o=!1;return n.hasClass(t,r)||(e="",""!==(i=t.className)&&(e=" "),i=(i+=e+r).split("  ").join(" "),t.className=i,o=!0),o},n.removeClass=function(t,r){var e,i,o,a,c,u=!1;if(!n.hasClass(t,r))return u;for(o=0,a=(i=t.className.split(" ")).length;o<a;o=o+1|0)(c=i[o])&&c===r&&(u=!0,i[o]="XXX_XXX_XXX");return e=i.join(" ").replace("XXX_XXX_XXX","").split("  ").join(" "),e=e.trim(),t.className=e,u},n.styleCompute=function(t,n,r){var e=t.getComputedStyle(n,null);return r?(r=r.replace(/([A-Z])/g,"-$1").toLowerCase(),e.getPropertyValue(r)):e},n.styleCurrent=function(t,r){var e,i=t.currentStyle;return r?(r=r.replace(/\-(\w)/g,function(t,n){return n.toUpperCase()}),e=i[r],/^\d+(em|pt|%|ex)?$/i.test(e)?n.styleValue(t,e):e):i},n.styleValue=function(t,n){var r=t.style.left,e=t.runtimeStyle.left;return t.runtimeStyle.left=t.currentStyle.left,t.style.left=n||0,n=t.style.pixelLeft+"px",t.style.left=r,t.runtimeStyle.left=e,n},n.shortHand=function(t,r,e){var i=n.styleCompute(t,r,e[0]),o=n.styleCompute(t,r,e[1]),a=n.styleCompute(t,r,e[2]),c=n.styleCompute(t,r,e[3]);return i===a?o===c?i===o?i:i+" "+o:i+" "+o+" "+a+" "+c:o===c?i+" "+o+" "+a:i+" "+o+" "+a+" "+c},n.getStyle=function(t,r){var i,o,a=t.ownerDocument;return a&&(i=a.defaultView),i&&i.getComputedStyle?""===(o=n.styleCompute(i,t,r))&&r&&e.has(r)&&(o=n.shortHand(i,t,e.get(r))):t.currentStyle&&(o=n.styleCurrent(t,r)),o},r.Dom=n}(window),function(t){"use strict";function n(){}var r=t.wakegi,e=r.Util;n.prototype.constructor=n,n.parse=function(t){return void 0!==t.dataset?n.modern(t):n.legacy(t)},n.modern=function(t){var n,r,e,i=t.dataset,o=!1,a={};for(n in i)e="",r="","function"==typeof i.hasOwnProperty?i.hasOwnProperty(n)&&(r=i[n],e=n):(r=i[n],e=n),e&&(o=!0,a[e]=r);return o?a:null},n.legacy=function(t){var n,r,i,o,a,c=t.attributes,u=!1,s={};for(n=0,r=c.length;n<r;n=n+1|0)-1!==(o=(i=c[n]).nodeName.toLowerCase()).indexOf("data-")&&(a=o.replace("data-",""),u=!0,s[a=e.camelize(a)]=i.nodeValue.toLowerCase());return u?s:null},r.Dataset=n}(window),function(t){"use strict";function n(){throw new Error("Windows can't create instance.")}var r,e,i=t.wakegi.Browser;n.prototype.constructor=n,n.init=function(){var t;void 0===e&&(t=i.ua(),e=!!t.match(/windows/i),r=!!e&&!!t.match(/windows phone/i))},n.is=function(){return n.init(),e},n.phone=function(){return n.init(),r},i.Windows=n}(window),function(t){"use strict";function n(){throw new Error("iOS can't create instance.")}var r,e,i,o,a,c,u,s,f=t.wakegi,l=f.Browser,d=[-1,-1,-1];n.prototype.constructor=n,n.init=function(){var t;void 0===r&&(t=l.ua(),o=!!t.match(/ipad/i),i=!!t.match(/ipod/i),e=!!t.match(/iphone/i)&&!o&&!i,a=(r=o||i||e)&&!n.standalone()&&!l.matchSafari())},n.calculate=function(){var t,r,e,i,o,a,h=[];if(void 0===c&&(s="",c=-1,u=-1,n.is()&&(t=l.app().match(/OS (\d+)_(\d+)_?(\d+)?/),Array.isArray(t)))){for(r=f.int,e=f.float,i=1,o=t.length;i<o;i=i+1|0)void 0!==(a=t[i])?h.push(r(a,10)):h.push(0);s=h.join("."),u=h[0],d=h,c=e(h[0]+"."+h[1]+h[2])}},n.is=function(){return n.init(),r},n.iPhone=function(){return n.init(),e},n.iPad=function(){return n.init(),o},n.iPod=function(){return n.init(),i},n.standalone=function(){var t=l.navigator();return!!t.standalone&&t.standalone},n.fullScreen=function(){return n.standalone()},n.version=function(){return n.calculate(),c},n.build=function(){return n.calculate(),s},n.major=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),d},n.number=function(){return n.numbers()},n.webView=function(){return n.init(),a},l.iOS=n}(window),function(t){"use strict";function n(){throw new Error("Mac can't create instance.")}var r,e=t.wakegi.Browser,i=e.iOS;n.prototype.constructor=n,n.init=function(){void 0===r&&(r=!i.is()&&!!e.ua().match(/mac os x/i))},n.is=function(){return n.init(),r},e.Mac=n}(window),function(t){"use strict";function n(){throw new Error("Android can't create instance.")}var r,e,i,o,a,c,u,s,f=t.wakegi,l=f.Browser,d=l.Windows,h=Math.max,w=[-1,-1,-1];n.prototype.constructor=n,n.init=function(){var n,c;void 0===e&&(n=l.ua(),e=!!n.match(/android/i),i=!1,o=!1,r=!1,a=!1,d.phone()?e=!1:e&&(c=h(t.innerWidth,t.innerHeight),a=c>=1024,(i=!!n.match(/mobile/i))||(o=!0),r=l.matchSafari()&&(!!n.match(/version/i)||!!n.match(/samsungbrowser/i))))},n.calculate=function(){var t,r,e,i,o,a,d=[];if(void 0===c&&(s="",c=-1,u=-1,n.is()&&(t=l.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/),Array.isArray(t)))){for(r=f.int,e=f.float,i=1,o=t.length;i<o;i=i+1|0)void 0!==(a=t[i])?d.push(r(a,10)):d.push(0);s=d.join("."),u=d[0],w=d,c=e(d[0]+"."+d[1]+d[2])}},n.is=function(){return n.init(),e},n.standard=function(){return n.init(),r},n.phone=function(){return n.init(),i},n.tablet=function(){return n.init(),o},n.hd=function(){return n.init(),a},n.version=function(){return n.calculate(),c},n.build=function(){return n.calculate(),s},n.major=function(){return n.calculate(),u},n.numbers=function(){return n.calculate(),w},n.number=function(){return n.numbers()},n.rect=function(){return{width:t.innerWidth,height:t.innerHeight}},l.Android=n}(window),function(t){"use strict";function n(){throw new Error("Touch can't create instance.")}var r=t.wakegi.Browser,e=r.Element;n.prototype.constructor=n,n.is=function(){return e.touch()},r.Touch=n}(window),function(t){"use strict";function n(){throw new Error("Mobile can't create instance.")}var r=t.wakegi.Browser,e=r.iOS,i=r.Android,o=r.Windows;n.prototype.constructor=n,n.is=function(){return e.is()||i.is()||o.phone()},n.phone=function(){return e.iPhone()||e.iPod()||i.phone()||o.phone()},n.tablet=function(){return e.iPad()||i.tablet()},n.hideBar=function(){return setTimeout(function(){scrollBy(0,1)},0)},n.hideURLBar=function(){return n.hideBar()},r.Mobile=n}(window),function(t){"use strict";function n(){throw new Error("FxiOS can't create instance.")}var r,e,i,o,a=t.wakegi,c=a.Browser,u=[-1,-1];n.prototype.constructor=n,n.init=function(){void 0===r&&(r=!!c.ua().match(/fxios/i))},n.calculate=function(){var t,r,s,f,l,d=[];if(void 0===e&&(o="",e=-1,i=-1,n.is()&&(t=c.ua().match(/FxiOS\/(\d+)\.?(\d+)?/),Array.isArray(t)))){for(r=a.int,s=a.float,f=1,l=t.length;f<l;f=f+1|0)d.push(r(t[f],10));o=d.join("."),i=d[0],e=s(d[0]+"."+d[1]),u=d}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),e},n.major=function(){return n.calculate(),i},n.build=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),u},c.FxiOS=n}(window),function(t){"use strict";function n(){throw new Error("Edge can't create instance.")}var r,e,i,o,a=t.wakegi,c=a.Browser,u=[-1,-1];n.prototype.constructor=n,n.init=function(){void 0===r&&(r=!!c.ua().match(/edge/i))},n.calculate=function(){var t,r,s,f,l,d=[];if(void 0===e&&(o="",e=-1,i=-1,n.is()&&(t=c.ua().match(/edge\/(\d+)\.?(\d+)?/i),Array.isArray(t)))){for(r=a.int,s=a.float,f=1,l=t.length;f<l;f=f+1|0)d.push(r(t[f],10));o=d.join("."),i=d[0],e=s(d[0]+"."+d[1]),u=d}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),e},n.major=function(){return n.calculate(),i},n.build=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),u},c.Edge=n}(window),function(t){"use strict";function n(){throw new Error("IE can't create instance.")}var r,e,i,o,a,c,u,s,f=t.wakegi.Browser;n.prototype.constructor=n,n.init=function(){var t;void 0!==u&&void 0!==r&&void 0!==e&&void 0!==i&&void 0!==o&&void 0!==a&&void 0!==c||(t=f.ua(),r=!1,e=!1,i=!1,o=!1,a=!1,c=!1,(u=!!t.match(/msie/i))?(a=!!t.match(/msie [10]/i))||(o=!!t.match(/msie [9]/i))||(i=!!t.match(/msie [8]/i))||(e=!!t.match(/msie [7]/i))||(r=!!t.match(/msie [6]/i)):(c=!!t.match(/trident\/[7]/i)&&!!t.match(/rv:[11]/i),u=c))},n.calculate=function(){n.init(),void 0===s&&(s=-1,n.is()&&(c?s=11:a?s=10:o?s=9:i?s=8:e?s=7:r&&(s=6)))},n.is=function(){return n.init(),u},n.is6=function(){return n.init(),r},n.is7=function(){return n.init(),e},n.is8=function(){return n.init(),i},n.is9=function(){return n.init(),o},n.is10=function(){return n.init(),a},n.is11=function(){return n.init(),c},n.version=function(){return n.calculate(),s},n.major=function(){return parseInt(n.version(),10)},n.legacy=function(){return n.init(),r||e||i},f.IE=n}(window),function(t){"use strict";function n(){throw new Error("CriOS can't create instance.")}var r,e,i,o,a=t.wakegi,c=a.Browser,u=[-1,-1,-1,-1];n.prototype.constructor=n,n.init=function(){void 0===r&&(r=!!c.ua().match(/crios/i))},n.calculate=function(){var t,r,s,f,l,d=[];if(void 0===e&&(o="",e=-1,i=-1,n.is()&&(t=c.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(t)))){for(r=a.int,s=a.float,f=1,l=t.length;f<l;f=f+1|0)d.push(r(t[f],10));o=d.join("."),i=d[0],u=d,e=s(d[0]+"."+d[1]+d[2]+d[3])}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),e},n.build=function(){return n.calculate(),o},n.major=function(){return n.calculate(),i},n.numbers=function(){return n.calculate(),u},c.CriOS=n}(window),function(t){"use strict";function n(){throw new Error("Chrome can't create instance.")}var r,e,i,o,a,c,u=t.wakegi,s=u.Browser,f=s.CriOS,l=s.Android,d=s.Edge,h=[-1,-1,-1,-1];n.prototype.constructor=n,n.init=function(){void 0===i&&(r=f.is(),e=d.is(),i=!1,e||(r?i=!0:l.standard()||(i=!!s.ua().match(/chrome/i))))},n.calculate=function(){var t,e,i,l,d,w=[];if(void 0===o&&(c="",o=-1,a=-1,n.is()))if(r)c=f.build(),a=f.major(),h=f.numbers(),o=f.version();else if(t=s.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(t)){for(e=u.int,i=u.float,l=1,d=t.length;l<d;l=l+1|0)w.push(e(t[l],10));c=w.join("."),a=w[0],h=w,o=i(w[0]+"."+w[1]+w[2]+w[3])}},n.is=function(){return n.init(),i},n.version=function(){return n.calculate(),o},n.build=function(){return n.calculate(),c},n.major=function(){return n.calculate(),a},n.numbers=function(){return n.calculate(),h},s.Chrome=n}(window),function(t){"use strict";function n(){throw new Error("Firefox can't create instance.")}var r,e,i,o,a=t.wakegi,c=a.Browser,u=[-1,-1];n.prototype.constructor=n,n.init=function(){void 0===r&&(r=!!c.ua().match(/firefox/i))},n.calculate=function(){var t,r,s,f,l,d=[];if(void 0===e&&(o="",e=-1,i=-1,n.is()&&(t=c.ua().match(/Firefox\/(\d+)\.?(\d+)?/),Array.isArray(t)))){for(r=a.int,s=a.float,f=1,l=t.length;f<l;f=f+1|0)d.push(r(t[f],10));o=d.join("."),i=d[0],e=s(d[0]+"."+d[1]),u=d}},n.is=function(){return n.init(),r},n.version=function(){return n.calculate(),e},n.major=function(){return n.calculate(),i},n.build=function(){return n.calculate(),o},n.numbers=function(){return n.calculate(),u},c.Firefox=n}(window),function(t){"use strict";function n(){throw new Error("Safari can't create instance.")}var r,e,i,o,a,c,u,s,f=t.wakegi,l=f.Browser,d=l.CriOS,h=l.Chrome,w=l.Android,m=l.FxiOS,p=l.Edge,v=[-1,-1,-1];n.prototype.constructor=n,n.init=function(){void 0===a&&(r=d.is(),e=h.is(),i=p.is(),o=m.is(),a=!(r||e||i||w.standard()||o)&&l.matchSafari())},n.calculate=function(){var t,r,e,i,o,a,d=[];if(void 0===c&&(s="",c=-1,u=-1,n.is()&&(t=l.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(t)))){for(r=f.int,e=f.float,i=1,o=t.length;i<o;i=i+1|0)void 0!==(a=t[i])?d.push(r(a,10)):d.push(0);s=d.join("."),c=e(d[0]+"."+d[1]+d[2]),u=d[0],v=d}},n.is=function(){return n.init(),a},n.set=function(t){return n.init(),a=t,t},n.version=function(){return n.calculate(),c},n.major=function(){return n.calculate(),u},n.build=function(){return n.calculate(),s},n.numbers=function(){return n.calculate(),v},n.number=function(){return n.numbers()},l.Safari=n}(window);
/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * @license MIT
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Sagen
 * version 0.5.2
 * build 2018-4-20 14:35:09
 * github: https://github.com/taikiken/sagen.js
 *
 * @requires kaketsugi.js, wakegi.js, gasane.js
 */

/**
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

(function(window) {
  'use strict';
  var
    Gasane = window.Gasane,
    wakegi = window.wakegi,
    dataSet = {},
    flag = false,
    selector = 'sagen';

  // copy Class
  /**
   * wakegi.Browser
   * @class Browser
   * @type {wakegi.Browser}
   */
  Sagen.Browser = wakegi.Browser;
  /**
   * wakegi.Dom
   * @class Dom
   * @type {wakegi.Dom}
   */
  Sagen.Dom = wakegi.Dom;
  /**
   * Gasane.EventDispatcher
   * @class EventDispatcher
   * @type {Gasane.EventDispatcher}
   */
  Sagen.EventDispatcher = Gasane.EventDispatcher;
  /**
   * script#sagen data 属性を捜査しオプションフラッグを調べます
   * @method init
   * @param {string} id - script tag selector id - default `sagen`
   * @static
   * @private
   * @returns {*} Object を保障します
   */
  function init(id) {
    var
      element = document.getElementById(id),
      // element = document.getElementById('sagen'),
      data,
      results,
      key,
      val;
    if (!element) {
      return {};
    }
    data = wakegi.Dataset.parse(element);
    if (!data) {
      return {};
    }
    results = {};
    // loop
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        val = data[key].toLowerCase();
        results[key] = val === 'true';
      }
    }
    return results;
  }

  /**
   * data option が存在するかを調べます
   * @method check
   * @private
   * @static
   * @param {object} data data 属性パース済み object
   * @return {boolean} true: data 属性あり
   */
  function check(data) {
    var result;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        result = data[key];
        if (result) {
          break;
        }
      }
    }
    return result;
  }
  // 初期処理を行います
  dataSet = init(selector);
  flag = check(dataSet);

  /**
   * data 属性オプション を調べます
   * @method dataSet
   * @static
   * @for Sagen
   * @param {string} type data key 名称 `data-xxx` `xxx` 部分
   * @return {boolean} オプション有無
   */
  Sagen.dataSet = function(type) {
    return !!dataSet[type];
  };
  /**
   * data 属性オプションが存在するかを調べます
   * @method flag
   * @static
   * @return {boolean} true: 存在します
   */
  Sagen.flag = function() {
    return flag;
  };
  /**
   * 外部解放初期化関数
   * @param {string} id script selector id
   */
  Sagen.start = function(id) {
    dataSet = init(id);
    flag = check(dataSet);
  };
}(window));

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
(function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,

    EventDispatcher = Sagen.EventDispatcher,
    Browser = Sagen.Browser,
    Css3 = Browser.Css3,
    iOS = Browser.iOS,
    Android = Browser.Android,

    mathAbs = Math.abs,
    mathInt = parseInt,
    /**
     * orientation 可能フラッグ
     * @property orientation
     * @static
     * @type {boolean}
     * @private
     */
    orientation,
    /**
     * 監視するイベント種類
     * @property eventType
     * @static
     * @type {string}
     * @private
     */
    eventType,
    /**
     * 監視イベントハンドラ
     * @property handler
     * @static
     * @type {Function}
     * @private
     */
    handler,
    /**
     * matchMedia object
     * @property mediaQuery
     * @static
     * @type {MediaQueryList}
     * @private
     */
    mediaQuery,
    /**
     * start flag
     * @property started
     * @static
     * @private
     * @type {boolean}
     */
    started;

  /**
   * portrait / landscape 切替を監視
   * @class Orientation
   * @uses EventDispatcher
   * @static
   * @constructor
   */
  function Orientation() {
    throw new Error('Orientation can\'t create instance.');
  }

  var p = Orientation.prototype;
  p.constructor = Orientation;

  /**
   * orientation change event
   * @event CHANGE_ORIENTATION
   * @static
   * @type {string}
   */
  Orientation.CHANGE_ORIENTATION = 'changeOrientation';
  // mixin
  EventDispatcher.initialize(Orientation);

  /**
   * orientation event 監視を開始します
   * @method init
   * @static
   */
  Orientation.init = function() {
    Orientation.listen();
    Orientation.fire();
  };
  /**
   * orientation event を使用可能か調べます
   * @method canOrientation
   * @static
   * @return {boolean} true: orientation event を使用可能
   */
  Orientation.canOrientation = function() {
    if (typeof orientation === 'undefined') {
      orientation = Css3.orientation();
    }
    return orientation;
  };
  /**
   * 監視する event type, orientation event を使用不可の時は resize を監視します
   * @method eventType
   * @static
   * @return {string} orientationchange or resize
   */
  Orientation.eventType = function() {
    if (typeof eventType === 'undefined') {
      eventType = Css3.orientationChange() ? 'orientationchange' : 'resize';
    }
    return eventType;
  };
  /**
   * Orientation.CHANGE_ORIENTATION を dispatchし directionを "portrait" にします
   * @method portrait
   * @static
   */
  Orientation.portrait = function() {
    Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation });
  };
  /**
   * Orientation.CHANGE_ORIENTATIONをdispatchし directionを "landscape" にします
   * @method landscape
   * @static
   */
  Orientation.landscape = function() {
    Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation });
  };
  /**
   * orientation event 監視を開始します
   * @method listen
   * @static
   * @return {Orientation} method chain 可能にします
   */
  Orientation.listen = function() {
    // var
    // handler;
    if (!started) {
      started = true;
      // addEventListener が使えるは必須
      if (typeof window.addEventListener !== 'undefined') {
        // console.log('Css3.matchMedia()', Css3.matchMedia());
        if (Css3.matchMedia()) {
          // can use matchMedia
          // handler = Orientation.listenMatchMedia;
          Orientation.listenMatchMedia();
        } else {
          // matchMediaが使えないので代わりに window.orientationあるいは window 縦横比を使い判定します
          handler = Orientation.listenOrientation;
          // handler = handler;
          window.addEventListener(Orientation.eventType(), handler, false);
        }
      }
    }
    return Orientation;
  };
  /**
   * イベント監視を停止します
   * @method abort
   * @static
   */
  Orientation.abort = function() {
    if (!!handler && typeof window.addEventListener !== 'undefined') {
      window.removeEventListener(Orientation.eventType(), handler);
    }
  };
  /**
   * イベントを強制的に発火させます
   * @method fire
   * @static
   */
  Orientation.fire = function() {
    if (!!handler) {
      handler();
    } else if (!!mediaQuery) {
      Orientation.onRotate(mediaQuery);
    }
  };
  /**
   * orientation 監視を開始します
   * @method listenOrientation
   * @static
   */
  Orientation.listenOrientation = function() {
    if (Orientation.canOrientation()) {
      // window.orientation が使える
      // degree check
      if (Orientation.checkDegree()) {
        // portrait
        Orientation.portrait();
      } else {
        Orientation.landscape();
      }
    } else {
      // window 幅,高さを使う
      // aspect check
      if (Orientation.checkAspect()) {
        // portrait
        Orientation.portrait();
      } else {
        Orientation.landscape();
      }
    }
  };
  /**
   * 角度を測ります
   * @method checkDegree
   * @static
   * @return {boolean} true: 90degree
   */
  Orientation.checkDegree = function() {
    return mathAbs(window.orientation) !== 90;
  };
  /**
   * 縦横比を測ります
   * @method checkAspect
   * @static
   * @return {boolean} true: portrait
   */
  Orientation.checkAspect = function() {
    var
      w = mathInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 10),
      h = mathInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, 10);
    return h > w;
  };
  /**
   * Experia Z(Sony Tablet), portrait / landscape 表示が逆なのでwindow比率で判定する
   * @method onExperiaZ
   * @static
   */
  Orientation.onExperiaZ = function() {
    // window 幅,高さを使う
    // aspect check
    if (Orientation.checkAspect()) {
      // portrait
      Orientation.portrait();
    } else {
      Orientation.landscape();
    }
  };

  /**
   * window.matchMedia listener handler
   * @method onRotate
   * @static
   * @param {MediaQueryList} mediaQueryList MediaQueryList object
   */
  Orientation.onRotate = function(mediaQueryList) {
    // console.log('Orientation.onRotate', mediaQueryList.matches, mediaQueryList);
    // use matchMedia
    if (mediaQueryList.matches) {
      // portrait
      // Orientation.portrait();
      Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'portrait', scope: Orientation });
    } else {
      // landscape
      // Orientation.landscape();
      Orientation.dispatchEvent({ type: Orientation.CHANGE_ORIENTATION, direction: 'landscape', scope: Orientation });
    }
  };
  /**
   * orientation change event handler
   * @method onOrientationChange
   * @static
   */
  Orientation.onOrientationChange = function() {
    if (Orientation.checkDegree()) {
      // portrait
      Orientation.portrait();
    } else {
      // landscape
      Orientation.landscape();
    }
  };
  /**
   * matchMedia 監視を開始します
   * @method listenMatchMedia
   * @static
   */
  Orientation.listenMatchMedia = function() {
    var
      mql = window.matchMedia('(orientation: portrait)'),
      sgp312 = !!navigator.userAgent.match(/sgp312/i);

    mediaQuery = mql;

    // if ( ( iOS.is() && iOS.version() < 6 ) || ( Android.is() && Android.version() < 4.2 ) ) {
    if (sgp312) {
      // experia z
      window.addEventListener(Orientation.eventType(), Orientation.onExperiaZ, false);
    } else if (Android.standard() || (iOS.is() && iOS.version() < 6)) {
      // iOS 5 以下だと mql.addListener が作動しないのでorientationchangeを使用します
      window.addEventListener(Orientation.eventType(), Orientation.onOrientationChange, false);
    } else {
      // console.log('mql', mql);
      mql.addListener(Orientation.onRotate);
    }
  };

  Sagen.Orientation = Orientation;
}(window));

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
 * @requires Sagen.Dom
 *
 * @module Sagen
 * @submodule Classes
 * */
( function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,
    Dom = Sagen.Dom;
  /**
   * html tag へ class を追加・削除します
   * @class Classes
   * @param {Array} [classes=[]] 処理クラス名称配列
   * @param {Element} [dom=document.documentElement] CSS Class Add target HTML Element, default document.documentElement (html)
   * @constructor
   */
  function Classes(classes, dom) {
    classes = Array.isArray(classes) ? classes : [];
    // dom = !!dom || document.documentElement;
    if (!dom) {
      dom = document.documentElement;
    }

    /**
     * 処理クラス名称配列
     * @property classes
     * @type {Array}
     */
    this.classes = classes;
    /**
     * class tag を追加する element を wakegi.Dom instance
     * @property dom
     * @type {Dom}
     */
    this.dom = new Dom(dom);
    /**
     * class を追加する Element
     * @property tag
     * @type {Element}
     */
    this.tag = dom;
  }

  var p = Classes.prototype;
  p.constructor = Classes;

  /**
   * 不正値を削除します
   * @method clean
   * @return {Array} クリーン後の classes 配列
   */
  p.clean = function() {
    var
      classes = this.classes,
      alt = [],
      i = 0,
      limit = classes.length,
      value;
    for (;i < limit; i = (i + 1) | 0) {
      value = classes[i];
      if (!!value && value !== ' ') {
        alt.push(value);
      }
    }
    this.classes = alt;
    return alt;
  };
  /**
   * class 追加
   * @method add
   * @param {string} className 追加するクラス名称
   * @return {boolean} true: added
   */
  p.add = function(className) {
    var
      classes = this.classes,
      result = false;

    if (classes.indexOf(className) === -1) {
      classes.push(className);
      result = true;
    }

    return result;
  };
  /**
   * tag へクラスを書き込みます
   * @method write
   * @return {string} write したクラス名称
   */
  p.write = function() {
    // return this.dom.addClass(this.classes.join(' '));
    // var classNames = this.classes.join(' ');
    var
      classes = this.classes,
      classNames = classes.join(' '),
      dom = this.dom,
      i = 0,
      limit = classes.length;
    for(;i < limit; i = (i + 1) | 0) {
      dom.addClass(classes[i]);
    }
    // this.tag.className = classNames;
    return classNames;
  };
  /**
   * tag へ class を追加します
   * @method addClass
   * @param {string} className 追加する class 名称
   * @return {boolean} true: 追加成功
   */
  p.addClass = function(className) {
    return this.dom.addClass(className);
  };
  /**
   * tag から class を削除します
   * @method removeClass
   * @param {string} className 削除する class 名称
   * @return {boolean} true: 削除成功
   */
  p.removeClass = function(className) {
    return this.dom.removeClass(className);
  };
  Sagen.Classes = Classes;
}(window));

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
     * @type {Classes|undefined}
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
      .standard(classes)
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
   * @method standard
   * @static
   * @param {Classes} classes Classes instance を書きこみに使用します
   * @return {Device} method chain 可能にします
   */
  Device.standard = function(classes) {
    // standard
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
    // console.log('Sagen.dataSet("orientation")', Sagen.dataSet('orientation'), iOS.is());
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
  Device.onOrientation = function(event) {
    var
      direction = event.direction;
    // console.log('Device.onOrientation', event, direction, direction === 'portrait');
    if (direction === 'portrait') {
      classSymbol.removeClass('landscape');
      classSymbol.addClass('portrait');
    } else if (direction === 'landscape') {
      classSymbol.removeClass('portrait');
      classSymbol.addClass('landscape');
    }
  };

  Sagen.Device = Device;
}(window));

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
(function(window) {
  'use strict';
  var
    document = window.document,
    Sagen = window.Sagen,

    Browser = Sagen.Browser,
    iOS = Browser.iOS,
    Element = Browser.Element,
    /**
     * viewport tag
     * @property viewport
     * @static
     * @type {HTMLElement|String}
     * @private
     */
    viewport,
    /**
     * viewport.content
     * @property content
     * @static
     * @type {string}
     * @private
     */
    content;

  /**
   * viewport 関連処理を行います
   * @class Viewport
   * @static
   * @constructor
   */
  function Viewport() {
    throw new Error('Viewport can\'t create instance.');
  }

  var p = Viewport.prototype;
  p.constructor = Viewport;

  /**
   * data-ios が true の時に minimalUi を実行します
   * @method init
   * @static
   */
  Viewport.init = function() {
    if (Sagen.dataSet('ios')) {
      Viewport.minimalUi();
    }
  };
  /**
   * viewport tag と viewport.content を取得します
   * @method find
   * @static
   * @return {Viewport} method chain 可能にします
   */
  Viewport.find = function() {
    if (typeof viewport === 'undefined') {
      // viewport undefined
      viewport = Element.find('meta[name=\'viewport\']');
    }

    if (!!viewport) {
      content = viewport.content;
    } else {
      viewport = '';
      content = '';
    }

    return Viewport;
  };
  /**
   * viewport tag を取得します
   * @method Viewport
   * @static
   * @return {HTMLElement|*} viewport tag
   */
  Viewport.meta = function() {
    Viewport.find();
    return viewport;
  };
  /**
   * viewport.content を取得します
   * @method content
   * @static
   * @return {string} viewport.content
   */
  Viewport.content = function() {
    Viewport.find();
    return content;
  };
  /**
   * viewport tag を書き込みます
   * @method write
   * @static
   * @param {String} contentOption viewport.content データ
   * @return {Viewport} method chain 可能にします
   */
  Viewport.write = function(contentOption) {
    var
      meta;
    Viewport.find();
    if (!viewport) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = contentOption;
      viewport = meta;
      content = contentOption;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    return Viewport;
  };
  /**
   * viewport に追加します
   * @method add
   * @static
   * @param {string} option 追加オプション
   * @return {Viewport} method chain 可能にします
   */
  Viewport.add = function(option) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(option) === -1) {
        viewport.content = contentOption + ', ' + option;
      }
    }
    return Viewport;
  };
  /**
   * viewport を一部書き換えます
   * @method replace
   * @static
   * @param {string} oldOption 置換え元
   * @param {string} newOption 置換える viewport
   * @return {Viewport} method chain 可能にします
   */
  Viewport.replace = function(oldOption, newOption) {
    var
      contentOption;
    Viewport.find();
    if (!!viewport) {
      contentOption = viewport.content;
      if (contentOption.indexOf(oldOption) !== -1) {
        contentOption.split(oldOption).join(newOption);
        viewport.content = contentOption;
      }
    }
    return Viewport;
  };
  /**
   * viewport content 引数で書換
   * @method rewrite
   * @static
   * @param {string} contentOption 新規 content 文字列
   * @return {Viewport} method chain 可能にします
   */
  Viewport.rewrite = function(contentOption) {
    Viewport.find();
    if (!!viewport) {
      viewport.content = contentOption;
    }
    return Viewport;
  };
  /**
   * `minimal-ui` を追加します, iOS 7.1 ~ 8.0未満の時に実行されます
   * @method minimalUi
   * @static
   */
  Viewport.minimalUi = function() {
    var version = iOS.version();
    if (version >= 7.1 && version < 8.0) {
      Viewport.add('minimal-ui');
    }
  };

  Sagen.Viewport = Viewport;
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
 */
(function(window) {
  'use strict';
  var
    Sagen = window.Sagen,
    Device = Sagen.Device,
    Viewport = Sagen.Viewport;

  // execute Sagen
  // insert class at html
  Device.init();
  Viewport.init();
}(window));
