/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 315:
/*!****************************************************************!*\
  !*** ../node_modules/knockout/build/output/knockout-latest.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Knockout JavaScript library v3.5.1
 * (c) The Knockout.js team - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function() {(function(n){var A=this||(0,eval)("this"),w=A.document,R=A.navigator,v=A.jQuery,H=A.JSON;v||"undefined"===typeof jQuery||(v=jQuery);(function(n){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,__webpack_require__], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0})(function(S,T){function K(a,c){return null===a||typeof a in W?a===c:!1}function X(b,c){var d;return function(){d||(d=a.a.setTimeout(function(){d=n;b()},c))}}function Y(b,c){var d;return function(){clearTimeout(d);
d=a.a.setTimeout(b,c)}}function Z(a,c){c&&"change"!==c?"beforeChange"===c?this.pc(a):this.gb(a,c):this.qc(a)}function aa(a,c){null!==c&&c.s&&c.s()}function ba(a,c){var d=this.qd,e=d[r];e.ra||(this.Qb&&this.mb[c]?(d.uc(c,a,this.mb[c]),this.mb[c]=null,--this.Qb):e.I[c]||d.uc(c,a,e.J?{da:a}:d.$c(a)),a.Ja&&a.gd())}var a="undefined"!==typeof S?S:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.L=function(a,c,d){a[c]=d};a.version="3.5.1";a.b("version",
a.version);a.options={deferUpdates:!1,useOnlyNativeEvents:!1,foreachHidesDestroyed:!1};a.a=function(){function b(a,b){for(var c in a)f.call(a,c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)f.call(b,c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}function e(b,c,d,e){var l=b[c].match(q)||[];a.a.D(d.match(q),function(b){a.a.Na(l,b,e)});b[c]=l.join(" ")}var f=Object.prototype.hasOwnProperty,g={__proto__:[]}instanceof Array,h="function"===typeof Symbol,m={},k={};m[R&&/Firefox\/2/i.test(R.userAgent)?
"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];m.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(m,function(a,b){if(b.length)for(var c=0,d=b.length;c<d;c++)k[b[c]]=a});var l={propertychange:!0},p=w&&function(){for(var a=3,b=w.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:n}(),q=/\S+/g,t;return{Jc:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],
D:function(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a[d],d,a)},A:"function"==typeof Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},Lb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a))return a[d];return n},Pa:function(b,c){var d=a.a.A(b,c);0<d?b.splice(d,1):0===d&&b.shift()},wc:function(b){var c=[];b&&a.a.D(b,function(b){0>a.a.A(c,b)&&c.push(b)});return c},Mb:function(a,
b,c){var d=[];if(a)for(var e=0,l=a.length;e<l;e++)d.push(b.call(c,a[e],e));return d},jb:function(a,b,c){var d=[];if(a)for(var e=0,l=a.length;e<l;e++)b.call(c,a[e],e)&&d.push(a[e]);return d},Nb:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},Na:function(b,c,d){var e=a.a.A(a.a.bc(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},Ba:g,extend:c,setPrototypeOf:d,Ab:g?d:c,P:b,Ga:function(a,b,c){if(!a)return a;var d={},e;for(e in a)f.call(a,e)&&(d[e]=
b.call(c,a[e],e,a));return d},Tb:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Yb:function(b){b=a.a.la(b);for(var c=(b[0]&&b[0].ownerDocument||w).createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.oa(b[d]));return c},Ca:function(b,c){for(var d=0,e=b.length,l=[];d<e;d++){var k=b[d].cloneNode(!0);l.push(c?a.oa(k):k)}return l},va:function(b,c){a.a.Tb(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},Xc:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],
l=e.parentNode,k=0,f=c.length;k<f;k++)l.insertBefore(c[k],e);k=0;for(f=d.length;k<f;k++)a.removeNode(d[k])}},Ua:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);for(;1<a.length&&a[a.length-1].parentNode!==b;)a.length--;if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)a.push(c),c=c.nextSibling;a.push(d)}}return a},Zc:function(a,b){7>p?a.setAttribute("selected",b):a.selected=b},Db:function(a){return null===a||a===n?"":a.trim?
a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Ud:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},vd:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(1!==a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;return!!a},Sb:function(b){return a.a.vd(b,b.ownerDocument.documentElement)},kd:function(b){return!!a.a.Lb(b,a.a.Sb)},R:function(a){return a&&
a.tagName&&a.tagName.toLowerCase()},Ac:function(b){return a.onError?function(){try{return b.apply(this,arguments)}catch(c){throw a.onError&&a.onError(c),c;}}:b},setTimeout:function(b,c){return setTimeout(a.a.Ac(b),c)},Gc:function(b){setTimeout(function(){a.onError&&a.onError(b);throw b;},0)},B:function(b,c,d){var e=a.a.Ac(d);d=l[c];if(a.options.useOnlyNativeEvents||d||!v)if(d||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var k=function(a){e.call(b,a)},f="on"+c;b.attachEvent(f,
k);a.a.K.za(b,function(){b.detachEvent(f,k)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,e,!1);else t||(t="function"==typeof v(b).on?"on":"bind"),v(b)[t](c,e)},Fb:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.R(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(a.options.useOnlyNativeEvents||!v||d)if("function"==typeof w.createEvent)if("function"==
typeof b.dispatchEvent)d=w.createEvent(k[c]||"HTMLEvents"),d.initEvent(c,!0,!0,A,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");else v(b).trigger(c)},f:function(b){return a.O(b)?b():b},bc:function(b){return a.O(b)?b.v():b},Eb:function(b,c,d){var l;c&&("object"===typeof b.classList?
(l=b.classList[d?"add":"remove"],a.a.D(c.match(q),function(a){l.call(b.classList,a)})):"string"===typeof b.className.baseVal?e(b.className,"baseVal",c,d):e(b,"className",c,d))},Bb:function(b,c){var d=a.a.f(c);if(null===d||d===n)d="";var e=a.h.firstChild(b);!e||3!=e.nodeType||a.h.nextSibling(e)?a.h.va(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.Ad(b)},Yc:function(a,b){a.name=b;if(7>=p)try{var c=a.name.replace(/[&<>'"]/g,function(a){return"&#"+a.charCodeAt(0)+";"});a.mergeAttributes(w.createElement("<input name='"+
c+"'/>"),!1)}catch(d){}},Ad:function(a){9<=p&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},wd:function(a){if(p){var b=a.style.width;a.style.width=0;a.style.width=b}},Pd:function(b,c){b=a.a.f(b);c=a.a.f(c);for(var d=[],e=b;e<=c;e++)d.push(e);return d},la:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},Da:function(a){return h?Symbol(a):a},Zd:6===p,$d:7===p,W:p,Lc:function(b,c){for(var d=a.a.la(b.getElementsByTagName("input")).concat(a.a.la(b.getElementsByTagName("textarea"))),
e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},l=[],k=d.length-1;0<=k;k--)e(d[k])&&l.push(d[k]);return l},Nd:function(b){return"string"==typeof b&&(b=a.a.Db(b))?H&&H.parse?H.parse(b):(new Function("return "+b))():null},hc:function(b,c,d){if(!H||!H.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return H.stringify(a.a.f(b),c,d)},Od:function(c,d,e){e=e||{};var l=e.params||{},k=e.includeFields||this.Jc,f=c;if("object"==typeof c&&"form"===a.a.R(c))for(var f=c.action,h=k.length-1;0<=h;h--)for(var g=a.a.Lc(c,k[h]),m=g.length-1;0<=m;m--)l[g[m].name]=g[m].value;d=a.a.f(d);var p=w.createElement("form");p.style.display="none";p.action=f;p.method="post";for(var q in d)c=w.createElement("input"),c.type="hidden",c.name=q,c.value=a.a.hc(a.a.f(d[q])),p.appendChild(c);b(l,function(a,b){var c=w.createElement("input");
c.type="hidden";c.name=a;c.value=b;p.appendChild(c)});w.body.appendChild(p);e.submitter?e.submitter(p):p.submit();setTimeout(function(){p.parentNode.removeChild(p)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.D);a.b("utils.arrayFirst",a.a.Lb);a.b("utils.arrayFilter",a.a.jb);a.b("utils.arrayGetDistinctValues",a.a.wc);a.b("utils.arrayIndexOf",a.a.A);a.b("utils.arrayMap",a.a.Mb);a.b("utils.arrayPushAll",a.a.Nb);a.b("utils.arrayRemoveItem",a.a.Pa);a.b("utils.cloneNodes",a.a.Ca);a.b("utils.createSymbolOrString",
a.a.Da);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.Jc);a.b("utils.getFormFields",a.a.Lc);a.b("utils.objectMap",a.a.Ga);a.b("utils.peekObservable",a.a.bc);a.b("utils.postJson",a.a.Od);a.b("utils.parseJson",a.a.Nd);a.b("utils.registerEventHandler",a.a.B);a.b("utils.stringifyJson",a.a.hc);a.b("utils.range",a.a.Pd);a.b("utils.toggleDomNodeCssClass",a.a.Eb);a.b("utils.triggerEvent",a.a.Fb);a.b("utils.unwrapObservable",a.a.f);a.b("utils.objectForEach",a.a.P);a.b("utils.addOrRemoveItem",
a.a.Na);a.b("utils.setTextContent",a.a.Bb);a.b("unwrap",a.a.f);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this;if(1===arguments.length)return function(){return c.apply(a,arguments)};var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice(0);e.push.apply(e,arguments);return c.apply(a,e)}});a.a.g=new function(){var b=0,c="__ko__"+(new Date).getTime(),d={},e,f;a.a.W?(e=function(a,e){var f=a[c];if(!f||"null"===f||!d[f]){if(!e)return n;f=a[c]="ko"+b++;d[f]=
{}}return d[f]},f=function(a){var b=a[c];return b?(delete d[b],a[c]=null,!0):!1}):(e=function(a,b){var d=a[c];!d&&b&&(d=a[c]={});return d},f=function(a){return a[c]?(delete a[c],!0):!1});return{get:function(a,b){var c=e(a,!1);return c&&c[b]},set:function(a,b,c){(a=e(a,c!==n))&&(a[b]=c)},Ub:function(a,b,c){a=e(a,!0);return a[b]||(a[b]=c)},clear:f,Z:function(){return b++ +c}}};a.b("utils.domData",a.a.g);a.b("utils.domData.clear",a.a.g.clear);a.a.K=new function(){function b(b,c){var d=a.a.g.get(b,e);
d===n&&c&&(d=[],a.a.g.set(b,e,d));return d}function c(c){var e=b(c,!1);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](c);a.a.g.clear(c);a.a.K.cleanExternalData(c);g[c.nodeType]&&d(c.childNodes,!0)}function d(b,d){for(var e=[],l,f=0;f<b.length;f++)if(!d||8===b[f].nodeType)if(c(e[e.length]=l=b[f]),b[f]!==l)for(;f--&&-1==a.a.A(e,b[f]););}var e=a.a.g.Z(),f={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{za:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},yb:function(c,
d){var f=b(c,!1);f&&(a.a.Pa(f,d),0==f.length&&a.a.g.set(c,e,n))},oa:function(b){a.u.G(function(){f[b.nodeType]&&(c(b),g[b.nodeType]&&d(b.getElementsByTagName("*")))});return b},removeNode:function(b){a.oa(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){v&&"function"==typeof v.cleanData&&v.cleanData([a])}}};a.oa=a.a.K.oa;a.removeNode=a.a.K.removeNode;a.b("cleanNode",a.oa);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.K);a.b("utils.domNodeDisposal.addDisposeCallback",
a.a.K.za);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.K.yb);(function(){var b=[0,"",""],c=[1,"<table>","</table>"],d=[3,"<table><tbody><tr>","</tr></tbody></table>"],e=[1,"<select multiple='multiple'>","</select>"],f={thead:c,tbody:c,tfoot:c,tr:[2,"<table><tbody>","</tbody></table>"],td:d,th:d,option:e,optgroup:e},g=8>=a.a.W;a.a.ua=function(c,d){var e;if(v)if(v.parseHTML)e=v.parseHTML(c,d)||[];else{if((e=v.clean([c],d))&&e[0]){for(var l=e[0];l.parentNode&&11!==l.parentNode.nodeType;)l=l.parentNode;
l.parentNode&&l.parentNode.removeChild(l)}}else{(e=d)||(e=w);var l=e.parentWindow||e.defaultView||A,p=a.a.Db(c).toLowerCase(),q=e.createElement("div"),t;t=(p=p.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/))&&f[p[1]]||b;p=t[0];t="ignored<div>"+t[1]+c+t[2]+"</div>";"function"==typeof l.innerShiv?q.appendChild(l.innerShiv(t)):(g&&e.body.appendChild(q),q.innerHTML=t,g&&q.parentNode.removeChild(q));for(;p--;)q=q.lastChild;e=a.a.la(q.lastChild.childNodes)}return e};a.a.Md=function(b,c){var d=a.a.ua(b,
c);return d.length&&d[0].parentElement||a.a.Yb(d)};a.a.fc=function(b,c){a.a.Tb(b);c=a.a.f(c);if(null!==c&&c!==n)if("string"!=typeof c&&(c=c.toString()),v)v(b).html(c);else for(var d=a.a.ua(c,b.ownerDocument),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.ua);a.b("utils.setHtml",a.a.fc);a.aa=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.aa.Uc(c.nodeValue);null!=f&&e.push({ud:c,Kd:f})}else if(1==c.nodeType)for(var f=0,g=c.childNodes,h=g.length;f<h;f++)b(g[f],
e)}var c={};return{Xb:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},bd:function(a,b){var f=c[a];if(f===n)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),!0}finally{delete c[a]}},cd:function(c,e){var f=
[];b(c,f);for(var g=0,h=f.length;g<h;g++){var m=f[g].ud,k=[m];e&&a.a.Nb(k,e);a.aa.bd(f[g].Kd,k);m.nodeValue="";m.parentNode&&m.parentNode.removeChild(m)}},Uc:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.aa);a.b("memoization.memoize",a.aa.Xb);a.b("memoization.unmemoize",a.aa.bd);a.b("memoization.parseMemoText",a.aa.Uc);a.b("memoization.unmemoizeDomNodeAndDescendants",a.aa.cd);a.na=function(){function b(){if(f)for(var b=f,c=0,d;h<f;)if(d=e[h++]){if(h>b){if(5E3<=
++c){h=f;a.a.Gc(Error("'Too much recursion' after processing "+c+" task groups."));break}b=f}try{d()}catch(p){a.a.Gc(p)}}}function c(){b();h=f=e.length=0}var d,e=[],f=0,g=1,h=0;A.MutationObserver?d=function(a){var b=w.createElement("div");(new MutationObserver(a)).observe(b,{attributes:!0});return function(){b.classList.toggle("foo")}}(c):d=w&&"onreadystatechange"in w.createElement("script")?function(a){var b=w.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;w.documentElement.removeChild(b);
b=null;a()};w.documentElement.appendChild(b)}:function(a){setTimeout(a,0)};return{scheduler:d,zb:function(b){f||a.na.scheduler(c);e[f++]=b;return g++},cancel:function(a){a=a-(g-f);a>=h&&a<f&&(e[a]=null)},resetForTesting:function(){var a=f-h;h=f=e.length=0;return a},Sd:b}}();a.b("tasks",a.na);a.b("tasks.schedule",a.na.zb);a.b("tasks.runEarly",a.na.Sd);a.Ta={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.$({read:b,write:function(e){clearTimeout(d);d=a.a.setTimeout(function(){b(e)},
c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);a.Hb=!1;f="function"==typeof e?e:"notifyWhenChangesStop"==e?Y:X;a.ub(function(a){return f(a,d,c)})},deferred:function(b,c){if(!0!==c)throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");b.Hb||(b.Hb=!0,b.ub(function(c){var e,f=!1;return function(){if(!f){a.na.cancel(e);e=a.na.zb(c);try{f=!0,b.notifySubscribers(n,"dirty")}finally{f=
!1}}}}))},notify:function(a,c){a.equalityComparer="always"==c?null:K}};var W={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.Ta);a.ic=function(b,c,d){this.da=b;this.lc=c;this.mc=d;this.Ib=!1;this.fb=this.Jb=null;a.L(this,"dispose",this.s);a.L(this,"disposeWhenNodeIsRemoved",this.l)};a.ic.prototype.s=function(){this.Ib||(this.fb&&a.a.K.yb(this.Jb,this.fb),this.Ib=!0,this.mc(),this.da=this.lc=this.mc=this.Jb=this.fb=null)};a.ic.prototype.l=function(b){this.Jb=b;a.a.K.za(b,this.fb=this.s.bind(this))};
a.T=function(){a.a.Ab(this,D);D.qb(this)};var D={qb:function(a){a.U={change:[]};a.sc=1},subscribe:function(b,c,d){var e=this;d=d||"change";var f=new a.ic(e,c?b.bind(c):b,function(){a.a.Pa(e.U[d],f);e.hb&&e.hb(d)});e.Qa&&e.Qa(d);e.U[d]||(e.U[d]=[]);e.U[d].push(f);return f},notifySubscribers:function(b,c){c=c||"change";"change"===c&&this.Gb();if(this.Wa(c)){var d="change"===c&&this.ed||this.U[c].slice(0);try{a.u.xc();for(var e=0,f;f=d[e];++e)f.Ib||f.lc(b)}finally{a.u.end()}}},ob:function(){return this.sc},
Dd:function(a){return this.ob()!==a},Gb:function(){++this.sc},ub:function(b){var c=this,d=a.O(c),e,f,g,h,m;c.gb||(c.gb=c.notifySubscribers,c.notifySubscribers=Z);var k=b(function(){c.Ja=!1;d&&h===c&&(h=c.nc?c.nc():c());var a=f||m&&c.sb(g,h);m=f=e=!1;a&&c.gb(g=h)});c.qc=function(a,b){b&&c.Ja||(m=!b);c.ed=c.U.change.slice(0);c.Ja=e=!0;h=a;k()};c.pc=function(a){e||(g=a,c.gb(a,"beforeChange"))};c.rc=function(){m=!0};c.gd=function(){c.sb(g,c.v(!0))&&(f=!0)}},Wa:function(a){return this.U[a]&&this.U[a].length},
Bd:function(b){if(b)return this.U[b]&&this.U[b].length||0;var c=0;a.a.P(this.U,function(a,b){"dirty"!==a&&(c+=b.length)});return c},sb:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},toString:function(){return"[object Object]"},extend:function(b){var c=this;b&&a.a.P(b,function(b,e){var f=a.Ta[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.L(D,"init",D.qb);a.L(D,"subscribe",D.subscribe);a.L(D,"extend",D.extend);a.L(D,"getSubscriptionsCount",D.Bd);a.a.Ba&&a.a.setPrototypeOf(D,
Function.prototype);a.T.fn=D;a.Qc=function(a){return null!=a&&"function"==typeof a.subscribe&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.T);a.b("isSubscribable",a.Qc);a.S=a.u=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{xc:b,end:c,cc:function(b){if(e){if(!a.Qc(b))throw Error("Only subscribable things can act as dependencies");e.od.call(e.pd,b,b.fd||(b.fd=++f))}},G:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},qa:function(){if(e)return e.o.qa()},
Va:function(){if(e)return e.o.Va()},Ya:function(){if(e)return e.Ya},o:function(){if(e)return e.o}}}();a.b("computedContext",a.S);a.b("computedContext.getDependenciesCount",a.S.qa);a.b("computedContext.getDependencies",a.S.Va);a.b("computedContext.isInitial",a.S.Ya);a.b("computedContext.registerDependency",a.S.cc);a.b("ignoreDependencies",a.Yd=a.u.G);var I=a.a.Da("_latestValue");a.ta=function(b){function c(){if(0<arguments.length)return c.sb(c[I],arguments[0])&&(c.ya(),c[I]=arguments[0],c.xa()),this;
a.u.cc(c);return c[I]}c[I]=b;a.a.Ba||a.a.extend(c,a.T.fn);a.T.fn.qb(c);a.a.Ab(c,F);a.options.deferUpdates&&a.Ta.deferred(c,!0);return c};var F={equalityComparer:K,v:function(){return this[I]},xa:function(){this.notifySubscribers(this[I],"spectate");this.notifySubscribers(this[I])},ya:function(){this.notifySubscribers(this[I],"beforeChange")}};a.a.Ba&&a.a.setPrototypeOf(F,a.T.fn);var G=a.ta.Ma="__ko_proto__";F[G]=a.ta;a.O=function(b){if((b="function"==typeof b&&b[G])&&b!==F[G]&&b!==a.o.fn[G])throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
return!!b};a.Za=function(b){return"function"==typeof b&&(b[G]===F[G]||b[G]===a.o.fn[G]&&b.Nc)};a.b("observable",a.ta);a.b("isObservable",a.O);a.b("isWriteableObservable",a.Za);a.b("isWritableObservable",a.Za);a.b("observable.fn",F);a.L(F,"peek",F.v);a.L(F,"valueHasMutated",F.xa);a.L(F,"valueWillMutate",F.ya);a.Ha=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.ta(b);a.a.Ab(b,
a.Ha.fn);return b.extend({trackArrayChanges:!0})};a.Ha.fn={remove:function(b){for(var c=this.v(),d=[],e="function"!=typeof b||a.O(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var g=c[f];if(e(g)){0===d.length&&this.ya();if(c[f]!==g)throw Error("Array modified during remove; cannot remove item");d.push(g);c.splice(f,1);f--}}d.length&&this.xa();return d},removeAll:function(b){if(b===n){var c=this.v(),d=c.slice(0);this.ya();c.splice(0,c.length);this.xa();return d}return b?this.remove(function(c){return 0<=
a.a.A(b,c)}):[]},destroy:function(b){var c=this.v(),d="function"!=typeof b||a.O(b)?function(a){return a===b}:b;this.ya();for(var e=c.length-1;0<=e;e--){var f=c[e];d(f)&&(f._destroy=!0)}this.xa()},destroyAll:function(b){return b===n?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.A(b,c)}):[]},indexOf:function(b){var c=this();return a.a.A(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.ya(),this.v()[d]=c,this.xa())},sorted:function(a){var c=this().slice(0);
return a?c.sort(a):c.sort()},reversed:function(){return this().slice(0).reverse()}};a.a.Ba&&a.a.setPrototypeOf(a.Ha.fn,a.ta.fn);a.a.D("pop push reverse shift sort splice unshift".split(" "),function(b){a.Ha.fn[b]=function(){var a=this.v();this.ya();this.zc(a,b,arguments);var d=a[b].apply(a,arguments);this.xa();return d===a?this:d}});a.a.D(["slice"],function(b){a.Ha.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.Pc=function(b){return a.O(b)&&"function"==typeof b.remove&&"function"==
typeof b.push};a.b("observableArray",a.Ha);a.b("isObservableArray",a.Pc);a.Ta.trackArrayChanges=function(b,c){function d(){function c(){if(m){var d=[].concat(b.v()||[]),e;if(b.Wa("arrayChange")){if(!f||1<m)f=a.a.Pb(k,d,b.Ob);e=f}k=d;f=null;m=0;e&&e.length&&b.notifySubscribers(e,"arrayChange")}}e?c():(e=!0,h=b.subscribe(function(){++m},null,"spectate"),k=[].concat(b.v()||[]),f=null,g=b.subscribe(c))}b.Ob={};c&&"object"==typeof c&&a.a.extend(b.Ob,c);b.Ob.sparse=!0;if(!b.zc){var e=!1,f=null,g,h,m=0,
k,l=b.Qa,p=b.hb;b.Qa=function(a){l&&l.call(b,a);"arrayChange"===a&&d()};b.hb=function(a){p&&p.call(b,a);"arrayChange"!==a||b.Wa("arrayChange")||(g&&g.s(),h&&h.s(),h=g=null,e=!1,k=n)};b.zc=function(b,c,d){function l(a,b,c){return k[k.length]={status:a,value:b,index:c}}if(e&&!m){var k=[],p=b.length,g=d.length,h=0;switch(c){case "push":h=p;case "unshift":for(c=0;c<g;c++)l("added",d[c],h+c);break;case "pop":h=p-1;case "shift":p&&l("deleted",b[h],h);break;case "splice":c=Math.min(Math.max(0,0>d[0]?p+d[0]:
d[0]),p);for(var p=1===g?p:Math.min(c+(d[1]||0),p),g=c+g-2,h=Math.max(p,g),U=[],L=[],n=2;c<h;++c,++n)c<p&&L.push(l("deleted",b[c],c)),c<g&&U.push(l("added",d[n],c));a.a.Kc(L,U);break;default:return}f=k}}}};var r=a.a.Da("_state");a.o=a.$=function(b,c,d){function e(){if(0<arguments.length){if("function"===typeof f)f.apply(g.nb,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");return this}g.ra||
a.u.cc(e);(g.ka||g.J&&e.Xa())&&e.ha();return g.X}"object"===typeof b?d=b:(d=d||{},b&&(d.read=b));if("function"!=typeof d.read)throw Error("Pass a function that returns the value of the ko.computed");var f=d.write,g={X:n,sa:!0,ka:!0,rb:!1,jc:!1,ra:!1,wb:!1,J:!1,Wc:d.read,nb:c||d.owner,l:d.disposeWhenNodeIsRemoved||d.l||null,Sa:d.disposeWhen||d.Sa,Rb:null,I:{},V:0,Ic:null};e[r]=g;e.Nc="function"===typeof f;a.a.Ba||a.a.extend(e,a.T.fn);a.T.fn.qb(e);a.a.Ab(e,C);d.pure?(g.wb=!0,g.J=!0,a.a.extend(e,da)):
d.deferEvaluation&&a.a.extend(e,ea);a.options.deferUpdates&&a.Ta.deferred(e,!0);g.l&&(g.jc=!0,g.l.nodeType||(g.l=null));g.J||d.deferEvaluation||e.ha();g.l&&e.ja()&&a.a.K.za(g.l,g.Rb=function(){e.s()});return e};var C={equalityComparer:K,qa:function(){return this[r].V},Va:function(){var b=[];a.a.P(this[r].I,function(a,d){b[d.Ka]=d.da});return b},Vb:function(b){if(!this[r].V)return!1;var c=this.Va();return-1!==a.a.A(c,b)?!0:!!a.a.Lb(c,function(a){return a.Vb&&a.Vb(b)})},uc:function(a,c,d){if(this[r].wb&&
c===this)throw Error("A 'pure' computed must not be called recursively");this[r].I[a]=d;d.Ka=this[r].V++;d.La=c.ob()},Xa:function(){var a,c,d=this[r].I;for(a in d)if(Object.prototype.hasOwnProperty.call(d,a)&&(c=d[a],this.Ia&&c.da.Ja||c.da.Dd(c.La)))return!0},Jd:function(){this.Ia&&!this[r].rb&&this.Ia(!1)},ja:function(){var a=this[r];return a.ka||0<a.V},Rd:function(){this.Ja?this[r].ka&&(this[r].sa=!0):this.Hc()},$c:function(a){if(a.Hb){var c=a.subscribe(this.Jd,this,"dirty"),d=a.subscribe(this.Rd,
this);return{da:a,s:function(){c.s();d.s()}}}return a.subscribe(this.Hc,this)},Hc:function(){var b=this,c=b.throttleEvaluation;c&&0<=c?(clearTimeout(this[r].Ic),this[r].Ic=a.a.setTimeout(function(){b.ha(!0)},c)):b.Ia?b.Ia(!0):b.ha(!0)},ha:function(b){var c=this[r],d=c.Sa,e=!1;if(!c.rb&&!c.ra){if(c.l&&!a.a.Sb(c.l)||d&&d()){if(!c.jc){this.s();return}}else c.jc=!1;c.rb=!0;try{e=this.zd(b)}finally{c.rb=!1}return e}},zd:function(b){var c=this[r],d=!1,e=c.wb?n:!c.V,d={qd:this,mb:c.I,Qb:c.V};a.u.xc({pd:d,
od:ba,o:this,Ya:e});c.I={};c.V=0;var f=this.yd(c,d);c.V?d=this.sb(c.X,f):(this.s(),d=!0);d&&(c.J?this.Gb():this.notifySubscribers(c.X,"beforeChange"),c.X=f,this.notifySubscribers(c.X,"spectate"),!c.J&&b&&this.notifySubscribers(c.X),this.rc&&this.rc());e&&this.notifySubscribers(c.X,"awake");return d},yd:function(b,c){try{var d=b.Wc;return b.nb?d.call(b.nb):d()}finally{a.u.end(),c.Qb&&!b.J&&a.a.P(c.mb,aa),b.sa=b.ka=!1}},v:function(a){var c=this[r];(c.ka&&(a||!c.V)||c.J&&this.Xa())&&this.ha();return c.X},
ub:function(b){a.T.fn.ub.call(this,b);this.nc=function(){this[r].J||(this[r].sa?this.ha():this[r].ka=!1);return this[r].X};this.Ia=function(a){this.pc(this[r].X);this[r].ka=!0;a&&(this[r].sa=!0);this.qc(this,!a)}},s:function(){var b=this[r];!b.J&&b.I&&a.a.P(b.I,function(a,b){b.s&&b.s()});b.l&&b.Rb&&a.a.K.yb(b.l,b.Rb);b.I=n;b.V=0;b.ra=!0;b.sa=!1;b.ka=!1;b.J=!1;b.l=n;b.Sa=n;b.Wc=n;this.Nc||(b.nb=n)}},da={Qa:function(b){var c=this,d=c[r];if(!d.ra&&d.J&&"change"==b){d.J=!1;if(d.sa||c.Xa())d.I=null,d.V=
0,c.ha()&&c.Gb();else{var e=[];a.a.P(d.I,function(a,b){e[b.Ka]=a});a.a.D(e,function(a,b){var e=d.I[a],m=c.$c(e.da);m.Ka=b;m.La=e.La;d.I[a]=m});c.Xa()&&c.ha()&&c.Gb()}d.ra||c.notifySubscribers(d.X,"awake")}},hb:function(b){var c=this[r];c.ra||"change"!=b||this.Wa("change")||(a.a.P(c.I,function(a,b){b.s&&(c.I[a]={da:b.da,Ka:b.Ka,La:b.La},b.s())}),c.J=!0,this.notifySubscribers(n,"asleep"))},ob:function(){var b=this[r];b.J&&(b.sa||this.Xa())&&this.ha();return a.T.fn.ob.call(this)}},ea={Qa:function(a){"change"!=
a&&"beforeChange"!=a||this.v()}};a.a.Ba&&a.a.setPrototypeOf(C,a.T.fn);var N=a.ta.Ma;C[N]=a.o;a.Oc=function(a){return"function"==typeof a&&a[N]===C[N]};a.Fd=function(b){return a.Oc(b)&&b[r]&&b[r].wb};a.b("computed",a.o);a.b("dependentObservable",a.o);a.b("isComputed",a.Oc);a.b("isPureComputed",a.Fd);a.b("computed.fn",C);a.L(C,"peek",C.v);a.L(C,"dispose",C.s);a.L(C,"isActive",C.ja);a.L(C,"getDependenciesCount",C.qa);a.L(C,"getDependencies",C.Va);a.xb=function(b,c){if("function"===typeof b)return a.o(b,
c,{pure:!0});b=a.a.extend({},b);b.pure=!0;return a.o(b,c)};a.b("pureComputed",a.xb);(function(){function b(a,f,g){g=g||new d;a=f(a);if("object"!=typeof a||null===a||a===n||a instanceof RegExp||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var h=a instanceof Array?[]:{};g.save(a,h);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":h[c]=d;break;case "object":case "undefined":var l=g.get(d);h[c]=l!==
n?l:b(d,f,g)}});return h}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.values=[]}a.ad=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.O(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.ad(b);return a.a.hc(b,c,d)};d.prototype={constructor:d,save:function(b,c){var d=a.a.A(this.keys,
b);0<=d?this.values[d]=c:(this.keys.push(b),this.values.push(c))},get:function(b){b=a.a.A(this.keys,b);return 0<=b?this.values[b]:n}}})();a.b("toJS",a.ad);a.b("toJSON",a.toJSON);a.Wd=function(b,c,d){function e(c){var e=a.xb(b,d).extend({ma:"always"}),h=e.subscribe(function(a){a&&(h.s(),c(a))});e.notifySubscribers(e.v());return h}return"function"!==typeof Promise||c?e(c.bind(d)):new Promise(e)};a.b("when",a.Wd);(function(){a.w={M:function(b){switch(a.a.R(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?
a.a.g.get(b,a.c.options.$b):7>=a.a.W?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.w.M(b.options[b.selectedIndex]):n;default:return b.value}},cb:function(b,c,d){switch(a.a.R(b)){case "option":"string"===typeof c?(a.a.g.set(b,a.c.options.$b,n),"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__,b.value=c):(a.a.g.set(b,a.c.options.$b,c),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===
typeof c?c:"");break;case "select":if(""===c||null===c)c=n;for(var e=-1,f=0,g=b.options.length,h;f<g;++f)if(h=a.w.M(b.options[f]),h==c||""===h&&c===n){e=f;break}if(d||0<=e||c===n&&1<b.size)b.selectedIndex=e,6===a.a.W&&a.a.setTimeout(function(){b.selectedIndex=e},0);break;default:if(null===c||c===n)c="";b.value=c}}}})();a.b("selectExtensions",a.w);a.b("selectExtensions.readValue",a.w.M);a.b("selectExtensions.writeValue",a.w.cb);a.m=function(){function b(b){b=a.a.Db(b);123===b.charCodeAt(0)&&(b=b.slice(1,
-1));b+="\n,";var c=[],d=b.match(e),p,q=[],h=0;if(1<d.length){for(var x=0,B;B=d[x];++x){var u=B.charCodeAt(0);if(44===u){if(0>=h){c.push(p&&q.length?{key:p,value:q.join("")}:{unknown:p||q.join("")});p=h=0;q=[];continue}}else if(58===u){if(!h&&!p&&1===q.length){p=q.pop();continue}}else if(47===u&&1<B.length&&(47===B.charCodeAt(1)||42===B.charCodeAt(1)))continue;else 47===u&&x&&1<B.length?(u=d[x-1].match(f))&&!g[u[0]]&&(b=b.substr(b.indexOf(B)+1),d=b.match(e),x=-1,B="/"):40===u||123===u||91===u?++h:
41===u||125===u||93===u?--h:p||q.length||34!==u&&39!==u||(B=B.slice(1,-1));q.push(B)}if(0<h)throw Error("Unbalanced parentheses, braces, or brackets");}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,g={"in":1,"return":1,"typeof":1},
h={};return{Ra:[],wa:h,ac:b,vb:function(e,f){function l(b,e){var f;if(!x){var k=a.getBindingHandler(b);if(k&&k.preprocess&&!(e=k.preprocess(e,b,l)))return;if(k=h[b])f=e,0<=a.a.A(c,f)?f=!1:(k=f.match(d),f=null===k?!1:k[1]?"Object("+k[1]+")"+k[2]:f),k=f;k&&q.push("'"+("string"==typeof h[b]?h[b]:b)+"':function(_z){"+f+"=_z}")}g&&(e="function(){return "+e+" }");p.push("'"+b+"':"+e)}f=f||{};var p=[],q=[],g=f.valueAccessors,x=f.bindingParams,B="string"===typeof e?b(e):e;a.a.D(B,function(a){l(a.key||a.unknown,
a.value)});q.length&&l("_ko_property_writers","{"+q.join(",")+" }");return p.join(",")},Id:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},eb:function(b,c,d,e,f){if(b&&a.O(b))!a.Za(b)||f&&b.v()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.m);a.b("expressionRewriting.bindingRewriteValidators",a.m.Ra);a.b("expressionRewriting.parseObjectLiteral",a.m.ac);a.b("expressionRewriting.preProcessBindings",a.m.vb);a.b("expressionRewriting._twoWayBindings",
a.m.wa);a.b("jsonExpressionRewriting",a.m);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.m.vb);(function(){function b(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&h.test(f?a.text:a.nodeValue)}function d(d,e){for(var f=d,h=1,g=[];f=f.nextSibling;){if(c(f)&&(a.a.g.set(f,k,!0),h--,0===h))return g;g.push(f);b(f)&&h++}if(!e)throw Error("Cannot find closing comment tag to match: "+d.nodeValue);return null}function e(a,b){var c=d(a,b);return c?
0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=w&&"\x3c!--test--\x3e"===w.createComment("test").text,g=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,h=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,m={ul:!0,ol:!0},k="__ko_matchedEndComment__";a.h={ea:{},childNodes:function(a){return b(a)?d(a):a.childNodes},Ea:function(c){if(b(c)){c=a.h.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.Tb(c)},va:function(c,d){if(b(c)){a.h.Ea(c);for(var e=
c.nextSibling,f=0,k=d.length;f<k;f++)e.parentNode.insertBefore(d[f],e)}else a.a.va(c,d)},Vc:function(a,c){var d;b(a)?(d=a.nextSibling,a=a.parentNode):d=a.firstChild;d?c!==d&&a.insertBefore(c,d):a.appendChild(c)},Wb:function(c,d,e){e?(e=e.nextSibling,b(c)&&(c=c.parentNode),e?d!==e&&c.insertBefore(d,e):c.appendChild(d)):a.h.Vc(c,d)},firstChild:function(a){if(b(a))return!a.nextSibling||c(a.nextSibling)?null:a.nextSibling;if(a.firstChild&&c(a.firstChild))throw Error("Found invalid end comment, as the first child of "+
a);return a.firstChild},nextSibling:function(d){b(d)&&(d=e(d));if(d.nextSibling&&c(d.nextSibling)){var f=d.nextSibling;if(c(f)&&!a.a.g.get(f,k))throw Error("Found end comment without a matching opening comment, as child of "+d);return null}return d.nextSibling},Cd:b,Vd:function(a){return(a=(f?a.text:a.nodeValue).match(g))?a[1]:null},Sc:function(d){if(m[a.a.R(d)]){var f=d.firstChild;if(f){do if(1===f.nodeType){var k;k=f.firstChild;var h=null;if(k){do if(h)h.push(k);else if(b(k)){var g=e(k,!0);g?k=
g:h=[k]}else c(k)&&(h=[k]);while(k=k.nextSibling)}if(k=h)for(h=f.nextSibling,g=0;g<k.length;g++)h?d.insertBefore(k[g],h):d.appendChild(k[g])}while(f=f.nextSibling)}}}}})();a.b("virtualElements",a.h);a.b("virtualElements.allowedBindings",a.h.ea);a.b("virtualElements.emptyNode",a.h.Ea);a.b("virtualElements.insertAfter",a.h.Wb);a.b("virtualElements.prepend",a.h.Vc);a.b("virtualElements.setDomNodeChildren",a.h.va);(function(){a.ga=function(){this.nd={}};a.a.extend(a.ga.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
b.getAttribute("data-bind")||a.j.getComponentNameForNode(b);case 8:return a.h.Cd(b);default:return!1}},getBindings:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b):null;return a.j.tc(d,b,c,!1)},getBindingAccessors:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b,{valueAccessors:!0}):null;return a.j.tc(d,b,c,!0)},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.h.Vd(b);default:return null}},
parseBindingsString:function(b,c,d,e){try{var f=this.nd,g=b+(e&&e.valueAccessors||""),h;if(!(h=f[g])){var m,k="with($context){with($data||{}){return{"+a.m.vb(b,e)+"}}}";m=new Function("$context","$element",k);h=f[g]=m}return h(c,d)}catch(l){throw l.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+l.message,l;}}});a.ga.instance=new a.ga})();a.b("bindingProvider",a.ga);(function(){function b(b){var c=(b=a.a.g.get(b,z))&&b.N;c&&(b.N=null,c.Tc())}function c(c,d,e){this.node=c;this.yc=
d;this.kb=[];this.H=!1;d.N||a.a.K.za(c,b);e&&e.N&&(e.N.kb.push(c),this.Kb=e)}function d(a){return function(){return a}}function e(a){return a()}function f(b){return a.a.Ga(a.u.G(b),function(a,c){return function(){return b()[c]}})}function g(b,c,e){return"function"===typeof b?f(b.bind(null,c,e)):a.a.Ga(b,d)}function h(a,b){return f(this.getBindings.bind(this,a,b))}function m(b,c){var d=a.h.firstChild(c);if(d){var e,f=a.ga.instance,l=f.preprocessNode;if(l){for(;e=d;)d=a.h.nextSibling(e),l.call(f,e);
d=a.h.firstChild(c)}for(;e=d;)d=a.h.nextSibling(e),k(b,e)}a.i.ma(c,a.i.H)}function k(b,c){var d=b,e=1===c.nodeType;e&&a.h.Sc(c);if(e||a.ga.instance.nodeHasBindings(c))d=p(c,null,b).bindingContextForDescendants;d&&!u[a.a.R(c)]&&m(d,c)}function l(b){var c=[],d={},e=[];a.a.P(b,function ca(f){if(!d[f]){var k=a.getBindingHandler(f);k&&(k.after&&(e.push(f),a.a.D(k.after,function(c){if(b[c]){if(-1!==a.a.A(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));
ca(c)}}),e.length--),c.push({key:f,Mc:k}));d[f]=!0}});return c}function p(b,c,d){var f=a.a.g.Ub(b,z,{}),k=f.hd;if(!c){if(k)throw Error("You cannot apply bindings multiple times to the same element.");f.hd=!0}k||(f.context=d);f.Zb||(f.Zb={});var g;if(c&&"function"!==typeof c)g=c;else{var p=a.ga.instance,q=p.getBindingAccessors||h,m=a.$(function(){if(g=c?c(d,b):q.call(p,b,d)){if(d[t])d[t]();if(d[B])d[B]()}return g},null,{l:b});g&&m.ja()||(m=null)}var x=d,u;if(g){var J=function(){return a.a.Ga(m?m():
g,e)},r=m?function(a){return function(){return e(m()[a])}}:function(a){return g[a]};J.get=function(a){return g[a]&&e(r(a))};J.has=function(a){return a in g};a.i.H in g&&a.i.subscribe(b,a.i.H,function(){var c=(0,g[a.i.H])();if(c){var d=a.h.childNodes(b);d.length&&c(d,a.Ec(d[0]))}});a.i.pa in g&&(x=a.i.Cb(b,d),a.i.subscribe(b,a.i.pa,function(){var c=(0,g[a.i.pa])();c&&a.h.firstChild(b)&&c(b)}));f=l(g);a.a.D(f,function(c){var d=c.Mc.init,e=c.Mc.update,f=c.key;if(8===b.nodeType&&!a.h.ea[f])throw Error("The binding '"+
f+"' cannot be used with virtual elements");try{"function"==typeof d&&a.u.G(function(){var a=d(b,r(f),J,x.$data,x);if(a&&a.controlsDescendantBindings){if(u!==n)throw Error("Multiple bindings ("+u+" and "+f+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=f}}),"function"==typeof e&&a.$(function(){e(b,r(f),J,x.$data,x)},null,{l:b})}catch(k){throw k.message='Unable to process binding "'+f+": "+g[f]+'"\nMessage: '+k.message,
k;}})}f=u===n;return{shouldBindDescendants:f,bindingContextForDescendants:f&&x}}function q(b,c){return b&&b instanceof a.fa?b:new a.fa(b,n,n,c)}var t=a.a.Da("_subscribable"),x=a.a.Da("_ancestorBindingInfo"),B=a.a.Da("_dataDependency");a.c={};var u={script:!0,textarea:!0,template:!0};a.getBindingHandler=function(b){return a.c[b]};var J={};a.fa=function(b,c,d,e,f){function k(){var b=p?h():h,f=a.a.f(b);c?(a.a.extend(l,c),x in c&&(l[x]=c[x])):(l.$parents=[],l.$root=f,l.ko=a);l[t]=q;g?f=l.$data:(l.$rawData=
b,l.$data=f);d&&(l[d]=f);e&&e(l,c,f);if(c&&c[t]&&!a.S.o().Vb(c[t]))c[t]();m&&(l[B]=m);return l.$data}var l=this,g=b===J,h=g?n:b,p="function"==typeof h&&!a.O(h),q,m=f&&f.dataDependency;f&&f.exportDependencies?k():(q=a.xb(k),q.v(),q.ja()?q.equalityComparer=null:l[t]=n)};a.fa.prototype.createChildContext=function(b,c,d,e){!e&&c&&"object"==typeof c&&(e=c,c=e.as,d=e.extend);if(c&&e&&e.noChildContext){var f="function"==typeof b&&!a.O(b);return new a.fa(J,this,null,function(a){d&&d(a);a[c]=f?b():b},e)}return new a.fa(b,
this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)},e)};a.fa.prototype.extend=function(b,c){return new a.fa(J,this,null,function(c){a.a.extend(c,"function"==typeof b?b(c):b)},c)};var z=a.a.g.Z();c.prototype.Tc=function(){this.Kb&&this.Kb.N&&this.Kb.N.sd(this.node)};c.prototype.sd=function(b){a.a.Pa(this.kb,b);!this.kb.length&&this.H&&this.Cc()};c.prototype.Cc=function(){this.H=!0;this.yc.N&&!this.kb.length&&(this.yc.N=
null,a.a.K.yb(this.node,b),a.i.ma(this.node,a.i.pa),this.Tc())};a.i={H:"childrenComplete",pa:"descendantsComplete",subscribe:function(b,c,d,e,f){var k=a.a.g.Ub(b,z,{});k.Fa||(k.Fa=new a.T);f&&f.notifyImmediately&&k.Zb[c]&&a.u.G(d,e,[b]);return k.Fa.subscribe(d,e,c)},ma:function(b,c){var d=a.a.g.get(b,z);if(d&&(d.Zb[c]=!0,d.Fa&&d.Fa.notifySubscribers(b,c),c==a.i.H))if(d.N)d.N.Cc();else if(d.N===n&&d.Fa&&d.Fa.Wa(a.i.pa))throw Error("descendantsComplete event not supported for bindings on this node");
},Cb:function(b,d){var e=a.a.g.Ub(b,z,{});e.N||(e.N=new c(b,e,d[x]));return d[x]==e?d:d.extend(function(a){a[x]=e})}};a.Td=function(b){return(b=a.a.g.get(b,z))&&b.context};a.ib=function(b,c,d){1===b.nodeType&&a.h.Sc(b);return p(b,c,q(d))};a.ld=function(b,c,d){d=q(d);return a.ib(b,g(c,d,b),d)};a.Oa=function(a,b){1!==b.nodeType&&8!==b.nodeType||m(q(a),b)};a.vc=function(a,b,c){!v&&A.jQuery&&(v=A.jQuery);if(2>arguments.length){if(b=w.body,!b)throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");
}else if(!b||1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");k(q(a,c),b)};a.Dc=function(b){return!b||1!==b.nodeType&&8!==b.nodeType?n:a.Td(b)};a.Ec=function(b){return(b=a.Dc(b))?b.$data:n};a.b("bindingHandlers",a.c);a.b("bindingEvent",a.i);a.b("bindingEvent.subscribe",a.i.subscribe);a.b("bindingEvent.startPossiblyAsyncContentBinding",a.i.Cb);a.b("applyBindings",a.vc);a.b("applyBindingsToDescendants",a.Oa);
a.b("applyBindingAccessorsToNode",a.ib);a.b("applyBindingsToNode",a.ld);a.b("contextFor",a.Dc);a.b("dataFor",a.Ec)})();(function(b){function c(c,e){var k=Object.prototype.hasOwnProperty.call(f,c)?f[c]:b,l;k?k.subscribe(e):(k=f[c]=new a.T,k.subscribe(e),d(c,function(b,d){var e=!(!d||!d.synchronous);g[c]={definition:b,Gd:e};delete f[c];l||e?k.notifySubscribers(b):a.na.zb(function(){k.notifySubscribers(b)})}),l=!0)}function d(a,b){e("getConfig",[a],function(c){c?e("loadComponent",[a,c],function(a){b(a,
c)}):b(null,null)})}function e(c,d,f,l){l||(l=a.j.loaders.slice(0));var g=l.shift();if(g){var q=g[c];if(q){var t=!1;if(q.apply(g,d.concat(function(a){t?f(null):null!==a?f(a):e(c,d,f,l)}))!==b&&(t=!0,!g.suppressLoaderExceptions))throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");}else e(c,d,f,l)}else f(null)}var f={},g={};a.j={get:function(d,e){var f=Object.prototype.hasOwnProperty.call(g,d)?g[d]:b;f?f.Gd?a.u.G(function(){e(f.definition)}):
a.na.zb(function(){e(f.definition)}):c(d,e)},Bc:function(a){delete g[a]},oc:e};a.j.loaders=[];a.b("components",a.j);a.b("components.get",a.j.get);a.b("components.clearCachedDefinition",a.j.Bc)})();(function(){function b(b,c,d,e){function g(){0===--B&&e(h)}var h={},B=2,u=d.template;d=d.viewModel;u?f(c,u,function(c){a.j.oc("loadTemplate",[b,c],function(a){h.template=a;g()})}):g();d?f(c,d,function(c){a.j.oc("loadViewModel",[b,c],function(a){h[m]=a;g()})}):g()}function c(a,b,d){if("function"===typeof b)d(function(a){return new b(a)});
else if("function"===typeof b[m])d(b[m]);else if("instance"in b){var e=b.instance;d(function(){return e})}else"viewModel"in b?c(a,b.viewModel,d):a("Unknown viewModel value: "+b)}function d(b){switch(a.a.R(b)){case "script":return a.a.ua(b.text);case "textarea":return a.a.ua(b.value);case "template":if(e(b.content))return a.a.Ca(b.content.childNodes)}return a.a.Ca(b.childNodes)}function e(a){return A.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType}function f(a,b,c){"string"===typeof b.require?
T||A.require?(T||A.require)([b.require],function(a){a&&"object"===typeof a&&a.Xd&&a["default"]&&(a=a["default"]);c(a)}):a("Uses require, but no AMD loader is present"):c(b)}function g(a){return function(b){throw Error("Component '"+a+"': "+b);}}var h={};a.j.register=function(b,c){if(!c)throw Error("Invalid configuration for "+b);if(a.j.tb(b))throw Error("Component "+b+" is already registered");h[b]=c};a.j.tb=function(a){return Object.prototype.hasOwnProperty.call(h,a)};a.j.unregister=function(b){delete h[b];
a.j.Bc(b)};a.j.Fc={getConfig:function(b,c){c(a.j.tb(b)?h[b]:null)},loadComponent:function(a,c,d){var e=g(a);f(e,c,function(c){b(a,e,c,d)})},loadTemplate:function(b,c,f){b=g(b);if("string"===typeof c)f(a.a.ua(c));else if(c instanceof Array)f(c);else if(e(c))f(a.a.la(c.childNodes));else if(c.element)if(c=c.element,A.HTMLElement?c instanceof HTMLElement:c&&c.tagName&&1===c.nodeType)f(d(c));else if("string"===typeof c){var h=w.getElementById(c);h?f(d(h)):b("Cannot find element with ID "+c)}else b("Unknown element type: "+
c);else b("Unknown template value: "+c)},loadViewModel:function(a,b,d){c(g(a),b,d)}};var m="createViewModel";a.b("components.register",a.j.register);a.b("components.isRegistered",a.j.tb);a.b("components.unregister",a.j.unregister);a.b("components.defaultLoader",a.j.Fc);a.j.loaders.push(a.j.Fc);a.j.dd=h})();(function(){function b(b,e){var f=b.getAttribute("params");if(f){var f=c.parseBindingsString(f,e,b,{valueAccessors:!0,bindingParams:!0}),f=a.a.Ga(f,function(c){return a.o(c,null,{l:b})}),g=a.a.Ga(f,
function(c){var e=c.v();return c.ja()?a.o({read:function(){return a.a.f(c())},write:a.Za(e)&&function(a){c()(a)},l:b}):e});Object.prototype.hasOwnProperty.call(g,"$raw")||(g.$raw=f);return g}return{$raw:{}}}a.j.getComponentNameForNode=function(b){var c=a.a.R(b);if(a.j.tb(c)&&(-1!=c.indexOf("-")||"[object HTMLUnknownElement]"==""+b||8>=a.a.W&&b.tagName===c))return c};a.j.tc=function(c,e,f,g){if(1===e.nodeType){var h=a.j.getComponentNameForNode(e);if(h){c=c||{};if(c.component)throw Error('Cannot use the "component" binding on a custom element matching a component');
var m={name:h,params:b(e,f)};c.component=g?function(){return m}:m}}return c};var c=new a.ga;9>a.a.W&&(a.j.register=function(a){return function(b){return a.apply(this,arguments)}}(a.j.register),w.createDocumentFragment=function(b){return function(){var c=b(),f=a.j.dd,g;for(g in f);return c}}(w.createDocumentFragment))})();(function(){function b(b,c,d){c=c.template;if(!c)throw Error("Component '"+b+"' has no template");b=a.a.Ca(c);a.h.va(d,b)}function c(a,b,c){var d=a.createViewModel;return d?d.call(a,
b,c):b}var d=0;a.c.component={init:function(e,f,g,h,m){function k(){var a=l&&l.dispose;"function"===typeof a&&a.call(l);q&&q.s();p=l=q=null}var l,p,q,t=a.a.la(a.h.childNodes(e));a.h.Ea(e);a.a.K.za(e,k);a.o(function(){var g=a.a.f(f()),h,u;"string"===typeof g?h=g:(h=a.a.f(g.name),u=a.a.f(g.params));if(!h)throw Error("No component name specified");var n=a.i.Cb(e,m),z=p=++d;a.j.get(h,function(d){if(p===z){k();if(!d)throw Error("Unknown component '"+h+"'");b(h,d,e);var f=c(d,u,{element:e,templateNodes:t});
d=n.createChildContext(f,{extend:function(a){a.$component=f;a.$componentTemplateNodes=t}});f&&f.koDescendantsComplete&&(q=a.i.subscribe(e,a.i.pa,f.koDescendantsComplete,f));l=f;a.Oa(d,e)}})},null,{l:e});return{controlsDescendantBindings:!0}}};a.h.ea.component=!0})();var V={"class":"className","for":"htmlFor"};a.c.attr={update:function(b,c){var d=a.a.f(c())||{};a.a.P(d,function(c,d){d=a.a.f(d);var g=c.indexOf(":"),g="lookupNamespaceURI"in b&&0<g&&b.lookupNamespaceURI(c.substr(0,g)),h=!1===d||null===
d||d===n;h?g?b.removeAttributeNS(g,c):b.removeAttribute(c):d=d.toString();8>=a.a.W&&c in V?(c=V[c],h?b.removeAttribute(c):b[c]=d):h||(g?b.setAttributeNS(g,c,d):b.setAttribute(c,d));"name"===c&&a.a.Yc(b,h?"":d)})}};(function(){a.c.checked={after:["value","attr"],init:function(b,c,d){function e(){var e=b.checked,f=g();if(!a.S.Ya()&&(e||!m&&!a.S.qa())){var k=a.u.G(c);if(l){var q=p?k.v():k,z=t;t=f;z!==f?e&&(a.a.Na(q,f,!0),a.a.Na(q,z,!1)):a.a.Na(q,f,e);p&&a.Za(k)&&k(q)}else h&&(f===n?f=e:e||(f=n)),a.m.eb(k,
d,"checked",f,!0)}}function f(){var d=a.a.f(c()),e=g();l?(b.checked=0<=a.a.A(d,e),t=e):b.checked=h&&e===n?!!d:g()===d}var g=a.xb(function(){if(d.has("checkedValue"))return a.a.f(d.get("checkedValue"));if(q)return d.has("value")?a.a.f(d.get("value")):b.value}),h="checkbox"==b.type,m="radio"==b.type;if(h||m){var k=c(),l=h&&a.a.f(k)instanceof Array,p=!(l&&k.push&&k.splice),q=m||l,t=l?g():n;m&&!b.name&&a.c.uniqueName.init(b,function(){return!0});a.o(e,null,{l:b});a.a.B(b,"click",e);a.o(f,null,{l:b});
k=n}}};a.m.wa.checked=!0;a.c.checkedValue={update:function(b,c){b.value=a.a.f(c())}}})();a.c["class"]={update:function(b,c){var d=a.a.Db(a.a.f(c()));a.a.Eb(b,b.__ko__cssValue,!1);b.__ko__cssValue=d;a.a.Eb(b,d,!0)}};a.c.css={update:function(b,c){var d=a.a.f(c());null!==d&&"object"==typeof d?a.a.P(d,function(c,d){d=a.a.f(d);a.a.Eb(b,c,d)}):a.c["class"].update(b,c)}};a.c.enable={update:function(b,c){var d=a.a.f(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.c.disable=
{update:function(b,c){a.c.enable.update(b,function(){return!a.a.f(c())})}};a.c.event={init:function(b,c,d,e,f){var g=c()||{};a.a.P(g,function(g){"string"==typeof g&&a.a.B(b,g,function(b){var k,l=c()[g];if(l){try{var p=a.a.la(arguments);e=f.$data;p.unshift(e);k=l.apply(e,p)}finally{!0!==k&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.c.foreach={Rc:function(b){return function(){var c=b(),d=a.a.bc(c);
if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.ba.Ma};a.a.f(c);return{foreach:d.data,as:d.as,noChildContext:d.noChildContext,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.ba.Ma}}},init:function(b,c){return a.c.template.init(b,a.c.foreach.Rc(c))},update:function(b,c,d,e,f){return a.c.template.update(b,a.c.foreach.Rc(c),d,e,f)}};a.m.Ra.foreach=!1;a.h.ea.foreach=
!0;a.c.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(l){g=f.body}e=g===b}f=c();a.m.eb(f,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),g=e.bind(null,!1);a.a.B(b,"focus",f);a.a.B(b,"focusin",f);a.a.B(b,"blur",g);a.a.B(b,"focusout",g);b.__ko_hasfocusLastValue=!1},update:function(b,c){var d=!!a.a.f(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===
d||(d?b.focus():b.blur(),!d&&b.__ko_hasfocusLastValue&&b.ownerDocument.body.focus(),a.u.G(a.a.Fb,null,[b,d?"focusin":"focusout"]))}};a.m.wa.hasfocus=!0;a.c.hasFocus=a.c.hasfocus;a.m.wa.hasFocus="hasfocus";a.c.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.fc(b,c())}};(function(){function b(b,d,e){a.c[b]={init:function(b,c,h,m,k){var l,p,q={},t,x,n;if(d){m=h.get("as");var u=h.get("noChildContext");n=!(m&&u);q={as:m,noChildContext:u,exportDependencies:n}}x=(t=
"render"==h.get("completeOn"))||h.has(a.i.pa);a.o(function(){var h=a.a.f(c()),m=!e!==!h,u=!p,r;if(n||m!==l){x&&(k=a.i.Cb(b,k));if(m){if(!d||n)q.dataDependency=a.S.o();r=d?k.createChildContext("function"==typeof h?h:c,q):a.S.qa()?k.extend(null,q):k}u&&a.S.qa()&&(p=a.a.Ca(a.h.childNodes(b),!0));m?(u||a.h.va(b,a.a.Ca(p)),a.Oa(r,b)):(a.h.Ea(b),t||a.i.ma(b,a.i.H));l=m}},null,{l:b});return{controlsDescendantBindings:!0}}};a.m.Ra[b]=!1;a.h.ea[b]=!0}b("if");b("ifnot",!1,!0);b("with",!0)})();a.c.let={init:function(b,
c,d,e,f){c=f.extend(c);a.Oa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.let=!0;var Q={};a.c.options={init:function(b){if("select"!==a.a.R(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.jb(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function g(c,d){if(x&&l)a.i.ma(b,a.i.H);else if(t.length){var e=
0<=a.a.A(t,a.w.M(d[0]));a.a.Zc(d[0],e);x&&!e&&a.u.G(a.a.Fb,null,[b,"change"])}}var h=b.multiple,m=0!=b.length&&h?b.scrollTop:null,k=a.a.f(c()),l=d.get("valueAllowUnset")&&d.has("value"),p=d.get("optionsIncludeDestroyed");c={};var q,t=[];l||(h?t=a.a.Mb(e(),a.w.M):0<=b.selectedIndex&&t.push(a.w.M(b.options[b.selectedIndex])));k&&("undefined"==typeof k.length&&(k=[k]),q=a.a.jb(k,function(b){return p||b===n||null===b||!a.a.f(b._destroy)}),d.has("optionsCaption")&&(k=a.a.f(d.get("optionsCaption")),null!==
k&&k!==n&&q.unshift(Q)));var x=!1;c.beforeRemove=function(a){b.removeChild(a)};k=g;d.has("optionsAfterRender")&&"function"==typeof d.get("optionsAfterRender")&&(k=function(b,c){g(0,c);a.u.G(d.get("optionsAfterRender"),null,[c[0],b!==Q?b:n])});a.a.ec(b,q,function(c,e,g){g.length&&(t=!l&&g[0].selected?[a.w.M(g[0])]:[],x=!0);e=b.ownerDocument.createElement("option");c===Q?(a.a.Bb(e,d.get("optionsCaption")),a.w.cb(e,n)):(g=f(c,d.get("optionsValue"),c),a.w.cb(e,a.a.f(g)),c=f(c,d.get("optionsText"),g),
a.a.Bb(e,c));return[e]},c,k);if(!l){var B;h?B=t.length&&e().length<t.length:B=t.length&&0<=b.selectedIndex?a.w.M(b.options[b.selectedIndex])!==t[0]:t.length||0<=b.selectedIndex;B&&a.u.G(a.a.Fb,null,[b,"change"])}(l||a.S.Ya())&&a.i.ma(b,a.i.H);a.a.wd(b);m&&20<Math.abs(m-b.scrollTop)&&(b.scrollTop=m)}};a.c.options.$b=a.a.g.Z();a.c.selectedOptions={init:function(b,c,d){function e(){var e=c(),f=[];a.a.D(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.w.M(b))});a.m.eb(e,d,"selectedOptions",
f)}function f(){var d=a.a.f(c()),e=b.scrollTop;d&&"number"==typeof d.length&&a.a.D(b.getElementsByTagName("option"),function(b){var c=0<=a.a.A(d,a.w.M(b));b.selected!=c&&a.a.Zc(b,c)});b.scrollTop=e}if("select"!=a.a.R(b))throw Error("selectedOptions binding applies only to SELECT elements");var g;a.i.subscribe(b,a.i.H,function(){g?e():(a.a.B(b,"change",e),g=a.o(f,null,{l:b}))},null,{notifyImmediately:!0})},update:function(){}};a.m.wa.selectedOptions=!0;a.c.style={update:function(b,c){var d=a.a.f(c()||
{});a.a.P(d,function(c,d){d=a.a.f(d);if(null===d||d===n||!1===d)d="";if(v)v(b).css(c,d);else if(/^--/.test(c))b.style.setProperty(c,d);else{c=c.replace(/-(\w)/g,function(a,b){return b.toUpperCase()});var g=b.style[c];b.style[c]=d;d===g||b.style[c]!=g||isNaN(d)||(b.style[c]=d+"px")}})}};a.c.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.B(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?
a.preventDefault():a.returnValue=!1)}})}};a.c.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Bb(b,c())}};a.h.ea.text=!0;(function(){if(A&&A.navigator){var b=function(a){if(a)return parseFloat(a[1])},c=A.navigator.userAgent,d,e,f,g,h;(d=A.opera&&A.opera.version&&parseInt(A.opera.version()))||(h=b(c.match(/Edge\/([^ ]+)$/)))||b(c.match(/Chrome\/([^ ]+)/))||(e=b(c.match(/Version\/([^ ]+) Safari/)))||(f=b(c.match(/Firefox\/([^ ]+)/)))||(g=a.a.W||b(c.match(/MSIE ([^ ]+)/)))||
(g=b(c.match(/rv:([^ )]+)/)))}if(8<=g&&10>g)var m=a.a.g.Z(),k=a.a.g.Z(),l=function(b){var c=this.activeElement;(c=c&&a.a.g.get(c,k))&&c(b)},p=function(b,c){var d=b.ownerDocument;a.a.g.get(d,m)||(a.a.g.set(d,m,!0),a.a.B(d,"selectionchange",l));a.a.g.set(b,k,c)};a.c.textInput={init:function(b,c,k){function l(c,d){a.a.B(b,c,d)}function m(){var d=a.a.f(c());if(null===d||d===n)d="";L!==n&&d===L?a.a.setTimeout(m,4):b.value!==d&&(y=!0,b.value=d,y=!1,v=b.value)}function r(){w||(L=b.value,w=a.a.setTimeout(z,
4))}function z(){clearTimeout(w);L=w=n;var d=b.value;v!==d&&(v=d,a.m.eb(c(),k,"textInput",d))}var v=b.value,w,L,A=9==a.a.W?r:z,y=!1;g&&l("keypress",z);11>g&&l("propertychange",function(a){y||"value"!==a.propertyName||A(a)});8==g&&(l("keyup",z),l("keydown",z));p&&(p(b,A),l("dragend",r));(!g||9<=g)&&l("input",A);5>e&&"textarea"===a.a.R(b)?(l("keydown",r),l("paste",r),l("cut",r)):11>d?l("keydown",r):4>f?(l("DOMAutoComplete",z),l("dragdrop",z),l("drop",z)):h&&"number"===b.type&&l("keydown",r);l("change",
z);l("blur",z);a.o(m,null,{l:b})}};a.m.wa.textInput=!0;a.c.textinput={preprocess:function(a,b,c){c("textInput",a)}}})();a.c.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.c.uniqueName.rd;a.a.Yc(b,d)}}};a.c.uniqueName.rd=0;a.c.using={init:function(b,c,d,e,f){var g;d.has("as")&&(g={as:d.get("as"),noChildContext:d.get("noChildContext")});c=f.createChildContext(c,g);a.Oa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.using=!0;a.c.value={init:function(b,c,d){var e=a.a.R(b),f="input"==
e;if(!f||"checkbox"!=b.type&&"radio"!=b.type){var g=[],h=d.get("valueUpdate"),m=!1,k=null;h&&("string"==typeof h?g=[h]:g=a.a.wc(h),a.a.Pa(g,"change"));var l=function(){k=null;m=!1;var e=c(),f=a.w.M(b);a.m.eb(e,d,"value",f)};!a.a.W||!f||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.A(g,"propertychange")||(a.a.B(b,"propertychange",function(){m=!0}),a.a.B(b,"focus",function(){m=!1}),a.a.B(b,"blur",function(){m&&l()}));a.a.D(g,function(c){var d=l;a.a.Ud(c,"after")&&
(d=function(){k=a.w.M(b);a.a.setTimeout(l,0)},c=c.substring(5));a.a.B(b,c,d)});var p;p=f&&"file"==b.type?function(){var d=a.a.f(c());null===d||d===n||""===d?b.value="":a.u.G(l)}:function(){var f=a.a.f(c()),g=a.w.M(b);if(null!==k&&f===k)a.a.setTimeout(p,0);else if(f!==g||g===n)"select"===e?(g=d.get("valueAllowUnset"),a.w.cb(b,f,g),g||f===a.w.M(b)||a.u.G(l)):a.w.cb(b,f)};if("select"===e){var q;a.i.subscribe(b,a.i.H,function(){q?d.get("valueAllowUnset")?p():l():(a.a.B(b,"change",l),q=a.o(p,null,{l:b}))},
null,{notifyImmediately:!0})}else a.a.B(b,"change",l),a.o(p,null,{l:b})}else a.ib(b,{checkedValue:c})},update:function(){}};a.m.wa.value=!0;a.c.visible={update:function(b,c){var d=a.a.f(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};a.c.hidden={update:function(b,c){a.c.visible.update(b,function(){return!a.a.f(c())})}};(function(b){a.c[b]={init:function(c,d,e,f,g){return a.c.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,f,g)}}})("click");
a.ca=function(){};a.ca.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.ca.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.ca.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.C.F(d)}if(1==b.nodeType||8==b.nodeType)return new a.C.ia(b);throw Error("Unknown template type: "+b);};a.ca.prototype.renderTemplate=
function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,d,e)};a.ca.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.ca.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.ca);a.kc=function(){function b(b,c,d,h){b=a.m.ac(b);for(var m=a.m.Ra,k=0;k<b.length;k++){var l=b[k].key;if(Object.prototype.hasOwnProperty.call(m,
l)){var p=m[l];if("function"===typeof p){if(l=p(b[k].value))throw Error(l);}else if(!p)throw Error("This template engine does not support the '"+l+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.m.vb(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return h.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{xd:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.kc.Ld(b,c)},d)},Ld:function(a,f){return a.replace(c,function(a,c,d,e,l){return b(l,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",f)})},md:function(b,c){return a.aa.Xb(function(d,h){var m=d.nextSibling;m&&m.nodeName.toLowerCase()===c&&a.ib(m,b,h)})}}}();a.b("__tr_ambtns",a.kc.md);(function(){a.C={};a.C.F=function(b){if(this.F=b){var c=
a.a.R(b);this.ab="script"===c?1:"textarea"===c?2:"template"==c&&b.content&&11===b.content.nodeType?3:4}};a.C.F.prototype.text=function(){var b=1===this.ab?"text":2===this.ab?"value":"innerHTML";if(0==arguments.length)return this.F[b];var c=arguments[0];"innerHTML"===b?a.a.fc(this.F,c):this.F[b]=c};var b=a.a.g.Z()+"_";a.C.F.prototype.data=function(c){if(1===arguments.length)return a.a.g.get(this.F,b+c);a.a.g.set(this.F,b+c,arguments[1])};var c=a.a.g.Z();a.C.F.prototype.nodes=function(){var b=this.F;
if(0==arguments.length){var e=a.a.g.get(b,c)||{},f=e.lb||(3===this.ab?b.content:4===this.ab?b:n);if(!f||e.jd){var g=this.text();g&&g!==e.bb&&(f=a.a.Md(g,b.ownerDocument),a.a.g.set(b,c,{lb:f,bb:g,jd:!0}))}return f}e=arguments[0];this.ab!==n&&this.text("");a.a.g.set(b,c,{lb:e})};a.C.ia=function(a){this.F=a};a.C.ia.prototype=new a.C.F;a.C.ia.prototype.constructor=a.C.ia;a.C.ia.prototype.text=function(){if(0==arguments.length){var b=a.a.g.get(this.F,c)||{};b.bb===n&&b.lb&&(b.bb=b.lb.innerHTML);return b.bb}a.a.g.set(this.F,
c,{bb:arguments[0]})};a.b("templateSources",a.C);a.b("templateSources.domElement",a.C.F);a.b("templateSources.anonymousTemplate",a.C.ia)})();(function(){function b(b,c,d){var e;for(c=a.h.nextSibling(c);b&&(e=b)!==c;)b=a.h.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],g=e.parentNode,h=a.ga.instance,m=h.preprocessNode;if(m){b(e,f,function(a,b){var c=a.previousSibling,d=m.call(h,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):
(c.push(e,f),a.a.Ua(c,g))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.vc(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.aa.cd(b,[d])});a.a.Ua(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,f,h,m){m=m||{};var n=(b&&d(b)||f||{}).ownerDocument,B=m.templateEngine||g;a.kc.xd(f,B,n);f=B.renderTemplate(f,h,m,n);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");n=!1;switch(e){case "replaceChildren":a.h.va(b,
f);n=!0;break;case "replaceNode":a.a.Xc(b,f);n=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}n&&(c(f,h),m.afterRender&&a.u.G(m.afterRender,null,[f,h[m.as||"$data"]]),"replaceChildren"==e&&a.i.ma(b,a.i.H));return f}function f(b,c,d){return a.O(b)?b():"function"===typeof b?b(c,d):b}var g;a.gc=function(b){if(b!=n&&!(b instanceof a.ca))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.dc=function(b,c,h,m,t){h=h||{};if((h.templateEngine||g)==
n)throw Error("Set a template engine before calling renderTemplate");t=t||"replaceChildren";if(m){var x=d(m);return a.$(function(){var g=c&&c instanceof a.fa?c:new a.fa(c,null,null,null,{exportDependencies:!0}),n=f(b,g.$data,g),g=e(m,t,n,g,h);"replaceNode"==t&&(m=g,x=d(m))},null,{Sa:function(){return!x||!a.a.Sb(x)},l:x&&"replaceNode"==t?x.parentNode:x})}return a.aa.Xb(function(d){a.dc(b,c,h,d,"replaceNode")})};a.Qd=function(b,d,g,h,m){function x(b,c){a.u.G(a.a.ec,null,[h,b,u,g,r,c]);a.i.ma(h,a.i.H)}
function r(a,b){c(b,v);g.afterRender&&g.afterRender(b,a);v=null}function u(a,c){v=m.createChildContext(a,{as:z,noChildContext:g.noChildContext,extend:function(a){a.$index=c;z&&(a[z+"Index"]=c)}});var d=f(b,a,v);return e(h,"ignoreTargetNode",d,v,g)}var v,z=g.as,w=!1===g.includeDestroyed||a.options.foreachHidesDestroyed&&!g.includeDestroyed;if(w||g.beforeRemove||!a.Pc(d))return a.$(function(){var b=a.a.f(d)||[];"undefined"==typeof b.length&&(b=[b]);w&&(b=a.a.jb(b,function(b){return b===n||null===b||
!a.a.f(b._destroy)}));x(b)},null,{l:h});x(d.v());var A=d.subscribe(function(a){x(d(),a)},null,"arrayChange");A.l(h);return A};var h=a.a.g.Z(),m=a.a.g.Z();a.c.template={init:function(b,c){var d=a.a.f(c());if("string"==typeof d||"name"in d)a.h.Ea(b);else if("nodes"in d){d=d.nodes||[];if(a.O(d))throw Error('The "nodes" option must be a plain, non-observable array.');var e=d[0]&&d[0].parentNode;e&&a.a.g.get(e,m)||(e=a.a.Yb(d),a.a.g.set(e,m,!0));(new a.C.ia(b)).nodes(e)}else if(d=a.h.childNodes(b),0<d.length)e=
a.a.Yb(d),(new a.C.ia(b)).nodes(e);else throw Error("Anonymous template defined, but no template content was provided");return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var g=c();c=a.a.f(g);d=!0;e=null;"string"==typeof c?c={}:(g="name"in c?c.name:b,"if"in c&&(d=a.a.f(c["if"])),d&&"ifnot"in c&&(d=!a.a.f(c.ifnot)),d&&!g&&(d=!1));"foreach"in c?e=a.Qd(g,d&&c.foreach||[],c,b,f):d?(d=f,"data"in c&&(d=f.createChildContext(c.data,{as:c.as,noChildContext:c.noChildContext,exportDependencies:!0})),
e=a.dc(g,d,c,b)):a.h.Ea(b);f=e;(c=a.a.g.get(b,h))&&"function"==typeof c.s&&c.s();a.a.g.set(b,h,!f||f.ja&&!f.ja()?n:f)}};a.m.Ra.template=function(b){b=a.m.ac(b);return 1==b.length&&b[0].unknown||a.m.Id(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.h.ea.template=!0})();a.b("setTemplateEngine",a.gc);a.b("renderTemplate",a.dc);a.a.Kc=function(a,c,d){if(a.length&&c.length){var e,f,g,h,m;for(e=f=0;(!d||e<d)&&(h=a[f]);++f){for(g=0;m=c[g];++g)if(h.value===
m.value){h.moved=m.index;m.moved=h.index;c.splice(g,1);e=g=0;break}e+=g}}};a.a.Pb=function(){function b(b,d,e,f,g){var h=Math.min,m=Math.max,k=[],l,p=b.length,q,n=d.length,r=n-p||1,v=p+n+1,u,w,z;for(l=0;l<=p;l++)for(w=u,k.push(u=[]),z=h(n,l+r),q=m(0,l-1);q<=z;q++)u[q]=q?l?b[l-1]===d[q-1]?w[q-1]:h(w[q]||v,u[q-1]||v)+1:q+1:l+1;h=[];m=[];r=[];l=p;for(q=n;l||q;)n=k[l][q]-1,q&&n===k[l][q-1]?m.push(h[h.length]={status:e,value:d[--q],index:q}):l&&n===k[l-1][q]?r.push(h[h.length]={status:f,value:b[--l],index:l}):
(--q,--l,g.sparse||h.push({status:"retained",value:d[q]}));a.a.Kc(r,m,!g.dontLimitMoves&&10*p);return h.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Pb);(function(){function b(b,c,d,h,m){var k=[],l=a.$(function(){var l=c(d,m,a.a.Ua(k,b))||[];0<k.length&&(a.a.Xc(k,l),h&&a.u.G(h,null,[d,l,m]));k.length=0;a.a.Nb(k,l)},null,{l:b,Sa:function(){return!a.a.kd(k)}});
return{Y:k,$:l.ja()?l:n}}var c=a.a.g.Z(),d=a.a.g.Z();a.a.ec=function(e,f,g,h,m,k){function l(b){y={Aa:b,pb:a.ta(w++)};v.push(y);r||F.push(y)}function p(b){y=t[b];w!==y.pb.v()&&D.push(y);y.pb(w++);a.a.Ua(y.Y,e);v.push(y)}function q(b,c){if(b)for(var d=0,e=c.length;d<e;d++)a.a.D(c[d].Y,function(a){b(a,d,c[d].Aa)})}f=f||[];"undefined"==typeof f.length&&(f=[f]);h=h||{};var t=a.a.g.get(e,c),r=!t,v=[],u=0,w=0,z=[],A=[],C=[],D=[],F=[],y,I=0;if(r)a.a.D(f,l);else{if(!k||t&&t._countWaitingForRemove){var E=
a.a.Mb(t,function(a){return a.Aa});k=a.a.Pb(E,f,{dontLimitMoves:h.dontLimitMoves,sparse:!0})}for(var E=0,G,H,K;G=k[E];E++)switch(H=G.moved,K=G.index,G.status){case "deleted":for(;u<K;)p(u++);H===n&&(y=t[u],y.$&&(y.$.s(),y.$=n),a.a.Ua(y.Y,e).length&&(h.beforeRemove&&(v.push(y),I++,y.Aa===d?y=null:C.push(y)),y&&z.push.apply(z,y.Y)));u++;break;case "added":for(;w<K;)p(u++);H!==n?(A.push(v.length),p(H)):l(G.value)}for(;w<f.length;)p(u++);v._countWaitingForRemove=I}a.a.g.set(e,c,v);q(h.beforeMove,D);a.a.D(z,
h.beforeRemove?a.oa:a.removeNode);var M,O,P;try{P=e.ownerDocument.activeElement}catch(N){}if(A.length)for(;(E=A.shift())!=n;){y=v[E];for(M=n;E;)if((O=v[--E].Y)&&O.length){M=O[O.length-1];break}for(f=0;u=y.Y[f];M=u,f++)a.h.Wb(e,u,M)}for(E=0;y=v[E];E++){y.Y||a.a.extend(y,b(e,g,y.Aa,m,y.pb));for(f=0;u=y.Y[f];M=u,f++)a.h.Wb(e,u,M);!y.Ed&&m&&(m(y.Aa,y.Y,y.pb),y.Ed=!0,M=y.Y[y.Y.length-1])}P&&e.ownerDocument.activeElement!=P&&P.focus();q(h.beforeRemove,C);for(E=0;E<C.length;++E)C[E].Aa=d;q(h.afterMove,D);
q(h.afterAdd,F)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.ec);a.ba=function(){this.allowTemplateRewriting=!1};a.ba.prototype=new a.ca;a.ba.prototype.constructor=a.ba;a.ba.prototype.renderTemplateSource=function(b,c,d,e){if(c=(9>a.a.W?0:b.nodes)?b.nodes():null)return a.a.la(c.cloneNode(!0).childNodes);b=b.text();return a.a.ua(b,e)};a.ba.Ma=new a.ba;a.gc(a.ba.Ma);a.b("nativeTemplateEngine",a.ba);(function(){a.$a=function(){var a=this.Hd=function(){if(!v||!v.tmpl)return 0;try{if(0<=v.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();
this.renderTemplateSource=function(b,e,f,g){g=g||w;f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=v.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=v.extend({koBindingContext:e},f.templateOptions);e=v.tmpl(h,b,e);e.appendTo(g.createElement("div"));v.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+
a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(v.tmpl.tag.ko_code={open:"__.push($1 || '');"},v.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.$a.prototype=new a.ca;a.$a.prototype.constructor=a.$a;var b=new a.$a;0<b.Hd&&a.gc(b);a.b("jqueryTmplTemplateEngine",a.$a)})()})})();})();


/***/ }),

/***/ 137:
/*!*****************************!*\
  !*** ./source/autopilot.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 315);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autopilot/modes */ 62);
/* harmony import */ var _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autopilot/pidcontrols */ 241);
/* harmony import */ var _greatcircle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./greatcircle */ 211);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ 712);





const _on = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
const on = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
    read: _on,
    write: function (newValue) {
        if (geofs.aircraft.instance.setup.autopilot && newValue)
            _on(true);
        else
            _on(false);
    },
});
const currentMode = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
on.subscribe(function (newValue) {
    controls.autopilot.on = newValue;
    ui.hud.autopilotIndicator(newValue);
    if (!newValue) {
        Object.keys(_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z).forEach(function (prop) {
            _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z[prop].enabled(false);
        });
    }
});
function toggle() {
    ap.on(!ap.on());
}
_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].heading.enabled.subscribe */ .Z.heading.enabled.subscribe(function (newValue) {
    if (newValue)
        _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].roll.init */ .Z.roll.init(controls.roll);
});
_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].altitude.enabled.subscribe */ .Z.altitude.enabled.subscribe(function (newValue) {
    if (newValue) {
        _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].climb.init */ .Z.climb.init(geofs.aircraft.instance.animationValue.atilt);
        _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].pitch.init */ .Z.pitch.init(_util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(controls.pitch, -1, 1));
        controls.elevatorTrim = controls.rawPitch;
        controls.rawPitch = 0;
    }
});
_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].heading.enabled.subscribe */ .Z.heading.enabled.subscribe(function (newValue) {
    if (newValue)
        _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].throttle.init */ .Z.throttle.init(controls.throttle);
});
let lastGcHeadingUpdate = 0;
function update(dt) {
    const values = geofs.aircraft.instance.animationValue;
    const speedRatio = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(values.ktas / 100, 0.5, 5);
    if (geofs.aircraft.instance.groundContact ||
        ui.hud.stallAlarmOn ||
        Math.abs(values.aroll) > 45 ||
        values.atilt > 20 ||
        values.atilt < -35) {
        ap.on(false);
        return;
    }
    function updateHeading() {
        if (ap.currentMode() !== 0 &&
            performance.now() - lastGcHeadingUpdate > 1000) {
            const headingToDest = _greatcircle__WEBPACK_IMPORTED_MODULE_3__/* ["default"].getHeading */ .Z.getHeading();
            if (isFinite(headingToDest))
                _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].heading.value */ .Z.heading.value(Math.round(headingToDest));
            lastGcHeadingUpdate = performance.now();
        }
        const deltaHeading = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].fixAngle */ .Z.fixAngle(_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].heading.value */ .Z.heading.value() - values.heading);
        const maxBankAngle = Math.min(_util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].rad2deg */ .Z.rad2deg(Math.atan(0.0027467328927254283 * values.ktas)), ap.maxBankAngle);
        const targetBankAngle = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(deltaHeading, -maxBankAngle, maxBankAngle);
        const result = _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].roll.compute */ .Z.roll.compute(-values.aroll, dt, targetBankAngle);
        controls.roll = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].exponentialSmoothing */ .Z.exponentialSmoothing("apRoll", result / speedRatio, 0.9);
        controls.yaw = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].exponentialSmoothing */ .Z.exponentialSmoothing("apYaw", controls.roll / 2, 0.1);
        if (geofs.aircraft.instance.name === "a380")
            controls.roll *= 3.5;
    }
    function updateAltitude() {
        const deltaAltitude = _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].altitude.value */ .Z.altitude.value() - values.altitude;
        const maxClimbRate = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(speedRatio * ap.commonClimbRate, 0, ap.maxClimbRate);
        const maxDescentRate = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(speedRatio * ap.commonDescentRate, ap.maxDescentRate, 0);
        const vsValue = _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].vs.value */ .Z.vs.value();
        const manualVsControl = vsValue !== undefined &&
            (vsValue === 0 ||
                (vsValue < 0 ? deltaAltitude < -200 : deltaAltitude > 200));
        if (_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].vs.enabled */ .Z.vs.enabled()) {
            if (!manualVsControl)
                _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].vs.enabled */ .Z.vs.enabled(false);
        }
        else if (manualVsControl) {
            _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].vs.enabled */ .Z.vs.enabled(true);
        }
        let targetClimbRate;
        if (manualVsControl)
            targetClimbRate = vsValue;
        else
            targetClimbRate = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(deltaAltitude * 2.5, maxDescentRate, maxClimbRate);
        let targetTilt = _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].climb.compute */ .Z.climb.compute(values.climbrate, dt, targetClimbRate);
        targetTilt = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(targetTilt, ap.minPitchAngle, ap.maxPitchAngle);
        const result = _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].pitch.compute */ .Z.pitch.compute(-values.atilt, dt, targetTilt);
        controls.rawPitch = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].exponentialSmoothing */ .Z.exponentialSmoothing("apPitch", result / speedRatio, 0.9);
        geofs.debug.watch("targetClimbrate", targetClimbRate);
        geofs.debug.watch("aTargetTilt", targetTilt);
    }
    function updateThrottle() {
        let speed = _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].speed.value */ .Z.speed.value();
        if (_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].speed.isMach */ .Z.speed.isMach())
            speed = _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].speed.toKias */ .Z.speed.toKias(speed);
        const result = _autopilot_pidcontrols__WEBPACK_IMPORTED_MODULE_2__/* ["default"].throttle.compute */ .Z.throttle.compute(values.kcas, dt, speed);
        controls.throttle = _util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].clamp */ .Z.clamp(_util__WEBPACK_IMPORTED_MODULE_4__/* ["default"].exponentialSmoothing */ .Z.exponentialSmoothing("apThrottle", result, 0.9), 0, 1);
        geofs.debug.watch("throttle", controls.throttle);
    }
    if (_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].heading.enabled */ .Z.heading.enabled())
        updateHeading();
    if (_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].altitude.enabled */ .Z.altitude.enabled())
        updateAltitude();
    if (_autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"].speed.enabled */ .Z.speed.enabled())
        updateThrottle();
}
const ap = {
    on,
    toggle,
    update,
    modes: _autopilot_modes__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    currentMode,
    maxBankAngle: 25,
    minPitchAngle: -10,
    maxPitchAngle: 10,
    commonClimbRate: 500,
    commonDescentRate: -750,
    maxClimbRate: 3000,
    maxDescentRate: -4000,
};
controls.autopilot = {
    ...controls.autopilot,
    on: false,
    toggle: toggle,
    turnOff: function () {
        ap.on(false);
    },
    update: update,
};
window.autopilot_pp.ready = true;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ap);


/***/ }),

/***/ 62:
/*!***********************************!*\
  !*** ./source/autopilot/modes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 315);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _speedconversions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../speedconversions */ 693);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ 712);



const altitude = {
    enabled: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false),
    value: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0),
};
const vs = {
    enabled: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false),
    value: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0),
};
const heading = {
    enabled: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false),
    value: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(360),
};
const speed = {
    enabled: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false),
    isMach: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false),
    value: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0),
    toMach: toMach,
    toKias: toKias,
};
function toMach(kias) {
    const altitude = _util__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ft2mtrs */ .Z.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
    return _speedconversions__WEBPACK_IMPORTED_MODULE_1__/* ["default"].casToMach */ .Z.casToMach(kias, altitude);
}
function toKias(mach) {
    const altitude = _util__WEBPACK_IMPORTED_MODULE_2__/* ["default"].ft2mtrs */ .Z.ft2mtrs(geofs.aircraft.instance.animationValue.altitude);
    return _speedconversions__WEBPACK_IMPORTED_MODULE_1__/* ["default"].machToCas */ .Z.machToCas(mach, altitude);
}
speed.isMach.subscribe((isMach) => {
    const value = speed.value();
    speed.value(isMach ? toMach(value) : toKias(value));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    altitude,
    vs,
    heading,
    speed,
});


/***/ }),

/***/ 241:
/*!*****************************************!*\
  !*** ./source/autopilot/pidcontrols.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pid */ 816);

const pidSettings = {
    climb: new _pid__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z({
        kp: 0.01,
        ti: 10,
        td: 0.005,
        min: -10,
        max: 10,
    }),
    pitch: new _pid__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z({
        kp: 0.02,
        ti: 2,
        td: 0.01,
        min: -3,
        max: 3,
    }),
    roll: new _pid__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z({
        kp: 0.02,
        ti: 100,
        td: 0.01,
        min: -1,
        max: 1,
    }),
    throttle: new _pid__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z({
        kp: 0.015,
        ti: 2.5,
        td: 0.1,
        min: 0,
        max: 1,
    }),
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pidSettings);


/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** ./source/bugfixes/papi.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ 712);

function papiBugfix() {
    const papiValues = [3.5, 19 / 6, 17 / 6, 2.5];
    const aircraft = geofs.aircraft.instance;
    function setPapi() {
        const collResult = geofs.getGroundAltitude(this.location[0], this.location[1]);
        this.location[2] = collResult.location[2];
        const relativeAicraftLla = [
            aircraft.llaLocation[0],
            aircraft.llaLocation[1],
            this.location[2],
        ];
        const distance = geofs.utils.llaDistanceInMeters(relativeAicraftLla, this.location, this.location);
        const height = aircraft.llaLocation[2] - this.location[2];
        const path = _util__WEBPACK_IMPORTED_MODULE_0__/* ["default"].rad2deg */ .Z.rad2deg(Math.atan2(height, distance));
        const lights = this.lights;
        papiValues.forEach(function (slope, i) {
            const belowAngle = path < slope;
            lights[i].red.setVisibility(belowAngle);
            lights[i].white.setVisibility(!belowAngle);
        });
    }
    geofs.fx.papi.prototype.refresh = function () {
        this.papiInterval = setInterval(() => {
            setPapi.call(this);
        }, 1000);
    };
    Object.keys(geofs.fx.litRunways).forEach(function (id) {
        const runway = geofs.fx.litRunways[id];
        runway.papis.forEach(function (papi) {
            clearInterval(papi.papiInterval);
            papi.refresh();
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (papiBugfix);


/***/ }),

/***/ 300:
/*!*****************************************!*\
  !*** ./source/bugfixes/restrictions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function restrictionsBugfix() {
    let speedTimer;
    let partsTimer;
    let deleteTimer;
    let deleteTimeout;
    let oldMaxRPM;
    let activated = false;
    const restrictedAircraft = new Set();
    restrictedAircraft.add("4");
    restrictedAircraft.add("5");
    restrictedAircraft.add("17");
    restrictedAircraft.add("10");
    function checkSpeedAndAltitude() {
        const values = geofs.aircraft.instance.animationValue;
        const maxLimits = geofs.aircraft.instance.setup.maxLimits;
        const maxMach = maxLimits ? maxLimits[0] : 1;
        const maxAltitude = maxLimits ? maxLimits[1] : 44444;
        if (values.mach < maxMach && values.altitude < maxAltitude)
            return;
        clearInterval(speedTimer);
        speedTimer = undefined;
        activated = true;
        geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
            if (airfoil.area)
                airfoil.area /= 128;
            else if (airfoil.liftFactor)
                airfoil.liftFactor /= 128;
        });
        new geofs.fx.ParticuleEmitter({
            anchor: { worldPosition: [0, 0, 0] },
            duration: 30000,
            rate: 0.05,
            life: 2000,
            startScale: 1,
            endScale: 50,
            startOpacity: 100,
            endOpacity: 1,
            texture: "darkSmoke",
        });
        geofs.aircraft.instance.engines.forEach(function (engine) {
            engine.thrust /= 16384;
        });
        oldMaxRPM = geofs.aircraft.instance.setup.maxRPM;
        geofs.aircraft.instance.setup.maxRPM =
            geofs.aircraft.instance.setup.minRPM + 1;
        partsTimer = setInterval(function () {
            geofs.aircraft.instance.object3d._children.forEach(function (object) {
                const position = object._localposition;
                for (let i = 0; i < 2; i++)
                    position[i] *= 1.01;
            });
        }, 100);
        deleteTimeout = setTimeout(function () {
            clearInterval(partsTimer);
            let i = 0;
            const parts = geofs.aircraft.instance.object3d._children;
            deleteTimer = setInterval(function () {
                i++;
                if (i === parts.length) {
                    parts[0].visible = false;
                    clearInterval(deleteTimer);
                }
                else
                    parts[i].visible = false;
            }, 300);
        }, 12000);
    }
    function matchesName() {
        const maxLimits = geofs.aircraft.instance.setup.maxLimits;
        return restrictedAircraft.has(geofs.aircraft.instance.id) || maxLimits;
    }
    function addRestrictions() {
        if (matchesName())
            speedTimer = setInterval(checkSpeedAndAltitude, 5000);
    }
    const oldReset = geofs.aircraft.Aircraft.prototype.reset;
    geofs.aircraft.Aircraft.prototype.reset = function (bOnTheGround) {
        clearTimeout(deleteTimeout);
        clearInterval(deleteTimer);
        clearInterval(partsTimer);
        clearInterval(speedTimer);
        if (activated) {
            geofs.aircraft.instance.airfoils.forEach(function (airfoil) {
                if (airfoil.area)
                    airfoil.area *= 128;
                else if (airfoil.liftFactor)
                    airfoil.liftFactor *= 128;
            });
            geofs.aircraft.instance.engines.forEach(function (engine) {
                engine.thrust *= 16384;
            });
            geofs.aircraft.instance.setup.maxRPM = oldMaxRPM;
            activated = false;
        }
        addRestrictions();
        oldReset.call(this, bOnTheGround);
    };
    const setupLoadTimer = setInterval(function () {
        if (geofs.aircraft.instance.setup) {
            clearInterval(setupLoadTimer);
            addRestrictions();
        }
    }, 1000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (restrictionsBugfix);


/***/ }),

/***/ 123:
/*!******************************!*\
  !*** ./source/enablekcas.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _speedconversions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speedconversions */ 693);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ 712);


function setKcas() {
    const animationValue = geofs.aircraft.instance.animationValue;
    animationValue.kcas = _speedconversions__WEBPACK_IMPORTED_MODULE_0__/* ["default"].tasToCas */ .Z.tasToCas(animationValue.ktas, _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].ft2mtrs */ .Z.ft2mtrs(animationValue.altitude));
}
function enableKcas() {
    const timer = setInterval(function () {
        if (geofs &&
            geofs.aircraft.instance &&
            geofs.aircraft.instance.animationValue) {
            setKcas();
            ["airspeed", "airspeedJet", "airspeedSupersonic"].forEach(function (prop) {
                instruments.definitions[prop].overlay.overlays[0].animations[0].value =
                    "kcas";
                if (instruments.list && instruments.list[prop]) {
                    instruments.list[prop].overlay.children[0].definition.animations[0].value = "kcas";
                }
            });
            clearInterval(timer);
            setInterval(setKcas, 16);
        }
    }, 16);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enableKcas);


/***/ }),

/***/ 452:
/*!*******************************!*\
  !*** ./source/getwaypoint.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ 712);

const icaos = window.navData.airports;
const waypoints = window.navData.waypoints;
const navaids = window.navData.navaids;
function getClosestPoint(list) {
    let closestDistance = Infinity;
    return list.reduce(function (closestPoint, point) {
        const acLat = geofs.aircraft.instance.llaLocation[0];
        const acLon = geofs.aircraft.instance.llaLocation[1];
        const deltaLat = _util__WEBPACK_IMPORTED_MODULE_0__/* ["default"].deg2rad */ .Z.deg2rad(acLat - point[0]);
        const deltaLon = _util__WEBPACK_IMPORTED_MODULE_0__/* ["default"].deg2rad */ .Z.deg2rad(acLon - point[1]);
        const meanLat = 0.5 * _util__WEBPACK_IMPORTED_MODULE_0__/* ["default"].deg2rad */ .Z.deg2rad(acLat + point[0]);
        const x = deltaLat;
        const y = deltaLon * Math.cos(meanLat);
        const relativeDistance = x * x + y * y;
        if (relativeDistance < closestDistance) {
            closestDistance = relativeDistance;
            return point;
        }
        return closestPoint;
    });
}
function getWaypoint(code) {
    if (icaos[code])
        return icaos[code];
    if (navaids[code])
        return navaids[code];
    if (waypoints[code])
        return getClosestPoint(waypoints[code]);
    return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWaypoint);


/***/ }),

/***/ 211:
/*!*******************************!*\
  !*** ./source/greatcircle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 315);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ 712);


const lat = knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
const lon = knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
const atan2 = Math.atan2;
const sin = Math.sin;
const cos = Math.cos;
function getHeading() {
    const coords = geofs.aircraft.instance.llaLocation;
    const lat1 = _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].deg2rad */ .Z.deg2rad(coords[0]);
    const lon1 = _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].deg2rad */ .Z.deg2rad(coords[1]);
    const lat2 = _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].deg2rad */ .Z.deg2rad(lat());
    const lon2 = _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].deg2rad */ .Z.deg2rad(lon());
    if (!isFinite(lat2) || !isFinite(lon2))
        return;
    const heading = _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].rad2deg */ .Z.rad2deg(atan2(sin(lon2 - lon1) * cos(lat2), cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(lon2 - lon1)));
    return _util__WEBPACK_IMPORTED_MODULE_1__/* ["default"].fixAngle360 */ .Z.fixAngle360(heading);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    latitude: lat,
    longitude: lon,
    getHeading,
});


/***/ }),

/***/ 816:
/*!***********************!*\
  !*** ./source/pid.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const defaults = {
    kp: 0,
    ti: Infinity,
    td: 0,
    min: -Infinity,
    max: Infinity,
};
const pidProperties = Object.keys(defaults);
pidProperties.forEach(function (prop) {
    PID.prototype[prop] = defaults[prop];
});
function PID(options) {
    if (options) {
        pidProperties.forEach(function (prop) {
            this[prop] = options[prop] === undefined ? defaults[prop] : options[prop];
        }, this);
    }
    else {
        pidProperties.forEach(function (prop) {
            this[prop] = defaults[prop];
        }, this);
    }
    this.errorSum = 0;
    this.lastInput = undefined;
}
PID.prototype.compute = function (input, dt, setPoint) {
    const kp = this.kp;
    const ti = this.ti;
    const td = this.td;
    const error = setPoint - input;
    this.errorSum += (error * dt) / ti;
    const dInput = this.lastInput === undefined ? 0 : (this.lastInput - input) / dt;
    this.lastInput = input;
    const output = kp * (error + this.errorSum + td * dInput);
    if (ti) {
        if (output > this.max) {
            this.errorSum += (this.max - output) / kp;
            return this.max;
        }
        if (output < this.min) {
            this.errorSum += (this.min - output) / kp;
            return this.min;
        }
    }
    return output;
};
PID.prototype.init = function (currOutput) {
    this.errorSum = currOutput / this.kp;
    this.lastInput = undefined;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PID);


/***/ }),

/***/ 356:
/*!**********************************!*\
  !*** ./source/shouldnthaveap.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shouldntHaveAp = [
    "53",
    "51",
    "50",
    "41",
    "3049",
    "2953",
    "2852",
    "2844",
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shouldntHaveAp);


/***/ }),

/***/ 693:
/*!************************************!*\
  !*** ./source/speedconversions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const molar = 8.3144621;
const gravity = (function () {
    const bigG = 6.67408e-11;
    const earthMass = 5.9722e24;
    const earthRadius = 6371000;
    return bigG * (earthMass / earthRadius ** 2);
})();
const airMass = 28.96491498930052e-3;
const gamma = 1.4;
const knotsToMs = 463 / 900;
const msToKnots = 900 / 463;
const airGasConstant = molar / airMass;
function speedOfSound(temperature) {
    return Math.sqrt(gamma * airGasConstant * temperature);
}
const densitySL = 1.225;
const pressureSL = 101325;
const temperatureSL = 288.15;
const machSL = speedOfSound(temperatureSL);
function airDensity(pressure, temperature) {
    return pressure / temperature / airGasConstant;
}
function tasToMach(ktas, temperature) {
    return (ktas * knotsToMs) / speedOfSound(temperature);
}
function casToMach(kcas, pressure, temperature) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
        temperature = condition[1];
    }
    return tasToMach(casToTas(kcas, pressure, temperature), temperature);
}
function machToCas(mach, pressure, temperature) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
        temperature = condition[1];
    }
    return tasToCas(mach * msToKnots * speedOfSound(temperature), pressure, temperature);
}
function tasToEas(ktas, density) {
    return ktas * Math.sqrt(density / densitySL);
}
function easToTas(keas, density) {
    return keas * Math.sqrt(densitySL / density);
}
function standardConditions(altitude) {
    const exp = Math.exp;
    const min = Math.min;
    const pow = Math.pow;
    const layers = [
        [288.15, 0, -0.0065],
        [216.65, 11000, 0],
        [216.65, 20000, 0.001],
        [228.65, 32000, 0.0028],
        [270.65, 47000, 0],
        [270.65, 51000, -0.0028],
        [214.65, 71000, -0.002],
        [186.946, 84852, 0],
    ];
    let pressure = 101325;
    let temperature = 288.15;
    layers.some(function (currentLayer, i) {
        const baseTemperature = currentLayer[0];
        const layerHeight = currentLayer[1];
        const nextLayerHeight = layers[min(i + 1, layers.length - 1)][1];
        const lapseRate = currentLayer[2];
        const heightDifference = min(altitude, nextLayerHeight) - layerHeight;
        temperature = baseTemperature + heightDifference * lapseRate;
        if (lapseRate === 0)
            pressure *= exp((-gravity * airMass * heightDifference) / molar / baseTemperature);
        else
            pressure *= pow(baseTemperature / temperature, (gravity * airMass) / molar / lapseRate);
        if (nextLayerHeight >= altitude)
            return true;
    });
    return [pressure, temperature];
}
function tasToCas(ktas, pressure, temperature) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
        temperature = condition[1];
    }
    const A0 = machSL * msToKnots;
    const P0 = pressureSL;
    const P = pressure;
    const T0 = temperatureSL;
    const T = temperature;
    const sqrt = Math.sqrt;
    const pow = Math.pow;
    const Qc = P * (pow((T0 * ktas * ktas) / (5 * T * A0 * A0) + 1, 7 / 2) - 1);
    return A0 * sqrt(5 * (pow(Qc / P0 + 1, 2 / 7) - 1));
}
function casToTas(kcas, pressure, temperature) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
        temperature = condition[1];
    }
    const A0 = machSL * msToKnots;
    const P0 = pressureSL;
    const P = pressure;
    const T0 = temperatureSL;
    const T = temperature;
    const sqrt = Math.sqrt;
    const pow = Math.pow;
    const Qc = P0 * (pow((kcas * kcas) / (5 * A0 * A0) + 1, 7 / 2) - 1);
    return A0 * sqrt(((5 * T) / T0) * (pow(Qc / P + 1, 2 / 7) - 1));
}
function easToCas(keas, pressure) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
    }
    const A0 = machSL * msToKnots;
    const P0 = pressureSL;
    const sqrt = Math.sqrt;
    const pow = Math.pow;
    const Qc = (keas * keas * P0) / 2;
    return A0 * sqrt(5 * (pow(Qc / P0 + 1, 2 / 7) - 1));
}
function casToEas(kcas, pressure) {
    if (arguments.length === 2) {
        const altitude = pressure;
        const condition = standardConditions(altitude);
        pressure = condition[0];
    }
    const A0 = machSL * msToKnots;
    const P0 = pressureSL;
    const pow = Math.pow;
    const Qc = P0 * (pow((kcas * kcas) / (5 * A0 * A0) + 1, 7 / 2) - 1);
    return Math.sqrt((2 * Qc) / P0);
}
const airspeed = {
    speedOfSound,
    tasToMach,
    airDensity,
    standardConditions,
    casToMach,
    machToCas,
    tasToCas,
    casToTas,
    tasToEas,
    easToTas,
    casToEas,
    easToCas,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (airspeed);


/***/ }),

/***/ 184:
/*!****************************************!*\
  !*** ./source/ui/apdisconnectsound.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const opus = "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Pb1QJQZpzpLqi/hKB0SRFU/jRiYrTF3jkslY91bASj55qmrXo4kkWWo4BAIKtEGzYJVTVs2ChJEiRypmZmfVTMzlHEiUyxxIkSr0cSJEq5pEkSSS1+OX5MUroQAAUsAABTBBKXkO9C4ReoLHGmmuSRKNpa1qMNLma0l8nVgKEyyU4DT/WyxIlMzjgoBAIBASTyjM55w4kkcSokyTV+2t3lGZRkkFVXLY7bEVQARbeoacrQW5avWx2i4sj8gqMOVDUNCTAEnPqyMkUaebI5RIK3DSW//7pGTjAAOzMtF7TB4qYKUKP2WJiQ5U9T3ssM8pOhQn/ZwYMei0Wp6JErn9yJ5HPM/mktNCo5FJS0CYgABAJ1VQrP8lwqGWfIsBoUAkpKCrlySXc3KeTUfJRLZmqOSNRpK6apzQUiR3uRRliRZKgpVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7RET0j/HyJUdgLzByOgSo3Q0mGkAAAf4AAAAgAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Audio("data:audio/ogg;base64," + opus));


/***/ }),

/***/ 603:
/*!********************************!*\
  !*** ./source/ui/autopilot.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AutopilotVM */
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 315);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _greatcircle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../greatcircle */ 211);
/* harmony import */ var _autopilot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autopilot */ 137);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ 712);
/* harmony import */ var _getwaypoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../getwaypoint */ 452);
/* harmony import */ var _shouldnthaveap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shouldnthaveap */ 356);






const apValidate = (target, fn) => {
    return (val) => {
        const current = target();
        const newValue = fn(val);
        if (newValue !== current && !isNaN(newValue))
            target(newValue);
        else
            target.notifySubscribers(newValue);
    };
};
knockout__WEBPACK_IMPORTED_MODULE_0__.extenders.apValidate = (target, fn) => {
    const result = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: target,
        write: apValidate(target, fn),
    });
    return result;
};
class AutopilotVM {
    formatVs(value) {
        let str = Math.abs(value).toFixed(0);
        while (str.length < 4)
            str = "0" + str;
        return (value < 0 ? "-" : "") + str;
    }
    validateAltitude(val) {
        return parseInt(val);
    }
    validateHeading(val) {
        return _util__WEBPACK_IMPORTED_MODULE_3__/* ["default"].fixAngle360 */ .Z.fixAngle360(parseInt(val));
    }
    validateLat(val) {
        return _util__WEBPACK_IMPORTED_MODULE_3__/* ["default"].clamp */ .Z.clamp(parseFloat(val), -90, 90);
    }
    validateLon(val) {
        return _util__WEBPACK_IMPORTED_MODULE_3__/* ["default"].clamp */ .Z.clamp(parseFloat(val), -180, 180);
    }
    toggle = () => {
        if (!_shouldnthaveap__WEBPACK_IMPORTED_MODULE_5__/* ["default"].includes */ .Z.includes(geofs.aircraft.instance.id)) {
            _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].toggle */ .Z.toggle();
        }
    };
    nextMode = () => {
        const mode = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].currentMode */ .Z.currentMode();
        _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].currentMode */ .Z.currentMode(mode === AutopilotVM.modeToText.length - 1 ? 0 : mode + 1);
    };
    static modeToText = [
        "Heading mode",
        "Lat/lon mode",
        "Waypoint mode",
    ];
    on = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].on */ .Z.on;
    currentMode = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].currentMode */ .Z.currentMode;
    currentModeText = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
        const index = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].currentMode */ .Z.currentMode();
        return AutopilotVM.modeToText[index];
    });
    altitude = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.altitude.value.extend */ .Z.modes.altitude.value.extend({
        apValidate: this.validateAltitude,
    });
    altitudeEnabled = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.altitude.enabled */ .Z.modes.altitude.enabled;
    vs = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: () => {
            if (_autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.vs.enabled */ .Z.modes.vs.enabled()) {
                return this.formatVs(_autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.vs.value */ .Z.modes.vs.value());
            }
            return "";
        },
        write: (val) => {
            const target = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.vs.value */ .Z.modes.vs.value;
            const current = target();
            let newValue = parseInt(val);
            if (newValue !== newValue) {
                newValue = undefined;
            }
            if (newValue !== current)
                target(newValue);
            else
                target.notifySubscribers(newValue);
        },
    });
    heading = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: () => {
            let str = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.heading.value */ .Z.modes.heading.value().toString();
            while (str.length < 3)
                str = "0" + str;
            return str;
        },
        write: apValidate(_autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.heading.value */ .Z.modes.heading.value, this.validateHeading),
    });
    headingEnabled = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.heading.enabled */ .Z.modes.heading.enabled;
    speed = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: () => {
            const value = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.value */ .Z.modes.speed.value();
            return value.toFixed(_autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.isMach */ .Z.modes.speed.isMach() ? 2 : 0);
        },
        write: (val) => {
            const target = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.value */ .Z.modes.speed.value;
            const current = target();
            const newValue = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.isMach */ .Z.modes.speed.isMach()
                ? Math.round(Number(val) * 100) / 100
                : parseInt(val);
            if (newValue !== current && !isNaN(newValue))
                target(newValue);
            else
                target.notifySubscribers(newValue);
        },
    });
    speedEnabled = _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.enabled */ .Z.modes.speed.enabled;
    speedMode = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: () => {
            return _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.isMach */ .Z.modes.speed.isMach() ? "mach" : "kias";
        },
        write: (val) => {
            _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].modes.speed.isMach */ .Z.modes.speed.isMach(val === "mach");
        },
    });
    lat = _greatcircle__WEBPACK_IMPORTED_MODULE_1__/* ["default"].latitude.extend */ .Z.latitude.extend({ apValidate: this.validateLat });
    lon = _greatcircle__WEBPACK_IMPORTED_MODULE_1__/* ["default"].longitude.extend */ .Z.longitude.extend({ apValidate: this.validateLon });
    _waypoint = knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
    waypoint = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed({
        read: this._waypoint,
        write: (inputVal) => {
            const code = inputVal.trim().toUpperCase();
            const coord = (0,_getwaypoint__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(code);
            if (coord) {
                _greatcircle__WEBPACK_IMPORTED_MODULE_1__/* ["default"].latitude */ .Z.latitude(coord[0]);
                _greatcircle__WEBPACK_IMPORTED_MODULE_1__/* ["default"].longitude */ .Z.longitude(coord[1]);
                if (inputVal !== code)
                    this._waypoint(code);
                else
                    this._waypoint.notifySubscribers(code);
            }
            else {
                this._waypoint("");
                alert('Code "' +
                    inputVal +
                    '" is an invalid or unrecognised ICAO airport code.');
            }
        },
    });
    constructor() {
        const oldChange = geofs.aircraft.Aircraft.change;
        geofs.aircraft.Aircraft.change = (a, b, c, d) => {
            if (_shouldnthaveap__WEBPACK_IMPORTED_MODULE_5__/* ["default"].includes */ .Z.includes(a)) {
                _autopilot__WEBPACK_IMPORTED_MODULE_2__/* ["default"].on */ .Z.on(false);
            }
            return oldChange(a, b, c, d);
        };
    }
}
const updateMdlSwitch = (element, _notUsed, bindings) => {
    const isChecked = bindings.get("checked");
    const isEnabled = bindings.get("enable");
    if (isChecked)
        isChecked();
    if (isEnabled)
        isEnabled();
    const materialSwitch = element.parentNode.MaterialSwitch;
    if (!materialSwitch)
        return;
    materialSwitch.checkDisabled();
    materialSwitch.checkToggleState();
};
const updateMdlRadio = (element, _notUsed, bindings) => {
    const isChecked = bindings.get("checked");
    const isEnabled = bindings.get("enable");
    if (isChecked)
        isChecked();
    if (isEnabled)
        isEnabled();
    const materialRadio = element.parentNode.MaterialRadio;
    if (!materialRadio)
        return;
    materialRadio.checkDisabled();
    materialRadio.checkToggleState();
};
knockout__WEBPACK_IMPORTED_MODULE_0__.bindingHandlers.mdlSwitch = { update: updateMdlSwitch };
knockout__WEBPACK_IMPORTED_MODULE_0__.bindingHandlers.mdlRadio = { update: updateMdlRadio };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutopilotVM);


/***/ }),

/***/ 573:
/*!***************************!*\
  !*** ./source/ui/main.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ 315);
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _autopilot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../autopilot */ 137);
/* harmony import */ var _apdisconnectsound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apdisconnectsound */ 184);
/* harmony import */ var _autopilot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autopilot */ 603);
/* harmony import */ var _enablekcas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enablekcas */ 123);
/* harmony import */ var _bugfixes_papi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bugfixes/papi */ 0);
/* harmony import */ var _bugfixes_restrictions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../bugfixes/restrictions */ 300);
/* harmony import */ var _ui_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui.html */ 833);
/* harmony import */ var _ui_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.css */ 803);










function stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
}
$("<style>").text(_ui_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z).appendTo("head");
const $ap = $(".geofs-autopilot")
    .removeClass("geofs-autopilot")
    .prop("id", "Qantas94Heavy-ap")
    .on("keydown", stopImmediatePropagation)
    .html(_ui_html__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);
if (window.keyboard_mapping) {
    const addKeybind = window.keyboard_mapping.require("./source/addKeybind.ts").default;
    addKeybind("", () => {
        controls.autopilot.turnOff();
    }, {
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        code: "Backquote",
    });
}
else {
    document.addEventListener("keydown", function (e) {
        if ("code" in e) {
            if (e.code === "Backquote")
                controls.autopilot.turnOff();
        }
        else if (e.which === 192)
            controls.autopilot.turnOff();
    });
}
_autopilot__WEBPACK_IMPORTED_MODULE_1__/* ["default"].on.subscribe */ .Z.on.subscribe(function (newValue) {
    if (!newValue && geofs.preferences.sound)
        _apdisconnectsound__WEBPACK_IMPORTED_MODULE_2__/* ["default"].play */ .Z.play();
});
(0,_bugfixes_papi__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
(0,_bugfixes_restrictions__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)();
(0,_enablekcas__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
const viewModel = new _autopilot__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
knockout__WEBPACK_IMPORTED_MODULE_0__.applyBindings(viewModel, $ap[0]);
componentHandler.upgradeElements($ap[0]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (viewModel);


/***/ }),

/***/ 803:
/*!*****************************!*\
  !*** ./source/ui/ui.css.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`#Qantas94Heavy-ap {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  height: 150px;
  width: 100%;
  padding: 0 10px 10px;
  box-shadow: 0px 0px 16px #888 inset;
}

#Qantas94Heavy-ap-nav > div {
  text-align: right;
}

#Qantas94Heavy-ap-nav h6 {
  margin: 10px 0;
  line-height: 26px;
}

#Qantas94Heavy-ap-nav button {
  margin: 10px 0;
  width: 150px;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  padding: 0 5px;
  text-align: center;
  clear: both;
}

#Qantas94Heavy-ap label {
  float: right;
}

#Qantas94Heavy-ap-displays {
  width: 100%;
  margin: 0 10px 0 5px;
}

#Qantas94Heavy-ap-displays > div {
  overflow: hidden;
  margin: 3px 0;
}

#Qantas94Heavy-ap-displays input {
  font-size: 18px;
  padding: 0px;
  width: 70px;
  line-height: 18px;
  text-align: right;
  font-family: monospace;
  color: #f93;
  text-shadow: 0px 0px 8px #f93;
  background-color: #000;
  border: 2px inset;
}

#Qantas94Heavy-spd-container {
  padding-right: 15px;
}

#Qantas94Heavy-spd-container > div {
  width: 50%;
}

.Qantas94Heavy-pull-left {
  float: left;
}

.Qantas94Heavy-pull-right {
  float: right;
}

.Qantas94Heavy-switch-container {
  width: 20%;
  float: left;
}

.Qantas94Heavy-input-container {
  overflow: auto;
  width: 150px;
}
`);


/***/ }),

/***/ 833:
/*!******************************!*\
  !*** ./source/ui/ui.html.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div id="Qantas94Heavy-ap-nav" class="mdl-grid mdl-grid--no-spacing">
  <div class="mdl-cell mdl-cell--2-col">
    <h6>Autopilot</h6>
  </div>
  <div class="mdl-cell mdl-cell--5-col">
    <button
      id="Qantas94Heavy-ap-toggle"
      class="mdl-button mdl-js-button mdl-button--raised"
      data-bind="css: { 'mdl-button--colored': on },
                       click: toggle, text: on() ? 'Engaged' : 'Disengaged'"
    ></button>
  </div>

  <div class="mdl-cell mdl-cell--5-col">
    <button
      class="mdl-button mdl-js-button mdl-button--raised"
      data-bind="click: nextMode, text: currentModeText"
    ></button>
  </div>
</div>

<div id="Qantas94Heavy-ap-displays">
  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: altitudeEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>

      <div class="Qantas94Heavy-input-container">
        <label>
          Altitude
          <input type="number" min="0" step="500" data-bind="value: altitude" />
        </label>
      </div>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-input-container">
        <label>
          V/S
          <input
            type="number"
            placeholder="-----"
            step="50"
            data-bind="value: vs"
          />
        </label>
      </div>
    </div>
  </div>

  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: headingEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>

      <!-- Heading mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 0"
      >
        <label>
          Heading
          <input
            type="number"
            min="1"
            max="360"
            step="1"
            data-bind="value: heading"
          />
        </label>
      </div>

      <!-- Lat/lon mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 1"
      >
        <label>
          Latitude
          <input type="number" data-bind="value: lat" />
        </label>
      </div>

      <!-- Waypoint mode -->
      <div
        class="Qantas94Heavy-input-container"
        data-bind="visible: currentMode() === 2"
      >
        <label>
          Waypoint
          <input type="text" data-bind="value: waypoint" />
        </label>
      </div>
    </div>

    <!-- Lat/lon mode -->
    <div
      class="mdl-cell mdl-cell--6-col"
      data-bind="visible: currentMode() === 1"
    >
      <div class="Qantas94Heavy-input-container">
        <label>
          Longitude
          <input type="number" data-bind="value: lon" />
        </label>
      </div>
    </div>
  </div>

  <div class="mdl-grid mdl-grid--no-spacing">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="Qantas94Heavy-switch-container">
        <label class="mdl-switch mdl-js-switch">
          <input
            type="checkbox"
            class="mdl-switch__input"
            data-bind="checked: speedEnabled, enable: on, mdlSwitch: true"
          />
        </label>
      </div>
      <div class="Qantas94Heavy-input-container">
        <label>
          Speed
          <input
            type="number"
            placeholder="0"
            min="0"
            step="10"
            data-bind="value: speed"
          />
        </label>
      </div>
    </div>

    <div class="mdl-cell mdl-cell--3-col">
      <label
        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
        for="Qantas94Heavy-spd-kias"
      >
        <input
          type="radio"
          id="Qantas94Heavy-spd-kias"
          class="mdl-radio__button"
          name="options"
          value="kias"
          data-bind="checked: speedMode, mdlRadio: true"
        />
        <span class="mdl-radio__label">KIAS</span>
      </label>
    </div>

    <div class="mdl-cell mdl-cell--3-col">
      <label
        class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
        for="Qantas94Heavy-spd-mach"
      >
        <input
          type="radio"
          id="Qantas94Heavy-spd-mach"
          class="mdl-radio__button"
          name="options"
          value="mach"
          data-bind="checked: speedMode, mdlRadio: true"
        />
        <span class="mdl-radio__label">Mach</span>
      </label>
    </div>
  </div>
</div>
`);


/***/ }),

/***/ 712:
/*!************************!*\
  !*** ./source/util.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const SMOOTH_BUFFER = new Map();
function exponentialSmoothing(keyName, newValue, smoothingFactor) {
    const buffer = SMOOTH_BUFFER.get(keyName);
    if (!buffer) {
        SMOOTH_BUFFER.set(keyName, [newValue, smoothingFactor || 2]);
        return newValue;
    }
    smoothingFactor = buffer[1];
    const S_t = newValue * smoothingFactor + (1 - smoothingFactor) * buffer[0];
    buffer[0] = S_t;
    return S_t;
}
function fixAngle(a) {
    const result = a % 360;
    if (result > 180)
        return result - 360;
    if (result <= -180)
        return result + 360;
    return result;
}
function fixAngle360(a) {
    const result = a % 360;
    return result > 0 ? result : result + 360;
}
const DEGREES_TO_RADIANS = 0.017453292519943295;
function deg2rad(x) {
    return x * DEGREES_TO_RADIANS;
}
function rad2deg(x) {
    return x / DEGREES_TO_RADIANS;
}
const METRES_PER_SECOND_TO_KNOTS = 1.9438444924406046;
function knots2ms(x) {
    return x / METRES_PER_SECOND_TO_KNOTS;
}
function ms2knots(x) {
    return x * METRES_PER_SECOND_TO_KNOTS;
}
const FEET_TO_METRES = 0.3048;
function ft2mtrs(x) {
    return x * FEET_TO_METRES;
}
function mtrs2ft(x) {
    return x / FEET_TO_METRES;
}
function isPlusZero(arg) {
    return arg === 0 && 1 / arg === Infinity;
}
function isMinusZero(arg) {
    return arg === 0 && 1 / arg === -Infinity;
}
function clamp(x, min, max) {
    x = +x;
    min = +min;
    max = +max;
    if (min !== min || max !== max)
        return NaN;
    if (x < min)
        return min;
    if (x > max)
        return max;
    if (x === 0) {
        if (isPlusZero(min))
            return 0;
        if (isMinusZero(max))
            return -0;
    }
    return x;
}
const util = {
    exponentialSmoothing,
    fixAngle,
    fixAngle360,
    deg2rad,
    rad2deg,
    knots2ms,
    ms2knots,
    ft2mtrs,
    mtrs2ft,
    clamp,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (util);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************!*\
  !*** ./init.js ***!
  \*****************/


var timer = setInterval(function () {
  if (
    !(
      window.geofs &&
      window.geofs.canvas &&
      window.geofs.aircraft &&
      window.geofs.aircraft.instance &&
      window.geofs.aircraft.instance.object3d &&
      window.navData.statusCode === 1 &&
      window.keyboard_mapping?.ready
    )
  )
    return;
  clearInterval(timer);
  window.autopilot_pp = {};
  window.autopilot_pp.version = "0.12.0";
  window.autopilot_pp.ready = false;
  __webpack_require__(/*! ./source/ui/main */ 573);
  window.autopilot_pp.require = __webpack_require__;
}, 250);

})();

/******/ })()
;