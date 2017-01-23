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
/*!
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/03/17 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * build 2016-12-31 16:07:14
 * version 0.9.9
 * github: https://github.com/taikiken/wakegi.js
 */
var wakegi=window.wakegi||{};wakegi.int=parseInt,wakegi.float=parseFloat,function(){"use strict";Array.isArray||(Array.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(n,t){var e;if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),i=r.length>>>0;if(0===i)return-1;var o=+t||0;if(Math.abs(o)===1/0&&(o=0),o>=i)return-1;for(e=Math.max(o>=0?o:i-Math.abs(o),0);e<i;){if(e in r&&r[e]===n)return e;e++}return-1}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")})}(),function(n){"use strict";function t(){throw new Error("Browser can't create instance.")}var e,r,i=n.navigator,o=t.prototype;o.constructor=t,t.init=function(){"undefined"!=typeof e&&"undefined"!=typeof r||(e=i.userAgent,r=i.appVersion)},t.navigator=function(){return i},t.ua=function(){return t.init(),e},t.app=function(){return t.init(),r},t.matchSafari=function(){return t.init(),!!e.match(/safari/i)},n.wakegi.Browser=t}(window),function(n){"use strict";function t(){throw new Error("Iro can't create instance")}var e=n.wakegi,r=n.Math,i=r.floor,o=r.max,u=r.min,a=n.parseInt,c=t.prototype;c.constructor=t,t.rgb2hsl=function(n,t,e){n/=255,t/=255,e/=255;var r,i,a,c,s=o(n,t,e),f=u(n,t,e);if(a=(s+f)/2,s===f)r=0,i=0;else{switch(c=s-f,i=a>.5?c/(2-s-f):c/(s+f),s){case n:r=(t-e)/c+(t<e?6:0);break;case t:r=(e-n)/c+2;break;case e:r=(n-t)/c+4;break;default:r=0}r/=6}return{h:r,s:i,l:a}},t.hue2rgb=function(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+6*(t-n)*e:e<.5?t:e<2/3?n+(t-n)*(2/3-e)*6:n},t.hsl2rgb=function(n,e,r){var i,o,u,c,s;return 0===e?i=o=u=r:(c=r<.5?r*(1+e):r+e-r*e,s=2*r-c,i=t.hue2rgb(s,c,n+1/3),o=t.hue2rgb(s,c,n),u=t.hue2rgb(s,c,n-1/3)),{r:a(255*i,10),g:a(255*o,10),b:a(255*u,10)}},t.rgb2hsv=function(n,t,e){var r,i,a=n/255,c=t/255,s=e/255,f=o(a,c,s),d=u(a,c,s),l=f,p=f-d;if(i=0===f?0:p/f,f===d)r=0;else{switch(f){case a:r=(c-s)/p+(c<s?6:0);break;case c:r=(s-a)/p+2;break;case s:r=(a-c)/p+4;break;default:r=0}r/=6}return{h:r,s:i,v:l}},t.hsv2rgb=function(n,t,e){var r,o,u,c=i(6*n),s=6*n-c,f=e*(1-t),d=e*(1-s*t),l=e*(1-(1-s)*t);switch(c%6){case 0:r=e,o=l,u=f;break;case 1:r=d,o=e,u=f;break;case 2:r=f,o=e,u=l;break;case 3:r=f,o=d,u=e;break;case 4:r=l,o=f,u=e;break;case 5:r=e,o=f,u=d;break;default:r=0,o=0,u=0}return{r:a(255*r,10),g:a(255*o,10),b:a(255*u,10)}},t.hexShort=function(n){if("string"!=typeof n)return null;var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;return n.replace(t,function(n,t,e,r){return t+t+e+e+r+r})},t.hex2rgb=function(n){var e=t.hexShort(n);if("string"!=typeof e)return null;var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:a(r[1],16),g:a(r[2],16),b:a(r[3],16)}:null},t.componentToHex=function(n){var t=n.toString(16);return 1===t.length?"0"+t:t},t.rgb2hex=function(n,e,r){var i=t.componentToHex(n),o=t.componentToHex(e),u=t.componentToHex(r);return"#"+i+o+u},t.int2hex=function(n){var t,e,r=i(n),o=r.toString(16);if(o.length<6)for(e=o.length,t=6-e;t;)o="0"+o,--t;return"#"+o},t.hex2int=function(n){var e=t.hexShort(n);return"string"!=typeof e?null:a(e,16)},e.Iro=t}(window),function(n){"use strict";function t(){}var e=n.wakegi,r=t.prototype;r.constructor=t,t.camelize=function(n){return n.toLowerCase().replace(/-(.)/g,function(n,t){return t.toUpperCase()})},t.dash=function(n){return n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},e.Util=t}(window),function(n){"use strict";function t(){throw new Error("Patterns can't create instance")}var e={padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"],margin:["marginTop","marginRight","marginBottom","marginLeft"],"border-color":["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],"border-style":["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"],"border-width":["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"]},r=t.prototype;r.constructor=t,t.hyphen=function(n){return n.replace(/([A-Z])/g,"-$1").toLowerCase()},t.has=function(n){var r=t.hyphen(n);return e.hasOwnProperty(r)},t.get=function(n){var r=t.hyphen(n);return e[r]},n.wakegi.Patterns=t}(window),function(n){"use strict";function t(){throw new Error("Css3 can't create instance.")}var e,r,i,o,u,a,c=n.document,s=n.wakegi,f=s.Browser,d=t.prototype;d.constructor=t,t.transition=function(){var n;return"undefined"==typeof e&&(n=c.createElement("p").style,e="transition"in n||"WebkitTransition"in n||"MozTransition"in n||"msTransition"in n||"OTransition"in n),e},t.transform=function(){var n;return"undefined"==typeof r&&(n=c.createElement("p").style,r="transform"in n||"WebkitTransform"in n||"MozTransform"in n||"OTransform"in n||"msTransform"in n),r},t.matchMedia=function(){return"undefined"==typeof i&&(i="function"==typeof n.matchMedia),i},t.orientationChange=function(){return"undefined"==typeof o&&(o="onorientationchange"in n),o},t.orientation=function(){return"undefined"==typeof u&&(u="orientation"in n),u},t.backgroundSize=function(){return"undefined"==typeof a&&(a="backgroundSize"in c.documentElement.style),a},f.Css3=t}(window),function(n){"use strict";function t(){throw new Error("Transition can't create instance.")}var e=n.wakegi,r=e.Browser,i=r.Css3,o=t.prototype;o.constructor=t,t.is=function(){return i.transition()},r.Transition=t}(window),function(n){"use strict";function t(){throw new Error("Transform can't create instance.")}var e=n.wakegi,r=e.Browser,i=r.Css3,o=t.prototype;o.constructor=t,t.is=function(){return i.transform()},r.Transform=t}(window),function(n){"use strict";function t(){throw new Error("Element can't create instance.")}var e,r,i,o,u=n.document,a=n.wakegi,c=a.Browser,s=t.prototype;s.constructor=t,t.touch=function(){return"undefined"==typeof e&&(e="ontouchstart"in u.documentElement),e},t.querySelector=function(){return"undefined"==typeof r&&(r="undefined"!=typeof u.querySelector),r},t.canvas=function(){return"undefined"==typeof i&&(i=!!n.CanvasRenderingContext2D),i},t.webgl=function(){if("undefined"==typeof o&&(o=t.canvas()))try{o=!!n.WebGLRenderingContext&&!!u.createElement("canvas").getContext("experimental-webgl")}catch(n){o=!1}return o},t.find=function(n){var e;return t.querySelector()&&(e=u.querySelector(n)),e},c.Element=t}(window),function(n){"use strict";function t(n){this.element=n}var e=n.wakegi,r=e.Patterns,i=t.prototype;i.constructor=t,i.hasClass=function(n){return t.hasClass(this.element,n)},i.addClass=function(n){return t.addClass(this.element,n)},i.removeClass=function(n){return t.removeClass(this.element,n)},i.style=function(n){return t.getStyle(this.element,n)},t.hasClass=function(n,t){var e=n.className,r=e.split(" ");return r.indexOf(t)!==-1},t.addClass=function(n,e){var r,i="",o=!1;return t.hasClass(n,e)||(r="",i=n.className,""!==i&&(r=" "),i+=r+e,i=i.split("  ").join(" "),n.className=i,o=!0),o},t.removeClass=function(n,e){var r,i,o,u,a,c,s=!1;if(!t.hasClass(n,e))return s;for(i=n.className,o=i.split(" "),u=0,a=o.length;u<a;u=u+1|0)c=o[u],c&&c===e&&(s=!0,o[u]="XXX_XXX_XXX");return r=o.join(" ").replace("XXX_XXX_XXX","").split("  ").join(" "),r=r.trim(),n.className=r,s},t.styleCompute=function(n,t,e){var r=n.getComputedStyle(t,null);return e?(e=e.replace(/([A-Z])/g,"-$1").toLowerCase(),r.getPropertyValue(e)):r},t.styleCurrent=function(n,e){var r,i=n.currentStyle;return e?(e=e.replace(/\-(\w)/g,function(n,t){return t.toUpperCase()}),r=i[e],/^\d+(em|pt|%|ex)?$/i.test(r)?t.styleValue(n,r):r):i},t.styleValue=function(n,t){var e=n.style.left,r=n.runtimeStyle.left;return n.runtimeStyle.left=n.currentStyle.left,n.style.left=t||0,t=n.style.pixelLeft+"px",n.style.left=e,n.runtimeStyle.left=r,t},t.shortHand=function(n,e,r){var i=t.styleCompute(n,e,r[0]),o=t.styleCompute(n,e,r[1]),u=t.styleCompute(n,e,r[2]),a=t.styleCompute(n,e,r[3]),c="";return c=i===u?o===a?i===o?i:i+" "+o:i+" "+o+" "+u+" "+a:o===a?i+" "+o+" "+u:i+" "+o+" "+u+" "+a},t.getStyle=function(n,e){var i,o,u=n.ownerDocument;return u&&(i=u.defaultView),i&&i.getComputedStyle?(o=t.styleCompute(i,n,e),""===o&&e&&r.has(e)&&(o=t.shortHand(i,n,r.get(e)))):n.currentStyle&&(o=t.styleCurrent(n,e)),o},e.Dom=t}(window),function(n){"use strict";function t(){}var e=n.wakegi,r=e.Util,i=t.prototype;i.constructor=t,t.parse=function(n){return"undefined"!=typeof n.dataset?t.modern(n):t.legacy(n)},t.modern=function(n){var t,e,r,i=n.dataset,o=!1,u={};for(t in i)r="",e="","function"==typeof i.hasOwnProperty?i.hasOwnProperty(t)&&(e=i[t],r=t):(e=i[t],r=t),r&&(o=!0,u[r]=e);return o?u:null},t.legacy=function(n){var t,e,i,o,u,a=n.attributes,c=!1,s={};for(t=0,e=a.length;t<e;t=t+1|0)i=a[t],o=i.nodeName.toLowerCase(),o.indexOf("data-")!==-1&&(u=o.replace("data-",""),u=r.camelize(u),c=!0,s[u]=i.nodeValue.toLowerCase());return c?s:null},e.Dataset=t}(window),function(n){"use strict";function t(){throw new Error("Windows can't create instance.")}var e,r,i=n.wakegi,o=i.Browser,u=t.prototype;u.constructor=t,t.init=function(){var n;"undefined"==typeof r&&(n=o.ua(),r=!!n.match(/windows/i),e=!!r&&!!n.match(/windows phone/i))},t.is=function(){return t.init(),r},t.phone=function(){return t.init(),e},o.Windows=t}(window),function(n){"use strict";function t(){throw new Error("iOS can't create instance.")}var e,r,i,o,u,a,c,s,f=n.wakegi,d=f.Browser,l=[-1,-1,-1],p=t.prototype;p.constructor=t,t.init=function(){var n;"undefined"==typeof e&&(n=d.ua(),o=!!n.match(/ipad/i),i=!!n.match(/ipod/i),r=!!n.match(/iphone/i)&&!o&&!i,e=o||i||r,u=e&&!t.standalone()&&!d.matchSafari())},t.calculate=function(){var n,e,r,i,o,u,p=[];if("undefined"==typeof a&&(s="",a=-1,c=-1,t.is()&&(n=d.app().match(/OS (\d+)_(\d+)_?(\d+)?/),Array.isArray(n)))){for(e=f.int,r=f.float,i=1,o=n.length;i<o;i=i+1|0)u=n[i],"undefined"!=typeof u?p.push(e(u,10)):p.push(0);s=p.join("."),c=p[0],l=p,a=r(p[0]+"."+p[1]+p[2])}},t.is=function(){return t.init(),e},t.iPhone=function(){return t.init(),r},t.iPad=function(){return t.init(),o},t.iPod=function(){return t.init(),i},t.standalone=function(){var n=d.navigator();return!!n.standalone&&n.standalone},t.fullScreen=function(){return t.standalone()},t.version=function(){return t.calculate(),a},t.build=function(){return t.calculate(),s},t.major=function(){return t.calculate(),c},t.numbers=function(){return t.calculate(),l},t.number=function(){return t.numbers()},t.webView=function(){return t.init(),u},d.iOS=t}(window),function(n){"use strict";function t(){throw new Error("Mac can't create instance.")}var e,r=n.wakegi,i=r.Browser,o=i.iOS,u=t.prototype;u.constructor=t,t.init=function(){"undefined"==typeof e&&(e=!o.is()&&!!i.ua().match(/mac os x/i))},t.is=function(){return t.init(),e},i.Mac=t}(window),function(n){"use strict";function t(){throw new Error("Android can't create instance.")}var e,r,i,o,u,a,c,s,f=n.wakegi,d=f.Browser,l=d.Windows,p=Math.max,h=[-1,-1,-1],w=t.prototype;w.constructor=t,t.init=function(){var t,a;"undefined"==typeof r&&(t=d.ua(),r=!!t.match(/android/i),i=!1,o=!1,e=!1,u=!1,l.phone()?r=!1:r&&(a=p(n.innerWidth,n.innerHeight),u=a>=1024,i=!!t.match(/mobile/i),i||(o=!0),e=d.matchSafari()&&(!!t.match(/version/i)||!!t.match(/samsungbrowser/i))))},t.calculate=function(){var n,e,r,i,o,u,l=[];if("undefined"==typeof a&&(s="",a=-1,c=-1,t.is()&&(n=d.app().match(/Android (\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(e=f.int,r=f.float,i=1,o=n.length;i<o;i=i+1|0)u=n[i],"undefined"!=typeof u?l.push(e(u,10)):l.push(0);s=l.join("."),c=l[0],h=l,a=r(l[0]+"."+l[1]+l[2])}},t.is=function(){return t.init(),r},t.standard=function(){return t.init(),e},t.phone=function(){return t.init(),i},t.tablet=function(){return t.init(),o},t.hd=function(){return t.init(),u},t.version=function(){return t.calculate(),a},t.build=function(){return t.calculate(),s},t.major=function(){return t.calculate(),c},t.numbers=function(){return t.calculate(),h},t.number=function(){return t.numbers()},t.rect=function(){return{width:n.innerWidth,height:n.innerHeight}},d.Android=t}(window),function(n){"use strict";function t(){throw new Error("Touch can't create instance.")}var e=n.wakegi,r=e.Browser,i=r.Element,o=t.prototype;o.constructor=t,t.is=function(){return i.touch()},r.Touch=t}(window),function(n){"use strict";function t(){throw new Error("Mobile can't create instance.")}var e=n.wakegi,r=e.Browser,i=r.iOS,o=r.Android,u=r.Windows,a=t.prototype;a.constructor=t,t.is=function(){return i.is()||o.is()||u.phone()},t.phone=function(){return i.iPhone()||i.iPod()||o.phone()||u.phone()},t.tablet=function(){return i.iPad()||o.tablet()},t.hideBar=function(){return setTimeout(function(){scrollBy(0,1)},0)},t.hideURLBar=function(){return t.hideBar()},r.Mobile=t}(window),function(n){"use strict";function t(){throw new Error("FxiOS can't create instance.")}var e,r,i,o,u=n.wakegi,a=u.Browser,c=[-1,-1],s=t.prototype;s.constructor=t,t.init=function(){"undefined"==typeof e&&(e=!!a.ua().match(/fxios/i))},t.calculate=function(){var n,e,s,f,d,l=[];if("undefined"==typeof r&&(o="",r=-1,i=-1,t.is()&&(n=a.ua().match(/FxiOS\/(\d+)\.?(\d+)?/),Array.isArray(n)))){for(e=u.int,s=u.float,f=1,d=n.length;f<d;f=f+1|0)l.push(e(n[f],10));o=l.join("."),i=l[0],r=s(l[0]+"."+l[1]),c=l}},t.is=function(){return t.init(),e},t.version=function(){return t.calculate(),r},t.major=function(){return t.calculate(),i},t.build=function(){return t.calculate(),o},t.numbers=function(){return t.calculate(),c},a.FxiOS=t}(window),function(n){"use strict";function t(){throw new Error("Edge can't create instance.")}var e,r,i,o,u=n.wakegi,a=u.Browser,c=[-1,-1],s=t.prototype;s.constructor=t,t.init=function(){"undefined"==typeof e&&(e=!!a.ua().match(/edge/i))},t.calculate=function(){var n,e,s,f,d,l=[];if("undefined"==typeof r&&(o="",r=-1,i=-1,t.is()&&(n=a.ua().match(/edge\/(\d+)\.?(\d+)?/i),Array.isArray(n)))){for(e=u.int,s=u.float,f=1,d=n.length;f<d;f=f+1|0)l.push(e(n[f],10));o=l.join("."),i=l[0],r=s(l[0]+"."+l[1]),c=l}},t.is=function(){return t.init(),e},t.version=function(){return t.calculate(),r},t.major=function(){return t.calculate(),i},t.build=function(){return t.calculate(),o},t.numbers=function(){return t.calculate(),c},a.Edge=t}(window),function(n){"use strict";function t(){throw new Error("IE can't create instance.")}var e,r,i,o,u,a,c,s,f=n.wakegi,d=f.Browser,l=t.prototype;l.constructor=t,t.init=function(){var n;"undefined"!=typeof c&&"undefined"!=typeof e&&"undefined"!=typeof r&&"undefined"!=typeof i&&"undefined"!=typeof o&&"undefined"!=typeof u&&"undefined"!=typeof a||(n=d.ua(),e=!1,r=!1,i=!1,o=!1,u=!1,a=!1,c=!!n.match(/msie/i),c?(u=!!n.match(/msie [10]/i),u||(o=!!n.match(/msie [9]/i),o||(i=!!n.match(/msie [8]/i),i||(r=!!n.match(/msie [7]/i),r||(e=!!n.match(/msie [6]/i)))))):(a=!!n.match(/trident\/[7]/i)&&!!n.match(/rv:[11]/i),c=a))},t.calculate=function(){t.init(),"undefined"==typeof s&&(s=-1,t.is()&&(a?s=11:u?s=10:o?s=9:i?s=8:r?s=7:e&&(s=6)))},t.is=function(){return t.init(),c},t.is6=function(){return t.init(),e},t.is7=function(){return t.init(),r},t.is8=function(){return t.init(),i},t.is9=function(){return t.init(),o},t.is10=function(){return t.init(),u},t.is11=function(){return t.init(),a},t.version=function(){return t.calculate(),s},t.major=function(){return parseInt(t.version(),10)},t.legacy=function(){return t.init(),e||r||i},d.IE=t}(window),function(n){"use strict";function t(){throw new Error("CriOS can't create instance.")}var e,r,i,o,u=n.wakegi,a=u.Browser,c=[-1,-1,-1,-1],s=t.prototype;s.constructor=t,t.init=function(){"undefined"==typeof e&&(e=!!a.ua().match(/crios/i))},t.calculate=function(){var n,e,s,f,d,l=[];if("undefined"==typeof r&&(o="",r=-1,i=-1,t.is()&&(n=a.app().match(/CriOS\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(e=u.int,s=u.float,f=1,d=n.length;f<d;f=f+1|0)l.push(e(n[f],10));o=l.join("."),i=l[0],c=l,r=s(l[0]+"."+l[1]+l[2]+l[3])}},t.is=function(){return t.init(),e},t.version=function(){return t.calculate(),r},t.build=function(){return t.calculate(),o},t.major=function(){return t.calculate(),i},t.numbers=function(){return t.calculate(),c},a.CriOS=t}(window),function(n){"use strict";function t(){throw new Error("Chrome can't create instance.")}var e,r,i,o,u,a,c=n.wakegi,s=c.Browser,f=s.CriOS,d=s.Android,l=s.Edge,p=[-1,-1,-1,-1],h=t.prototype;h.constructor=t,t.init=function(){"undefined"==typeof i&&(e=f.is(),r=l.is(),i=!1,r||(e?i=!0:d.standard()||(i=!!s.ua().match(/chrome/i))))},t.calculate=function(){var n,r,i,d,l,h=[];if("undefined"==typeof o&&(a="",o=-1,u=-1,t.is()))if(e)a=f.build(),u=f.major(),p=f.numbers(),o=f.version();else if(n=s.app().match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)){for(r=c.int,i=c.float,d=1,l=n.length;d<l;d=d+1|0)h.push(r(n[d],10));a=h.join("."),u=h[0],p=h,o=i(h[0]+"."+h[1]+h[2]+h[3])}},t.is=function(){return t.init(),i},t.version=function(){return t.calculate(),o},t.build=function(){return t.calculate(),a},t.major=function(){return t.calculate(),u},t.numbers=function(){return t.calculate(),p},s.Chrome=t}(window),function(n){"use strict";function t(){throw new Error("Firefox can't create instance.")}var e,r,i,o,u=n.wakegi,a=u.Browser,c=[-1,-1],s=t.prototype;s.constructor=t,t.init=function(){"undefined"==typeof e&&(e=!!a.ua().match(/firefox/i))},t.calculate=function(){var n,e,s,f,d,l=[];if("undefined"==typeof r&&(o="",r=-1,i=-1,t.is()&&(n=a.ua().match(/Firefox\/(\d+)\.?(\d+)?/),Array.isArray(n)))){for(e=u.int,s=u.float,f=1,d=n.length;f<d;f=f+1|0)l.push(e(n[f],10));o=l.join("."),i=l[0],r=s(l[0]+"."+l[1]),c=l}},t.is=function(){return t.init(),e},t.version=function(){return t.calculate(),r},t.major=function(){return t.calculate(),i},t.build=function(){return t.calculate(),o},t.numbers=function(){return t.calculate(),c},a.Firefox=t}(window),function(n){"use strict";function t(){throw new Error("Safari can't create instance.")}var e,r,i,o,u,a,c,s,f=n.wakegi,d=f.Browser,l=d.CriOS,p=d.Chrome,h=d.Android,w=d.FxiOS,m=d.Edge,y=[-1,-1,-1],g=t.prototype;g.constructor=t,t.init=function(){"undefined"==typeof u&&(e=l.is(),r=p.is(),i=m.is(),o=w.is(),u=!(e||r||i||h.standard()||o)&&d.matchSafari())},t.calculate=function(){var n,e,r,i,o,u,l=[];if("undefined"==typeof a&&(s="",a=-1,c=-1,t.is()&&(n=d.app().match(/Version\/(\d+)\.(\d+)\.?(\d+)?/),Array.isArray(n)))){for(e=f.int,r=f.float,i=1,o=n.length;i<o;i=i+1|0)u=n[i],"undefined"!=typeof u?l.push(e(u,10)):l.push(0);s=l.join("."),a=r(l[0]+"."+l[1]+l[2]),c=l[0],y=l}},t.is=function(){return t.init(),u},t.set=function(n){return t.init(),u=n,n},t.version=function(){return t.calculate(),a},t.major=function(){return t.calculate(),c},t.build=function(){return t.calculate(),s},t.numbers=function(){return t.calculate(),y},t.number=function(){return t.numbers()},d.Safari=t}(window);
/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / htp://inazumatv.com
 * date 2014/02/06 - 13:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * version 0.5.0
 * build 2017-01-23 19:39:28
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
    flag = false;

  //   dataSet = ( function ( window ){
  //
  //     var
  //       document = window.document,
  //       element = document.getElementById( 'sagen' ),
  //       results = {},
  //       data;
  //
  //     function modern ( result, data ) {
  //
  //       var
  //         key,
  //         //dataKey,
  //         val;
  //
  //       for ( key in data ) {
  //
  //         if ( typeof data.hasOwnProperty === 'function' && data.hasOwnProperty( key ) ) {
  //
  //           //dataKey = key;
  //
  //           val = data[ key ].toLowerCase();
  //           results[ key ] = val === 'true';
  //
  //         } else {
  //
  //           val = data[ key ].toLowerCase();
  //           results[ key ] = val === 'true';
  //
  //         }
  //       }
  //
  //       return result;
  //
  //     }
  //
  //     function legacy ( result, data ) {
  //
  //       var
  //         i, limit, attribute, nodeName, dataKey;
  //
  //       for ( i = 0, limit = data.length; i < limit; i = i + 1 ) {
  //
  //         attribute = data[ i ];
  //         nodeName = attribute.nodeName.toLowerCase();
  //
  //         if ( nodeName.indexOf( 'data-' ) !== -1 ) {
  //
  //           dataKey = nodeName.replace( 'data-', '' );
  //           results[ dataKey ] = attribute.nodeValue.toLowerCase() === 'true';
  //
  //         }
  //
  //       }
  //
  //       return result;
  //
  //     }
  //
  //     if ( !!element ) {
  //
  //       // id: sagen defined
  //
  //       if ( typeof element.dataset !== 'undefined' ) {
  //
  //         // can use dataset
  //         data = element.dataset;
  //         results = modern( results, data );
  //
  //       } else {
  //
  //         // use attributes
  //         data = element.attributes;
  //         //attributes = true;
  //         results = legacy( results, data );
  //
  //       }
  //
  //     }// sagen
  //
  //     return results;
  //
  // }( window ) );

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
   * @static
   * @private
   * @returns {*} Object を保障します
   */
  function init() {
    var
      element = document.getElementById('sagen'),
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
  dataSet = init();
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
  // /**
  //  * dataSet alias
  //  * @deprecated instead use dataSet
  //  * @method dataset
  //  * @static
  //  * @for Sagen
  //  * @type {Function|*}
  //  */
  // Sagen.dataset = Sagen.dataSet;

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
