(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dacc6"],{"6cad":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"inspire"}},[i("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list",{attrs:{dense:""}},[t._l(t.items,function(e){return[i("v-list-tile",{key:e.text,on:{click:function(i){t.$router.push(e.target)}}},[i("v-list-tile-action",[i("v-icon",[t._v(t._s(e.icon))])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1)]})],2)],1),i("v-toolbar",{attrs:{"clipped-left":t.$vuetify.breakpoint.lgAndUp,color:"primary",dark:"",app:"",fixed:""}},[i("v-toolbar-title",{staticClass:"ml-0",staticStyle:{width:"300px"}},[i("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("span",{staticClass:"hidden-sm-and-down"},[t._v("Skarbnik")])],1),i("h3",{staticStyle:{"white-space":"nowrap"}},[t._v(t._s(t.firstName))])],1),i("v-content",[i("v-container",{attrs:{fluid:"","fill-height":""}},[i("v-layout",{attrs:{"justify-center":"","align-start":""}},[i("router-view")],1)],1)],1)],1)},n=[],r=(i("7f7f"),i("28a5"),{beforeRouteEnter:function(t,e,i){"/supervisor"===t.fullPath?i("/supervisor/payments"):i()},data:function(){return{dialog:!1,drawer:null,items:[{icon:"attach_money",text:"Zbiórki",target:"/supervisor/payments"},{icon:"exit_to_app",text:"Wyloguj",target:"/logout"}]}},computed:{firstName:function(){return this.$store.getters["user/getUser"].name.split(" ")[0]}},props:{source:String}}),o=r,s=i("2877"),l=i("6544"),c=i.n(l),p=i("7496"),u=i("a523"),d=i("549c"),v=i("132d"),f=i("a722"),w=i("8860"),b=i("ba95"),g=i("40fe"),m=i("5d23"),V=i("f774"),_=i("71d9"),h=i("706c"),k=i("2a7f"),y=Object(s["a"])(o,a,n,!1,null,null,null);y.options.__file="WelcomeSupervisorView.vue";e["default"]=y.exports;c()(y,{VApp:p["a"],VContainer:u["a"],VContent:d["a"],VIcon:v["a"],VLayout:f["a"],VList:w["a"],VListTile:b["a"],VListTileAction:g["a"],VListTileContent:m["a"],VListTileTitle:m["b"],VNavigationDrawer:V["a"],VToolbar:_["a"],VToolbarSideIcon:h["a"],VToolbarTitle:k["a"]})}}]);
//# sourceMappingURL=chunk-2d0dacc6.bdb65963.js.map