(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1154ac2c"],{7068:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[t._l(t.items,function(e){return[e.heading?n("v-layout",{key:e.heading,attrs:{row:"","align-center":""}},[n("v-flex",{attrs:{xs6:""}},[e.heading?n("v-subheader",[t._v("\n              "+t._s(e.heading)+"\n            ")]):t._e()],1),n("v-flex",{staticClass:"text-xs-center",attrs:{xs6:""}},[n("a",{staticClass:"body-2 black--text",attrs:{href:"#!"}},[t._v("EDIT")])])],1):e.children?n("v-list-group",{key:e.text,attrs:{"prepend-icon":e.model?e.icon:e["icon-alt"],"append-icon":""},model:{value:e.model,callback:function(n){t.$set(e,"model",n)},expression:"item.model"}},[n("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("\n                "+t._s(e.text)+"\n              ")])],1)],1),t._l(e.children,function(e,i){return n("v-list-tile",{key:i,on:{click:function(t){}}},[e.icon?n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1):t._e(),n("v-list-tile-content",[n("v-list-tile-title",[t._v("\n                "+t._s(e.text)+"\n              ")])],1)],1)})],2):n("v-list-tile",{key:e.text,on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1)]})],2)],1),n("v-toolbar",{attrs:{"clipped-left":t.$vuetify.breakpoint.lgAndUp,color:"primary",dark:"",app:"",fixed:""}},[n("v-toolbar-title",{staticClass:"ml-0",staticStyle:{width:"300px"}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("span",{staticClass:"hidden-sm-and-down"},[t._v("Google Contacts")])],1),n("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","hide-details":"","prepend-inner-icon":"search",label:"Search"}}),n("h3",[t._v("Skarbnik")]),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("notifications")])],1)],1),n("v-content",[n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"justify-center":"","align-center":""}},[t._v("\n        Page\n      ")])],1)],1)],1)},a=[],o={data:function(){return{dialog:!1,drawer:null,items:[{icon:"contacts",text:"Contacts"},{icon:"history",text:"Frequently contacted"},{icon:"content_copy",text:"Duplicates"},{icon:"keyboard_arrow_up","icon-alt":"keyboard_arrow_down",text:"Labels",model:!0,children:[{icon:"add",text:"Create label"}]},{icon:"keyboard_arrow_up","icon-alt":"keyboard_arrow_down",text:"More",model:!1,children:[{text:"Import"},{text:"Export"},{text:"Print"},{text:"Undo changes"},{text:"Other contacts"}]},{icon:"settings",text:"Settings"},{icon:"chat_bubble",text:"Send feedback"},{icon:"help",text:"Help"},{icon:"phonelink",text:"App downloads"},{icon:"keyboard",text:"Go to the old version"}]}},props:{source:String}},s=o,l=n("2877"),r=n("6544"),c=n.n(r),d=n("7496"),v=n("8336"),p=n("a523"),u=n("549c"),b=n("0e8f"),h=n("132d"),f=n("a722"),x=n("8860"),_=n("56b0"),w=n("ba95"),k=n("40fe"),y=n("5d23"),g=n("f774"),m=n("e0c7"),V=n("2677"),C=n("71d9"),T=n("706c"),L=n("2a7f"),S=Object(l["a"])(s,i,a,!1,null,null,null);S.options.__file="AppView.vue";e["default"]=S.exports;c()(S,{VApp:d["a"],VBtn:v["a"],VContainer:p["a"],VContent:u["a"],VFlex:b["a"],VIcon:h["a"],VLayout:f["a"],VList:x["a"],VListGroup:_["a"],VListTile:w["a"],VListTileAction:k["a"],VListTileContent:y["a"],VListTileTitle:y["b"],VNavigationDrawer:g["a"],VSubheader:m["a"],VTextField:V["a"],VToolbar:C["a"],VToolbarSideIcon:T["a"],VToolbarTitle:L["a"]})},"90bd":function(t,e,n){},e0c7:function(t,e,n){"use strict";n("90bd");var i=n("6a18"),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};e["a"]={name:"v-subheader",mixins:[i["a"]],props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:a({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}}}}]);
//# sourceMappingURL=chunk-1154ac2c.983dc41c.js.map