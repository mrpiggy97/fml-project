(function(e){function t(t){for(var a,n,o=t[0],c=t[1],u=t[2],l=0,h=[];l<o.length;l++)n=o[l],s[n]&&h.push(s[n][0]),s[n]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(h.length)h.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],a=!0,n=1;n<r.length;n++){var o=r[n];0!==s[o]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},n={app:0},s={app:0},i=[];function o(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"db85a2be"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={about:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=new Promise(function(t,r){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"a2185f62"}[e]+".css",s=c.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===s))return t()}var h=document.getElementsByTagName("style");for(o=0;o<h.length;o++){u=h[o],l=u.getAttribute("data-href");if(l===a||l===s)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||s,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete n[e],d.parentNode.removeChild(d),r(i)},d.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(d)}).then(function(){n[e]=0}));var a=s[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise(function(t,r){a=s[e]=[t,r]});t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(e),u=function(t){l.onerror=l.onload=null,clearTimeout(h);var r=s[e];if(0!==r){if(r){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+a+": "+n+")");i.type=a,i.request=n,r[1](i)}s[e]=void 0}};var h=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var h=0;h<u.length;h++)t(u[h]);var d=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var a=r("64a9"),n=r.n(a);n.a},"0e64":function(e,t,r){"use strict";var a=r("8cb8"),n=r.n(a);n.a},1571:function(e,t,r){"use strict";var a=r("233a"),n=r.n(a);n.a},"1b84":function(e,t,r){},"233a":function(e,t,r){},"316d":function(e,t,r){"use strict";var a=r("1b84"),n=r.n(a);n.a},3207:function(e,t,r){},4056:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container",attrs:{id:"app"}},[r("div",{staticClass:"header"},[r("main-header")],1),r("div",{staticClass:"views-section"},[r("router-view")],1),e._m(0)])},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"footer"},[r("span",{staticClass:"home"},[e._v("FML")]),r("span",{staticClass:"home"},[e._v("all rights reserved")])])}],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header-component"},[r("transition",{attrs:{name:"slide"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.showMenu,expression:"showMenu"}],staticClass:"slide-menu"},[r("div",{staticClass:"mobile-home"},[r("i",{staticClass:"fa fa-home mobile-navbar",on:{click:e.redirectHome}})]),r("div",{staticClass:"mobile-about"},[r("span",{on:{click:e.redirectAbout}},[e._v("about")])])])]),r("div",{staticClass:"navbar"},[e.isMobile?r("div",{staticClass:"links"},[r("i",{staticClass:"fa fa-bars",on:{click:e.slideMenu}})]):r("div",{staticClass:"links"},[r("span",{staticClass:"logo generic-navbar",on:{click:e.redirectHome}},[e._v("FML")]),r("span",{staticClass:"generic-navbar",on:{click:e.redirectHome}},[e._v("Home")]),r("span",{staticClass:"generic-navbar",on:{click:e.redirectAbout}},[e._v("about the app")])]),!1===e.isMobile?r("div",{staticClass:"search"},[r("search-form")],1):e._e()]),r("transition",{attrs:{name:"slide"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.track,expression:"track"}],staticClass:"player"},[e.track?r("track-player",{attrs:{info:e.track}}):e._e()],1)])],1)},o=[],c=r("cebc"),u=r("2f62"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"player-component",style:{backgroundImage:e.image_url}},[r("audio",{ref:"player",attrs:{src:e.song_preview,volume:e.volume_converter},on:{timeupdate:e.logTime}}),e.paused?r("i",{staticClass:"fa fa-play-circle-o player",on:{click:e.play}}):r("i",{staticClass:"fa fa-pause-circle-o player",on:{click:e.pause}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.volume,expression:"volume"}],staticClass:"volume",attrs:{type:"range",min:"0",max:"100"},domProps:{value:e.volume},on:{__r:function(t){e.volume=t.target.value}}}),r("input",{ref:"timer",staticClass:"timer",attrs:{type:"range",min:"0",max:"30"},domProps:{value:e.timer},on:{change:e.logSeeked}})])},h=[],d=(r("7f7f"),{name:"TrackPlayer",props:{info:{type:Object,required:!0}},data:function(){return{timer:0,volume:25,paused:!0}},computed:{song_preview:function(){var e=null;return this.info.preview_url&&(e=this.info.preview_url),e},image_url:function(){var e=null;return this.info.album&&(e="url(".concat(this.info.album.images[0].url,")")),e},track_name:function(){var e=null;return this.info.name&&(e=this.info.name),e},volume_converter:function(){return this.volume/100}},methods:{play:function(){if(!1===this.paused)return null;this.$refs.player.play(),this.paused=!1},pause:function(){if(!0===this.paused)return null;this.$refs.player.pause(),this.paused=!0},logTime:function(){this.timer=this.$refs.player.currentTime,this.timer>29.91&&(this.timer=0)},logSeeked:function(){this.timer=this.$refs.timer.value,this.$refs.player.currentTime=this.timer}}}),m=d,p=(r("316d"),r("2877")),f=Object(p["a"])(m,l,h,!1,null,"05992b38",null),v=f.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"searchform-component"},[r("form",{staticClass:"search-form",on:{submit:e.sendQuery}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],staticClass:"search-input",attrs:{type:"text"},domProps:{value:e.query},on:{input:function(t){t.target.composing||(e.query=t.target.value)}}}),e._m(0)])])},k=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"search-button",attrs:{type:"submit"}},[r("i",{staticClass:"fa fa-search"})])}],w={name:"SearchForm",data:function(){return{query:""}},methods:Object(c["a"])({},Object(u["c"])(["setQuery"]),{sendQuery:function(e){e.preventDefault(),this.setQuery(this.query),"about"==this.$route.name&&this.$router.history.push({name:"tracks"})}})},g=w,y=(r("0e64"),Object(p["a"])(g,b,k,!1,null,"33a172fa",null)),_=y.exports,C={name:"MainHeader",data:function(){return{showMenu:!1,isMobile:window.screen.width<=769,query:""}},components:{TrackPlayer:v,SearchForm:_},computed:Object(c["a"])({},Object(u["d"])(["track"])),methods:{slideMenu:function(){this.showMenu=!0!==this.showMenu},redirectHome:function(){this.$router.history.push({name:"tracks"})},redirectAbout:function(){this.$router.history.push({name:"about"})},onReszie:function(){this.isMobile=window.screen.width<=769}},mounted:function(){window.addEventListener("resize",this.onReszie)}},j=C,O=(r("6705"),Object(p["a"])(j,i,o,!1,null,null,null)),T=O.exports,x={name:"App",components:{MainHeader:T},methods:{redirectHome:function(){this.$router.history.push({name:"tracks"})}}},M=x,E=(r("034f"),Object(p["a"])(M,n,s,!1,null,null,null)),L=E.exports,q=r("8c4f"),$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tracks-component"},[r("div",{staticClass:"loader"},[r("transition",{attrs:{name:"slide"}},[r("p",{directives:[{name:"show",rawName:"v-show",value:e.showLoader,expression:"showLoader"}],staticClass:"loader"})])],1),e.isMobile?r("div",{staticClass:"searching-tracks"},[e.isMobile?r("search-form"):e._e()],1):e._e(),r("div",{staticClass:"message"},[r("transition",{attrs:{name:"slide"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.showMessage,expression:"showMessage"}],staticClass:"message-text"},[e._v(e._s(e.message))])])],1),r("div",{staticClass:"tracks"},e._l(e.tracks,function(t){return r("track-info",{key:t.id,attrs:{appear:e.showTrack,info:t}})}),1)])},A=[],S=(r("96cf"),r("3b8d")),N=(r("386d"),r("bc3a")),P=r.n(N),z={base:"https://platzi-music-api.now.sh",search:"https://platzi-music-api.now.sh/search",track:"https://platzi-music-api.now.sh/tracks/:id"},H=z;function R(e){return P()({method:"get",url:H.search,params:{type:"track",q:e},timeout:5e3})}var D=R,F=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"trackinfo-component",class:[e.has_preview_url?"has-track":"no-track",e.selected?"selected":"unselected"],on:{click:e.selectTrack}},[r("transition",{attrs:{name:"slide"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.appear,expression:"appear"}],staticClass:"track-image",style:{backgroundImage:e.image_url}},[r("div",{staticClass:"track-name"},[r("span",[e._v("Name")]),r("span",[e._v(e._s(e.track_name))])])])]),r("transition",{attrs:{name:"slide"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.appear,expression:"appear"}],staticClass:"track-artists"},[r("span",[e._v("artists:")]),e._l(e.artists,function(t){return r("span",{key:t.name},[e._v(e._s(t.name))])}),r("i",{staticClass:"fa fa-play w3-large play-icon"})],2)])],1)},I=[],Q={name:"TrackInfo",props:{info:{type:Object,required:!0},appear:{type:Boolean,required:!0}},computed:Object(c["a"])({},Object(u["d"])(["track"]),{selected:function(){var e=!1,t=this.track instanceof Object;return!0===t&&this.track.id==this.id&&(e=!0),e},image_url:function(){var e=null;return this.info.album&&this.info.album.images[0]&&(e="url(".concat(this.info.album.images[0].url,")")),e},artists:function(){var e=[],t=this.info.album.artists;return t.map(function(t){return e.push(t)}),e},id:function(){return this.info.id},track_name:function(){return this.info.name},has_preview_url:function(){return null!==this.info.preview_url}}),methods:Object(c["a"])({},Object(u["b"])(["getTrack"]),{selectTrack:function(){if(!0===this.has_preview_url)this.getTrack(this.id);else if(!1===this.has_preview_url)return null}})},B=Q,J=(r("1571"),Object(p["a"])(B,F,I,!1,null,"6d602205",null)),K=J.exports,U=r("5118"),G={name:"Tracks",data:function(){return{tracks:[],tracksLoading:!0,backendError:!1,showMessage:!1,showLoader:!0,showTrack:!1,isMobile:window.screen.width<=769}},watch:{query:function(e){this.getTracks(e)}},computed:Object(c["a"])({},Object(u["d"])(["query"]),{message:function(){var e=null;return!0===this.backendError?e="there was an error with the servers":!1===this.tracksLoading&&(e="we found ".concat(this.tracks.length," tracks")),e}}),methods:Object(c["a"])({},Object(u["b"])(["getTrack"]),{tracksAreLoading:function(){!0===this.backendError&&(this.backendError=!1),this.showTrack=!1,this.showMessage=!1,this.showLoader=!0,this.tracksLoading=!0},tracksAreDoneLoading:function(){this.tracksLoading=!1,this.showLoader=!1,this.showMessage=!0,this.showTrack=!0},getTracks:function(){var e=Object(S["a"])(regeneratorRuntime.mark(function e(t){var r,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.tracksAreLoading(),e.prev=1,e.next=4,D(t);case 4:r=e.sent,this.tracks=r.data.tracks.items,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),this.backendError=!0;case 11:Object(U["setTimeout"])(function(){a.tracksAreDoneLoading()},1e3);case 12:case"end":return e.stop()}},e,this,[[1,8]])}));function t(t){return e.apply(this,arguments)}return t}(),presentApp:function(){var e=Object(S["a"])(regeneratorRuntime.mark(function e(t){var r,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D(t);case 3:r=e.sent,this.tracks=r.data.tracks.items,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.backendError=!0;case 10:Object(U["setTimeout"])(function(){a.tracksAreDoneLoading()},1500),this.tracks.length>=3&&Object(U["setTimeout"])(function(){a.getTrack(a.tracks[3].id)},2e3);case 12:case"end":return e.stop()}},e,this,[[0,7]])}));function t(t){return e.apply(this,arguments)}return t}(),onResize:function(){this.isMobile=window.screen.width<=769}}),components:{TrackInfo:K,SearchForm:_},created:function(){null===this.query?this.presentApp("aerosmith"):this.presentApp(this.query)},mounted:function(){window.addEventListener("resize",this.onResize)}},V=G,W=(r("e415"),Object(p["a"])(V,$,A,!1,null,null,null)),X=W.exports;a["a"].use(q["a"]);var Y=new q["a"]({mode:"history",base:"/",routes:[{path:"/",name:"tracks",component:X},{path:"/about",name:"about",component:function(){return r.e("about").then(r.bind(null,"f820"))}}]});r("a481");function Z(e){var t=H.track.replace(":id",e);return P()({method:"get",url:t,timeout:5e3})}var ee=Z;a["a"].use(u["a"]);var te=new u["a"].Store({state:{track:"",query:null},mutations:{setTrack:function(e,t){e.track=t},setQuery:function(e,t){e.query=t}},actions:{getTrack:function(e,t){ee(t).then(function(t){e.commit("setTrack",t.data)}).catch(function(){e.commit("setTrack",null)})}}});a["a"].config.productionTip=!1,new a["a"]({router:Y,store:te,render:function(e){return e(L)}}).$mount("#app")},"64a9":function(e,t,r){},6705:function(e,t,r){"use strict";var a=r("4056"),n=r.n(a);n.a},"8cb8":function(e,t,r){},e415:function(e,t,r){"use strict";var a=r("3207"),n=r.n(a);n.a}});
//# sourceMappingURL=app.412fc75f.js.map