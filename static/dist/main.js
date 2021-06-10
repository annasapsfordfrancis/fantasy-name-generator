(function(e,t){if(typeof define==="function"&&define.amd){define([],t)}else{e.htmx=t()}})(typeof self!=="undefined"?self:this,function(){return function(){"use strict";var k={onLoad:t,process:rt,on:I,off:M,trigger:lt,ajax:$t,find:w,findAll:S,closest:L,values:function(e,t){var r=Lt(e,t||"post");return r.values},remove:E,addClass:q,removeClass:R,toggleClass:C,takeClass:O,defineExtension:Qt,removeExtension:er,logAll:b,logger:null,useTemplateFragments:false,config:{historyEnabled:true,historyCacheSize:10,refreshOnHistoryMiss:false,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:true,indicatorClass:"htmx-indicator",requestClass:"htmx-request",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:true,attributesToSettle:["class","style","width","height"],withCredentials:false,wsReconnectDelay:"full-jitter",disableSelector:"[hx-disable], [data-hx-disable]"},parseInterval:f,_:e,createEventSource:function(e){return new EventSource(e,{withCredentials:true})},createWebSocket:function(e){return new WebSocket(e,[])}};var r=["get","post","put","delete","patch"];var n=r.map(function(e){return"[hx-"+e+"], [data-hx-"+e+"]"}).join(", ");function f(e){if(e==undefined){return undefined}if(e.slice(-2)=="ms"){return parseFloat(e.slice(0,-2))||undefined}if(e.slice(-1)=="s"){return parseFloat(e.slice(0,-1))*1e3||undefined}return parseFloat(e)||undefined}function l(e,t){return e.getAttribute&&e.getAttribute(t)}function s(e,t){return e.hasAttribute&&(e.hasAttribute(t)||e.hasAttribute("data-"+t))}function D(e,t){return l(e,t)||l(e,"data-"+t)}function c(e){return e.parentElement}function F(){return document}function h(e,t){if(t(e)){return e}else if(c(e)){return h(c(e),t)}else{return null}}function X(e,t){var r=null;h(e,function(e){return r=D(e,t)});return r}function d(e,t){var r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return r&&r.call(e,t)}function i(e){var t=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var r=t.exec(e);if(r){return r[1].toLowerCase()}else{return""}}function o(e,t){var r=new DOMParser;var n=r.parseFromString(e,"text/html");var i=n.body;while(t>0){t--;i=i.firstChild}if(i==null){i=F().createDocumentFragment()}return i}function u(e){if(k.config.useTemplateFragments){var t=o("<body><template>"+e+"</template></body>",0);return t.querySelector("template").content}else{var r=i(e);switch(r){case"thead":case"tbody":case"tfoot":case"colgroup":case"caption":return o("<table>"+e+"</table>",1);case"col":return o("<table><colgroup>"+e+"</colgroup></table>",2);case"tr":return o("<table><tbody>"+e+"</tbody></table>",2);case"td":case"th":return o("<table><tbody><tr>"+e+"</tr></tbody></table>",3);case"script":return o("<div>"+e+"</div>",1);default:return o(e,0)}}}function P(e){if(e){e()}}function a(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function v(e){return a(e,"Function")}function g(e){return a(e,"Object")}function U(e){var t="htmx-internal-data";var r=e[t];if(!r){r=e[t]={}}return r}function p(e){var t=[];if(e){for(var r=0;r<e.length;r++){t.push(e[r])}}return t}function j(e,t){if(e){for(var r=0;r<e.length;r++){t(e[r])}}}function m(e){var t=e.getBoundingClientRect();var r=t.top;var n=t.bottom;return r<window.innerHeight&&n>=0}function z(e){return F().body.contains(e)}function y(e){return e.trim().split(/\s+/)}function V(e,t){for(var r in t){if(t.hasOwnProperty(r)){e[r]=t[r]}}return e}function x(e){try{return JSON.parse(e)}catch(e){ut(e);return null}}function e(e){return Ut(F().body,function(){return eval(e)})}function t(t){var e=k.on("htmx:load",function(e){t(e.detail.elt)});return e}function b(){k.logger=function(e,t,r){if(console){console.log(t,e,r)}}}function w(e,t){if(t){return e.querySelector(t)}else{return w(F(),e)}}function S(e,t){if(t){return e.querySelectorAll(t)}else{return S(F(),e)}}function E(e,t){e=H(e);if(t){setTimeout(function(){E(e)},t)}else{e.parentElement.removeChild(e)}}function q(e,t,r){e=H(e);if(r){setTimeout(function(){q(e,t)},r)}else{e.classList.add(t)}}function R(e,t,r){e=H(e);if(r){setTimeout(function(){R(e,t)},r)}else{e.classList.remove(t)}}function C(e,t){e=H(e);e.classList.toggle(t)}function O(e,t){e=H(e);j(e.parentElement.children,function(e){R(e,t)});q(e,t)}function L(e,t){e=H(e);if(e.closest){return e.closest(t)}else{do{if(e==null||d(e,t)){return e}}while(e=e&&c(e))}}function A(e,t){if(t.indexOf("closest ")===0){return[L(e,t.substr(8))]}else if(t.indexOf("find ")===0){return[w(e,t.substr(5))]}else{return F().querySelectorAll(t)}}function T(e,t){return A(e,t)[0]}function H(e){if(a(e,"String")){return w(e)}else{return e}}function N(e,t,r){if(v(t)){return{target:F().body,event:e,listener:t}}else{return{target:H(e),event:t,listener:r}}}function I(t,r,n){rr(function(){var e=N(t,r,n);e.target.addEventListener(e.event,e.listener)});var e=v(r);return e?r:n}function M(t,r,n){rr(function(){var e=N(t,r,n);e.target.removeEventListener(e.event,e.listener)});return v(r)?r:n}function _(e){var t=h(e,function(e){return D(e,"hx-target")!==null});if(t){var r=D(t,"hx-target");if(r==="this"){return t}else{return T(e,r)}}else{var n=U(e);if(n.boosted){return F().body}else{return e}}}function B(e){var t=k.config.attributesToSettle;for(var r=0;r<t.length;r++){if(e===t[r]){return true}}return false}function W(t,r){j(t.attributes,function(e){if(!r.hasAttribute(e.name)&&B(e.name)){t.removeAttribute(e.name)}});j(r.attributes,function(e){if(B(e.name)){t.setAttribute(e.name,e.value)}})}function $(e,t){var r=tr(t);for(var n=0;n<r.length;n++){var i=r[n];try{if(i.isInlineSwap(e)){return true}}catch(e){ut(e)}}return e==="outerHTML"}function J(e,t,r){var n="#"+t.id;var i="outerHTML";if(e==="true"){}else if(e.indexOf(":")>0){i=e.substr(0,e.indexOf(":"));n=e.substr(e.indexOf(":")+1,e.length)}else{i=e}var o=F().querySelector(n);if(o){var a;a=F().createDocumentFragment();a.appendChild(t);if(!$(i,o)){a=t}le(i,o,o,a,r)}else{t.parentNode.removeChild(t);ot(F().body,"htmx:oobErrorNoTarget",{content:t})}return e}function Z(e,r){j(S(e,"[hx-swap-oob], [data-hx-swap-oob]"),function(e){var t=D(e,"hx-swap-oob");if(t!=null){J(t,e,r)}})}function G(e){j(S(e,"[hx-preserve], [data-hx-preserve]"),function(e){var t=D(e,"id");var r=F().getElementById(t);if(r!=null){e.parentNode.replaceChild(r,e)}})}function K(n,e,i){j(e.querySelectorAll("[id]"),function(e){if(e.id&&e.id.length>0){var t=n.querySelector(e.tagName+"[id='"+e.id+"']");if(t&&t!==n){var r=e.cloneNode();W(e,t);i.tasks.push(function(){W(e,r)})}}})}function Y(e){return function(){rt(e);Ye(e);Q(e);lt(e,"htmx:load")}}function Q(e){var t="[autofocus]";var r=d(e,t)?e:e.querySelector(t);if(r!=null){r.focus()}}function ee(e,t,r,n){K(e,r,n);while(r.childNodes.length>0){var i=r.firstChild;e.insertBefore(i,t);if(i.nodeType!==Node.TEXT_NODE&&i.nodeType!==Node.COMMENT_NODE){n.tasks.push(Y(i))}}}function te(t){var e=U(t);if(e.webSocket){e.webSocket.close()}if(e.sseEventSource){e.sseEventSource.close()}if(e.listenerInfos){j(e.listenerInfos,function(e){if(t!==e.on){e.on.removeEventListener(e.trigger,e.listener)}})}if(t.children){j(t.children,function(e){te(e)})}}function re(e,t,r){if(e.tagName==="BODY"){return se(e,t,r)}else{var n=e.previousSibling;ee(c(e),e,t,r);if(n==null){var i=c(e).firstChild}else{var i=n.nextSibling}U(e).replacedWith=i;r.elts=[];while(i&&i!==e){if(i.nodeType===Node.ELEMENT_NODE){r.elts.push(i)}i=i.nextElementSibling}te(e);c(e).removeChild(e)}}function ne(e,t,r){return ee(e,e.firstChild,t,r)}function ie(e,t,r){return ee(c(e),e,t,r)}function oe(e,t,r){return ee(e,null,t,r)}function ae(e,t,r){return ee(c(e),e.nextSibling,t,r)}function se(e,t,r){var n=e.firstChild;ee(e,n,t,r);if(n){while(n.nextSibling){te(n.nextSibling);e.removeChild(n.nextSibling)}te(n);e.removeChild(n)}}function ue(e,t){var r=X(e,"hx-select");if(r){var n=F().createDocumentFragment();j(t.querySelectorAll(r),function(e){n.appendChild(e)});t=n}return t}function le(e,t,r,n,i){switch(e){case"none":return;case"outerHTML":re(r,n,i);return;case"afterbegin":ne(r,n,i);return;case"beforebegin":ie(r,n,i);return;case"beforeend":oe(r,n,i);return;case"afterend":ae(r,n,i);return;default:var o=tr(t);for(var a=0;a<o.length;a++){var s=o[a];try{var u=s.handleSwap(e,r,n,i);if(u){if(typeof u.length!=="undefined"){for(var l=0;l<u.length;l++){var f=u[l];if(f.nodeType!==Node.TEXT_NODE&&f.nodeType!==Node.COMMENT_NODE){i.tasks.push(Y(f))}}}return}}catch(e){ut(e)}}se(r,n,i)}}var fe=/<title>([\s\S]+?)<\/title>/im;function ce(e){if(e.indexOf("<title>")>-1&&(e.indexOf("<svg>")==-1||e.indexOf("<title>")<e.indexOf("<svg>"))){var t=fe.exec(e);if(t){return t[1]}}}function he(e,t,r,n,i){var o=ce(n);if(o){var a=w("title");if(a){a.innerHTML=o}else{window.document.title=o}}var s=u(n);if(s){Z(s,i);s=ue(r,s);G(s);return le(e,r,t,s,i)}}function de(e,t,r){var n=e.getResponseHeader(t);if(n.indexOf("{")===0){var i=x(n);for(var o in i){if(i.hasOwnProperty(o)){var a=i[o];if(!g(a)){a={value:a}}lt(r,o,a)}}}else{lt(r,n,[])}}var ve=/\s/;var ge=/[\s,]/;var pe=/[_$a-zA-Z]/;var me=/[_$a-zA-Z0-9]/;var ye=['"',"'","/"];var xe=/[^\s]/;function be(e){var t=[];var r=0;while(r<e.length){if(pe.exec(e.charAt(r))){var n=r;while(me.exec(e.charAt(r+1))){r++}t.push(e.substr(n,r-n+1))}else if(ye.indexOf(e.charAt(r))!==-1){var i=e.charAt(r);var n=r;r++;while(r<e.length&&e.charAt(r)!==i){if(e.charAt(r)==="\\"){r++}r++}t.push(e.substr(n,r-n+1))}else{var o=e.charAt(r);t.push(o)}r++}return t}function we(e,t,r){return pe.exec(e.charAt(0))&&e!=="true"&&e!=="false"&&e!=="this"&&e!==r&&t!=="."}function Se(e,t,r){if(t[0]==="["){t.shift();var n=1;var i=" return (function("+r+"){ return (";var o=null;while(t.length>0){var a=t[0];if(a==="]"){n--;if(n===0){if(o===null){i=i+"true"}t.shift();i+=")})";try{var s=Ut(e,function(){return Function(i)()},function(){return true});s.source=i;return s}catch(e){ot(F().body,"htmx:syntax:error",{error:e,source:i});return null}}}else if(a==="["){n++}if(we(a,o,r)){i+="(("+r+"."+a+") ? ("+r+"."+a+") : (window."+a+"))"}else{i=i+a}o=t.shift()}}}function Ee(e,t){var r="";while(e.length>0&&!e[0].match(t)){r+=e.shift()}return r}var qe="input, textarea, select";function Re(e){var t=D(e,"hx-trigger");var r=[];if(t){var n=be(t);do{Ee(n,xe);var i=n.length;var o=Ee(n,/[,\[\s]/);if(o!==""){if(o==="every"){var a={trigger:"every"};Ee(n,xe);a.pollInterval=f(Ee(n,ve));r.push(a)}else if(o.indexOf("sse:")===0){r.push({trigger:"sse",sseEvent:o.substr(4)})}else{var s={trigger:o};var u=Se(e,n,"event");if(u){s.eventFilter=u}while(n.length>0&&n[0]!==","){Ee(n,xe);var l=n.shift();if(l==="changed"){s.changed=true}else if(l==="once"){s.once=true}else if(l==="consume"){s.consume=true}else if(l==="delay"&&n[0]===":"){n.shift();s.delay=f(Ee(n,ge))}else if(l==="from"&&n[0]===":"){n.shift();s.from=Ee(n,ge)}else if(l==="target"&&n[0]===":"){n.shift();s.target=Ee(n,ge)}else if(l==="throttle"&&n[0]===":"){n.shift();s.throttle=f(Ee(n,ge))}else if(l==="queue"&&n[0]===":"){n.shift();s.queue=Ee(n,ge)}else if((l==="root"||l==="threshold")&&n[0]===":"){n.shift();s[l]=Ee(n,ge)}else{ot(e,"htmx:syntax:error",{token:n.shift()})}}r.push(s)}}if(n.length===i){ot(e,"htmx:syntax:error",{token:n.shift()})}Ee(n,xe)}while(n[0]===","&&n.shift())}if(r.length>0){return r}else if(d(e,"form")){return[{trigger:"submit"}]}else if(d(e,qe)){return[{trigger:"change"}]}else{return[{trigger:"click"}]}}function Ce(e){U(e).cancelled=true}function Oe(e,t,r,n){var i=U(e);i.timeout=setTimeout(function(){if(z(e)&&i.cancelled!==true){Zt(t,r,e);Oe(e,t,D(e,"hx-"+t),n)}},n)}function Le(e){return location.hostname===e.hostname&&l(e,"href")&&l(e,"href").indexOf("#")!==0}function Ae(t,r,e){if(t.tagName==="A"&&Le(t)||t.tagName==="FORM"){r.boosted=true;var n,i;if(t.tagName==="A"){n="get";i=l(t,"href");r.pushURL=true}else{var o=l(t,"method");n=o?o.toLowerCase():"get";if(n==="get"){r.pushURL=true}i=l(t,"action")}e.forEach(function(e){Ie(t,n,i,r,e,true)})}}function Te(e){return e.tagName==="FORM"||d(e,'input[type="submit"], button')&&L(e,"form")!==null||e.tagName==="A"&&e.href&&(e.getAttribute("href")==="#"||e.getAttribute("href").indexOf("#")!==0)}function He(e,t){return U(e).boosted&&e.tagName==="A"&&t.type==="click"&&(t.ctrlKey||t.metaKey)}function Ne(e,t){var r=e.eventFilter;if(r){try{return r(t)!==true}catch(e){ot(F().body,"htmx:eventFilter:error",{error:e,source:r.source});return true}}return false}function Ie(n,i,o,e,a,s){var u=n;if(a.from){u=w(a.from)}var l=function(e){if(!z(n)){u.removeEventListener(a.trigger,l);return}if(He(n,e)){return}if(s||Te(n)){e.preventDefault()}if(Ne(a,e)){return}var t=U(e);t.triggerSpec=a;if(t.handledFor==null){t.handledFor=[]}var r=U(n);if(t.handledFor.indexOf(n)<0){t.handledFor.push(n);if(a.consume){e.stopPropagation()}if(a.target&&e.target){if(!d(e.target,a.target)){return}}if(a.once){if(r.triggeredOnce){return}else{r.triggeredOnce=true}}if(a.changed){if(r.lastValue===n.value){return}else{r.lastValue=n.value}}if(r.delayed){clearTimeout(r.delayed)}if(r.throttle){return}if(a.throttle){if(!r.throttle){Zt(i,o,n,e);r.throttle=setTimeout(function(){r.throttle=null},a.throttle)}}else if(a.delay){r.delayed=setTimeout(function(){Zt(i,o,n,e)},a.delay)}else{Zt(i,o,n,e)}}};if(e.listenerInfos==null){e.listenerInfos=[]}e.listenerInfos.push({trigger:a.trigger,listener:l,on:u});u.addEventListener(a.trigger,l)}var Me=false;var ke=null;function De(){if(!ke){ke=function(){Me=true};window.addEventListener("scroll",ke);setInterval(function(){if(Me){Me=false;j(F().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"),function(e){Fe(e)})}},200)}}function Fe(e){var t=U(e);if(!t.revealed&&m(e)){t.revealed=true;if(t.initialized){Zt(t.verb,t.path,e)}else{e.addEventListener("htmx:afterProcessNode",function(){Zt(t.verb,t.path,e)},{once:true})}}}function Xe(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){Pe(e,o[1],0)}if(o[0]==="send"){je(e)}}}function Pe(s,r,n){if(!z(s)){return}if(r.indexOf("/")==0){var e=location.hostname+(location.port?":"+location.port:"");if(location.protocol=="https:"){r="wss://"+e+r}else if(location.protocol=="http:"){r="ws://"+e+r}}var t=k.createWebSocket(r);t.onerror=function(e){ot(s,"htmx:wsError",{error:e,socket:t});Ue(s)};t.onclose=function(e){if([1006,1012,1013].includes(e.code)){var t=ze(n);setTimeout(function(){Pe(s,r,n+1)},t)}};t.onopen=function(e){n=0};U(s).webSocket=t;t.addEventListener("message",function(e){if(Ue(s)){return}var t=e.data;st(s,function(e){t=e.transformResponse(t,null,s)});var r=Ft(s);var n=u(t);var i=p(n.children);for(var o=0;o<i.length;o++){var a=i[o];J(D(a,"hx-swap-oob")||"true",a,r)}mt(r.tasks)})}function Ue(e){if(!z(e)){U(e).webSocket.close();return true}}function je(l){var f=h(l,function(e){return U(e).webSocket!=null});if(f){l.addEventListener(Re(l)[0].trigger,function(e){var t=U(f).webSocket;var r=Nt(l,f);var n=Lt(l,"post");var i=n.errors;var o=n.values;var a=Vt(l);var s=V(o,a);var u=It(s,l);u["HEADERS"]=r;if(i&&i.length>0){lt(l,"htmx:validation:halted",i);return}t.send(JSON.stringify(u));if(Te(l)){e.preventDefault()}})}else{ot(l,"htmx:noWebSocketSourceError")}}function ze(e){var t=k.config.wsReconnectDelay;if(typeof t==="function"){return t(e)}if(t==="full-jitter"){var r=Math.min(e,6);var n=1e3*Math.pow(2,r);return n*Math.random()}ut('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"')}function Ve(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){_e(e,o[1])}if(o[0]==="swap"){Be(e,o[1])}}}function _e(t,e){var r=k.createEventSource(e);r.onerror=function(e){ot(t,"htmx:sseError",{error:e,source:r});$e(t)};U(t).sseEventSource=r}function Be(o,a){var s=h(o,Je);if(s){var u=U(s).sseEventSource;var l=function(e){if($e(s)){u.removeEventListener(a,l);return}var t=e.data;st(o,function(e){t=e.transformResponse(t,null,o)});var r=kt(o);var n=_(o);var i=Ft(o);he(r.swapStyle,o,n,t,i);mt(i.tasks);lt(o,"htmx:sseMessage",e)};U(o).sseListener=l;u.addEventListener(a,l)}else{ot(o,"htmx:noSSESourceError")}}function We(e,t,r,n){var i=h(e,Je);if(i){var o=U(i).sseEventSource;var a=function(){if(!$e(i)){if(z(e)){Zt(t,r,e)}else{o.removeEventListener(n,a)}}};U(e).sseListener=a;o.addEventListener(n,a)}else{ot(e,"htmx:noSSESourceError")}}function $e(e){if(!z(e)){U(e).sseEventSource.close();return true}}function Je(e){return U(e).sseEventSource!=null}function Ze(e,t,r,n,i){var o=function(){if(!n.loaded){n.loaded=true;Zt(t,r,e)}};if(i){setTimeout(o,i)}else{o()}}function Ge(o,a,e){var t=false;j(r,function(n){if(s(o,"hx-"+n)){var i=D(o,"hx-"+n);t=true;a.path=i;a.verb=n;e.forEach(function(e){if(e.sseEvent){We(o,n,i,e.sseEvent)}else if(e.trigger==="revealed"){De();Fe(o)}else if(e.trigger==="intersect"){var t={};if(e.root){t.root=T(e.root)}if(e.threshold){t.threshold=parseFloat(e.threshold)}var r=new IntersectionObserver(function(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.isIntersecting){lt(o,"intersect");break}}},t);r.observe(o);Ie(o,n,i,a,e)}else if(e.trigger==="load"){Ze(o,n,i,a,e.delay)}else if(e.pollInterval){a.polling=true;Oe(o,n,i,e.pollInterval)}else{Ie(o,n,i,a,e)}})}});return t}function Ke(e){if(e.type==="text/javascript"||e.type===""){try{Ut(e,function(){(1,eval)(e.innerText)})}catch(e){ut(e)}}}function Ye(e){if(d(e,"script")){Ke(e)}j(S(e,"script"),function(e){Ke(e)})}function Qe(){return document.querySelector("[hx-boost], [data-hx-boost]")}function et(e){if(e.querySelectorAll){var t=Qe()?", a, form":"";var r=e.querySelectorAll(n+t+", [hx-sse], [data-hx-sse], [hx-ws],"+" [data-hx-ws]");return r}else{return[]}}function tt(e){if(e.closest&&e.closest(k.config.disableSelector)){return}var t=U(e);if(!t.initialized){t.initialized=true;lt(e,"htmx:beforeProcessNode");if(e.value){t.lastValue=e.value}var r=Re(e);var n=Ge(e,t,r);if(!n&&X(e,"hx-boost")==="true"){Ae(e,t,r)}var i=D(e,"hx-sse");if(i){Ve(e,t,i)}var o=D(e,"hx-ws");if(o){Xe(e,t,o)}lt(e,"htmx:afterProcessNode")}}function rt(e){e=H(e);tt(e);j(et(e),function(e){tt(e)})}function nt(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function it(e,t){var r;if(window.CustomEvent&&typeof window.CustomEvent==="function"){r=new CustomEvent(e,{bubbles:true,cancelable:true,detail:t})}else{r=F().createEvent("CustomEvent");r.initCustomEvent(e,true,true,t)}return r}function ot(e,t,r){lt(e,t,V({error:t},r))}function at(e){return e==="htmx:afterProcessNode"}function st(e,t){j(tr(e),function(e){try{t(e)}catch(e){ut(e)}})}function ut(e){if(console.error){console.error(e)}else if(console.log){console.log("ERROR: ",e)}}function lt(e,t,r){e=H(e);if(r==null){r={}}r["elt"]=e;var n=it(t,r);if(k.logger&&!at(t)){k.logger(e,t,r)}if(r.error){ut(r.error);lt(e,"htmx:error",{errorInfo:r})}var i=e.dispatchEvent(n);var o=nt(t);if(i&&o!==t){var a=it(o,n.detail);i=i&&e.dispatchEvent(a)}st(e,function(e){i=i&&e.onEvent(t,n)!==false});return i}var ft=null;function ct(){var e=F().querySelector("[hx-history-elt],[data-hx-history-elt]");return e||F().body}function ht(e,t,r,n){var i=x(localStorage.getItem("htmx-history-cache"))||[];for(var o=0;o<i.length;o++){if(i[o].url===e){i.splice(o,1);break}}i.push({url:e,content:t,title:r,scroll:n});while(i.length>k.config.historyCacheSize){i.shift()}while(i.length>0){try{localStorage.setItem("htmx-history-cache",JSON.stringify(i));break}catch(e){ot(F().body,"htmx:historyCacheError",{cause:e,cache:i});i.shift()}}}function dt(e){var t=x(localStorage.getItem("htmx-history-cache"))||[];for(var r=0;r<t.length;r++){if(t[r].url===e){return t[r]}}return null}function vt(e){var t=k.config.requestClass;var r=e.cloneNode(true);j(S(r,"."+t),function(e){R(e,t)});return r.innerHTML}function gt(){var e=ct();var t=ft||location.pathname+location.search;lt(F().body,"htmx:beforeHistorySave",{path:t,historyElt:e});if(k.config.historyEnabled)history.replaceState({htmx:true},F().title,window.location.href);ht(t,vt(e),F().title,window.scrollY)}function pt(e){if(k.config.historyEnabled)history.pushState({htmx:true},"",e);ft=e}function mt(e){j(e,function(e){e.call()})}function yt(n){var e=new XMLHttpRequest;var i={path:n,xhr:e};lt(F().body,"htmx:historyCacheMiss",i);e.open("GET",n,true);e.setRequestHeader("HX-History-Restore-Request","true");e.onload=function(){if(this.status>=200&&this.status<400){lt(F().body,"htmx:historyCacheMissLoad",i);var e=u(this.response);e=e.querySelector("[hx-history-elt],[data-hx-history-elt]")||e;var t=ct();var r=Ft(t);se(t,e,r);mt(r.tasks);ft=n;lt(F().body,"htmx:historyRestore",{path:n})}else{ot(F().body,"htmx:historyCacheMissLoadError",i)}};e.send()}function xt(e){gt();e=e||location.pathname+location.search;var t=dt(e);if(t){var r=u(t.content);var n=ct();var i=Ft(n);se(n,r,i);mt(i.tasks);document.title=t.title;window.scrollTo(0,t.scroll);ft=e;lt(F().body,"htmx:historyRestore",{path:e})}else{if(k.config.refreshOnHistoryMiss){window.location.reload(true)}else{yt(e)}}}function bt(e){var t=X(e,"hx-push-url");return t&&t!=="false"||U(e).boosted&&U(e).pushURL}function wt(e){var t=X(e,"hx-push-url");return t==="true"||t==="false"?null:t}function St(e){var t=X(e,"hx-indicator");if(t){var r=A(e,t)}else{r=[e]}j(r,function(e){e.classList["add"].call(e.classList,k.config.requestClass)});return r}function Et(e){j(e,function(e){e.classList["remove"].call(e.classList,k.config.requestClass)})}function qt(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(n.isSameNode(t)){return true}}return false}function Rt(e){if(e.name===""||e.name==null||e.disabled){return false}if(e.type==="button"||e.type==="submit"||e.tagName==="image"||e.tagName==="reset"||e.tagName==="file"){return false}if(e.type==="checkbox"||e.type==="radio"){return e.checked}return true}function Ct(t,r,n,e,i){if(e==null||qt(t,e)){return}else{t.push(e)}if(Rt(e)){var o=l(e,"name");var a=e.value;if(e.multiple){a=p(e.querySelectorAll("option:checked")).map(function(e){return e.value})}if(e.files){a=p(e.files)}if(o!=null&&a!=null){var s=r[o];if(s){if(Array.isArray(s)){if(Array.isArray(a)){r[o]=s.concat(a)}else{s.push(a)}}else{if(Array.isArray(a)){r[o]=[s].concat(a)}else{r[o]=[s,a]}}}else{r[o]=a}}if(i){Ot(e,n)}}if(d(e,"form")){var u=e.elements;j(u,function(e){Ct(t,r,n,e,i)})}}function Ot(e,t){if(e.willValidate){lt(e,"htmx:validation:validate");if(!e.checkValidity()){t.push({elt:e,message:e.validationMessage,validity:e.validity});lt(e,"htmx:validation:failed",{message:e.validationMessage,validity:e.validity})}}}function Lt(e,t){var r=[];var n={};var i={};var o=[];var a=d(e,"form")&&e.noValidate!==true;if(t!=="get"){Ct(r,i,o,L(e,"form"),a)}Ct(r,n,o,e,a);var s=X(e,"hx-include");if(s){var u=A(e,s);j(u,function(e){Ct(r,n,o,e,a);if(!d(e,"form")){j(e.querySelectorAll(qe),function(e){Ct(r,n,o,e,a)})}})}n=V(n,i);return{errors:o,values:n}}function At(e,t,r){if(e!==""){e+="&"}e+=encodeURIComponent(t)+"="+encodeURIComponent(r);return e}function Tt(e){var t="";for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){j(n,function(e){t=At(t,r,e)})}else{t=At(t,r,n)}}}return t}function Ht(e){var t=new FormData;for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){j(n,function(e){t.append(r,e)})}else{t.append(r,n)}}}return t}function Nt(e,t,r){var n={"HX-Request":"true","HX-Trigger":l(e,"id"),"HX-Trigger-Name":l(e,"name"),"HX-Target":D(t,"id"),"HX-Current-URL":F().location.href};Pt(e,"hx-headers",false,n);if(r!==undefined){n["HX-Prompt"]=r}return n}function It(t,e){var r=X(e,"hx-params");if(r){if(r==="none"){return{}}else if(r==="*"){return t}else if(r.indexOf("not ")===0){j(r.substr(4).split(","),function(e){e=e.trim();delete t[e]});return t}else{var n={};j(r.split(","),function(e){e=e.trim();n[e]=t[e]});return n}}else{return t}}function Mt(e){return l(e,"href")&&l(e,"href").indexOf("#")>=0}function kt(e){var t=X(e,"hx-swap");var r={swapStyle:U(e).boosted?"innerHTML":k.config.defaultSwapStyle,swapDelay:k.config.defaultSwapDelay,settleDelay:k.config.defaultSettleDelay};if(U(e).boosted&&!Mt(e)){r["show"]="top"}if(t){var n=y(t);if(n.length>0){r["swapStyle"]=n[0];for(var i=1;i<n.length;i++){var o=n[i];if(o.indexOf("swap:")===0){r["swapDelay"]=f(o.substr(5))}if(o.indexOf("settle:")===0){r["settleDelay"]=f(o.substr(7))}if(o.indexOf("scroll:")===0){r["scroll"]=o.substr(7)}if(o.indexOf("show:")===0){r["show"]=o.substr(5)}}}}return r}function Dt(t,r,n){var i=null;st(r,function(e){if(i==null){i=e.encodeParameters(t,n,r)}});if(i!=null){return i}else{if(X(r,"hx-encoding")==="multipart/form-data"){return Ht(n)}else{return Tt(n)}}}function Ft(e){return{tasks:[],elts:[e]}}function Xt(e,t){var r=e[0];var n=e[e.length-1];if(t.scroll){if(t.scroll==="top"&&r){r.scrollTop=0}if(t.scroll==="bottom"&&n){n.scrollTop=n.scrollHeight}}if(t.show){if(t.show==="top"&&r){r.scrollIntoView(true)}if(t.show==="bottom"&&n){n.scrollIntoView(false)}}}function Pt(e,t,r,n){if(n==null){n={}}if(e==null){return n}var i=D(e,t);if(i){var o=i.trim();var a=r;if(o.indexOf("javascript:")===0){o=o.substr(11);a=true}if(o.indexOf("{")!==0){o="{"+o+"}"}var s;if(a){s=Ut(e,function(){return Function("return ("+o+")")()},{})}else{s=x(o)}for(var u in s){if(s.hasOwnProperty(u)){if(n[u]==null){n[u]=s[u]}}}}return Pt(c(e),t,r,n)}function Ut(e,t,r){if(k.config.allowEval){return t()}else{ot(e,"htmx:evalDisallowedError");return r}}function jt(e,t){return Pt(e,"hx-vars",true,t)}function zt(e,t){return Pt(e,"hx-vals",false,t)}function Vt(e){return V(jt(e),zt(e))}function _t(t,r,n){if(n!==null){try{t.setRequestHeader(r,n)}catch(e){t.setRequestHeader(r,encodeURIComponent(n));t.setRequestHeader(r+"-URI-AutoEncoded","true")}}}function Bt(t){if(t.responseURL&&typeof URL!=="undefined"){try{var e=new URL(t.responseURL);return e.pathname+e.search}catch(e){ot(F().body,"htmx:badResponseUrl",{url:t.responseURL})}}}function Wt(e,t){return e.getAllResponseHeaders().match(t)}function $t(e,t,r){if(r){if(r instanceof Element||a(r,"String")){return Zt(e,t,null,null,{targetOverride:H(r)})}else{return Zt(e,t,H(r.source),r.event,{handler:r.handler,headers:r.headers,values:r.values,targetOverride:H(r.target)})}}else{return Zt(e,t)}}function Jt(e){var t=[];while(e){t.push(e);e=e.parentElement}return t}function Zt(e,t,n,r,i){var o=null;var a=null;i=i!=null?i:{};if(typeof Promise!=="undefined"){var s=new Promise(function(e,t){o=e;a=t})}if(n==null){n=F().body}var u=i.handler||Gt;if(!z(n)){return}var l=i.targetOverride||_(n);if(l==null){ot(n,"htmx:targetError",{target:D(n,"hx-target")});return}var f=U(n);if(f.requestInFlight){var c="last";var h=U(r);if(h&&h.triggerSpec&&h.triggerSpec.queue){c=h.triggerSpec.queue}if(f.queuedRequests==null){f.queuedRequests=[]}if(c==="first"&&f.queuedRequests.length===0){f.queuedRequests.push(function(){Zt(e,t,n,r)})}else if(c==="all"){f.queuedRequests.push(function(){Zt(e,t,n,r)})}else if(c==="last"){f.queuedRequests=[];f.queuedRequests.push(function(){Zt(e,t,n,r)})}return}else{f.requestInFlight=true}var d=function(){f.requestInFlight=false;if(f.queuedRequests!=null&&f.queuedRequests.length>0){var e=f.queuedRequests.shift();e()}};var v=X(n,"hx-prompt");if(v){var g=prompt(v);if(g===null||!lt(n,"htmx:prompt",{prompt:g,target:l})){P(o);d();return s}}var p=X(n,"hx-confirm");if(p){if(!confirm(p)){P(o);d();return s}}var m=new XMLHttpRequest;var y=Nt(n,l,g);if(i.headers){y=V(y,i.values)}var x=Lt(n,e);var b=x.errors;var w=x.values;if(i.values){w=V(w,i.values)}var S=Vt(n);var E=V(w,S);var q=It(E,n);if(e!=="get"&&X(n,"hx-encoding")==null){y["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8"}if(t==null||t===""){t=F().location.href}var R={parameters:q,unfilteredParameters:E,headers:y,target:l,verb:e,errors:b,path:t,triggeringEvent:r};if(!lt(n,"htmx:configRequest",R)){P(o);d();return s}t=R.path;e=R.verb;y=R.headers;q=R.parameters;b=R.errors;if(b&&b.length>0){lt(n,"htmx:validation:halted",R);P(o);d();return s}var C=t.split("#");var O=C[0];var L=C[1];if(e==="get"){var A=O;var T=Object.keys(q).length!==0;if(T){if(A.indexOf("?")<0){A+="?"}else{A+="&"}A+=Tt(q);if(L){A+="#"+L}}m.open("GET",A,true)}else{m.open(e.toUpperCase(),t,true)}m.overrideMimeType("text/html");m.withCredentials=k.config.withCredentials;for(var H in y){if(y.hasOwnProperty(H)){var N=y[H];_t(m,H,N)}}var I={xhr:m,target:l,requestConfig:R,pathInfo:{path:t,finalPath:A,anchor:L}};m.onload=function(){try{var e=Jt(n);u(n,I);Et(M);lt(n,"htmx:afterRequest",I);lt(n,"htmx:afterOnLoad",I);if(!z(n)){var t=null;while(e.length>0&&t==null){var r=e.shift();if(z(r)){t=r}}if(t){lt(t,"htmx:afterRequest",I);lt(t,"htmx:afterOnLoad",I)}}P(o);d()}catch(e){ot(n,"htmx:onLoadError",V({error:e},I));throw e}};m.onerror=function(){Et(M);ot(n,"htmx:afterRequest",I);ot(n,"htmx:sendError",I);P(a);d()};m.onabort=function(){Et(M);ot(n,"htmx:afterRequest",I);ot(n,"htmx:sendAbort",I);P(a);d()};if(!lt(n,"htmx:beforeRequest",I)){P(o);d();return s}var M=St(n);j(["loadstart","loadend","progress","abort"],function(t){j([m,m.upload],function(e){e.addEventListener(t,function(e){lt(n,"htmx:xhr:"+t,{lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total})})})});lt(n,"htmx:beforeSend",I);m.send(e==="get"?null:Dt(m,n,q));return s;25}function Gt(a,s){var u=s.xhr;var l=s.target;if(!lt(a,"htmx:beforeOnLoad",s))return;if(Wt(u,/HX-Trigger:/i)){de(u,"HX-Trigger",a)}if(Wt(u,/HX-Push:/i)){var f=u.getResponseHeader("HX-Push")}if(Wt(u,/HX-Redirect:/i)){window.location.href=u.getResponseHeader("HX-Redirect");return}if(Wt(u,/HX-Refresh:/i)){if("true"===u.getResponseHeader("HX-Refresh")){location.reload();return}}var c=bt(a)||f;if(u.status>=200&&u.status<400){if(u.status===286){Ce(a)}if(u.status!==204){if(!lt(l,"htmx:beforeSwap",s))return;var h=u.response;st(a,function(e){h=e.transformResponse(h,u,a)});if(c){gt()}var d=kt(a);l.classList.add(k.config.swappingClass);var e=function(){try{var e=document.activeElement;var t={};try{t={elt:e,start:e?e.selectionStart:null,end:e?e.selectionEnd:null}}catch(e){}var r=Ft(l);he(d.swapStyle,l,a,h,r);if(t.elt&&!z(t.elt)&&t.elt.id){var n=document.getElementById(t.elt.id);if(n){if(t.start&&n.setSelectionRange){n.setSelectionRange(t.start,t.end)}n.focus()}}l.classList.remove(k.config.swappingClass);j(r.elts,function(e){if(e.classList){e.classList.add(k.config.settlingClass)}lt(e,"htmx:afterSwap",s)});if(s.pathInfo.anchor){location.hash=s.pathInfo.anchor}if(Wt(u,/HX-Trigger-After-Swap:/i)){var i=a;if(!z(a)){i=F().body}de(u,"HX-Trigger-After-Swap",i)}var o=function(){j(r.tasks,function(e){e.call()});j(r.elts,function(e){if(e.classList){e.classList.remove(k.config.settlingClass)}lt(e,"htmx:afterSettle",s)});if(c){var e=f||wt(a)||Bt(u)||s.pathInfo.finalPath||s.pathInfo.path;pt(e);lt(F().body,"htmx:pushedIntoHistory",{path:e})}Xt(r.elts,d);if(Wt(u,/HX-Trigger-After-Settle:/i)){var t=a;if(!z(a)){t=F().body}de(u,"HX-Trigger-After-Settle",t)}};if(d.settleDelay>0){setTimeout(o,d.settleDelay)}else{o()}}catch(e){ot(a,"htmx:swapError",s);throw e}};if(d.swapDelay>0){setTimeout(e,d.swapDelay)}else{e()}}}else{ot(a,"htmx:responseError",V({error:"Response Status Error Code "+u.status+" from "+s.pathInfo.path},s))}}var Kt={};function Yt(){return{onEvent:function(e,t){return true},transformResponse:function(e,t,r){return e},isInlineSwap:function(e){return false},handleSwap:function(e,t,r,n){return false},encodeParameters:function(e,t,r){return null}}}function Qt(e,t){Kt[e]=V(Yt(),t)}function er(e){delete Kt[e]}function tr(e,r,n){if(e==undefined){return r}if(r==undefined){r=[]}if(n==undefined){n=[]}var t=D(e,"hx-ext");if(t){j(t.split(","),function(e){e=e.replace(/ /g,"");if(e.slice(0,7)=="ignore:"){n.push(e.slice(7));return}if(n.indexOf(e)<0){var t=Kt[e];if(t&&r.indexOf(t)<0){r.push(t)}}})}return tr(c(e),r,n)}function rr(e){if(F().readyState!=="loading"){e()}else{F().addEventListener("DOMContentLoaded",e)}}function nr(){if(k.config.includeIndicatorStyles!==false){F().head.insertAdjacentHTML("beforeend","<style>                      ."+k.config.indicatorClass+"{opacity:0;transition: opacity 200ms ease-in;}                      ."+k.config.requestClass+" ."+k.config.indicatorClass+"{opacity:1}                      ."+k.config.requestClass+"."+k.config.indicatorClass+"{opacity:1}                    </style>")}}function ir(){var e=F().querySelector('meta[name="htmx-config"]');if(e){return x(e.content)}else{return null}}function or(){var e=ir();if(e){k.config=V(k.config,e)}}rr(function(){or();nr();var e=F().body;rt(e);window.onpopstate=function(e){if(e.state&&e.state.htmx){xt()}};setTimeout(function(){lt(e,"htmx:load",{})},0)});return k}()});