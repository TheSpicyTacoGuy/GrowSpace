import{L as Sl,_ as Cl,C as Dl,r as ho,c as Nl,F as bl,h as Lt,k as kl,l as xl,v as Ml,n as ws,w as Ol,d as Rt,x as Ll,e as Fl,S as Ul}from"./firebase-app-Cy2CmS-m.js";var fo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qt,da;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.D=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(y,T,A){for(var g=Array(arguments.length-2),xt=2;xt<arguments.length;xt++)g[xt-2]=arguments[xt];return p.prototype[T].apply(y,g)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)y[T]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(T=0;16>T;++T)y[T]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],T=E.g[2];var A=E.g[3],g=p+(A^_&(T^A))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[2]+606105819&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[3]+3250441966&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[6]+2821735955&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[7]+4249261313&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[10]+4294925233&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[11]+2304563134&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(A^_&(T^A))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(T^p&(_^T))+y[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=T+(_^A&(p^_))+y[14]+2792965006&4294967295,T=A+(g<<17&4294967295|g>>>15),g=_+(p^T&(A^p))+y[15]+1236535329&4294967295,_=T+(g<<22&4294967295|g>>>10),g=p+(T^A&(_^T))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[11]+643717713&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[0]+3921069994&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[15]+3634488961&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[4]+3889429448&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[3]+4107603335&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[8]+1163531501&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(T^A&(_^T))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^T&(p^_))+y[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=T+(p^_&(A^p))+y[7]+1735328473&4294967295,T=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(T^A))+y[12]+2368359562&4294967295,_=T+(g<<20&4294967295|g>>>12),g=p+(_^T^A)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[11]+1839030562&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[14]+4259657740&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[7]+4139469664&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[10]+3200236656&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[3]+3572445317&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[6]+76029189&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(_^T^A)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^T)+y[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=T+(A^p^_)+y[15]+530742520&4294967295,T=A+(g<<16&4294967295|g>>>16),g=_+(T^A^p)+y[2]+3299628645&4294967295,_=T+(g<<23&4294967295|g>>>9),g=p+(T^(_|~A))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[14]+2878612391&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[5]+4237533241&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[10]+4293915773&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[1]+2240044497&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[6]+2734768916&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[13]+1309151649&4294967295,_=T+(g<<21&4294967295|g>>>11),g=p+(T^(_|~A))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~T))+y[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=T+(p^(A|~_))+y[2]+718787259&4294967295,T=A+(g<<15&4294967295|g>>>17),g=_+(A^(T|~p))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}n.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var _=p-this.blockSize,y=this.B,T=this.h,A=0;A<p;){if(T==0)for(;A<=_;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<p;)if(y[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,y),T=0;break}}else for(;A<p;)if(y[T++]=E[A++],T==this.blockSize){i(this,y),T=0;break}}this.h=T,this.o+=p},n.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var _=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=_&255,_/=256;for(this.u(E),E=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)E[_++]=this.g[p]>>>y&255;return E};function o(E,p){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function u(E,p){this.h=p;for(var _=[],y=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;y&&A==p||(_[T]=A,y=!1)}this.g=_}var c={};function h(E){return-128<=E&&128>E?o(E,function(p){return new u([p|0],0>p?-1:0)}):new u([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return I;if(0>E)return N(f(-E));for(var p=[],_=1,y=0;E>=_;y++)p[y]=E/_|0,_*=4294967296;return new u(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return N(m(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=I,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),g=parseInt(E.substring(T,T+A),p);8>A?(A=f(Math.pow(p,A)),y=y.j(A).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var I=h(0),w=h(1),S=h(16777216);r=u.prototype,r.m=function(){if(x(this))return-N(this).m();for(var E=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);E+=(0<=y?y:4294967296+y)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(x(this))return"-"+N(this).toString(E);for(var p=f(Math.pow(E,6)),_=this,y="";;){var T=rt(_,p).g;_=z(_,T.j(p));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=T,b(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},r.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=z(this,E),x(E)?-1:b(E)?0:1};function N(E){for(var p=E.g.length,_=[],y=0;y<p;y++)_[y]=~E.g[y];return new u(_,~E.h).add(w)}r.abs=function(){return x(this)?N(this):this},r.add=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0,T=0;T<=p;T++){var A=y+(this.i(T)&65535)+(E.i(T)&65535),g=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);y=g>>>16,A&=65535,g&=65535,_[T]=g<<16|A}return new u(_,_[_.length-1]&-2147483648?-1:0)};function z(E,p){return E.add(N(p))}r.j=function(E){if(b(this)||b(E))return I;if(x(this))return x(E)?N(this).j(N(E)):N(N(this).j(E));if(x(E))return N(this.j(N(E)));if(0>this.l(S)&&0>E.l(S))return f(this.m()*E.m());for(var p=this.g.length+E.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var T=0;T<E.g.length;T++){var A=this.i(y)>>>16,g=this.i(y)&65535,xt=E.i(T)>>>16,Be=E.i(T)&65535;_[2*y+2*T]+=g*Be,G(_,2*y+2*T),_[2*y+2*T+1]+=A*Be,G(_,2*y+2*T+1),_[2*y+2*T+1]+=g*xt,G(_,2*y+2*T+1),_[2*y+2*T+2]+=A*xt,G(_,2*y+2*T+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new u(_,0)};function G(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function K(E,p){this.g=E,this.h=p}function rt(E,p){if(b(p))throw Error("division by zero");if(b(E))return new K(I,I);if(x(E))return p=rt(N(E),p),new K(N(p.g),N(p.h));if(x(p))return p=rt(E,N(p)),new K(N(p.g),p.h);if(30<E.g.length){if(x(E)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var _=w,y=p;0>=y.l(E);)_=kt(_),y=kt(y);var T=it(_,1),A=it(y,1);for(y=it(y,2),_=it(_,2);!b(y);){var g=A.add(y);0>=g.l(E)&&(T=T.add(_),A=g),y=it(y,1),_=it(_,1)}return p=z(E,T.j(p)),new K(T,p)}for(T=I;0<=E.l(p);){for(_=Math.max(1,Math.floor(E.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=f(_),g=A.j(p);x(g)||0<g.l(E);)_-=y,A=f(_),g=A.j(p);b(A)&&(A=w),T=T.add(A),E=z(E,g)}return new K(T,E)}r.A=function(E){return rt(this,E).h},r.and=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&E.i(y);return new u(_,this.h&E.h)},r.or=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|E.i(y);return new u(_,this.h|E.h)},r.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^E.i(y);return new u(_,this.h^E.h)};function kt(E){for(var p=E.g.length+1,_=[],y=0;y<p;y++)_[y]=E.i(y)<<1|E.i(y-1)>>>31;return new u(_,E.h)}function it(E,p){var _=p>>5;p%=32;for(var y=E.g.length-_,T=[],A=0;A<y;A++)T[A]=0<p?E.i(A+_)>>>p|E.i(A+_+1)<<32-p:E.i(A+_);return new u(T,E.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,da=n,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=f,u.fromString=m,Qt=u}).apply(typeof fo<"u"?fo:typeof self<"u"?self:typeof window<"u"?window:{});var zn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fa,sn,ma,Wn,as,pa,ga,_a;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof zn=="object"&&zn];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var n=e(this);function i(s,a){if(a)t:{var l=n;s=s.split(".");for(var d=0;d<s.length-1;d++){var v=s[d];if(!(v in l))break t;l=l[v]}s=s[s.length-1],d=l[s],a=a(d),a!=d&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,d=!1,v={next:function(){if(!d&&l<s.length){var R=l++;return{value:a(R,s[R]),done:!1}}return d=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},c=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function f(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function m(s,a,l){return s.call.apply(s.bind,arguments)}function I(s,a,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,d),s.apply(a,v)}}return function(){return s.apply(a,arguments)}}function w(s,a,l){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:I,w.apply(null,arguments)}function S(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function b(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,v,R){for(var C=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)C[Q-2]=arguments[Q];return a.prototype[v].apply(d,C)}}function x(s){const a=s.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=s[d];return l}return[]}function N(s,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const v=s.length||0,R=d.length||0;s.length=v+R;for(let C=0;C<R;C++)s[v+C]=d[C]}else s.push(d)}}class z{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function G(s){return/^[\s\xa0]*$/.test(s)}function K(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function rt(s){return rt[" "](s),s}rt[" "]=function(){};var kt=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function it(s,a,l){for(const d in s)a.call(l,s[d],d,s)}function E(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function p(s){const a={};for(const l in s)a[l]=s[l];return a}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(l in d)s[l]=d[l];for(let R=0;R<_.length;R++)l=_[R],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function T(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function A(s){c.setTimeout(()=>{throw s},0)}function g(){var s=br;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class xt{constructor(){this.h=this.g=null}add(a,l){const d=Be.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Be=new z(()=>new Qu,s=>s.reset());class Qu{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let je,ze=!1,br=new xt,hi=()=>{const s=c.Promise.resolve(void 0);je=()=>{s.then(Wu)}};var Wu=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){A(l)}var a=Be;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}ze=!1};function jt(){this.s=this.s,this.C=this.C}jt.prototype.s=!1,jt.prototype.ma=function(){this.s||(this.s=!0,this.N())},jt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ct(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}ct.prototype.h=function(){this.defaultPrevented=!0};var Hu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};c.addEventListener("test",l,a),c.removeEventListener("test",l,a)}catch{}return s}();function $e(s,a){if(ct.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(kt){t:{try{rt(a.nodeName);var v=!0;break t}catch{}v=!1}v||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Yu[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&$e.aa.h.call(this)}}b($e,ct);var Yu={2:"touch",3:"pen",4:"mouse"};$e.prototype.h=function(){$e.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var wn="closure_listenable_"+(1e6*Math.random()|0),Xu=0;function Ju(s,a,l,d,v){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=v,this.key=++Xu,this.da=this.fa=!1}function Rn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Pn(s){this.src=s,this.g={},this.h=0}Pn.prototype.add=function(s,a,l,d,v){var R=s.toString();s=this.g[R],s||(s=this.g[R]=[],this.h++);var C=xr(s,a,d,v);return-1<C?(a=s[C],l||(a.fa=!1)):(a=new Ju(a,this.src,R,!!d,v),a.fa=l,s.push(a)),a};function kr(s,a){var l=a.type;if(l in s.g){var d=s.g[l],v=Array.prototype.indexOf.call(d,a,void 0),R;(R=0<=v)&&Array.prototype.splice.call(d,v,1),R&&(Rn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function xr(s,a,l,d){for(var v=0;v<s.length;++v){var R=s[v];if(!R.da&&R.listener==a&&R.capture==!!l&&R.ha==d)return v}return-1}var Mr="closure_lm_"+(1e6*Math.random()|0),Or={};function di(s,a,l,d,v){if(Array.isArray(a)){for(var R=0;R<a.length;R++)di(s,a[R],l,d,v);return null}return l=pi(l),s&&s[wn]?s.K(a,l,f(d)?!!d.capture:!1,v):Zu(s,a,l,!1,d,v)}function Zu(s,a,l,d,v,R){if(!a)throw Error("Invalid event type");var C=f(v)?!!v.capture:!!v,Q=Fr(s);if(Q||(s[Mr]=Q=new Pn(s)),l=Q.add(a,l,d,C,R),l.proxy)return l;if(d=tl(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)Hu||(v=C),v===void 0&&(v=!1),s.addEventListener(a.toString(),d,v);else if(s.attachEvent)s.attachEvent(mi(a.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function tl(){function s(l){return a.call(s.src,s.listener,l)}const a=el;return s}function fi(s,a,l,d,v){if(Array.isArray(a))for(var R=0;R<a.length;R++)fi(s,a[R],l,d,v);else d=f(d)?!!d.capture:!!d,l=pi(l),s&&s[wn]?(s=s.i,a=String(a).toString(),a in s.g&&(R=s.g[a],l=xr(R,l,d,v),-1<l&&(Rn(R[l]),Array.prototype.splice.call(R,l,1),R.length==0&&(delete s.g[a],s.h--)))):s&&(s=Fr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=xr(a,l,d,v)),(l=-1<s?a[s]:null)&&Lr(l))}function Lr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[wn])kr(a.i,s);else{var l=s.type,d=s.proxy;a.removeEventListener?a.removeEventListener(l,d,s.capture):a.detachEvent?a.detachEvent(mi(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=Fr(a))?(kr(l,s),l.h==0&&(l.src=null,a[Mr]=null)):Rn(s)}}}function mi(s){return s in Or?Or[s]:Or[s]="on"+s}function el(s,a){if(s.da)s=!0;else{a=new $e(a,this);var l=s.listener,d=s.ha||s.src;s.fa&&Lr(s),s=l.call(d,a)}return s}function Fr(s){return s=s[Mr],s instanceof Pn?s:null}var Ur="__closure_events_fn_"+(1e9*Math.random()>>>0);function pi(s){return typeof s=="function"?s:(s[Ur]||(s[Ur]=function(a){return s.handleEvent(a)}),s[Ur])}function ht(){jt.call(this),this.i=new Pn(this),this.M=this,this.F=null}b(ht,jt),ht.prototype[wn]=!0,ht.prototype.removeEventListener=function(s,a,l,d){fi(this,s,a,l,d)};function _t(s,a){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=a.type||a,typeof a=="string")a=new ct(a,s);else if(a instanceof ct)a.target=a.target||s;else{var v=a;a=new ct(d,s),y(a,v)}if(v=!0,l)for(var R=l.length-1;0<=R;R--){var C=a.g=l[R];v=Vn(C,d,!0,a)&&v}if(C=a.g=s,v=Vn(C,d,!0,a)&&v,v=Vn(C,d,!1,a)&&v,l)for(R=0;R<l.length;R++)C=a.g=l[R],v=Vn(C,d,!1,a)&&v}ht.prototype.N=function(){if(ht.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],d=0;d<l.length;d++)Rn(l[d]);delete s.g[a],s.h--}}this.F=null},ht.prototype.K=function(s,a,l,d){return this.i.add(String(s),a,!1,l,d)},ht.prototype.L=function(s,a,l,d){return this.i.add(String(s),a,!0,l,d)};function Vn(s,a,l,d){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var v=!0,R=0;R<a.length;++R){var C=a[R];if(C&&!C.da&&C.capture==l){var Q=C.listener,ot=C.ha||C.src;C.fa&&kr(s.i,C),v=Q.call(ot,d)!==!1&&v}}return v&&!d.defaultPrevented}function gi(s,a,l){if(typeof s=="function")l&&(s=w(s,l));else if(s&&typeof s.handleEvent=="function")s=w(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(s,a||0)}function _i(s){s.g=gi(()=>{s.g=null,s.i&&(s.i=!1,_i(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class nl extends jt{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:_i(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ge(s){jt.call(this),this.h=s,this.g={}}b(Ge,jt);var yi=[];function Ti(s){it(s.g,function(a,l){this.g.hasOwnProperty(l)&&Lr(a)},s),s.g={}}Ge.prototype.N=function(){Ge.aa.N.call(this),Ti(this)},Ge.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qr=c.JSON.stringify,rl=c.JSON.parse,sl=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Br(){}Br.prototype.h=null;function Ei(s){return s.h||(s.h=s.i())}function vi(){}var Ke={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function jr(){ct.call(this,"d")}b(jr,ct);function zr(){ct.call(this,"c")}b(zr,ct);var se={},Ii=null;function Sn(){return Ii=Ii||new ht}se.La="serverreachability";function Ai(s){ct.call(this,se.La,s)}b(Ai,ct);function Qe(s){const a=Sn();_t(a,new Ai(a))}se.STAT_EVENT="statevent";function wi(s,a){ct.call(this,se.STAT_EVENT,s),this.stat=a}b(wi,ct);function yt(s){const a=Sn();_t(a,new wi(a,s))}se.Ma="timingevent";function Ri(s,a){ct.call(this,se.Ma,s),this.size=a}b(Ri,ct);function We(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},a)}function He(){this.g=!0}He.prototype.xa=function(){this.g=!1};function il(s,a,l,d,v,R){s.info(function(){if(s.g)if(R)for(var C="",Q=R.split("&"),ot=0;ot<Q.length;ot++){var j=Q[ot].split("=");if(1<j.length){var dt=j[0];j=j[1];var ft=dt.split("_");C=2<=ft.length&&ft[1]=="type"?C+(dt+"="+j+"&"):C+(dt+"=redacted&")}}else C=null;else C=R;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+a+`
`+l+`
`+C})}function ol(s,a,l,d,v,R,C){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+a+`
`+l+`
`+R+" "+C})}function pe(s,a,l,d){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+ul(s,l)+(d?" "+d:"")})}function al(s,a){s.info(function(){return"TIMEOUT: "+a})}He.prototype.info=function(){};function ul(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var v=d[1];if(Array.isArray(v)&&!(1>v.length)){var R=v[0];if(R!="noop"&&R!="stop"&&R!="close")for(var C=1;C<v.length;C++)v[C]=""}}}}return qr(l)}catch{return a}}var Cn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},$r;function Dn(){}b(Dn,Br),Dn.prototype.g=function(){return new XMLHttpRequest},Dn.prototype.i=function(){return{}},$r=new Dn;function zt(s,a,l,d){this.j=s,this.i=a,this.l=l,this.R=d||1,this.U=new Ge(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vi}function Vi(){this.i=null,this.g="",this.h=!1}var Si={},Gr={};function Kr(s,a,l){s.L=1,s.v=xn(Mt(a)),s.m=l,s.P=!0,Ci(s,null)}function Ci(s,a){s.F=Date.now(),Nn(s),s.A=Mt(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),zi(l.i,"t",d),s.C=0,l=s.j.J,s.h=new Vi,s.g=ao(s.j,l?a:null,!s.m),0<s.O&&(s.M=new nl(w(s.Y,s,s.g),s.O)),a=s.U,l=s.g,d=s.ca;var v="readystatechange";Array.isArray(v)||(v&&(yi[0]=v.toString()),v=yi);for(var R=0;R<v.length;R++){var C=di(l,v[R],d||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),Qe(),il(s.i,s.u,s.A,s.l,s.R,s.m)}zt.prototype.ca=function(s){s=s.target;const a=this.M;a&&Ot(s)==3?a.j():this.Y(s)},zt.prototype.Y=function(s){try{if(s==this.g)t:{const ft=Ot(this.g);var a=this.g.Ba();const ye=this.g.Z();if(!(3>ft)&&(ft!=3||this.g&&(this.h.h||this.g.oa()||Yi(this.g)))){this.J||ft!=4||a==7||(a==8||0>=ye?Qe(3):Qe(2)),Qr(this);var l=this.g.Z();this.X=l;e:if(Di(this)){var d=Yi(this.g);s="";var v=d.length,R=Ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ie(this),Ye(this);var C="";break e}this.h.i=new c.TextDecoder}for(a=0;a<v;a++)this.h.h=!0,s+=this.h.i.decode(d[a],{stream:!(R&&a==v-1)});d.length=0,this.h.g+=s,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=l==200,ol(this.i,this.u,this.A,this.l,this.R,ft,l),this.o){if(this.T&&!this.K){e:{if(this.g){var Q,ot=this.g;if((Q=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(Q)){var j=Q;break e}}j=null}if(l=j)pe(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Wr(this,l);else{this.o=!1,this.s=3,yt(12),ie(this),Ye(this);break t}}if(this.P){l=!0;let Vt;for(;!this.J&&this.C<C.length;)if(Vt=ll(this,C),Vt==Gr){ft==4&&(this.s=4,yt(14),l=!1),pe(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==Si){this.s=4,yt(15),pe(this.i,this.l,C,"[Invalid Chunk]"),l=!1;break}else pe(this.i,this.l,Vt,null),Wr(this,Vt);if(Di(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ft!=4||C.length!=0||this.h.h||(this.s=1,yt(16),l=!1),this.o=this.o&&l,!l)pe(this.i,this.l,C,"[Invalid Chunked Response]"),ie(this),Ye(this);else if(0<C.length&&!this.W){this.W=!0;var dt=this.j;dt.g==this&&dt.ba&&!dt.M&&(dt.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),ts(dt),dt.M=!0,yt(11))}}else pe(this.i,this.l,C,null),Wr(this,C);ft==4&&ie(this),this.o&&!this.J&&(ft==4?ro(this.j,this):(this.o=!1,Nn(this)))}else Pl(this.g),l==400&&0<C.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),ie(this),Ye(this)}}}catch{}finally{}};function Di(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ll(s,a){var l=s.C,d=a.indexOf(`
`,l);return d==-1?Gr:(l=Number(a.substring(l,d)),isNaN(l)?Si:(d+=1,d+l>a.length?Gr:(a=a.slice(d,d+l),s.C=d+l,a)))}zt.prototype.cancel=function(){this.J=!0,ie(this)};function Nn(s){s.S=Date.now()+s.I,Ni(s,s.I)}function Ni(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=We(w(s.ba,s),a)}function Qr(s){s.B&&(c.clearTimeout(s.B),s.B=null)}zt.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(al(this.i,this.A),this.L!=2&&(Qe(),yt(17)),ie(this),this.s=2,Ye(this)):Ni(this,this.S-s)};function Ye(s){s.j.G==0||s.J||ro(s.j,s)}function ie(s){Qr(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,Ti(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function Wr(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||Hr(l.h,s))){if(!s.K&&Hr(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)qn(l),Fn(l);else break t;Zr(l),yt(18)}}else l.za=v[1],0<l.za-l.T&&37500>v[2]&&l.F&&l.v==0&&!l.C&&(l.C=We(w(l.Za,l),6e3));if(1>=xi(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else ae(l,11)}else if((s.K||l.g==s)&&qn(l),!G(a))for(v=l.Da.g.parse(a),a=0;a<v.length;a++){let j=v[a];if(l.T=j[0],j=j[1],l.G==2)if(j[0]=="c"){l.K=j[1],l.ia=j[2];const dt=j[3];dt!=null&&(l.la=dt,l.j.info("VER="+l.la));const ft=j[4];ft!=null&&(l.Aa=ft,l.j.info("SVER="+l.Aa));const ye=j[5];ye!=null&&typeof ye=="number"&&0<ye&&(d=1.5*ye,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const Vt=s.g;if(Vt){const jn=Vt.g?Vt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(jn){var R=d.h;R.g||jn.indexOf("spdy")==-1&&jn.indexOf("quic")==-1&&jn.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Yr(R,R.h),R.h=null))}if(d.D){const es=Vt.g?Vt.g.getResponseHeader("X-HTTP-Session-Id"):null;es&&(d.ya=es,H(d.I,d.D,es))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var C=s;if(d.qa=oo(d,d.J?d.ia:null,d.W),C.K){Mi(d.h,C);var Q=C,ot=d.L;ot&&(Q.I=ot),Q.B&&(Qr(Q),Nn(Q)),d.g=C}else eo(d);0<l.i.length&&Un(l)}else j[0]!="stop"&&j[0]!="close"||ae(l,7);else l.G==3&&(j[0]=="stop"||j[0]=="close"?j[0]=="stop"?ae(l,7):Jr(l):j[0]!="noop"&&l.l&&l.l.ta(j),l.v=0)}}Qe(4)}catch{}}var cl=class{constructor(s,a){this.g=s,this.map=a}};function bi(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ki(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function xi(s){return s.h?1:s.g?s.g.size:0}function Hr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Yr(s,a){s.g?s.g.add(a):s.h=a}function Mi(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}bi.prototype.cancel=function(){if(this.i=Oi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Oi(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return x(s.i)}function hl(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],l=s.length,d=0;d<l;d++)a.push(s[d]);return a}a=[],l=0;for(d in s)a[l++]=s[d];return a}function dl(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const d in s)a[l++]=d;return a}}}function Li(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=dl(s),d=hl(s),v=d.length,R=0;R<v;R++)a.call(void 0,d[R],l&&l[R],s)}var Fi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function fl(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),v=null;if(0<=d){var R=s[l].substring(0,d);v=s[l].substring(d+1)}else R=s[l];a(R,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function oe(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof oe){this.h=s.h,bn(this,s.j),this.o=s.o,this.g=s.g,kn(this,s.s),this.l=s.l;var a=s.i,l=new Ze;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),Ui(this,l),this.m=s.m}else s&&(a=String(s).match(Fi))?(this.h=!1,bn(this,a[1]||"",!0),this.o=Xe(a[2]||""),this.g=Xe(a[3]||"",!0),kn(this,a[4]),this.l=Xe(a[5]||"",!0),Ui(this,a[6]||"",!0),this.m=Xe(a[7]||"")):(this.h=!1,this.i=new Ze(null,this.h))}oe.prototype.toString=function(){var s=[],a=this.j;a&&s.push(Je(a,qi,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Je(a,qi,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Je(l,l.charAt(0)=="/"?gl:pl,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Je(l,yl)),s.join("")};function Mt(s){return new oe(s)}function bn(s,a,l){s.j=l?Xe(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function kn(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function Ui(s,a,l){a instanceof Ze?(s.i=a,Tl(s.i,s.h)):(l||(a=Je(a,_l)),s.i=new Ze(a,s.h))}function H(s,a,l){s.i.set(a,l)}function xn(s){return H(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Xe(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Je(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,ml),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function ml(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var qi=/[#\/\?@]/g,pl=/[#\?:]/g,gl=/[#\?]/g,_l=/[#\?@]/g,yl=/#/g;function Ze(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function $t(s){s.g||(s.g=new Map,s.h=0,s.i&&fl(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}r=Ze.prototype,r.add=function(s,a){$t(this),this.i=null,s=ge(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function Bi(s,a){$t(s),a=ge(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function ji(s,a){return $t(s),a=ge(s,a),s.g.has(a)}r.forEach=function(s,a){$t(this),this.g.forEach(function(l,d){l.forEach(function(v){s.call(a,v,d,this)},this)},this)},r.na=function(){$t(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const v=s[d];for(let R=0;R<v.length;R++)l.push(a[d])}return l},r.V=function(s){$t(this);let a=[];if(typeof s=="string")ji(this,s)&&(a=a.concat(this.g.get(ge(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},r.set=function(s,a){return $t(this),this.i=null,s=ge(this,s),ji(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},r.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function zi(s,a,l){Bi(s,a),0<l.length&&(s.i=null,s.g.set(ge(s,a),x(l)),s.h+=l.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const R=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var v=R;C[d]!==""&&(v+="="+encodeURIComponent(String(C[d]))),s.push(v)}}return this.i=s.join("&")};function ge(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function Tl(s,a){a&&!s.j&&($t(s),s.i=null,s.g.forEach(function(l,d){var v=d.toLowerCase();d!=v&&(Bi(this,d),zi(this,v,l))},s)),s.j=a}function El(s,a){const l=new He;if(c.Image){const d=new Image;d.onload=S(Gt,l,"TestLoadImage: loaded",!0,a,d),d.onerror=S(Gt,l,"TestLoadImage: error",!1,a,d),d.onabort=S(Gt,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=S(Gt,l,"TestLoadImage: timeout",!1,a,d),c.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else a(!1)}function vl(s,a){const l=new He,d=new AbortController,v=setTimeout(()=>{d.abort(),Gt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:d.signal}).then(R=>{clearTimeout(v),R.ok?Gt(l,"TestPingServer: ok",!0,a):Gt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(v),Gt(l,"TestPingServer: error",!1,a)})}function Gt(s,a,l,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(l)}catch{}}function Il(){this.g=new sl}function Al(s,a,l){const d=l||"";try{Li(s,function(v,R){let C=v;f(v)&&(C=qr(v)),a.push(d+R+"="+encodeURIComponent(C))})}catch(v){throw a.push(d+"type="+encodeURIComponent("_badmap")),v}}function Mn(s){this.l=s.Ub||null,this.j=s.eb||!1}b(Mn,Br),Mn.prototype.g=function(){return new On(this.l,this.j)},Mn.prototype.i=function(s){return function(){return s}}({});function On(s,a){ht.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(On,ht),r=On.prototype,r.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,en(this)},r.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,tn(this)),this.readyState=0},r.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,en(this)),this.g&&(this.readyState=3,en(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$i(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function $i(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}r.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?tn(this):en(this),this.readyState==3&&$i(this)}},r.Ra=function(s){this.g&&(this.response=this.responseText=s,tn(this))},r.Qa=function(s){this.g&&(this.response=s,tn(this))},r.ga=function(){this.g&&tn(this)};function tn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,en(s)}r.setRequestHeader=function(s,a){this.u.append(s,a)},r.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function en(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(On.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Gi(s){let a="";return it(s,function(l,d){a+=d,a+=":",a+=l,a+=`\r
`}),a}function Xr(s,a,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=Gi(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):H(s,a,l))}function X(s){ht.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(X,ht);var wl=/^https?$/i,Rl=["POST","PUT"];r=X.prototype,r.Ha=function(s){this.J=s},r.ea=function(s,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():$r.g(),this.v=this.o?Ei(this.o):Ei($r),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(R){Ki(this,R);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)l.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())l.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),v=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Rl,a,void 0))||d||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,C]of l)this.g.setRequestHeader(R,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Hi(this),this.u=!0,this.g.send(s),this.u=!1}catch(R){Ki(this,R)}};function Ki(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,Qi(s),Ln(s)}function Qi(s){s.A||(s.A=!0,_t(s,"complete"),_t(s,"error"))}r.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,_t(this,"complete"),_t(this,"abort"),Ln(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ln(this,!0)),X.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Wi(this):this.bb())},r.bb=function(){Wi(this)};function Wi(s){if(s.h&&typeof u<"u"&&(!s.v[1]||Ot(s)!=4||s.Z()!=2)){if(s.u&&Ot(s)==4)gi(s.Ea,0,s);else if(_t(s,"readystatechange"),Ot(s)==4){s.h=!1;try{const C=s.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var d;if(d=C===0){var v=String(s.D).match(Fi)[1]||null;!v&&c.self&&c.self.location&&(v=c.self.location.protocol.slice(0,-1)),d=!wl.test(v?v.toLowerCase():"")}l=d}if(l)_t(s,"complete"),_t(s,"success");else{s.m=6;try{var R=2<Ot(s)?s.g.statusText:""}catch{R=""}s.l=R+" ["+s.Z()+"]",Qi(s)}}finally{Ln(s)}}}}function Ln(s,a){if(s.g){Hi(s);const l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||_t(s,"ready");try{l.onreadystatechange=d}catch{}}}function Hi(s){s.I&&(c.clearTimeout(s.I),s.I=null)}r.isActive=function(){return!!this.g};function Ot(s){return s.g?s.g.readyState:0}r.Z=function(){try{return 2<Ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),rl(a)}};function Yi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Pl(s){const a={};s=(s.g&&2<=Ot(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(G(s[d]))continue;var l=T(s[d]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=a[v]||[];a[v]=R,R.push(l)}E(a,function(d){return d.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function nn(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function Xi(s){this.Aa=0,this.i=[],this.j=new He,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=nn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=nn("baseRetryDelayMs",5e3,s),this.cb=nn("retryDelaySeedMs",1e4,s),this.Wa=nn("forwardChannelMaxRetries",2,s),this.wa=nn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new bi(s&&s.concurrentRequestLimit),this.Da=new Il,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Xi.prototype,r.la=8,r.G=1,r.connect=function(s,a,l,d){yt(0),this.W=s,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=oo(this,null,this.W),Un(this)};function Jr(s){if(Ji(s),s.G==3){var a=s.U++,l=Mt(s.I);if(H(l,"SID",s.K),H(l,"RID",a),H(l,"TYPE","terminate"),rn(s,l),a=new zt(s,s.j,a),a.L=2,a.v=xn(Mt(l)),l=!1,c.navigator&&c.navigator.sendBeacon)try{l=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&c.Image&&(new Image().src=a.v,l=!0),l||(a.g=ao(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Nn(a)}io(s)}function Fn(s){s.g&&(ts(s),s.g.cancel(),s.g=null)}function Ji(s){Fn(s),s.u&&(c.clearTimeout(s.u),s.u=null),qn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function Un(s){if(!ki(s.h)&&!s.s){s.s=!0;var a=s.Ga;je||hi(),ze||(je(),ze=!0),br.add(a,s),s.B=0}}function Vl(s,a){return xi(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=We(w(s.Ga,s,a),so(s,s.B)),s.B++,!0)}r.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const v=new zt(this,this.j,s);let R=this.o;if(this.S&&(R?(R=p(R),y(R,this.S)):R=this.S),this.m!==null||this.O||(v.H=R,R=null),this.P)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=to(this,v,a),l=Mt(this.I),H(l,"RID",s),H(l,"CVER",22),this.D&&H(l,"X-HTTP-Session-Id",this.D),rn(this,l),R&&(this.O?a="headers="+encodeURIComponent(String(Gi(R)))+"&"+a:this.m&&Xr(l,this.m,R)),Yr(this.h,v),this.Ua&&H(l,"TYPE","init"),this.P?(H(l,"$req",a),H(l,"SID","null"),v.T=!0,Kr(v,l,null)):Kr(v,l,a),this.G=2}}else this.G==3&&(s?Zi(this,s):this.i.length==0||ki(this.h)||Zi(this))};function Zi(s,a){var l;a?l=a.l:l=s.U++;const d=Mt(s.I);H(d,"SID",s.K),H(d,"RID",l),H(d,"AID",s.T),rn(s,d),s.m&&s.o&&Xr(d,s.m,s.o),l=new zt(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=to(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Yr(s.h,l),Kr(l,d,a)}function rn(s,a){s.H&&it(s.H,function(l,d){H(a,d,l)}),s.l&&Li({},function(l,d){H(a,d,l)})}function to(s,a,l){l=Math.min(s.i.length,l);var d=s.l?w(s.l.Na,s.l,s):null;t:{var v=s.i;let R=-1;for(;;){const C=["count="+l];R==-1?0<l?(R=v[0].g,C.push("ofs="+R)):R=0:C.push("ofs="+R);let Q=!0;for(let ot=0;ot<l;ot++){let j=v[ot].g;const dt=v[ot].map;if(j-=R,0>j)R=Math.max(0,v[ot].g-100),Q=!1;else try{Al(dt,C,"req"+j+"_")}catch{d&&d(dt)}}if(Q){d=C.join("&");break t}}}return s=s.i.splice(0,l),a.D=s,d}function eo(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;je||hi(),ze||(je(),ze=!0),br.add(a,s),s.v=0}}function Zr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=We(w(s.Fa,s),so(s,s.v)),s.v++,!0)}r.Fa=function(){if(this.u=null,no(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=We(w(this.ab,this),s)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),Fn(this),no(this))};function ts(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function no(s){s.g=new zt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Mt(s.qa);H(a,"RID","rpc"),H(a,"SID",s.K),H(a,"AID",s.T),H(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&H(a,"TO",s.ja),H(a,"TYPE","xmlhttp"),rn(s,a),s.m&&s.o&&Xr(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=xn(Mt(a)),l.m=null,l.P=!0,Ci(l,s)}r.Za=function(){this.C!=null&&(this.C=null,Fn(this),Zr(this),yt(19))};function qn(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function ro(s,a){var l=null;if(s.g==a){qn(s),ts(s),s.g=null;var d=2}else if(Hr(s.h,a))l=a.D,Mi(s.h,a),d=1;else return;if(s.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var v=s.B;d=Sn(),_t(d,new Ri(d,l)),Un(s)}else eo(s);else if(v=a.s,v==3||v==0&&0<a.X||!(d==1&&Vl(s,a)||d==2&&Zr(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),v){case 1:ae(s,5);break;case 4:ae(s,10);break;case 3:ae(s,6);break;default:ae(s,2)}}}function so(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function ae(s,a){if(s.j.info("Error code "+a),a==2){var l=w(s.fb,s),d=s.Xa;const v=!d;d=new oe(d||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||bn(d,"https"),xn(d),v?El(d.toString(),l):vl(d.toString(),l)}else yt(2);s.G=0,s.l&&s.l.sa(a),io(s),Ji(s)}r.fb=function(s){s?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function io(s){if(s.G=0,s.ka=[],s.l){const a=Oi(s.h);(a.length!=0||s.i.length!=0)&&(N(s.ka,a),N(s.ka,s.i),s.h.i.length=0,x(s.i),s.i.length=0),s.l.ra()}}function oo(s,a,l){var d=l instanceof oe?Mt(l):new oe(l);if(d.g!="")a&&(d.g=a+"."+d.g),kn(d,d.s);else{var v=c.location;d=v.protocol,a=a?a+"."+v.hostname:v.hostname,v=+v.port;var R=new oe(null);d&&bn(R,d),a&&(R.g=a),v&&kn(R,v),l&&(R.l=l),d=R}return l=s.D,a=s.ya,l&&a&&H(d,l,a),H(d,"VER",s.la),rn(s,d),d}function ao(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new X(new Mn({eb:l})):new X(s.pa),a.Ha(s.J),a}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function uo(){}r=uo.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Bn(){}Bn.prototype.g=function(s,a){return new At(s,a)};function At(s,a){ht.call(this),this.g=new Xi(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!G(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!G(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new _e(this)}b(At,ht),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Jr(this.g)},At.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=qr(s),s=l);a.i.push(new cl(a.Ya++,s)),a.G==3&&Un(a)},At.prototype.N=function(){this.g.l=null,delete this.j,Jr(this.g),delete this.g,At.aa.N.call(this)};function lo(s){jr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}b(lo,jr);function co(){zr.call(this),this.status=1}b(co,zr);function _e(s){this.g=s}b(_e,uo),_e.prototype.ua=function(){_t(this.g,"a")},_e.prototype.ta=function(s){_t(this.g,new lo(s))},_e.prototype.sa=function(s){_t(this.g,new co)},_e.prototype.ra=function(){_t(this.g,"b")},Bn.prototype.createWebChannel=Bn.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,_a=function(){return new Bn},ga=function(){return Sn()},pa=se,as={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Cn.NO_ERROR=0,Cn.TIMEOUT=8,Cn.HTTP_ERROR=6,Wn=Cn,Pi.COMPLETE="complete",ma=Pi,vi.EventType=Ke,Ke.OPEN="a",Ke.CLOSE="b",Ke.ERROR="c",Ke.MESSAGE="d",ht.prototype.listen=ht.prototype.K,sn=vi,X.prototype.listenOnce=X.prototype.L,X.prototype.getLastError=X.prototype.Ka,X.prototype.getLastErrorCode=X.prototype.Ba,X.prototype.getStatus=X.prototype.Z,X.prototype.getResponseJson=X.prototype.Oa,X.prototype.getResponseText=X.prototype.oa,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Ha,fa=X}).apply(typeof zn<"u"?zn:typeof self<"u"?self:typeof window<"u"?window:{});const mo="@firebase/firestore",po="4.7.11";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pt.UNAUTHENTICATED=new pt(null),pt.GOOGLE_CREDENTIALS=new pt("google-credentials-uid"),pt.FIRST_PARTY=new pt("first-party-uid"),pt.MOCK_USER=new pt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Me="11.6.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le=new Sl("@firebase/firestore");function Te(){return le.logLevel}function k(r,...t){if(le.logLevel<=Lt.DEBUG){const e=t.map(Rs);le.debug(`Firestore (${Me}): ${r}`,...e)}}function Ut(r,...t){if(le.logLevel<=Lt.ERROR){const e=t.map(Rs);le.error(`Firestore (${Me}): ${r}`,...e)}}function Re(r,...t){if(le.logLevel<=Lt.WARN){const e=t.map(Rs);le.warn(`Firestore (${Me}): ${r}`,...e)}}function Rs(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,ya(r,n,e)}function ya(r,t,e){let n=`FIRESTORE (${Me}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw Ut(n),new Error(n)}function $(r,t,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,r||ya(t,i,n)}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends bl{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class ql{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(pt.UNAUTHENTICATED))}shutdown(){}}class Bl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class jl{constructor(t){this.t=t,this.currentUser=pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){$(this.o===void 0,42304);let n=this.i;const i=h=>this.i!==n?(n=this.i,e(h)):Promise.resolve();let o=new Ft;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ft,t.enqueueRetryable(()=>i(this.currentUser))};const u=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},c=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ft)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?($(typeof n.accessToken=="string",31837,{l:n}),new Ta(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return $(t===null||typeof t=="string",2055,{h:t}),new pt(t)}}class zl{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=pt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class $l{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new zl(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class go{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Gl{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Nl(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){$(this.o===void 0,3512);const n=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.m;return this.m=o.token,k("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>n(o))};const i=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new go(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?($(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new go(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=Kl(40);for(let o=0;o<i.length;++o)n.length<20&&i[o]<e&&(n+=t.charAt(i[o]%62))}return n}}function U(r,t){return r<t?-1:r>t?1:0}function us(r,t){let e=0;for(;e<r.length&&e<t.length;){const n=r.codePointAt(e),i=t.codePointAt(e);if(n!==i){if(n<128&&i<128)return U(n,i);{const o=Ea(),u=Ql(o.encode(_o(r,e)),o.encode(_o(t,e)));return u!==0?u:U(n,i)}}e+=n>65535?2:1}return U(r.length,t.length)}function _o(r,t){return r.codePointAt(t)>65535?r.substring(t,t+2):r.substring(t,t+1)}function Ql(r,t){for(let e=0;e<r.length&&e<t.length;++e)if(r[e]!==t[e])return U(r[e],t[e]);return U(r.length,t.length)}function Pe(r,t,e){return r.length===t.length&&r.every((n,i)=>e(n,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=-62135596800,To=1e6;class et{static now(){return et.fromMillis(Date.now())}static fromDate(t){return et.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*To);return new et(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<yo)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/To}_compareTo(t){return this.seconds===t.seconds?U(this.nanoseconds,t.nanoseconds):U(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-yo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new et(0,0))}static max(){return new L(new et(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo="__name__";class Ct{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ct.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ct?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let i=0;i<n;i++){const o=Ct.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return U(t.length,e.length)}static compareSegments(t,e){const n=Ct.isNumericId(t),i=Ct.isNumericId(e);return n&&!i?-1:!n&&i?1:n&&i?Ct.extractNumericId(t).compare(Ct.extractNumericId(e)):us(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Qt.fromString(t.substring(4,t.length-2))}}class W extends Ct{construct(t,e,n){return new W(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(i=>i.length>0))}return new W(e)}static emptyPath(){return new W([])}}const Wl=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends Ct{construct(t,e,n){return new ut(t,e,n)}static isValidIdentifier(t){return Wl.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Eo}static keyField(){return new ut([Eo])}static fromServerFormat(t){const e=[];let n="",i=0;const o=()=>{if(n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let u=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=h,i+=2}else c==="`"?(u=!u,i++):c!=="."||u?(n+=c,i++):(o(),i++)}if(o(),u)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ut(e)}static emptyPath(){return new ut([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(W.fromString(t))}static fromName(t){return new M(W.fromString(t).popFirst(5))}static empty(){return new M(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&W.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return W.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new W(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn=-1;function Hl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=L.fromTimestamp(n===1e9?new et(e+1,0):new et(e,n));return new Ht(i,M.empty(),t)}function Yl(r){return new Ht(r.readTime,r.key,dn)}class Ht{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ht(L.min(),M.empty(),dn)}static max(){return new Ht(L.max(),M.empty(),dn)}}function Xl(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:U(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oe(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Jl)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V((n,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(n,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(n,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):V.reject(e)}static resolve(t){return new V((e,n)=>{e(t)})}static reject(t){return new V((e,n)=>{n(t)})}static waitFor(t){return new V((e,n)=>{let i=0,o=0,u=!1;t.forEach(c=>{++i,c.next(()=>{++o,u&&o===i&&e()},h=>n(h))}),u=!0,o===i&&e()})}static or(t){let e=V.resolve(!1);for(const n of t)e=e.next(i=>i?V.resolve(i):n());return e}static forEach(t,e){const n=[];return t.forEach((i,o)=>{n.push(e.call(this,i,o))}),this.waitFor(n)}static mapArray(t,e){return new V((n,i)=>{const o=t.length,u=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{u[f]=m,++c,c===o&&n(u)},m=>i(m))}})}static doWhile(t,e){return new V((n,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):n()};o()})}}function tc(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Le(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ue(n),this.ce=n=>e.writeSequenceNumber(n))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}hr.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps=-1;function dr(r){return r==null}function tr(r){return r===0&&1/r==-1/0}function ec(r){return typeof r=="number"&&Number.isInteger(r)&&!tr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="";function nc(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=vo(t)),t=rc(r.get(e),t);return vo(t)}function rc(r,t){let e=t;const n=r.length;for(let i=0;i<n;i++){const o=r.charAt(i);switch(o){case"\0":e+="";break;case Ia:e+="";break;default:e+=o}}return e}function vo(r){return r+Ia+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function ee(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Aa(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e){this.comparator=t,this.root=e||at.EMPTY}insert(t,e){return new Y(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,at.BLACK,null,null))}remove(t){return new Y(this.comparator,this.root.remove(t,this.comparator).copy(null,null,at.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(t,n.key);if(i===0)return e+n.left.size;i<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new $n(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new $n(this.root,t,this.comparator,!1)}getReverseIterator(){return new $n(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new $n(this.root,t,this.comparator,!0)}}class $n{constructor(t,e,n,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?n(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class at{constructor(t,e,n,i,o){this.key=t,this.value=e,this.color=n??at.RED,this.left=i??at.EMPTY,this.right=o??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,i,o){return new at(t??this.key,e??this.value,n??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let i=this;const o=n(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,n),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return at.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,i,o){return this}insert(t,e,n){return new at(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(t){this.comparator=t,this.data=new Y(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ao(this.data.getIterator())}getIteratorFrom(t){return new Ao(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof nt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new nt(this.comparator);return e.data=t,e}}class Ao{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.fields=t,t.sort(ut.comparator)}static empty(){return new wt([])}unionWith(t){let e=new nt(ut.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Pe(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new wa("Invalid base64 string: "+o):o}}(t);return new lt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let i=0;i<e.length;i++)n[i]=e.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return U(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const sc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yt(r){if($(!!r,39018),typeof r=="string"){let t=0;const e=sc.exec(r);if($(!!e,46558,{timestamp:r}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:J(r.seconds),nanos:J(r.nanos)}}function J(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Xt(r){return typeof r=="string"?lt.fromBase64String(r):lt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="server_timestamp",Pa="__type__",Va="__previous_value__",Sa="__local_write_time__";function fr(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[Pa])===null||e===void 0?void 0:e.stringValue)===Ra}function mr(r){const t=r.mapValue.fields[Va];return fr(t)?mr(t):t}function fn(r){const t=Yt(r.mapValue.fields[Sa].timestampValue);return new et(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(t,e,n,i,o,u,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f}}const er="(default)";class mn{constructor(t,e){this.projectId=t,this.database=e||er}static empty(){return new mn("","")}get isDefaultDatabase(){return this.database===er}isEqual(t){return t instanceof mn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca="__type__",oc="__max__",Gn={mapValue:{}},Da="__vector__",nr="value";function Jt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?fr(r)?4:uc(r)?9007199254740991:ac(r)?10:11:O(28295,{value:r})}function bt(r,t){if(r===t)return!0;const e=Jt(r);if(e!==Jt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return fn(r).isEqual(fn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Yt(i.timestampValue),c=Yt(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(i,o){return Xt(i.bytesValue).isEqual(Xt(o.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(i,o){return J(i.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(i.geoPointValue.longitude)===J(o.geoPointValue.longitude)}(r,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return J(i.integerValue)===J(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=J(i.doubleValue),c=J(o.doubleValue);return u===c?tr(u)===tr(c):isNaN(u)&&isNaN(c)}return!1}(r,t);case 9:return Pe(r.arrayValue.values||[],t.arrayValue.values||[],bt);case 10:case 11:return function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(Io(u)!==Io(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!bt(u[h],c[h])))return!1;return!0}(r,t);default:return O(52216,{left:r})}}function pn(r,t){return(r.values||[]).find(e=>bt(e,t))!==void 0}function Ve(r,t){if(r===t)return 0;const e=Jt(r),n=Jt(t);if(e!==n)return U(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return U(r.booleanValue,t.booleanValue);case 2:return function(o,u){const c=J(o.integerValue||o.doubleValue),h=J(u.integerValue||u.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(r,t);case 3:return wo(r.timestampValue,t.timestampValue);case 4:return wo(fn(r),fn(t));case 5:return us(r.stringValue,t.stringValue);case 6:return function(o,u){const c=Xt(o),h=Xt(u);return c.compareTo(h)}(r.bytesValue,t.bytesValue);case 7:return function(o,u){const c=o.split("/"),h=u.split("/");for(let f=0;f<c.length&&f<h.length;f++){const m=U(c[f],h[f]);if(m!==0)return m}return U(c.length,h.length)}(r.referenceValue,t.referenceValue);case 8:return function(o,u){const c=U(J(o.latitude),J(u.latitude));return c!==0?c:U(J(o.longitude),J(u.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Ro(r.arrayValue,t.arrayValue);case 10:return function(o,u){var c,h,f,m;const I=o.fields||{},w=u.fields||{},S=(c=I[nr])===null||c===void 0?void 0:c.arrayValue,b=(h=w[nr])===null||h===void 0?void 0:h.arrayValue,x=U(((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0,((m=b==null?void 0:b.values)===null||m===void 0?void 0:m.length)||0);return x!==0?x:Ro(S,b)}(r.mapValue,t.mapValue);case 11:return function(o,u){if(o===Gn.mapValue&&u===Gn.mapValue)return 0;if(o===Gn.mapValue)return 1;if(u===Gn.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=u.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let I=0;I<h.length&&I<m.length;++I){const w=us(h[I],m[I]);if(w!==0)return w;const S=Ve(c[h[I]],f[m[I]]);if(S!==0)return S}return U(h.length,m.length)}(r.mapValue,t.mapValue);default:throw O(23264,{Pe:e})}}function wo(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return U(r,t);const e=Yt(r),n=Yt(t),i=U(e.seconds,n.seconds);return i!==0?i:U(e.nanos,n.nanos)}function Ro(r,t){const e=r.values||[],n=t.values||[];for(let i=0;i<e.length&&i<n.length;++i){const o=Ve(e[i],n[i]);if(o)return o}return U(e.length,n.length)}function Se(r){return ls(r)}function ls(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=Yt(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return Xt(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",i=!0;for(const o of e.values||[])i?i=!1:n+=",",n+=ls(o);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of n)o?o=!1:i+=",",i+=`${u}:${ls(e.fields[u])}`;return i+"}"}(r.mapValue):O(61005,{value:r})}function Hn(r){switch(Jt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=mr(r);return t?16+Hn(t):16;case 5:return 2*r.stringValue.length;case 6:return Xt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,o)=>i+Hn(o),0)}(r.arrayValue);case 10:case 11:return function(n){let i=0;return ee(n.fields,(o,u)=>{i+=o.length+Hn(u)}),i}(r.mapValue);default:throw O(13486,{value:r})}}function rr(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function cs(r){return!!r&&"integerValue"in r}function Vs(r){return!!r&&"arrayValue"in r}function Po(r){return!!r&&"nullValue"in r}function Vo(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Yn(r){return!!r&&"mapValue"in r}function ac(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[Ca])===null||e===void 0?void 0:e.stringValue)===Da}function ln(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return ee(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=ln(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ln(r.arrayValue.values[e]);return t}return Object.assign({},r)}function uc(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===oc}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(t){this.value=t}static empty(){return new It({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Yn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ln(e)}setAll(t){let e=ut.emptyPath(),n={},i=[];t.forEach((u,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,n,i),n={},i=[],e=c.popLast()}u?n[c.lastSegment()]=ln(u):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,n,i)}delete(t){const e=this.field(t.popLast());Yn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return bt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let i=e.mapValue.fields[t.get(n)];Yn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,n){ee(e,(i,o)=>t[i]=o);for(const i of n)delete t[i]}clone(){return new It(ln(this.value))}}function Na(r){const t=[];return ee(r.fields,(e,n)=>{const i=new ut([e]);if(Yn(n)){const o=Na(n.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)}),new wt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t,e,n,i,o,u,c){this.key=t,this.documentType=e,this.version=n,this.readTime=i,this.createTime=o,this.data=u,this.documentState=c}static newInvalidDocument(t){return new gt(t,0,L.min(),L.min(),L.min(),It.empty(),0)}static newFoundDocument(t,e,n,i){return new gt(t,1,e,L.min(),n,i,0)}static newNoDocument(t,e){return new gt(t,2,e,L.min(),L.min(),It.empty(),0)}static newUnknownDocument(t,e){return new gt(t,3,e,L.min(),L.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof gt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new gt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(t,e){this.position=t,this.inclusive=e}}function So(r,t,e){let n=0;for(let i=0;i<r.position.length;i++){const o=t[i],u=r.position[i];if(o.field.isKeyField()?n=M.comparator(M.fromName(u.referenceValue),e.key):n=Ve(u,e.data.field(o.field)),o.dir==="desc"&&(n*=-1),n!==0)break}return n}function Co(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!bt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(t,e="asc"){this.field=t,this.dir=e}}function lc(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{}class tt extends ba{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new hc(t,e,n):e==="array-contains"?new mc(t,n):e==="in"?new pc(t,n):e==="not-in"?new gc(t,n):e==="array-contains-any"?new _c(t,n):new tt(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new dc(t,n):new fc(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ve(e,this.value)):e!==null&&Jt(this.value)===Jt(e)&&this.matchesComparison(Ve(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class St extends ba{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new St(t,e)}matches(t){return ka(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function ka(r){return r.op==="and"}function xa(r){return cc(r)&&ka(r)}function cc(r){for(const t of r.filters)if(t instanceof St)return!1;return!0}function hs(r){if(r instanceof tt)return r.field.canonicalString()+r.op.toString()+Se(r.value);if(xa(r))return r.filters.map(t=>hs(t)).join(",");{const t=r.filters.map(e=>hs(e)).join(",");return`${r.op}(${t})`}}function Ma(r,t){return r instanceof tt?function(n,i){return i instanceof tt&&n.op===i.op&&n.field.isEqual(i.field)&&bt(n.value,i.value)}(r,t):r instanceof St?function(n,i){return i instanceof St&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((o,u,c)=>o&&Ma(u,i.filters[c]),!0):!1}(r,t):void O(19439)}function Oa(r){return r instanceof tt?function(e){return`${e.field.canonicalString()} ${e.op} ${Se(e.value)}`}(r):r instanceof St?function(e){return e.op.toString()+" {"+e.getFilters().map(Oa).join(" ,")+"}"}(r):"Filter"}class hc extends tt{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class dc extends tt{constructor(t,e){super(t,"in",e),this.keys=La("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class fc extends tt{constructor(t,e){super(t,"not-in",e),this.keys=La("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function La(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class mc extends tt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Vs(e)&&pn(e.arrayValue,this.value)}}class pc extends tt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&pn(this.value.arrayValue,e)}}class gc extends tt{constructor(t,e){super(t,"not-in",e)}matches(t){if(pn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!pn(this.value.arrayValue,e)}}class _c extends tt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Vs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>pn(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(t,e=null,n=[],i=[],o=null,u=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=i,this.limit=o,this.startAt=u,this.endAt=c,this.Ie=null}}function Do(r,t=null,e=[],n=[],i=null,o=null,u=null){return new yc(r,t,e,n,i,o,u)}function Ss(r){const t=F(r);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>hs(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(o){return o.field.canonicalString()+o.dir}(n)).join(","),dr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Se(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Se(n)).join(",")),t.Ie=e}return t.Ie}function Cs(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!lc(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Ma(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Co(r.startAt,t.startAt)&&Co(r.endAt,t.endAt)}function ds(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t,e=null,n=[],i=[],o=null,u="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=i,this.limit=o,this.limitType=u,this.startAt=c,this.endAt=h,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function Tc(r,t,e,n,i,o,u,c){return new he(r,t,e,n,i,o,u,c)}function Ds(r){return new he(r)}function No(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Ns(r){return r.collectionGroup!==null}function Ae(r){const t=F(r);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let c=new nt(ut.comparator);return u.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new gn(o,n))}),e.has(ut.keyField().canonicalString())||t.Ee.push(new gn(ut.keyField(),n))}return t.Ee}function Dt(r){const t=F(r);return t.de||(t.de=Ec(t,Ae(r))),t.de}function Ec(r,t){if(r.limitType==="F")return Do(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new gn(i.field,o)});const e=r.endAt?new Ce(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Ce(r.startAt.position,r.startAt.inclusive):null;return Do(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function fs(r,t){const e=r.filters.concat([t]);return new he(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function sr(r,t,e){return new he(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function pr(r,t){return Cs(Dt(r),Dt(t))&&r.limitType===t.limitType}function Fa(r){return`${Ss(Dt(r))}|lt:${r.limitType}`}function Ee(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(i=>Oa(i)).join(", ")}]`),dr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(i=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(i)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>Se(i)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>Se(i)).join(",")),`Target(${n})`}(Dt(r))}; limitType=${r.limitType})`}function gr(r,t){return t.isFoundDocument()&&function(n,i){const o=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):M.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(r,t)&&function(n,i){for(const o of Ae(n))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(r,t)&&function(n,i){for(const o of n.filters)if(!o.matches(i))return!1;return!0}(r,t)&&function(n,i){return!(n.startAt&&!function(u,c,h){const f=So(u,c,h);return u.inclusive?f<=0:f<0}(n.startAt,Ae(n),i)||n.endAt&&!function(u,c,h){const f=So(u,c,h);return u.inclusive?f>=0:f>0}(n.endAt,Ae(n),i))}(r,t)}function vc(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Ua(r){return(t,e)=>{let n=!1;for(const i of Ae(r)){const o=Ic(i,t,e);if(o!==0)return o;n=n||i.field.isKeyField()}return 0}}function Ic(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(o,u,c){const h=u.data.field(o),f=c.data.field(o);return h!==null&&f!==null?Ve(h,f):O(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[i,o]of n)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),i=this.inner[n];if(i===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],t))return n.length===1?delete this.inner[e]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(t){ee(this.inner,(e,n)=>{for(const[i,o]of n)t(i,o)})}isEmpty(){return Aa(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=new Y(M.comparator);function qt(){return Ac}const qa=new Y(M.comparator);function on(...r){let t=qa;for(const e of r)t=t.insert(e.key,e);return t}function Ba(r){let t=qa;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ue(){return cn()}function ja(){return cn()}function cn(){return new de(r=>r.toString(),(r,t)=>r.isEqual(t))}const wc=new Y(M.comparator),Rc=new nt(M.comparator);function q(...r){let t=Rc;for(const e of r)t=t.add(e);return t}const Pc=new nt(U);function Vc(){return Pc}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:tr(t)?"-0":t}}function za(r){return{integerValue:""+r}}function Sc(r,t){return ec(t)?za(t):bs(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(){this._=void 0}}function Cc(r,t,e){return r instanceof _n?function(i,o){const u={fields:{[Pa]:{stringValue:Ra},[Sa]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&fr(o)&&(o=mr(o)),o&&(u.fields[Va]=o),{mapValue:u}}(e,t):r instanceof De?Ga(r,t):r instanceof Ne?Ka(r,t):function(i,o){const u=$a(i,o),c=bo(u)+bo(i.Re);return cs(u)&&cs(i.Re)?za(c):bs(i.serializer,c)}(r,t)}function Dc(r,t,e){return r instanceof De?Ga(r,t):r instanceof Ne?Ka(r,t):e}function $a(r,t){return r instanceof ir?function(n){return cs(n)||function(o){return!!o&&"doubleValue"in o}(n)}(t)?t:{integerValue:0}:null}class _n extends _r{}class De extends _r{constructor(t){super(),this.elements=t}}function Ga(r,t){const e=Qa(t);for(const n of r.elements)e.some(i=>bt(i,n))||e.push(n);return{arrayValue:{values:e}}}class Ne extends _r{constructor(t){super(),this.elements=t}}function Ka(r,t){let e=Qa(t);for(const n of r.elements)e=e.filter(i=>!bt(i,n));return{arrayValue:{values:e}}}class ir extends _r{constructor(t,e){super(),this.serializer=t,this.Re=e}}function bo(r){return J(r.integerValue||r.doubleValue)}function Qa(r){return Vs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(t,e){this.field=t,this.transform=e}}function Nc(r,t){return r.field.isEqual(t.field)&&function(n,i){return n instanceof De&&i instanceof De||n instanceof Ne&&i instanceof Ne?Pe(n.elements,i.elements,bt):n instanceof ir&&i instanceof ir?bt(n.Re,i.Re):n instanceof _n&&i instanceof _n}(r.transform,t.transform)}class bc{constructor(t,e){this.version=t,this.transformResults=e}}class Tt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Tt}static exists(t){return new Tt(void 0,t)}static updateTime(t){return new Tt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Xn(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class yr{}function Wa(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Tr(r.key,Tt.none()):new yn(r.key,r.data,Tt.none());{const e=r.data,n=It.empty();let i=new nt(ut.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?n.delete(o):n.set(o,u),i=i.add(o)}return new ne(r.key,n,new wt(i.toArray()),Tt.none())}}function kc(r,t,e){r instanceof yn?function(i,o,u){const c=i.value.clone(),h=xo(i.fieldTransforms,o,u.transformResults);c.setAll(h),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()}(r,t,e):r instanceof ne?function(i,o,u){if(!Xn(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=xo(i.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(Ha(i)),h.setAll(c),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(r,t,e):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function hn(r,t,e,n){return r instanceof yn?function(o,u,c,h){if(!Xn(o.precondition,u))return c;const f=o.value.clone(),m=Mo(o.fieldTransforms,h,u);return f.setAll(m),u.convertToFoundDocument(u.version,f).setHasLocalMutations(),null}(r,t,e,n):r instanceof ne?function(o,u,c,h){if(!Xn(o.precondition,u))return c;const f=Mo(o.fieldTransforms,h,u),m=u.data;return m.setAll(Ha(o)),m.setAll(f),u.convertToFoundDocument(u.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(r,t,e,n):function(o,u,c){return Xn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):c}(r,t,e)}function xc(r,t){let e=null;for(const n of r.fieldTransforms){const i=t.data.field(n.field),o=$a(n.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(n.field,o))}return e||null}function ko(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Pe(n,i,(o,u)=>Nc(o,u))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class yn extends yr{constructor(t,e,n,i=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ne extends yr{constructor(t,e,n,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ha(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function xo(r,t,e){const n=new Map;$(r.length===e.length,32656,{Ve:e.length,me:r.length});for(let i=0;i<e.length;i++){const o=r[i],u=o.transform,c=t.data.field(o.field);n.set(o.field,Dc(u,c,e[i]))}return n}function Mo(r,t,e){const n=new Map;for(const i of r){const o=i.transform,u=e.data.field(i.field);n.set(i.field,Cc(o,u,t))}return n}class Tr extends yr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Mc extends yr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(t,e,n,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&kc(o,t,n[i])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=hn(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=ja();return this.mutations.forEach(i=>{const o=t.get(i.key),u=o.overlayedDocument;let c=this.applyToLocalView(u,o.mutatedFields);c=e.has(i.key)?null:c;const h=Wa(u,c);h!==null&&n.set(i.key,h),u.isValidDocument()||u.convertToNoDocument(L.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&Pe(this.mutations,t.mutations,(e,n)=>ko(e,n))&&Pe(this.baseMutations,t.baseMutations,(e,n)=>ko(e,n))}}class xs{constructor(t,e,n,i){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=i}static from(t,e,n){$(t.mutations.length===n.length,58842,{fe:t.mutations.length,ge:n.length});let i=function(){return wc}();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,n[u].version);return new xs(t,e,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z,B;function Uc(r){switch(r){case P.OK:return O(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function Ya(r){if(r===void 0)return Ut("GRPC error has no .code"),P.UNKNOWN;switch(r){case Z.OK:return P.OK;case Z.CANCELLED:return P.CANCELLED;case Z.UNKNOWN:return P.UNKNOWN;case Z.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Z.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Z.INTERNAL:return P.INTERNAL;case Z.UNAVAILABLE:return P.UNAVAILABLE;case Z.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Z.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Z.NOT_FOUND:return P.NOT_FOUND;case Z.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Z.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Z.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Z.ABORTED:return P.ABORTED;case Z.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Z.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Z.DATA_LOSS:return P.DATA_LOSS;default:return O(39323,{code:r})}}(B=Z||(Z={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=new Qt([4294967295,4294967295],0);function Oo(r){const t=Ea().encode(r),e=new da;return e.update(t),new Uint8Array(e.digest())}function Lo(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Qt([e,n],0),new Qt([i,o],0)]}class Ms{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new an(`Invalid padding: ${e}`);if(n<0)throw new an(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new an(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new an(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=Qt.fromNumber(this.pe)}we(t,e,n){let i=t.add(e.multiply(Qt.fromNumber(n)));return i.compare(qc)===1&&(i=new Qt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.pe===0)return!1;const e=Oo(t),[n,i]=Lo(e);for(let o=0;o<this.hashCount;o++){const u=this.we(n,i,o);if(!this.be(u))return!1}return!0}static create(t,e,n){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new Ms(o,i,e);return n.forEach(c=>u.insert(c)),u}insert(t){if(this.pe===0)return;const e=Oo(t),[n,i]=Lo(e);for(let o=0;o<this.hashCount;o++){const u=this.we(n,i,o);this.Se(u)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class an extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(t,e,n,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const i=new Map;return i.set(t,Tn.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Er(L.min(),i,new Y(U),qt(),q())}}class Tn{constructor(t,e,n,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Tn(n,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t,e,n,i){this.De=t,this.removedTargetIds=e,this.key=n,this.ve=i}}class Xa{constructor(t,e){this.targetId=t,this.Ce=e}}class Ja{constructor(t,e,n=lt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=i}}class Fo{constructor(){this.Fe=0,this.Me=Uo(),this.xe=lt.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=q(),e=q(),n=q();return this.Me.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:n=n.add(i);break;default:O(38017,{changeType:o})}}),new Tn(this.xe,this.Oe,t,e,n)}Qe(){this.Ne=!1,this.Me=Uo()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,$(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class Bc{constructor(t){this.ze=t,this.je=new Map,this.He=qt(),this.Je=Kn(),this.Ye=Kn(),this.Ze=new Y(U)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const n=this.rt(e);switch(t.state){case 0:this.it(e)&&n.ke(t.resumeToken);break;case 1:n.We(),n.Be||n.Qe(),n.ke(t.resumeToken);break;case 2:n.We(),n.Be||this.removeTarget(e);break;case 3:this.it(e)&&(n.Ge(),n.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),n.ke(t.resumeToken));break;default:O(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((n,i)=>{this.it(i)&&e(i)})}ot(t){const e=t.targetId,n=t.Ce.count,i=this._t(e);if(i){const o=i.target;if(ds(o))if(n===0){const u=new M(o.path);this.tt(e,u,gt.newNoDocument(u,L.min()))}else $(n===1,20013,{expectedCount:n});else{const u=this.ut(e);if(u!==n){const c=this.ct(t),h=c?this.lt(c,t,u):1;if(h!==0){this.st(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:o=0}=e;let u,c;try{u=Xt(n).toUint8Array()}catch(h){if(h instanceof wa)return Re("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Ms(u,i,o)}catch(h){return Re(h instanceof an?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.pe===0?null:c}lt(t,e,n){return e.Ce.count===n-this.Tt(t,e.targetId)?0:2}Tt(t,e){const n=this.ze.getRemoteKeysForTarget(e);let i=0;return n.forEach(o=>{const u=this.ze.Pt(),c=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.tt(e,o,null),i++)}),i}It(t){const e=new Map;this.je.forEach((o,u)=>{const c=this._t(u);if(c){if(o.current&&ds(c.target)){const h=new M(c.target.path);this.Et(h).has(u)||this.dt(u,h)||this.tt(u,h,gt.newNoDocument(h,t))}o.Le&&(e.set(u,o.qe()),o.Qe())}});let n=q();this.Ye.forEach((o,u)=>{let c=!0;u.forEachWhile(h=>{const f=this._t(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(o))}),this.He.forEach((o,u)=>u.setReadTime(t));const i=new Er(t,e,this.Ze,this.He,n);return this.He=qt(),this.Je=Kn(),this.Ye=Kn(),this.Ze=new Y(U),i}et(t,e){if(!this.it(t))return;const n=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,n),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,n){if(!this.it(t))return;const i=this.rt(t);this.dt(t,e)?i.$e(e,1):i.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),n&&(this.He=this.He.insert(e,n))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new Fo,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new nt(U),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new nt(U),this.Je=this.Je.insert(t,e)),e}it(t){const e=this._t(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new Fo),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Kn(){return new Y(M.comparator)}function Uo(){return new Y(M.comparator)}const jc={asc:"ASCENDING",desc:"DESCENDING"},zc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},$c={and:"AND",or:"OR"};class Gc{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ms(r,t){return r.useProto3Json||dr(t)?t:{value:t}}function or(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Za(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Kc(r,t){return or(r,t.toTimestamp())}function Nt(r){return $(!!r,49232),L.fromTimestamp(function(e){const n=Yt(e);return new et(n.seconds,n.nanos)}(r))}function Os(r,t){return ps(r,t).canonicalString()}function ps(r,t){const e=function(i){return new W(["projects",i.projectId,"databases",i.database])}(r).child("documents");return t===void 0?e:e.child(t)}function tu(r){const t=W.fromString(r);return $(iu(t),10190,{key:t.toString()}),t}function gs(r,t){return Os(r.databaseId,t.path)}function ns(r,t){const e=tu(t);if(e.get(1)!==r.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(nu(e))}function eu(r,t){return Os(r.databaseId,t)}function Qc(r){const t=tu(r);return t.length===4?W.emptyPath():nu(t)}function _s(r){return new W(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function nu(r){return $(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function qo(r,t,e){return{name:gs(r,t),fields:e.value.mapValue.fields}}function Wc(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:O(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?($(m===void 0||typeof m=="string",58123),lt.fromBase64String(m||"")):($(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),lt.fromUint8Array(m||new Uint8Array))}(r,t.targetChange.resumeToken),u=t.targetChange.cause,c=u&&function(f){const m=f.code===void 0?P.UNKNOWN:Ya(f.code);return new D(m,f.message||"")}(u);e=new Ja(n,i,o,c||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const i=ns(r,n.document.name),o=Nt(n.document.updateTime),u=n.document.createTime?Nt(n.document.createTime):L.min(),c=new It({mapValue:{fields:n.document.fields}}),h=gt.newFoundDocument(i,o,u,c),f=n.targetIds||[],m=n.removedTargetIds||[];e=new Jn(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const i=ns(r,n.document),o=n.readTime?Nt(n.readTime):L.min(),u=gt.newNoDocument(i,o),c=n.removedTargetIds||[];e=new Jn([],c,u.key,u)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const i=ns(r,n.document),o=n.removedTargetIds||[];e=new Jn([],o,i,null)}else{if(!("filter"in t))return O(11601,{Vt:t});{t.filter;const n=t.filter;n.targetId;const{count:i=0,unchangedNames:o}=n,u=new Fc(i,o),c=n.targetId;e=new Xa(c,u)}}return e}function Hc(r,t){let e;if(t instanceof yn)e={update:qo(r,t.key,t.value)};else if(t instanceof Tr)e={delete:gs(r,t.key)};else if(t instanceof ne)e={update:qo(r,t.key,t.data),updateMask:sh(t.fieldMask)};else{if(!(t instanceof Mc))return O(16599,{ft:t.type});e={verify:gs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(o,u){const c=u.transform;if(c instanceof _n)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof De)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ne)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ir)return{fieldPath:u.field.canonicalString(),increment:c.Re};throw O(20930,{transform:u.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Kc(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:O(27497)}(r,t.precondition)),e}function Yc(r,t){return r&&r.length>0?($(t!==void 0,14353),r.map(e=>function(i,o){let u=i.updateTime?Nt(i.updateTime):Nt(o);return u.isEqual(L.min())&&(u=Nt(o)),new bc(u,i.transformResults||[])}(e,t))):[]}function Xc(r,t){return{documents:[eu(r,t.path)]}}function Jc(r,t){const e={structuredQuery:{}},n=t.path;let i;t.collectionGroup!==null?(i=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=eu(r,i);const o=function(f){if(f.length!==0)return su(St.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(f){if(f.length!==0)return f.map(m=>function(w){return{field:ve(w.field),direction:eh(w.dir)}}(m))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const c=ms(r,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{gt:e,parent:i}}function Zc(r){let t=Qc(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let i=null;if(n>0){$(n===1,65062);const m=e.from[0];m.allDescendants?i=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(I){const w=ru(I);return w instanceof St&&xa(w)?w.getFilters():[w]}(e.where));let u=[];e.orderBy&&(u=function(I){return I.map(w=>function(b){return new gn(Ie(b.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(w))}(e.orderBy));let c=null;e.limit&&(c=function(I){let w;return w=typeof I=="object"?I.value:I,dr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(I){const w=!!I.before,S=I.values||[];return new Ce(S,w)}(e.startAt));let f=null;return e.endAt&&(f=function(I){const w=!I.before,S=I.values||[];return new Ce(S,w)}(e.endAt)),Tc(t,i,u,o,c,"F",h,f)}function th(r,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ru(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Ie(e.unaryFilter.field);return tt.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Ie(e.unaryFilter.field);return tt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ie(e.unaryFilter.field);return tt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=Ie(e.unaryFilter.field);return tt.create(u,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(r):r.fieldFilter!==void 0?function(e){return tt.create(Ie(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return St.create(e.compositeFilter.filters.map(n=>ru(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(r):O(30097,{filter:r})}function eh(r){return jc[r]}function nh(r){return zc[r]}function rh(r){return $c[r]}function ve(r){return{fieldPath:r.canonicalString()}}function Ie(r){return ut.fromServerFormat(r.fieldPath)}function su(r){return r instanceof tt?function(e){if(e.op==="=="){if(Vo(e.value))return{unaryFilter:{field:ve(e.field),op:"IS_NAN"}};if(Po(e.value))return{unaryFilter:{field:ve(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Vo(e.value))return{unaryFilter:{field:ve(e.field),op:"IS_NOT_NAN"}};if(Po(e.value))return{unaryFilter:{field:ve(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ve(e.field),op:nh(e.op),value:e.value}}}(r):r instanceof St?function(e){const n=e.getFilters().map(i=>su(i));return n.length===1?n[0]:{compositeFilter:{op:rh(e.op),filters:n}}}(r):O(54877,{filter:r})}function sh(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function iu(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,n,i,o=L.min(),u=L.min(),c=lt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new Kt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(t){this.wt=t}}function oh(r){const t=Zc({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?sr(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(){this.yn=new uh}addToCollectionParentIndex(t,e){return this.yn.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.yn.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(Ht.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(Ht.min())}updateCollectionGroup(t,e,n){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class uh{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e]||new nt(W.comparator),o=!i.has(n);return this.index[e]=i.add(n),o}has(t){const e=t.lastSegment(),n=t.popLast(),i=this.index[e];return i&&i.has(n)}getEntries(t){return(this.index[t]||new nt(W.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ou=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(ou,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(t){this.nr=t}next(){return this.nr+=2,this.nr}static rr(){return new be(0)}static ir(){return new be(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="LruGarbageCollector",lh=1048576;function zo([r,t],[e,n]){const i=U(r,e);return i===0?U(t,n):i}class ch{constructor(t){this.cr=t,this.buffer=new nt(zo),this.lr=0}hr(){return++this.lr}Pr(t){const e=[t,this.hr()];if(this.buffer.size<this.cr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();zo(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class hh{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ir(6e4)}stop(){this.Tr&&(this.Tr.cancel(),this.Tr=null)}get started(){return this.Tr!==null}Ir(t){k(jo,`Garbage collection scheduled in ${t}ms`),this.Tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Le(e)?k(jo,"Ignoring IndexedDB error during garbage collection: ",e):await Oe(e)}await this.Ir(3e5)})}}class dh{constructor(t,e){this.Er=t,this.params=e}calculateTargetCount(t,e){return this.Er.dr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return V.resolve(hr.le);const n=new ch(e);return this.Er.forEachTarget(t,i=>n.Pr(i.sequenceNumber)).next(()=>this.Er.Ar(t,i=>n.Pr(i))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Er.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Er.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(Bo)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Bo):this.Rr(t,e))}getCacheSize(t){return this.Er.getCacheSize(t)}Rr(t,e){let n,i,o,u,c,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),i=this.params.maximumSequenceNumbersToCollect):i=I,u=Date.now(),this.nthSequenceNumber(t,i))).next(I=>(n=I,c=Date.now(),this.removeTargets(t,n,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,n))).next(I=>(f=Date.now(),Te()<=Lt.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${u-m}ms
	Determined least recently used ${i} in `+(c-u)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${I} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:I})))}}function fh(r,t){return new dh(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(){this.changes=new de(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,gt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?V.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,n,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=i}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(n=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(n!==null&&hn(n.mutation,i,wt.empty(),et.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,q()).next(()=>n))}getLocalViewOfDocuments(t,e,n=q()){const i=ue();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,n).next(o=>{let u=on();return o.forEach((c,h)=>{u=u.insert(c,h.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const n=ue();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,q()))}populateOverlays(t,e,n){const i=[];return n.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((u,c)=>{e.set(u,c)})})}computeViews(t,e,n,i){let o=qt();const u=cn(),c=function(){return cn()}();return e.forEach((h,f)=>{const m=n.get(f.key);i.has(f.key)&&(m===void 0||m.mutation instanceof ne)?o=o.insert(f.key,f):m!==void 0?(u.set(f.key,m.mutation.getFieldMask()),hn(m.mutation,f,m.mutation.getFieldMask(),et.now())):u.set(f.key,wt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>u.set(f,m)),e.forEach((f,m)=>{var I;return c.set(f,new ph(m,(I=u.get(f))!==null&&I!==void 0?I:null))}),c))}recalculateAndSaveOverlays(t,e){const n=cn();let i=new Y((u,c)=>u-c),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const c of u)c.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=n.get(h)||wt.empty();m=c.applyToLocalView(f,m),n.set(h,m);const I=(i.get(c.batchId)||q()).add(h);i=i.insert(c.batchId,I)})}).next(()=>{const u=[],c=i.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,m=h.value,I=ja();m.forEach(w=>{if(!o.has(w)){const S=Wa(e.get(w),n.get(w));S!==null&&I.set(w,S),o=o.add(w)}}),u.push(this.documentOverlayCache.saveOverlays(t,f,I))}return V.waitFor(u)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,i){return function(u){return M.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ns(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,i):this.getDocumentsMatchingCollectionQuery(t,e,n,i)}getNextDocuments(t,e,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,i).next(o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,i-o.size):V.resolve(ue());let c=dn,h=o;return u.next(f=>V.forEach(f,(m,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),o.get(m)?V.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,q())).next(m=>({batchId:c,changes:Ba(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let i=on();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,n,i){const o=e.collectionGroup;let u=on();return this.indexManager.getCollectionParents(t,o).next(c=>V.forEach(c,h=>{const f=function(I,w){return new he(w,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,n,i).next(m=>{m.forEach((I,w)=>{u=u.insert(I,w)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,n,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,o,i))).next(u=>{o.forEach((h,f)=>{const m=f.getKey();u.get(m)===null&&(u=u.insert(m,gt.newInvalidDocument(m)))});let c=on();return u.forEach((h,f)=>{const m=o.get(h);m!==void 0&&hn(m.mutation,f,wt.empty(),et.now()),gr(e,f)&&(c=c.insert(h,f))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t){this.serializer=t,this.Fr=new Map,this.Mr=new Map}getBundleMetadata(t,e){return V.resolve(this.Fr.get(e))}saveBundleMetadata(t,e){return this.Fr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Nt(i.createTime)}}(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.Mr.get(e))}saveNamedQuery(t,e){return this.Mr.set(e.name,function(i){return{name:i.name,query:oh(i.bundledQuery),readTime:Nt(i.readTime)}}(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(){this.overlays=new Y(M.comparator),this.Or=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const n=ue();return V.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&n.set(i,o)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((i,o)=>{this.St(t,e,o)}),V.resolve()}removeOverlaysForBatchId(t,e,n){const i=this.Or.get(n);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Or.delete(n)),V.resolve()}getOverlaysForCollection(t,e,n){const i=ue(),o=e.length+1,u=new M(e.child("")),c=this.overlays.getIteratorFrom(u);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>n&&i.set(h.getKey(),h)}return V.resolve(i)}getOverlaysForCollectionGroup(t,e,n,i){let o=new Y((f,m)=>f-m);const u=this.overlays.getIterator();for(;u.hasNext();){const f=u.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>n){let m=o.get(f.largestBatchId);m===null&&(m=ue(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const c=ue(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>c.set(f,m)),!(c.size()>=i)););return V.resolve(c)}St(t,e,n){const i=this.overlays.get(n.key);if(i!==null){const u=this.Or.get(i.largestBatchId).delete(n.key);this.Or.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(n.key,new Lc(e,n));let o=this.Or.get(e);o===void 0&&(o=q(),this.Or.set(e,o)),this.Or.set(e,o.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(){this.Nr=new nt(st.Br),this.Lr=new nt(st.kr)}isEmpty(){return this.Nr.isEmpty()}addReference(t,e){const n=new st(t,e);this.Nr=this.Nr.add(n),this.Lr=this.Lr.add(n)}qr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Qr(new st(t,e))}$r(t,e){t.forEach(n=>this.removeReference(n,e))}Ur(t){const e=new M(new W([])),n=new st(e,t),i=new st(e,t+1),o=[];return this.Lr.forEachInRange([n,i],u=>{this.Qr(u),o.push(u.key)}),o}Kr(){this.Nr.forEach(t=>this.Qr(t))}Qr(t){this.Nr=this.Nr.delete(t),this.Lr=this.Lr.delete(t)}Wr(t){const e=new M(new W([])),n=new st(e,t),i=new st(e,t+1);let o=q();return this.Lr.forEachInRange([n,i],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new st(t,0),n=this.Nr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class st{constructor(t,e){this.key=t,this.Gr=e}static Br(t,e){return M.comparator(t.key,e.key)||U(t.Gr,e.Gr)}static kr(t,e){return U(t.Gr,e.Gr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Jn=1,this.zr=new nt(st.Br)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,i){const o=this.Jn;this.Jn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new Oc(o,e,n,i);this.mutationQueue.push(u);for(const c of i)this.zr=this.zr.add(new st(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return V.resolve(u)}lookupMutationBatch(t,e){return V.resolve(this.jr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,i=this.Hr(n),o=i<0?0:i;return V.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?Ps:this.Jn-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new st(e,0),i=new st(e,Number.POSITIVE_INFINITY),o=[];return this.zr.forEachInRange([n,i],u=>{const c=this.jr(u.Gr);o.push(c)}),V.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new nt(U);return e.forEach(i=>{const o=new st(i,0),u=new st(i,Number.POSITIVE_INFINITY);this.zr.forEachInRange([o,u],c=>{n=n.add(c.Gr)})}),V.resolve(this.Jr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,i=n.length+1;let o=n;M.isDocumentKey(o)||(o=o.child(""));const u=new st(new M(o),0);let c=new nt(U);return this.zr.forEachWhile(h=>{const f=h.key.path;return!!n.isPrefixOf(f)&&(f.length===i&&(c=c.add(h.Gr)),!0)},u),V.resolve(this.Jr(c))}Jr(t){const e=[];return t.forEach(n=>{const i=this.jr(n);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){$(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.zr;return V.forEach(e.mutations,i=>{const o=new st(i.key,e.batchId);return n=n.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.zr=n})}Xn(t){}containsKey(t,e){const n=new st(e,0),i=this.zr.firstAfterOrEqual(n);return V.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}Yr(t,e){return this.Hr(t)}Hr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}jr(t){const e=this.Hr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(t){this.Zr=t,this.docs=function(){return new Y(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,i=this.docs.get(n),o=i?i.size:0,u=this.Zr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return V.resolve(n?n.document.mutableCopy():gt.newInvalidDocument(e))}getEntries(t,e){let n=qt();return e.forEach(i=>{const o=this.docs.get(i);n=n.insert(i,o?o.document.mutableCopy():gt.newInvalidDocument(i))}),V.resolve(n)}getDocumentsMatchingQuery(t,e,n,i){let o=qt();const u=e.path,c=new M(u.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!u.isPrefixOf(f.path))break;f.path.length>u.length+1||Xl(Yl(m),n)<=0||(i.has(m.key)||gr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return V.resolve(o)}getAllFromCollectionGroup(t,e,n,i){O(9500)}Xr(t,e){return V.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Ih(this)}getSize(t){return V.resolve(this.size)}}class Ih extends mh{constructor(t){super(),this.vr=t}applyChanges(t){const e=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?e.push(this.vr.addEntry(t,i)):this.vr.removeEntry(n)}),V.waitFor(e)}getFromCache(t,e){return this.vr.getEntry(t,e)}getAllFromCache(t,e){return this.vr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t){this.persistence=t,this.ei=new de(e=>Ss(e),Cs),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ti=0,this.ni=new Ls,this.targetCount=0,this.ri=be.rr()}forEachTarget(t,e){return this.ei.forEach((n,i)=>e(i)),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.ti)}allocateTargetId(t){return this.highestTargetId=this.ri.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ti&&(this.ti=e),V.resolve()}ar(t){this.ei.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ri=new be(e),this.highestTargetId=e),t.sequenceNumber>this.ti&&(this.ti=t.sequenceNumber)}addTargetData(t,e){return this.ar(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.ar(e),V.resolve()}removeTargetData(t,e){return this.ei.delete(e.target),this.ni.Ur(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,n){let i=0;const o=[];return this.ei.forEach((u,c)=>{c.sequenceNumber<=e&&n.get(c.targetId)===null&&(this.ei.delete(u),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),V.waitFor(o).next(()=>i)}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const n=this.ei.get(e)||null;return V.resolve(n)}addMatchingKeys(t,e,n){return this.ni.qr(e,n),V.resolve()}removeMatchingKeys(t,e,n){this.ni.$r(e,n);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(u=>{o.push(i.markPotentiallyOrphaned(t,u))}),V.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ni.Ur(e),V.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ni.Wr(e);return V.resolve(n)}containsKey(t,e){return V.resolve(this.ni.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(t,e){this.ii={},this.overlays={},this.si=new hr(0),this.oi=!1,this.oi=!0,this._i=new Th,this.referenceDelegate=t(this),this.ai=new Ah(this),this.indexManager=new ah,this.remoteDocumentCache=function(i){return new vh(i)}(n=>this.referenceDelegate.ui(n)),this.serializer=new ih(e),this.ci=new _h(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.oi=!1,Promise.resolve()}get started(){return this.oi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new yh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ii[t.toKey()];return n||(n=new Eh(e,this.referenceDelegate),this.ii[t.toKey()]=n),n}getGlobalsCache(){return this._i}getTargetCache(){return this.ai}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.ci}runTransaction(t,e,n){k("MemoryPersistence","Starting transaction:",t);const i=new wh(this.si.next());return this.referenceDelegate.li(),n(i).next(o=>this.referenceDelegate.hi(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Pi(t,e){return V.or(Object.values(this.ii).map(n=>()=>n.containsKey(t,e)))}}class wh extends Zl{constructor(t){super(),this.currentSequenceNumber=t}}class Fs{constructor(t){this.persistence=t,this.Ti=new Ls,this.Ii=null}static Ei(t){return new Fs(t)}get di(){if(this.Ii)return this.Ii;throw O(60996)}addReference(t,e,n){return this.Ti.addReference(n,e),this.di.delete(n.toString()),V.resolve()}removeReference(t,e,n){return this.Ti.removeReference(n,e),this.di.add(n.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),V.resolve()}removeTarget(t,e){this.Ti.Ur(e.targetId).forEach(i=>this.di.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.di.add(o.toString()))}).next(()=>n.removeTargetData(t,e))}li(){this.Ii=new Set}hi(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.di,n=>{const i=M.fromPath(n);return this.Ai(t,i).next(o=>{o||e.removeEntry(i,L.min())})}).next(()=>(this.Ii=null,e.apply(t)))}updateLimboDocument(t,e){return this.Ai(t,e).next(n=>{n?this.di.delete(e.toString()):this.di.add(e.toString())})}ui(t){return 0}Ai(t,e){return V.or([()=>V.resolve(this.Ti.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Pi(t,e)])}}class ar{constructor(t,e){this.persistence=t,this.Ri=new de(n=>nc(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=fh(this,e)}static Ei(t,e){return new ar(t,e)}li(){}hi(t){return V.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.Vr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(i=>n+i))}Vr(t){let e=0;return this.Ar(t,n=>{e++}).next(()=>e)}Ar(t,e){return V.forEach(this.Ri,(n,i)=>this.gr(t,n,i).next(o=>o?V.resolve():e(i)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.Xr(t,u=>this.gr(t,u,e).next(c=>{c||(n++,o.removeEntry(u,L.min()))})).next(()=>o.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.Ri.set(e,t.currentSequenceNumber),V.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),V.resolve()}removeReference(t,e,n){return this.Ri.set(n,t.currentSequenceNumber),V.resolve()}updateLimboDocument(t,e){return this.Ri.set(e,t.currentSequenceNumber),V.resolve()}ui(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Hn(t.data.value)),e}gr(t,e,n){return V.or([()=>this.persistence.Pi(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.Ri.get(e);return V.resolve(i!==void 0&&i>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(t,e,n,i){this.targetId=t,this.fromCache=e,this.ls=n,this.hs=i}static Ps(t,e){let n=q(),i=q();for(const o of e.docChanges)switch(o.type){case 0:n=n.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Us(t,e.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(){this.Ts=!1,this.Is=!1,this.Es=100,this.ds=function(){return Ll()?8:tc(Fl())>0?6:4}()}initialize(t,e){this.As=t,this.indexManager=e,this.Ts=!0}getDocumentsMatchingQuery(t,e,n,i){const o={result:null};return this.Rs(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.Vs(t,e,i,n).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new Rh;return this.fs(t,e,u).next(c=>{if(o.result=c,this.Is)return this.gs(t,e,u,c.size)})}).next(()=>o.result)}gs(t,e,n,i){return n.documentReadCount<this.Es?(Te()<=Lt.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Ee(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Es,"documents"),V.resolve()):(Te()<=Lt.DEBUG&&k("QueryEngine","Query:",Ee(e),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.ds*i?(Te()<=Lt.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Ee(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):V.resolve())}Rs(t,e){if(No(e))return V.resolve(null);let n=Dt(e);return this.indexManager.getIndexType(t,n).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=sr(e,null,"F"),n=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(o=>{const u=q(...o);return this.As.getDocuments(t,u).next(c=>this.indexManager.getMinOffset(t,n).next(h=>{const f=this.ps(e,c);return this.ys(e,f,u,h.readTime)?this.Rs(t,sr(e,null,"F")):this.ws(t,f,e,h)}))})))}Vs(t,e,n,i){return No(e)||i.isEqual(L.min())?V.resolve(null):this.As.getDocuments(t,n).next(o=>{const u=this.ps(e,o);return this.ys(e,u,n,i)?V.resolve(null):(Te()<=Lt.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ee(e)),this.ws(t,u,e,Hl(i,dn)).next(c=>c))})}ps(t,e){let n=new nt(Ua(t));return e.forEach((i,o)=>{gr(t,o)&&(n=n.add(o))}),n}ys(t,e,n,i){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}fs(t,e,n){return Te()<=Lt.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Ee(e)),this.As.getDocumentsMatchingQuery(t,e,Ht.min(),n)}ws(t,e,n,i){return this.As.getDocumentsMatchingQuery(t,n,i).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="LocalStore",Vh=3e8;class Sh{constructor(t,e,n,i){this.persistence=t,this.bs=e,this.serializer=i,this.Ss=new Y(U),this.Ds=new de(o=>Ss(o),Cs),this.vs=new Map,this.Cs=t.getRemoteDocumentCache(),this.ai=t.getTargetCache(),this.ci=t.getBundleCache(),this.Fs(n)}Fs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new gh(this.Cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Cs.setIndexManager(this.indexManager),this.bs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ss))}}function Ch(r,t,e,n){return new Sh(r,t,e,n)}async function uu(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let i;return e.mutationQueue.getAllMutationBatches(n).next(o=>(i=o,e.Fs(t),e.mutationQueue.getAllMutationBatches(n))).next(o=>{const u=[],c=[];let h=q();for(const f of i){u.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){c.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(n,h).next(f=>({Ms:f,removedBatchIds:u,addedBatchIds:c}))})})}function Dh(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=t.batch.keys(),o=e.Cs.newChangeBuffer({trackRemovals:!0});return function(c,h,f,m){const I=f.batch,w=I.keys();let S=V.resolve();return w.forEach(b=>{S=S.next(()=>m.getEntry(h,b)).next(x=>{const N=f.docVersions.get(b);$(N!==null,48541),x.version.compareTo(N)<0&&(I.applyToRemoteDocument(x,f),x.isValidDocument()&&(x.setReadTime(f.commitVersion),m.addEntry(x)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(h,I))}(e,n,t,o).next(()=>o.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let h=q();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(n,i))})}function lu(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ai.getLastRemoteSnapshotVersion(e))}function Nh(r,t){const e=F(r),n=t.snapshotVersion;let i=e.Ss;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.Cs.newChangeBuffer({trackRemovals:!0});i=e.Ss;const c=[];t.targetChanges.forEach((m,I)=>{const w=i.get(I);if(!w)return;c.push(e.ai.removeMatchingKeys(o,m.removedDocuments,I).next(()=>e.ai.addMatchingKeys(o,m.addedDocuments,I)));let S=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?S=S.withResumeToken(lt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,n)),i=i.insert(I,S),function(x,N,z){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Vh?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(w,S,m)&&c.push(e.ai.updateTargetData(o,S))});let h=qt(),f=q();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),c.push(bh(o,u,t.documentUpdates).next(m=>{h=m.xs,f=m.Os})),!n.isEqual(L.min())){const m=e.ai.getLastRemoteSnapshotVersion(o).next(I=>e.ai.setTargetsMetadata(o,o.currentSequenceNumber,n));c.push(m)}return V.waitFor(c).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Ss=i,o))}function bh(r,t,e){let n=q(),i=q();return e.forEach(o=>n=n.add(o)),t.getEntries(r,n).next(o=>{let u=qt();return e.forEach((c,h)=>{const f=o.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(c,h.readTime),u=u.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),u=u.insert(c,h)):k(qs,"Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)}),{xs:u,Os:i}})}function kh(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=Ps),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function xh(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return e.ai.getTargetData(n,t).next(o=>o?(i=o,V.resolve(i)):e.ai.allocateTargetId(n).next(u=>(i=new Kt(t,u,"TargetPurposeListen",n.currentSequenceNumber),e.ai.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=e.Ss.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Ss=e.Ss.insert(n.targetId,n),e.Ds.set(t,n.targetId)),n})}async function ys(r,t,e){const n=F(r),i=n.Ss.get(t),o=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",o,u=>n.persistence.referenceDelegate.removeTarget(u,i))}catch(u){if(!Le(u))throw u;k(qs,`Failed to update sequence numbers for target ${t}: ${u}`)}n.Ss=n.Ss.remove(t),n.Ds.delete(i.target)}function $o(r,t,e){const n=F(r);let i=L.min(),o=q();return n.persistence.runTransaction("Execute query","readwrite",u=>function(h,f,m){const I=F(h),w=I.Ds.get(m);return w!==void 0?V.resolve(I.Ss.get(w)):I.ai.getTargetData(f,m)}(n,u,Dt(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.ai.getMatchingKeysForTargetId(u,c.targetId).next(h=>{o=h})}).next(()=>n.bs.getDocumentsMatchingQuery(u,t,e?i:L.min(),e?o:q())).next(c=>(Mh(n,vc(t),c),{documents:c,Ns:o})))}function Mh(r,t,e){let n=r.vs.get(t)||L.min();e.forEach((i,o)=>{o.readTime.compareTo(n)>0&&(n=o.readTime)}),r.vs.set(t,n)}class Go{constructor(){this.activeTargetIds=Vc()}$s(t){this.activeTargetIds=this.activeTargetIds.add(t)}Us(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Qs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Oh{constructor(){this.So=new Go,this.Do={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.So.$s(t),this.Do[t]||"not-current"}updateQueryState(t,e,n){this.Do[t]=e}removeLocalQueryTarget(t){this.So.Us(t)}isLocalQueryTarget(t){return this.So.activeTargetIds.has(t)}clearQueryState(t){delete this.Do[t]}getAllActiveQueryTargets(){return this.So.activeTargetIds}isActiveQueryTarget(t){return this.So.activeTargetIds.has(t)}start(){return this.So=new Go,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{vo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko="ConnectivityMonitor";class Qo{constructor(){this.Co=()=>this.Fo(),this.Mo=()=>this.xo(),this.Oo=[],this.No()}vo(t){this.Oo.push(t)}shutdown(){window.removeEventListener("online",this.Co),window.removeEventListener("offline",this.Mo)}No(){window.addEventListener("online",this.Co),window.addEventListener("offline",this.Mo)}Fo(){k(Ko,"Network connectivity changed: AVAILABLE");for(const t of this.Oo)t(0)}xo(){k(Ko,"Network connectivity changed: UNAVAILABLE");for(const t of this.Oo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qn=null;function Ts(){return Qn===null?Qn=function(){return 268435456+Math.round(2147483648*Math.random())}():Qn++,"0x"+Qn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs="RestConnection",Fh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Uh{get Bo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Lo=e+"://"+t.host,this.ko=`projects/${n}/databases/${i}`,this.qo=this.databaseId.database===er?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Qo(t,e,n,i,o){const u=Ts(),c=this.$o(t,e.toUriEncodedString());k(rs,`Sending RPC '${t}' ${u}:`,c,n);const h={"google-cloud-resource-prefix":this.ko,"x-goog-request-params":this.qo};return this.Uo(h,i,o),this.Ko(t,c,h,n).then(f=>(k(rs,`Received RPC '${t}' ${u}: `,f),f),f=>{throw Re(rs,`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",n),f})}Wo(t,e,n,i,o,u){return this.Qo(t,e,n,i,o)}Uo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Me}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),n&&n.headers.forEach((i,o)=>t[o]=i)}$o(t,e){const n=Fh[t];return`${this.Lo}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(t){this.Go=t.Go,this.zo=t.zo}jo(t){this.Ho=t}Jo(t){this.Yo=t}Zo(t){this.Xo=t}onMessage(t){this.e_=t}close(){this.zo()}send(t){this.Go(t)}t_(){this.Ho()}n_(){this.Yo()}r_(t){this.Xo(t)}i_(t){this.e_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt="WebChannelConnection";class Bh extends Uh{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ko(t,e,n,i){const o=Ts();return new Promise((u,c)=>{const h=new fa;h.setWithCredentials(!0),h.listenOnce(ma.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Wn.NO_ERROR:const m=h.getResponseJson();k(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),u(m);break;case Wn.TIMEOUT:k(mt,`RPC '${t}' ${o} timed out`),c(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case Wn.HTTP_ERROR:const I=h.getStatus();if(k(mt,`RPC '${t}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let w=h.getResponseJson();Array.isArray(w)&&(w=w[0]);const S=w==null?void 0:w.error;if(S&&S.status&&S.message){const b=function(N){const z=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(S.status);c(new D(b,S.message))}else c(new D(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new D(P.UNAVAILABLE,"Connection failed."));break;default:O(9055,{s_:t,streamId:o,o_:h.getLastErrorCode(),__:h.getLastError()})}}finally{k(mt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(i);k(mt,`RPC '${t}' ${o} sending request:`,i),h.send(e,"POST",f,n,15)})}a_(t,e,n){const i=Ts(),o=[this.Lo,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=_a(),c=ga(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Uo(h.initMessageHeaders,e,n),h.encodeInitMessageHeaders=!0;const m=o.join("");k(mt,`Creating RPC '${t}' stream ${i}: ${m}`,h);const I=u.createWebChannel(m,h);let w=!1,S=!1;const b=new qh({Go:N=>{S?k(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,N):(w||(k(mt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),w=!0),k(mt,`RPC '${t}' stream ${i} sending:`,N),I.send(N))},zo:()=>I.close()}),x=(N,z,G)=>{N.listen(z,K=>{try{G(K)}catch(rt){setTimeout(()=>{throw rt},0)}})};return x(I,sn.EventType.OPEN,()=>{S||(k(mt,`RPC '${t}' stream ${i} transport opened.`),b.t_())}),x(I,sn.EventType.CLOSE,()=>{S||(S=!0,k(mt,`RPC '${t}' stream ${i} transport closed`),b.r_())}),x(I,sn.EventType.ERROR,N=>{S||(S=!0,Re(mt,`RPC '${t}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),b.r_(new D(P.UNAVAILABLE,"The operation could not be completed")))}),x(I,sn.EventType.MESSAGE,N=>{var z;if(!S){const G=N.data[0];$(!!G,16349);const K=G,rt=(K==null?void 0:K.error)||((z=K[0])===null||z===void 0?void 0:z.error);if(rt){k(mt,`RPC '${t}' stream ${i} received error:`,rt);const kt=rt.status;let it=function(_){const y=Z[_];if(y!==void 0)return Ya(y)}(kt),E=rt.message;it===void 0&&(it=P.INTERNAL,E="Unknown error status: "+kt+" with message "+rt.message),S=!0,b.r_(new D(it,E)),I.close()}else k(mt,`RPC '${t}' stream ${i} received:`,G),b.i_(G)}}),x(c,pa.STAT_EVENT,N=>{N.stat===as.PROXY?k(mt,`RPC '${t}' stream ${i} detected buffering proxy`):N.stat===as.NOPROXY&&k(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{b.n_()},0),b}}function ss(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(r){return new Gc(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(t,e,n=1e3,i=1.5,o=6e4){this.bi=t,this.timerId=e,this.u_=n,this.c_=i,this.l_=o,this.h_=0,this.P_=null,this.T_=Date.now(),this.reset()}reset(){this.h_=0}I_(){this.h_=this.l_}E_(t){this.cancel();const e=Math.floor(this.h_+this.d_()),n=Math.max(0,Date.now()-this.T_),i=Math.max(0,e-n);i>0&&k("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.h_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.P_=this.bi.enqueueAfterDelay(this.timerId,i,()=>(this.T_=Date.now(),t())),this.h_*=this.c_,this.h_<this.u_&&(this.h_=this.u_),this.h_>this.l_&&(this.h_=this.l_)}A_(){this.P_!==null&&(this.P_.skipDelay(),this.P_=null)}cancel(){this.P_!==null&&(this.P_.cancel(),this.P_=null)}d_(){return(Math.random()-.5)*this.h_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo="PersistentStream";class hu{constructor(t,e,n,i,o,u,c,h){this.bi=t,this.R_=n,this.V_=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.m_=0,this.f_=null,this.g_=null,this.stream=null,this.p_=0,this.y_=new cu(t,e)}w_(){return this.state===1||this.state===5||this.b_()}b_(){return this.state===2||this.state===3}start(){this.p_=0,this.state!==4?this.auth():this.S_()}async stop(){this.w_()&&await this.close(0)}D_(){this.state=0,this.y_.reset()}v_(){this.b_()&&this.f_===null&&(this.f_=this.bi.enqueueAfterDelay(this.R_,6e4,()=>this.C_()))}F_(t){this.M_(),this.stream.send(t)}async C_(){if(this.b_())return this.close(0)}M_(){this.f_&&(this.f_.cancel(),this.f_=null)}x_(){this.g_&&(this.g_.cancel(),this.g_=null)}async close(t,e){this.M_(),this.x_(),this.y_.cancel(),this.m_++,t!==4?this.y_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Ut(e.toString()),Ut("Using maximum backoff delay to prevent overloading the backend."),this.y_.I_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.O_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Zo(e)}O_(){}auth(){this.state=1;const t=this.N_(this.m_),e=this.m_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.m_===e&&this.B_(n,i)},n=>{t(()=>{const i=new D(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.L_(i)})})}B_(t,e){const n=this.N_(this.m_);this.stream=this.k_(t,e),this.stream.jo(()=>{n(()=>this.listener.jo())}),this.stream.Jo(()=>{n(()=>(this.state=2,this.g_=this.bi.enqueueAfterDelay(this.V_,1e4,()=>(this.b_()&&(this.state=3),Promise.resolve())),this.listener.Jo()))}),this.stream.Zo(i=>{n(()=>this.L_(i))}),this.stream.onMessage(i=>{n(()=>++this.p_==1?this.q_(i):this.onNext(i))})}S_(){this.state=5,this.y_.E_(async()=>{this.state=0,this.start()})}L_(t){return k(Wo,`close with error: ${t}`),this.stream=null,this.close(4,t)}N_(t){return e=>{this.bi.enqueueAndForget(()=>this.m_===t?e():(k(Wo,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jh extends hu{constructor(t,e,n,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}k_(t,e){return this.connection.a_("Listen",t,e)}q_(t){return this.onNext(t)}onNext(t){this.y_.reset();const e=Wc(this.serializer,t),n=function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?Nt(u.readTime):L.min()}(t);return this.listener.Q_(e,n)}U_(t){const e={};e.database=_s(this.serializer),e.addTarget=function(o,u){let c;const h=u.target;if(c=ds(h)?{documents:Xc(o,h)}:{query:Jc(o,h).gt},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){c.resumeToken=Za(o,u.resumeToken);const f=ms(o,u.expectedCount);f!==null&&(c.expectedCount=f)}else if(u.snapshotVersion.compareTo(L.min())>0){c.readTime=or(o,u.snapshotVersion.toTimestamp());const f=ms(o,u.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,t);const n=th(this.serializer,t);n&&(e.labels=n),this.F_(e)}K_(t){const e={};e.database=_s(this.serializer),e.removeTarget=t,this.F_(e)}}class zh extends hu{constructor(t,e,n,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,i,u),this.serializer=o}get W_(){return this.p_>0}start(){this.lastStreamToken=void 0,super.start()}O_(){this.W_&&this.G_([])}k_(t,e){return this.connection.a_("Write",t,e)}q_(t){return $(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,$(!t.writeResults||t.writeResults.length===0,55816),this.listener.z_()}onNext(t){$(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.y_.reset();const e=Yc(t.writeResults,t.commitTime),n=Nt(t.commitTime);return this.listener.j_(n,e)}H_(){const t={};t.database=_s(this.serializer),this.F_(t)}G_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Hc(this.serializer,n))};this.F_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{}class Gh extends $h{constructor(t,e,n,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=i,this.J_=!1}Y_(){if(this.J_)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Qo(t,e,n,i){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Qo(t,ps(e,n),i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())})}Wo(t,e,n,i,o){return this.Y_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,c])=>this.connection.Wo(t,ps(e,n),i,u,c,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new D(P.UNKNOWN,u.toString())})}terminate(){this.J_=!0,this.connection.terminate()}}class Kh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Z_=0,this.X_=null,this.ea=!0}ta(){this.Z_===0&&(this.na("Unknown"),this.X_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.X_=null,this.ra("Backend didn't respond within 10 seconds."),this.na("Offline"),Promise.resolve())))}ia(t){this.state==="Online"?this.na("Unknown"):(this.Z_++,this.Z_>=1&&(this.sa(),this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.na("Offline")))}set(t){this.sa(),this.Z_=0,t==="Online"&&(this.ea=!1),this.na(t)}na(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ra(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ea?(Ut(e),this.ea=!1):k("OnlineStateTracker",e)}sa(){this.X_!==null&&(this.X_.cancel(),this.X_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="RemoteStore";class Qh{constructor(t,e,n,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.oa=[],this._a=new Map,this.aa=new Set,this.ua=[],this.ca=o,this.ca.vo(u=>{n.enqueueAndForget(async()=>{fe(this)&&(k(ce,"Restarting streams for network reachability change."),await async function(h){const f=F(h);f.aa.add(4),await En(f),f.la.set("Unknown"),f.aa.delete(4),await Ir(f)}(this))})}),this.la=new Kh(n,i)}}async function Ir(r){if(fe(r))for(const t of r.ua)await t(!0)}async function En(r){for(const t of r.ua)await t(!1)}function du(r,t){const e=F(r);e._a.has(t.targetId)||(e._a.set(t.targetId,t),$s(e)?zs(e):Fe(e).b_()&&js(e,t))}function Bs(r,t){const e=F(r),n=Fe(e);e._a.delete(t),n.b_()&&fu(e,t),e._a.size===0&&(n.b_()?n.v_():fe(e)&&e.la.set("Unknown"))}function js(r,t){if(r.ha.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Fe(r).U_(t)}function fu(r,t){r.ha.Ke(t),Fe(r).K_(t)}function zs(r){r.ha=new Bc({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>r._a.get(t)||null,Pt:()=>r.datastore.serializer.databaseId}),Fe(r).start(),r.la.ta()}function $s(r){return fe(r)&&!Fe(r).w_()&&r._a.size>0}function fe(r){return F(r).aa.size===0}function mu(r){r.ha=void 0}async function Wh(r){r.la.set("Online")}async function Hh(r){r._a.forEach((t,e)=>{js(r,t)})}async function Yh(r,t){mu(r),$s(r)?(r.la.ia(t),zs(r)):r.la.set("Unknown")}async function Xh(r,t,e){if(r.la.set("Online"),t instanceof Ja&&t.state===2&&t.cause)try{await async function(i,o){const u=o.cause;for(const c of o.targetIds)i._a.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i._a.delete(c),i.ha.removeTarget(c))}(r,t)}catch(n){k(ce,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ur(r,n)}else if(t instanceof Jn?r.ha.Xe(t):t instanceof Xa?r.ha.ot(t):r.ha.nt(t),!e.isEqual(L.min()))try{const n=await lu(r.localStore);e.compareTo(n)>=0&&await function(o,u){const c=o.ha.It(u);return c.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o._a.get(f);m&&o._a.set(f,m.withResumeToken(h.resumeToken,u))}}),c.targetMismatches.forEach((h,f)=>{const m=o._a.get(h);if(!m)return;o._a.set(h,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),fu(o,h);const I=new Kt(m.target,h,f,m.sequenceNumber);js(o,I)}),o.remoteSyncer.applyRemoteEvent(c)}(r,e)}catch(n){k(ce,"Failed to raise snapshot:",n),await ur(r,n)}}async function ur(r,t,e){if(!Le(t))throw t;r.aa.add(1),await En(r),r.la.set("Offline"),e||(e=()=>lu(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k(ce,"Retrying IndexedDB access"),await e(),r.aa.delete(1),await Ir(r)})}function pu(r,t){return t().catch(e=>ur(r,e,t))}async function Ar(r){const t=F(r),e=Zt(t);let n=t.oa.length>0?t.oa[t.oa.length-1].batchId:Ps;for(;Jh(t);)try{const i=await kh(t.localStore,n);if(i===null){t.oa.length===0&&e.v_();break}n=i.batchId,Zh(t,i)}catch(i){await ur(t,i)}gu(t)&&_u(t)}function Jh(r){return fe(r)&&r.oa.length<10}function Zh(r,t){r.oa.push(t);const e=Zt(r);e.b_()&&e.W_&&e.G_(t.mutations)}function gu(r){return fe(r)&&!Zt(r).w_()&&r.oa.length>0}function _u(r){Zt(r).start()}async function td(r){Zt(r).H_()}async function ed(r){const t=Zt(r);for(const e of r.oa)t.G_(e.mutations)}async function nd(r,t,e){const n=r.oa.shift(),i=xs.from(n,t,e);await pu(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await Ar(r)}async function rd(r,t){t&&Zt(r).W_&&await async function(n,i){if(function(u){return Uc(u)&&u!==P.ABORTED}(i.code)){const o=n.oa.shift();Zt(n).D_(),await pu(n,()=>n.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Ar(n)}}(r,t),gu(r)&&_u(r)}async function Ho(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),k(ce,"RemoteStore received new credentials");const n=fe(e);e.aa.add(3),await En(e),n&&e.la.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.aa.delete(3),await Ir(e)}async function sd(r,t){const e=F(r);t?(e.aa.delete(2),await Ir(e)):t||(e.aa.add(2),await En(e),e.la.set("Unknown"))}function Fe(r){return r.Pa||(r.Pa=function(e,n,i){const o=F(e);return o.Y_(),new jh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{jo:Wh.bind(null,r),Jo:Hh.bind(null,r),Zo:Yh.bind(null,r),Q_:Xh.bind(null,r)}),r.ua.push(async t=>{t?(r.Pa.D_(),$s(r)?zs(r):r.la.set("Unknown")):(await r.Pa.stop(),mu(r))})),r.Pa}function Zt(r){return r.Ta||(r.Ta=function(e,n,i){const o=F(e);return o.Y_(),new zh(n,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(r.datastore,r.asyncQueue,{jo:()=>Promise.resolve(),Jo:td.bind(null,r),Zo:rd.bind(null,r),z_:ed.bind(null,r),j_:nd.bind(null,r)}),r.ua.push(async t=>{t?(r.Ta.D_(),await Ar(r)):(await r.Ta.stop(),r.oa.length>0&&(k(ce,`Stopping write stream with ${r.oa.length} pending writes`),r.oa=[]))})),r.Ta}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(t,e,n,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=i,this.removalCallback=o,this.deferred=new Ft,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,i,o){const u=Date.now()+n,c=new Gs(t,e,u,i,o);return c.start(n),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ks(r,t){if(Ut("AsyncQueue",`${t}: ${r}`),Le(r))return new D(P.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{static emptySet(t){return new we(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=on(),this.sortedSet=new Y(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof we)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=n.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new we;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(){this.Ia=new Y(M.comparator)}track(t){const e=t.doc.key,n=this.Ia.get(e);n?t.type!==0&&n.type===3?this.Ia=this.Ia.insert(e,t):t.type===3&&n.type!==1?this.Ia=this.Ia.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.Ia=this.Ia.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.Ia=this.Ia.remove(e):t.type===1&&n.type===2?this.Ia=this.Ia.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.Ia=this.Ia.insert(e,{type:2,doc:t.doc}):O(63341,{Vt:t,Ea:n}):this.Ia=this.Ia.insert(e,t)}da(){const t=[];return this.Ia.inorderTraversal((e,n)=>{t.push(n)}),t}}class ke{constructor(t,e,n,i,o,u,c,h,f){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,n,i,o){const u=[];return e.forEach(c=>{u.push({type:0,doc:c})}),new ke(t,e,we.emptySet(e),u,n,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&pr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==n[i].type||!e[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(){this.Aa=void 0,this.Ra=[]}Va(){return this.Ra.some(t=>t.ma())}}class od{constructor(){this.queries=Xo(),this.onlineState="Unknown",this.fa=new Set}terminate(){(function(e,n){const i=F(e),o=i.queries;i.queries=Xo(),o.forEach((u,c)=>{for(const h of c.Ra)h.onError(n)})})(this,new D(P.ABORTED,"Firestore shutting down"))}}function Xo(){return new de(r=>Fa(r),pr)}async function yu(r,t){const e=F(r);let n=3;const i=t.query;let o=e.queries.get(i);o?!o.Va()&&t.ma()&&(n=2):(o=new id,n=t.ma()?0:1);try{switch(n){case 0:o.Aa=await e.onListen(i,!0);break;case 1:o.Aa=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const c=Ks(u,`Initialization of query '${Ee(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.Ra.push(t),t.ga(e.onlineState),o.Aa&&t.pa(o.Aa)&&Qs(e)}async function Tu(r,t){const e=F(r),n=t.query;let i=3;const o=e.queries.get(n);if(o){const u=o.Ra.indexOf(t);u>=0&&(o.Ra.splice(u,1),o.Ra.length===0?i=t.ma()?0:1:!o.Va()&&t.ma()&&(i=2))}switch(i){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function ad(r,t){const e=F(r);let n=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const c of u.Ra)c.pa(i)&&(n=!0);u.Aa=i}}n&&Qs(e)}function ud(r,t,e){const n=F(r),i=n.queries.get(t);if(i)for(const o of i.Ra)o.onError(e);n.queries.delete(t)}function Qs(r){r.fa.forEach(t=>{t.next()})}var Es,Jo;(Jo=Es||(Es={})).ya="default",Jo.Cache="cache";class Eu{constructor(t,e,n){this.query=t,this.wa=e,this.ba=!1,this.Sa=null,this.onlineState="Unknown",this.options=n||{}}pa(t){if(!this.options.includeMetadataChanges){const n=[];for(const i of t.docChanges)i.type!==3&&n.push(i);t=new ke(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.ba?this.Da(t)&&(this.wa.next(t),e=!0):this.va(t,this.onlineState)&&(this.Ca(t),e=!0),this.Sa=t,e}onError(t){this.wa.error(t)}ga(t){this.onlineState=t;let e=!1;return this.Sa&&!this.ba&&this.va(this.Sa,t)&&(this.Ca(this.Sa),e=!0),e}va(t,e){if(!t.fromCache||!this.ma())return!0;const n=e!=="Offline";return(!this.options.Fa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Da(t){if(t.docChanges.length>0)return!0;const e=this.Sa&&this.Sa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ca(t){t=ke.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.ba=!0,this.wa.next(t)}ma(){return this.options.source!==Es.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(t){this.key=t}}class Iu{constructor(t){this.key=t}}class ld{constructor(t,e){this.query=t,this.qa=e,this.Qa=null,this.hasCachedResults=!1,this.current=!1,this.$a=q(),this.mutatedKeys=q(),this.Ua=Ua(t),this.Ka=new we(this.Ua)}get Wa(){return this.qa}Ga(t,e){const n=e?e.za:new Yo,i=e?e.Ka:this.Ka;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,c=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((m,I)=>{const w=i.get(m),S=gr(this.query,I)?I:null,b=!!w&&this.mutatedKeys.has(w.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;w&&S?w.data.isEqual(S.data)?b!==x&&(n.track({type:3,doc:S}),N=!0):this.ja(w,S)||(n.track({type:2,doc:S}),N=!0,(h&&this.Ua(S,h)>0||f&&this.Ua(S,f)<0)&&(c=!0)):!w&&S?(n.track({type:0,doc:S}),N=!0):w&&!S&&(n.track({type:1,doc:w}),N=!0,(h||f)&&(c=!0)),N&&(S?(u=u.add(S),o=x?o.add(m):o.delete(m)):(u=u.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const m=this.query.limitType==="F"?u.last():u.first();u=u.delete(m.key),o=o.delete(m.key),n.track({type:1,doc:m})}return{Ka:u,za:n,ys:c,mutatedKeys:o}}ja(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,i){const o=this.Ka;this.Ka=t.Ka,this.mutatedKeys=t.mutatedKeys;const u=t.za.da();u.sort((m,I)=>function(S,b){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Vt:N})}};return x(S)-x(b)}(m.type,I.type)||this.Ua(m.doc,I.doc)),this.Ha(n),i=i!=null&&i;const c=e&&!i?this.Ja():[],h=this.$a.size===0&&this.current&&!i?1:0,f=h!==this.Qa;return this.Qa=h,u.length!==0||f?{snapshot:new ke(this.query,t.Ka,o,u,t.mutatedKeys,h===0,f,!1,!!n&&n.resumeToken.approximateByteSize()>0),Ya:c}:{Ya:c}}ga(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ka:this.Ka,za:new Yo,mutatedKeys:this.mutatedKeys,ys:!1},!1)):{Ya:[]}}Za(t){return!this.qa.has(t)&&!!this.Ka.has(t)&&!this.Ka.get(t).hasLocalMutations}Ha(t){t&&(t.addedDocuments.forEach(e=>this.qa=this.qa.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.qa=this.qa.delete(e)),this.current=t.current)}Ja(){if(!this.current)return[];const t=this.$a;this.$a=q(),this.Ka.forEach(n=>{this.Za(n.key)&&(this.$a=this.$a.add(n.key))});const e=[];return t.forEach(n=>{this.$a.has(n)||e.push(new Iu(n))}),this.$a.forEach(n=>{t.has(n)||e.push(new vu(n))}),e}Xa(t){this.qa=t.Ns,this.$a=q();const e=this.Ga(t.documents);return this.applyChanges(e,!0)}eu(){return ke.fromInitialDocuments(this.query,this.Ka,this.mutatedKeys,this.Qa===0,this.hasCachedResults)}}const Ws="SyncEngine";class cd{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class hd{constructor(t){this.key=t,this.tu=!1}}class dd{constructor(t,e,n,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.nu={},this.ru=new de(c=>Fa(c),pr),this.iu=new Map,this.su=new Set,this.ou=new Y(M.comparator),this._u=new Map,this.au=new Ls,this.uu={},this.cu=new Map,this.lu=be.ir(),this.onlineState="Unknown",this.hu=void 0}get isPrimaryClient(){return this.hu===!0}}async function fd(r,t,e=!0){const n=Su(r);let i;const o=n.ru.get(t);return o?(n.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.eu()):i=await Au(n,t,e,!0),i}async function md(r,t){const e=Su(r);await Au(e,t,!0,!1)}async function Au(r,t,e,n){const i=await xh(r.localStore,Dt(t)),o=i.targetId,u=r.sharedClientState.addLocalQueryTarget(o,e);let c;return n&&(c=await pd(r,t,o,u==="current",i.resumeToken)),r.isPrimaryClient&&e&&du(r.remoteStore,i),c}async function pd(r,t,e,n,i){r.Pu=(I,w,S)=>async function(x,N,z,G){let K=N.view.Ga(z);K.ys&&(K=await $o(x.localStore,N.query,!1).then(({documents:E})=>N.view.Ga(E,K)));const rt=G&&G.targetChanges.get(N.targetId),kt=G&&G.targetMismatches.get(N.targetId)!=null,it=N.view.applyChanges(K,x.isPrimaryClient,rt,kt);return ta(x,N.targetId,it.Ya),it.snapshot}(r,I,w,S);const o=await $o(r.localStore,t,!0),u=new ld(t,o.Ns),c=u.Ga(o.documents),h=Tn.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",i),f=u.applyChanges(c,r.isPrimaryClient,h);ta(r,e,f.Ya);const m=new cd(t,e,u);return r.ru.set(t,m),r.iu.has(e)?r.iu.get(e).push(t):r.iu.set(e,[t]),f.snapshot}async function gd(r,t,e){const n=F(r),i=n.ru.get(t),o=n.iu.get(i.targetId);if(o.length>1)return n.iu.set(i.targetId,o.filter(u=>!pr(u,t))),void n.ru.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ys(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),e&&Bs(n.remoteStore,i.targetId),vs(n,i.targetId)}).catch(Oe)):(vs(n,i.targetId),await ys(n.localStore,i.targetId,!0))}async function _d(r,t){const e=F(r),n=e.ru.get(t),i=e.iu.get(n.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Bs(e.remoteStore,n.targetId))}async function yd(r,t,e){const n=Rd(r);try{const i=await function(u,c){const h=F(u),f=et.now(),m=c.reduce((S,b)=>S.add(b.key),q());let I,w;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let b=qt(),x=q();return h.Cs.getEntries(S,m).next(N=>{b=N,b.forEach((z,G)=>{G.isValidDocument()||(x=x.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,b)).next(N=>{I=N;const z=[];for(const G of c){const K=xc(G,I.get(G.key).overlayedDocument);K!=null&&z.push(new ne(G.key,K,Na(K.value.mapValue),Tt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,z,c)}).next(N=>{w=N;const z=N.applyToLocalDocumentSet(I,x);return h.documentOverlayCache.saveOverlays(S,N.batchId,z)})}).then(()=>({batchId:w.batchId,changes:Ba(I)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(i.batchId),function(u,c,h){let f=u.uu[u.currentUser.toKey()];f||(f=new Y(U)),f=f.insert(c,h),u.uu[u.currentUser.toKey()]=f}(n,i.batchId,e),await vn(n,i.changes),await Ar(n.remoteStore)}catch(i){const o=Ks(i,"Failed to persist write");e.reject(o)}}async function wu(r,t){const e=F(r);try{const n=await Nh(e.localStore,t);t.targetChanges.forEach((i,o)=>{const u=e._u.get(o);u&&($(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?u.tu=!0:i.modifiedDocuments.size>0?$(u.tu,14607):i.removedDocuments.size>0&&($(u.tu,42227),u.tu=!1))}),await vn(e,n,t)}catch(n){await Oe(n)}}function Zo(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const i=[];n.ru.forEach((o,u)=>{const c=u.view.ga(t);c.snapshot&&i.push(c.snapshot)}),function(u,c){const h=F(u);h.onlineState=c;let f=!1;h.queries.forEach((m,I)=>{for(const w of I.Ra)w.ga(c)&&(f=!0)}),f&&Qs(h)}(n.eventManager,t),i.length&&n.nu.Q_(i),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Td(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const i=n._u.get(t),o=i&&i.key;if(o){let u=new Y(M.comparator);u=u.insert(o,gt.newNoDocument(o,L.min()));const c=q().add(o),h=new Er(L.min(),new Map,new Y(U),u,c);await wu(n,h),n.ou=n.ou.remove(o),n._u.delete(t),Hs(n)}else await ys(n.localStore,t,!1).then(()=>vs(n,t,e)).catch(Oe)}async function Ed(r,t){const e=F(r),n=t.batch.batchId;try{const i=await Dh(e.localStore,t);Pu(e,n,null),Ru(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await vn(e,i)}catch(i){await Oe(i)}}async function vd(r,t,e){const n=F(r);try{const i=await function(u,c){const h=F(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,c).next(I=>($(I!==null,37113),m=I.keys(),h.mutationQueue.removeMutationBatch(f,I))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(n.localStore,t);Pu(n,t,e),Ru(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await vn(n,i)}catch(i){await Oe(i)}}function Ru(r,t){(r.cu.get(t)||[]).forEach(e=>{e.resolve()}),r.cu.delete(t)}function Pu(r,t,e){const n=F(r);let i=n.uu[n.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),n.uu[n.currentUser.toKey()]=i}}function vs(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.iu.get(t))r.ru.delete(n),e&&r.nu.Tu(n,e);r.iu.delete(t),r.isPrimaryClient&&r.au.Ur(t).forEach(n=>{r.au.containsKey(n)||Vu(r,n)})}function Vu(r,t){r.su.delete(t.path.canonicalString());const e=r.ou.get(t);e!==null&&(Bs(r.remoteStore,e),r.ou=r.ou.remove(t),r._u.delete(e),Hs(r))}function ta(r,t,e){for(const n of e)n instanceof vu?(r.au.addReference(n.key,t),Id(r,n)):n instanceof Iu?(k(Ws,"Document no longer in limbo: "+n.key),r.au.removeReference(n.key,t),r.au.containsKey(n.key)||Vu(r,n.key)):O(19791,{Iu:n})}function Id(r,t){const e=t.key,n=e.path.canonicalString();r.ou.get(e)||r.su.has(n)||(k(Ws,"New document in limbo: "+e),r.su.add(n),Hs(r))}function Hs(r){for(;r.su.size>0&&r.ou.size<r.maxConcurrentLimboResolutions;){const t=r.su.values().next().value;r.su.delete(t);const e=new M(W.fromString(t)),n=r.lu.next();r._u.set(n,new hd(e)),r.ou=r.ou.insert(e,n),du(r.remoteStore,new Kt(Dt(Ds(e.path)),n,"TargetPurposeLimboResolution",hr.le))}}async function vn(r,t,e){const n=F(r),i=[],o=[],u=[];n.ru.isEmpty()||(n.ru.forEach((c,h)=>{u.push(n.Pu(h,t,e).then(f=>{var m;if((f||e)&&n.isPrimaryClient){const I=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;n.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(f){i.push(f);const I=Us.Ps(h.targetId,f);o.push(I)}}))}),await Promise.all(u),n.nu.Q_(i),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>V.forEach(f,w=>V.forEach(w.ls,S=>m.persistence.referenceDelegate.addReference(I,w.targetId,S)).next(()=>V.forEach(w.hs,S=>m.persistence.referenceDelegate.removeReference(I,w.targetId,S)))))}catch(I){if(!Le(I))throw I;k(qs,"Failed to update sequence numbers: "+I)}for(const I of f){const w=I.targetId;if(!I.fromCache){const S=m.Ss.get(w),b=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(b);m.Ss=m.Ss.insert(w,x)}}}(n.localStore,o))}async function Ad(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){k(Ws,"User change. New user:",t.toKey());const n=await uu(e.localStore,t);e.currentUser=t,function(o,u){o.cu.forEach(c=>{c.forEach(h=>{h.reject(new D(P.CANCELLED,u))})}),o.cu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await vn(e,n.Ms)}}function wd(r,t){const e=F(r),n=e._u.get(t);if(n&&n.tu)return q().add(n.key);{let i=q();const o=e.iu.get(t);if(!o)return i;for(const u of o){const c=e.ru.get(u);i=i.unionWith(c.view.Wa)}return i}}function Su(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=wu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=wd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Td.bind(null,t),t.nu.Q_=ad.bind(null,t.eventManager),t.nu.Tu=ud.bind(null,t.eventManager),t}function Rd(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ed.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=vd.bind(null,t),t}class lr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=vr(t.databaseInfo.databaseId),this.sharedClientState=this.Au(t),this.persistence=this.Ru(t),await this.persistence.start(),this.localStore=this.Vu(t),this.gcScheduler=this.mu(t,this.localStore),this.indexBackfillerScheduler=this.fu(t,this.localStore)}mu(t,e){return null}fu(t,e){return null}Vu(t){return Ch(this.persistence,new Ph,t.initialUser,this.serializer)}Ru(t){return new au(Fs.Ei,this.serializer)}Au(t){return new Oh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}lr.provider={build:()=>new lr};class Pd extends lr{constructor(t){super(),this.cacheSizeBytes=t}mu(t,e){$(this.persistence.referenceDelegate instanceof ar,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new hh(n,t.asyncQueue,e)}Ru(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new au(n=>ar.Ei(n,e),this.serializer)}}class Is{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Zo(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ad.bind(null,this.syncEngine),await sd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new od}()}createDatastore(t){const e=vr(t.databaseInfo.databaseId),n=function(o){return new Bh(o)}(t.databaseInfo);return function(o,u,c,h){return new Gh(o,u,c,h)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,i,o,u,c){return new Qh(n,i,o,u,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Zo(this.syncEngine,e,0),function(){return Qo.C()?new Qo:new Lh}())}createSyncEngine(t,e){return function(i,o,u,c,h,f,m){const I=new dd(i,o,u,c,h,f);return m&&(I.hu=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);k(ce,"RemoteStore shutting down."),o.aa.add(5),await En(o),o.ca.shutdown(),o.la.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}Is.provider={build:()=>new Is};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.pu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.pu(this.observer.error,t):Ut("Uncaught Error in snapshot listener:",t.toString()))}yu(){this.muted=!0}pu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const te="FirestoreClient";class Vd{constructor(t,e,n,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=i,this.user=pt.UNAUTHENTICATED,this.clientId=va.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(n,async u=>{k(te,"Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(n,u=>(k(te,"Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ft;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Ks(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function is(r,t){r.asyncQueue.verifyOperationInProgress(),k(te,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await uu(t.localStore,i),n=i)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function ea(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Sd(r);k(te,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Ho(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>Ho(t.remoteStore,i)),r._onlineComponents=t}async function Sd(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k(te,"Using user provided OfflineComponentProvider");try{await is(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;Re("Error using user provided cache. Falling back to memory cache: "+e),await is(r,new lr)}}else k(te,"Using default OfflineComponentProvider"),await is(r,new Pd(void 0));return r._offlineComponents}async function Du(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k(te,"Using user provided OnlineComponentProvider"),await ea(r,r._uninitializedComponentsProvider._online)):(k(te,"Using default OnlineComponentProvider"),await ea(r,new Is))),r._onlineComponents}function Cd(r){return Du(r).then(t=>t.syncEngine)}async function Nu(r){const t=await Du(r),e=t.eventManager;return e.onListen=fd.bind(null,t.syncEngine),e.onUnlisten=gd.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=md.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=_d.bind(null,t.syncEngine),e}function Dd(r,t,e={}){const n=new Ft;return r.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,f){const m=new Cu({next:w=>{m.yu(),u.enqueueAndForget(()=>Tu(o,I));const S=w.docs.has(c);!S&&w.fromCache?f.reject(new D(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&w.fromCache&&h&&h.source==="server"?f.reject(new D(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(w)},error:w=>f.reject(w)}),I=new Eu(Ds(c.path),m,{includeMetadataChanges:!0,Fa:!0});return yu(o,I)}(await Nu(r),r.asyncQueue,t,e,n)),n.promise}function Nd(r,t,e={}){const n=new Ft;return r.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,f){const m=new Cu({next:w=>{m.yu(),u.enqueueAndForget(()=>Tu(o,I)),w.fromCache&&h.source==="server"?f.reject(new D(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(w)},error:w=>f.reject(w)}),I=new Eu(c,m,{includeMetadataChanges:!0,Fa:!0});return yu(o,I)}(await Nu(r),r.asyncQueue,t,e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ku(r,t,e){if(!e)throw new D(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function bd(r,t,e,n){if(t===!0&&n===!0)throw new D(P.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function ra(r){if(!M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function sa(r){if(M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function wr(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function Pt(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=wr(r);throw new D(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function kd(r,t){if(t<=0)throw new D(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="firestore.googleapis.com",ia=!0;class oa{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=xu,this.ssl=ia}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ia;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=ou;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<lh)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}bd("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bu((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Rr{constructor(t,e,n,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new oa({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new oa(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new ql;switch(n.type){case"firstParty":return new $l(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=na.get(e);n&&(k("ComponentProvider","Removing Datastore"),na.delete(e),n.terminate())}(this),Promise.resolve()}}function xd(r,t,e,n={}){var i;const o=(r=Pt(r,Rr))._getSettings(),u=Object.assign(Object.assign({},o),{emulatorOptions:r._getEmulatorOptions()}),c=`${t}:${e}`;o.host!==xu&&o.host!==c&&Re("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:c,ssl:!1,emulatorOptions:n});if(!ws(h,u)&&(r._setSettings(h),n.mockUserToken)){let f,m;if(typeof n.mockUserToken=="string")f=n.mockUserToken,m=pt.MOCK_USER;else{f=Ol(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const I=n.mockUserToken.sub||n.mockUserToken.user_id;if(!I)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new pt(I)}r._authCredentials=new Bl(new Ta(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Bt(this.firestore,t,this._query)}}class Et{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Et(this.firestore,t,this._key)}}class Wt extends Bt{constructor(t,e,n){super(t,e,Ds(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Et(this.firestore,null,new M(t))}withConverter(t){return new Wt(this.firestore,t,this._path)}}function Xd(r,t,...e){if(r=Rt(r),ku("collection","path",t),r instanceof Rr){const n=W.fromString(t,...e);return sa(n),new Wt(r,null,n)}{if(!(r instanceof Et||r instanceof Wt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(W.fromString(t,...e));return sa(n),new Wt(r.firestore,null,n)}}function Md(r,t,...e){if(r=Rt(r),arguments.length===1&&(t=va.newId()),ku("doc","path",t),r instanceof Rr){const n=W.fromString(t,...e);return ra(n),new Et(r,null,new M(n))}{if(!(r instanceof Et||r instanceof Wt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(W.fromString(t,...e));return ra(n),new Et(r.firestore,r instanceof Wt?r.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa="AsyncQueue";class ua{constructor(t=Promise.resolve()){this.Qu=[],this.$u=!1,this.Uu=[],this.Ku=null,this.Wu=!1,this.Gu=!1,this.zu=[],this.y_=new cu(this,"async_queue_retry"),this.ju=()=>{const n=ss();n&&k(aa,"Visibility state changed to "+n.visibilityState),this.y_.A_()},this.Hu=t;const e=ss();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ju)}get isShuttingDown(){return this.$u}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ju(),this.Yu(t)}enterRestrictedMode(t){if(!this.$u){this.$u=!0,this.Gu=t||!1;const e=ss();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.ju)}}enqueue(t){if(this.Ju(),this.$u)return new Promise(()=>{});const e=new Ft;return this.Yu(()=>this.$u&&this.Gu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Qu.push(t),this.Zu()))}async Zu(){if(this.Qu.length!==0){try{await this.Qu[0](),this.Qu.shift(),this.y_.reset()}catch(t){if(!Le(t))throw t;k(aa,"Operation failed with retryable error: "+t)}this.Qu.length>0&&this.y_.E_(()=>this.Zu())}}Yu(t){const e=this.Hu.then(()=>(this.Wu=!0,t().catch(n=>{throw this.Ku=n,this.Wu=!1,Ut("INTERNAL UNHANDLED ERROR: ",la(n)),n}).then(n=>(this.Wu=!1,n))));return this.Hu=e,e}enqueueAfterDelay(t,e,n){this.Ju(),this.zu.indexOf(t)>-1&&(e=0);const i=Gs.createAndSchedule(this,t,e,n,o=>this.Xu(o));return this.Uu.push(i),i}Ju(){this.Ku&&O(47125,{ec:la(this.Ku)})}verifyOperationInProgress(){}async tc(){let t;do t=this.Hu,await t;while(t!==this.Hu)}nc(t){for(const e of this.Uu)if(e.timerId===t)return!0;return!1}rc(t){return this.tc().then(()=>{this.Uu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.Uu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tc()})}sc(t){this.zu.push(t)}Xu(t){const e=this.Uu.indexOf(t);this.Uu.splice(e,1)}}function la(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class re extends Rr{constructor(t,e,n,i){super(t,e,n,i),this.type="firestore",this._queue=new ua,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new ua(t),this._firestoreClient=void 0,await t}}}function Jd(r,t){const e=typeof r=="object"?r:kl(),n=typeof r=="string"?r:er,i=xl(e,"firestore").getImmediate({identifier:n});if(!i._initialized){const o=Ml("firestore");o&&xd(i,...o)}return i}function Pr(r){if(r._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Od(r),r._firestoreClient}function Od(r){var t,e,n;const i=r._freezeSettings(),o=function(c,h,f,m){return new ic(c,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,bu(m.experimentalLongPollingOptions),m.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new Vd(r._authCredentials,r._appCheckCredentials,r._queue,o,r._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(t){this._byteString=t}static fromBase64String(t){try{return new xe(lt.fromBase64String(t))}catch(e){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new xe(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return U(this._lat,t._lat)||U(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,i){if(n.length!==i.length)return!1;for(let o=0;o<n.length;++o)if(n[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=/^__.*__$/;class Fd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ne(t,this.data,this.fieldMask,e,this.fieldTransforms):new yn(t,this.data,e,this.fieldTransforms)}}class Mu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ne(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Ou(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{oc:r})}}class Vr{constructor(t,e,n,i,o,u){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=i,o===void 0&&this._c(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get oc(){return this.settings.oc}ac(t){return new Vr(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}uc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.ac({path:n,cc:!1});return i.lc(t),i}hc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.ac({path:n,cc:!1});return i._c(),i}Pc(t){return this.ac({path:void 0,cc:!0})}Tc(t){return cr(t,this.settings.methodName,this.settings.Ic||!1,this.path,this.settings.Ec)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}_c(){if(this.path)for(let t=0;t<this.path.length;t++)this.lc(this.path.get(t))}lc(t){if(t.length===0)throw this.Tc("Document fields must not be empty");if(Ou(this.oc)&&Ld.test(t))throw this.Tc('Document fields cannot begin and end with "__"')}}class Ud{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||vr(t)}dc(t,e,n,i=!1){return new Vr({oc:t,methodName:e,Ec:n,path:ut.emptyPath(),cc:!1,Ic:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qe(r){const t=r._freezeSettings(),e=vr(r._databaseId);return new Ud(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Js(r,t,e,n,i,o={}){const u=r.dc(o.merge||o.mergeFields?2:0,t,e,i);ni("Data must be an object, but it was:",u,n);const c=Bu(n,u);let h,f;if(o.merge)h=new wt(u.fieldMask),f=u.fieldTransforms;else if(o.mergeFields){const m=[];for(const I of o.mergeFields){const w=As(t,I,e);if(!u.contains(w))throw new D(P.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);zu(m,w)||m.push(w)}h=new wt(m),f=u.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,f=u.fieldTransforms;return new Fd(new It(c),h,f)}class Sr extends Ue{_toFieldTransform(t){if(t.oc!==2)throw t.oc===1?t.Tc(`${this._methodName}() can only appear at the top level of your update data`):t.Tc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Sr}}function Lu(r,t,e){return new Vr({oc:3,Ec:t.settings.Ec,methodName:r._methodName,cc:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class Zs extends Ue{_toFieldTransform(t){return new ks(t.path,new _n)}isEqual(t){return t instanceof Zs}}class ti extends Ue{constructor(t,e){super(t),this.Ac=e}_toFieldTransform(t){const e=Lu(this,t,!0),n=this.Ac.map(o=>me(o,e)),i=new De(n);return new ks(t.path,i)}isEqual(t){return t instanceof ti&&ws(this.Ac,t.Ac)}}class ei extends Ue{constructor(t,e){super(t),this.Ac=e}_toFieldTransform(t){const e=Lu(this,t,!0),n=this.Ac.map(o=>me(o,e)),i=new Ne(n);return new ks(t.path,i)}isEqual(t){return t instanceof ei&&ws(this.Ac,t.Ac)}}function Fu(r,t,e,n){const i=r.dc(1,t,e);ni("Data must be an object, but it was:",i,n);const o=[],u=It.empty();ee(n,(h,f)=>{const m=ri(t,h,e);f=Rt(f);const I=i.hc(m);if(f instanceof Sr)o.push(m);else{const w=me(f,I);w!=null&&(o.push(m),u.set(m,w))}});const c=new wt(o);return new Mu(u,c,i.fieldTransforms)}function Uu(r,t,e,n,i,o){const u=r.dc(1,t,e),c=[As(t,n,e)],h=[i];if(o.length%2!=0)throw new D(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)c.push(As(t,o[w])),h.push(o[w+1]);const f=[],m=It.empty();for(let w=c.length-1;w>=0;--w)if(!zu(f,c[w])){const S=c[w];let b=h[w];b=Rt(b);const x=u.hc(S);if(b instanceof Sr)f.push(S);else{const N=me(b,x);N!=null&&(f.push(S),m.set(S,N))}}const I=new wt(f);return new Mu(m,I,u.fieldTransforms)}function qu(r,t,e,n=!1){return me(e,r.dc(n?4:3,t))}function me(r,t){if(ju(r=Rt(r)))return ni("Unsupported field value:",t,r),Bu(r,t);if(r instanceof Ue)return function(n,i){if(!Ou(i.oc))throw i.Tc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Tc(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.cc&&t.oc!==4)throw t.Tc("Nested arrays are not supported");return function(n,i){const o=[];let u=0;for(const c of n){let h=me(c,i.Pc(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(r,t)}return function(n,i){if((n=Rt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Sc(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=et.fromDate(n);return{timestampValue:or(i.serializer,o)}}if(n instanceof et){const o=new et(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:or(i.serializer,o)}}if(n instanceof Ys)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof xe)return{bytesValue:Za(i.serializer,n._byteString)};if(n instanceof Et){const o=i.databaseId,u=n.firestore._databaseId;if(!u.isEqual(o))throw i.Tc(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Os(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Xs)return function(u,c){return{mapValue:{fields:{[Ca]:{stringValue:Da},[nr]:{arrayValue:{values:u.toArray().map(f=>{if(typeof f!="number")throw c.Tc("VectorValues must only contain numeric values.");return bs(c.serializer,f)})}}}}}}(n,i);throw i.Tc(`Unsupported field value: ${wr(n)}`)}(r,t)}function Bu(r,t){const e={};return Aa(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ee(r,(n,i)=>{const o=me(i,t.uc(n));o!=null&&(e[n]=o)}),{mapValue:{fields:e}}}function ju(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof et||r instanceof Ys||r instanceof xe||r instanceof Et||r instanceof Ue||r instanceof Xs)}function ni(r,t,e){if(!ju(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const n=wr(e);throw n==="an object"?t.Tc(r+" a custom object"):t.Tc(r+" "+n)}}function As(r,t,e){if((t=Rt(t))instanceof In)return t._internalPath;if(typeof t=="string")return ri(r,t);throw cr("Field path arguments must be of type string or ",r,!1,void 0,e)}const qd=new RegExp("[~\\*/\\[\\]]");function ri(r,t,e){if(t.search(qd)>=0)throw cr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new In(...t.split("."))._internalPath}catch{throw cr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function cr(r,t,e,n,i){const o=n&&!n.isEmpty(),u=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||u)&&(h+=" (found",o&&(h+=` in field ${n}`),u&&(h+=` in document ${i}`),h+=")"),new D(P.INVALID_ARGUMENT,c+r+h)}function zu(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(t,e,n,i,o){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Bd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Cr("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Bd extends si{data(){return super.data()}}function Cr(r,t){return typeof t=="string"?ri(r,t):t instanceof In?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ii{}class Dr extends ii{}function Zd(r,t,...e){let n=[];t instanceof ii&&n.push(t),n=n.concat(e),function(o){const u=o.filter(h=>h instanceof oi).length,c=o.filter(h=>h instanceof Nr).length;if(u>1||u>0&&c>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)r=i._apply(r);return r}class Nr extends Dr{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Nr(t,e,n)}_apply(t){const e=this._parse(t);return $u(t._query,e),new Bt(t.firestore,t.converter,fs(t._query,e))}_parse(t){const e=qe(t.firestore);return function(o,u,c,h,f,m,I){let w;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){ha(I,m);const b=[];for(const x of I)b.push(ca(h,o,x));w={arrayValue:{values:b}}}else w=ca(h,o,I)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||ha(I,m),w=qu(c,u,I,m==="in"||m==="not-in");return tt.create(f,m,w)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function tf(r,t,e){const n=t,i=Cr("where",r);return Nr._create(i,n,e)}class oi extends ii{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new oi(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:St.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,o){let u=i;const c=o.getFlattenedFilters();for(const h of c)$u(u,h),u=fs(u,h)}(t._query,e),new Bt(t.firestore,t.converter,fs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ai extends Dr{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ai(t,e)}_apply(t){const e=function(i,o,u){if(i.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new gn(o,u)}(t._query,this._field,this._direction);return new Bt(t.firestore,t.converter,function(i,o){const u=i.explicitOrderBy.concat([o]);return new he(i.path,i.collectionGroup,u,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(t._query,e))}}function ef(r,t="asc"){const e=t,n=Cr("orderBy",r);return ai._create(n,e)}class ui extends Dr{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ui(t,e,n)}_apply(t){return new Bt(t.firestore,t.converter,sr(t._query,this._limit,this._limitType))}}function nf(r){return kd("limit",r),ui._create("limit",r,"F")}class li extends Dr{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new li(t,e,n)}_apply(t){const e=zd(t,this.type,this._docOrFields,this._inclusive);return new Bt(t.firestore,t.converter,function(i,o){return new he(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,o,i.endAt)}(t._query,e))}}function rf(...r){return li._create("startAfter",r,!1)}function zd(r,t,e,n){if(e[0]=Rt(e[0]),e[0]instanceof si)return function(o,u,c,h,f){if(!h)throw new D(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const m=[];for(const I of Ae(o))if(I.field.isKeyField())m.push(rr(u,h.key));else{const w=h.data.field(I.field);if(fr(w))throw new D(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+I.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(w===null){const S=I.field.canonicalString();throw new D(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${S}' (used as the orderBy) does not exist.`)}m.push(w)}return new Ce(m,f)}(r._query,r.firestore._databaseId,t,e[0]._document,n);{const i=qe(r.firestore);return function(u,c,h,f,m,I){const w=u.explicitOrderBy;if(m.length>w.length)throw new D(P.INVALID_ARGUMENT,`Too many arguments provided to ${f}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const S=[];for(let b=0;b<m.length;b++){const x=m[b];if(w[b].field.isKeyField()){if(typeof x!="string")throw new D(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${f}(), but got a ${typeof x}`);if(!Ns(u)&&x.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${f}() must be a plain document ID, but '${x}' contains a slash.`);const N=u.path.child(W.fromString(x));if(!M.isDocumentKey(N))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${f}() must result in a valid document path, but '${N}' is not because it contains an odd number of segments.`);const z=new M(N);S.push(rr(c,z))}else{const N=qu(h,f,x);S.push(N)}}return new Ce(S,I)}(r._query,r.firestore._databaseId,i,t,e,n)}}function ca(r,t,e){if(typeof(e=Rt(e))=="string"){if(e==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ns(t)&&e.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(W.fromString(e));if(!M.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return rr(r,new M(n))}if(e instanceof Et)return rr(r,e._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wr(e)}.`)}function ha(r,t){if(!Array.isArray(r)||r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function $u(r,t){const e=function(i,o){for(const u of i)for(const c of u.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class $d{convertValue(t,e="none"){switch(Jt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return J(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return ee(t,(i,o)=>{n[i]=this.convertValue(o,e)}),n}convertVectorValue(t){var e,n,i;const o=(i=(n=(e=t.fields)===null||e===void 0?void 0:e[nr].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(u=>J(u.doubleValue));return new Xs(o)}convertGeoPoint(t){return new Ys(J(t.latitude),J(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=mr(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(fn(t));default:return null}}convertTimestamp(t){const e=Yt(t);return new et(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=W.fromString(t);$(iu(n),9688,{name:t});const i=new mn(n.get(1),n.get(3)),o=new M(n.popFirst(5));return i.isEqual(e)||Ut(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Gu extends si{constructor(t,e,n,i,o,u){super(t,e,n,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Cr("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Zn extends Gu{data(t={}){return super.data(t)}}class Gd{constructor(t,e,n,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new un(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Zn(this._firestore,this._userDataWriter,n.key,n,new un(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map(c=>{const h=new Zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:u++}})}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new Zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new un(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,m=-1;return c.type!==0&&(f=u.indexOf(c.doc.key),u=u.delete(c.doc.key)),c.type!==1&&(u=u.add(c.doc),m=u.indexOf(c.doc.key)),{type:Kd(c.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Kd(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(r){r=Pt(r,Et);const t=Pt(r.firestore,re);return Dd(Pr(t),r._key).then(e=>Qd(t,r,e))}class Ku extends $d{constructor(t){super(),this.firestore=t}convertBytes(t){return new xe(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Et(this.firestore,null,e)}}function of(r){r=Pt(r,Bt);const t=Pt(r.firestore,re),e=Pr(t),n=new Ku(t);return jd(r._query),Nd(e,r._query).then(i=>new Gd(t,n,r,i))}function af(r,t,e){r=Pt(r,Et);const n=Pt(r.firestore,re),i=ci(r.converter,t,e);return An(n,[Js(qe(n),"setDoc",r._key,i,r.converter!==null,e).toMutation(r._key,Tt.none())])}function uf(r,t,e,...n){r=Pt(r,Et);const i=Pt(r.firestore,re),o=qe(i);let u;return u=typeof(t=Rt(t))=="string"||t instanceof In?Uu(o,"updateDoc",r._key,t,e,n):Fu(o,"updateDoc",r._key,t),An(i,[u.toMutation(r._key,Tt.exists(!0))])}function lf(r){return An(Pt(r.firestore,re),[new Tr(r._key,Tt.none())])}function cf(r,t){const e=Pt(r.firestore,re),n=Md(r),i=ci(r.converter,t);return An(e,[Js(qe(r.firestore),"addDoc",n._key,i,r.converter!==null,{}).toMutation(n._key,Tt.exists(!1))]).then(()=>n)}function An(r,t){return function(n,i){const o=new Ft;return n.asyncQueue.enqueueAndForget(async()=>yd(await Cd(n),i,o)),o.promise}(Pr(r),t)}function Qd(r,t,e){const n=e.docs.get(t._key),i=new Ku(r);return new Gu(r,i,t._key,n,new un(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=qe(t)}set(t,e,n){this._verifyNotCommitted();const i=os(t,this._firestore),o=ci(i.converter,e,n),u=Js(this._dataReader,"WriteBatch.set",i._key,o,i.converter!==null,n);return this._mutations.push(u.toMutation(i._key,Tt.none())),this}update(t,e,n,...i){this._verifyNotCommitted();const o=os(t,this._firestore);let u;return u=typeof(e=Rt(e))=="string"||e instanceof In?Uu(this._dataReader,"WriteBatch.update",o._key,e,n,i):Fu(this._dataReader,"WriteBatch.update",o._key,e),this._mutations.push(u.toMutation(o._key,Tt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=os(t,this._firestore);return this._mutations=this._mutations.concat(new Tr(e._key,Tt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function os(r,t){if((r=Rt(r)).firestore!==t)throw new D(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}function hf(){return new Zs("serverTimestamp")}function df(...r){return new ti("arrayUnion",r)}function ff(...r){return new ei("arrayRemove",r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(r){return Pr(r=Pt(r,re)),new Wd(r,t=>An(r,t))}(function(t,e=!0){(function(i){Me=i})(Ul),Cl(new Dl("firestore",(n,{instanceIdentifier:i,options:o})=>{const u=n.getProvider("app").getImmediate(),c=new re(new jl(n.getProvider("auth-internal")),new Gl(u,n.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new mn(f.options.projectId,m)}(u,i),u);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),ho(mo,po,t),ho(mo,po,"esm2017")})();export{sf as a,of as b,Xd as c,Md as d,tf as e,lf as f,Jd as g,cf as h,rf as i,af as j,ff as k,nf as l,df as m,ef as o,Zd as q,hf as s,uf as u,mf as w};
