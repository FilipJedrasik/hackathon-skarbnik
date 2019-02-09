(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fc9e0d4"],{2909:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function a(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(e){return r(e)||a(e)||i()}n.d(t,"a",function(){return s})},"70c8":function(e,t,n){"use strict";var r=n("8cc7"),a=n.n(r);a.a},"8cc7":function(e,t,n){},de53:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{xs12:""}},[n("util-modal",{attrs:{type:e.response.type,content:null!==e.response.content?e.response.content:void 0,header:null!==e.response.header?e.response.header:void 0,ok:null!==e.response.ok?e.response.ok:void 0,cancel:null!==e.response.cancel?e.response.cancel:void 0,okDisabled:e.processing},on:{ok:e.asDeleteTeacher,cancel:function(t){e.response.modal=!1}},model:{value:e.response.modal,callback:function(t){e.$set(e.response,"modal",t)},expression:"response.modal"}}),n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("Nauczyciele")]),n("v-spacer"),n("br"),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.teachers.length,expression:"teachers.length"}],staticClass:"mb-2",attrs:{color:"primary",disabled:e.loading,dark:!e.loading},on:{click:e.showAddModal}},[e._v(e._s(e.$vuetify.breakpoint.xsOnly?"+":"Dodaj nauczyciela"))]),n("v-dialog",{attrs:{"max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),n("v-form",{ref:"teacherform",attrs:{"lazy-validation":""},on:{submit:function(t){-1===e.editedIndex?e.add():e.edit()}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-card-text",[n("v-container",{attrs:{"grid-list-md":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{"prepend-icon":"assignment_ind",rules:e.nameRules,label:"Imię i nazwisko",required:""},nativeOn:{keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,"Escape"))return null;e.dialog=!1},function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;(e.valid||JSON.stringify(e.teacher)!==JSON.stringify(e.beforeEdit))&&(-1===e.editedIndex?e.add():e.edit())}]},model:{value:e.teacher.name,callback:function(t){e.$set(e.teacher,"name",t)},expression:"teacher.name"}})],1),n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{"prepend-icon":"mail",rules:e.emailUsed,label:"Adres email",required:""},nativeOn:{keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,"Escape"))return null;e.dialog=!1},function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;(e.valid||JSON.stringify(e.teacher)!==JSON.stringify(e.beforeEdit))&&(-1===e.editedIndex?e.add():e.edit())}]},model:{value:e.teacher.email,callback:function(t){e.$set(e.teacher,"email",t)},expression:"teacher.email"}})],1),n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{"prepend-icon":"person",rules:e.loginUsed,label:"Login",required:""},nativeOn:{keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,"Escape"))return null;e.dialog=!1},function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;(e.valid||JSON.stringify(e.teacher)!==JSON.stringify(e.beforeEdit))&&(-1===e.editedIndex?e.add():e.edit())}]},model:{value:e.teacher.username,callback:function(t){e.$set(e.teacher,"username",t)},expression:"teacher.username"}})],1),-1===e.editedIndex?n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{"prepend-icon":"lock",rules:e.passwordRules,label:"Hasło",type:"password",required:""},nativeOn:{keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key,"Escape"))return null;e.dialog=!1},function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;(e.valid||JSON.stringify(e.teacher)!==JSON.stringify(e.beforeEdit))&&(-1===e.editedIndex?e.add():e.edit())}]},model:{value:e.teacher.password,callback:function(t){e.$set(e.teacher,"password",t)},expression:"teacher.password"}})],1):e._e()],1),n("div",{staticStyle:{"text-align":"right"}},[n("v-btn",{attrs:{color:"secondary"},nativeOn:{click:function(t){e.dialog=!1}}},[e._v("Anuluj")]),n("v-btn",{attrs:{color:"primary",disabled:!e.valid||JSON.stringify(e.teacher)===JSON.stringify(e.beforeEdit)||e.processing},nativeOn:{click:function(t){-1===e.editedIndex?e.add():e.edit()}}},[e._v(e._s(e.submitTitle))])],1)],1)],1)],1)],1)],1),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.loading?[]:e.teachers,loading:e.loading,"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(t){return[n("td",[e._v(e._s(t.item.name))]),e.$vuetify.breakpoint.xsOnly?e._e():[n("td",[e._v(e._s(t.item.email))]),n("td",[e._v(e._s(t.item.username))])],e.$vuetify.breakpoint.mdAndUp?[n("td",[e._v(e._s(t.item.password))])]:e._e(),n("td",{staticClass:"justify-center layout px-0"},[n("v-icon",{staticClass:"mr-2",attrs:{color:"blue"},on:{click:function(n){e.editItem(t.item)}}},[e._v("\n                    edit\n                ")]),n("v-icon",{attrs:{color:"red"},on:{click:function(n){e.deleteItem(t.item)}}},[e._v("\n                    delete\n                ")])],1)]}}])},[e.loading?n("v-progress-linear",{attrs:{slot:"progress",color:"blue",indeterminate:""},slot:"progress"}):e._e(),n("template",{slot:"no-data"},[n("div",{staticStyle:{"text-align":"center",padding:"15px 0"}},[e.loading?n("v-progress-circular",{attrs:{size:70,color:"primary",indeterminate:""}}):n("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.dialog=!0}}},[e._v("Utwórz konto nauczyciela")])],1)])],2)],1)},a=[],i=(n("7f7f"),n("20d6"),n("f751"),n("96cf"),n("1da1")),s=n("2909"),o=n("e8dc"),c={email:"",name:"",password:"",username:""},l={data:function(){return{processing:!1,loading:!1,dialog:!1,valid:!1,beforeEdit:{},response:{type:"error",modal:!1,content:null,ok:null,cancel:null},teacher:c,deletingTeacher:{teacher:{},index:null},editedIndex:-1}},computed:{formTitle:function(){return-1===this.editedIndex?"Dodawanie nauczyciela":"Edytowanie nauczyciela"},submitTitle:function(){return-1===this.editedIndex?"Dodaj":"Zapisz"},teachers:function(){return this.$store.getters["teachers/getTeachers"]},emailUsed:function(){var e=this;return Object(s["a"])(this.emailRules).concat([function(t){return null!=t&&Array.isArray(e.teachers)&&0==e.teachers.filter(function(n){return-1!=e.editedIndex?e.beforeEdit.email!==n.email&&n.email==t.trim():n.email==t.trim()}).length||"Podany email jest już zajęty"}])},loginUsed:function(){var e=this;return Object(s["a"])(this.loginRules).concat([function(t){return null!=t&&Array.isArray(e.teachers)&&0==e.teachers.filter(function(n){return-1!=e.editedIndex?e.beforeEdit.username!==n.username&&n.username==t.trim():n.username==t.trim()}).length||"Podany login jest już zajęty"}])},headers:function(){return this.$vuetify.breakpoint.xsOnly?[{text:"Imię i nazwisko",value:"name"},{text:"Akcje",value:"name",sortable:!1}]:this.$vuetify.breakpoint.mdAndUp?[{text:"Imię i nazwisko",value:"name"},{text:"Email",value:"email"},{text:"Login",value:"login"},{text:"Hasło",value:"password"},{text:"Akcje",value:"name",sortable:!1}]:[{text:"Imię i nazwisko",value:"name"},{text:"Email",value:"email"},{text:"Login",value:"login"},{text:"Akcje",value:"name",sortable:!1}]}},methods:{add:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$refs.teacherform.validate()){e.next=21;break}return this.response.ok=null,this.response.cancel=null,e.prev=3,this.asyncProcess(!0),e.next=7,this.$store.dispatch("teachers/addTeacher",this.teacher);case 7:this.dialog=!1,this.teacher=Object.assign({},c),this.asyncProcess(!1),this.response.content="Udało się dodać nauczyciela",this.response.type="success",this.response.modal=!0,e.next=21;break;case 15:e.prev=15,e.t0=e["catch"](3),this.asyncProcess(!1),this.response.content=e.t0,this.response.type="error",this.response.modal=!0;case 21:case"end":return e.stop()}},e,this,[[3,15]])}));return function(){return e.apply(this,arguments)}}(),edit:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$refs.teacherform.validate()){e.next=22;break}return this.response.ok=null,this.response.cancel=null,e.prev=3,delete this.teacher.password,this.asyncProcess(!0),e.next=8,this.$store.dispatch("teachers/updateTeacher",{teacher:this.teacher,id:this.teacher.id_field});case 8:this.dialog=!1,this.teacher=Object.assign({},c),this.asyncProcess(!1),this.response.content="Udało się zaaktualizować nauczyciela",this.response.type="success",this.response.modal=!0,e.next=22;break;case 16:e.prev=16,e.t0=e["catch"](3),this.asyncProcess(!1),this.response.content=e.t0,this.response.type="error",this.response.modal=!0;case 22:case"end":return e.stop()}},e,this,[[3,16]])}));return function(){return e.apply(this,arguments)}}(),editItem:function(e){this.editedIndex=this.teachers.findIndex(function(t){return t.id_field===e.id_field}),this.beforeEdit=Object.assign({},e),this.teacher=Object.assign({},e),this.dialog=!0},deleteItem:function(e){this.response.header="Uwaga",this.response.content="Czy na pewno chcesz usunąć konto ".concat(e.name,"?"),this.response.ok="Tak",this.response.cancel="Anuluj",this.response.type="error",this.response.modal=!0,this.deletingTeacher.teacher=e,this.deletingTeacher.index=this.teachers.findIndex(function(t){return t.id_field===e.id_field})},asDeleteTeacher:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.asyncProcess(!0),e.next=4,this.$store.dispatch("teachers/deleteTeacher",this.deletingTeacher.teacher.id_field);case 4:this.response.modal=!1,this.deletingTeacher={teacher:{},index:null},this.asyncProcess(!1),e.next=17;break;case 9:e.prev=9,e.t0=e["catch"](0),this.asyncProcess(!1),this.response.content=e.t0,this.response.type="error",this.response.modal=!0,this.response.ok=null,this.response.cancel=null;case 17:case"end":return e.stop()}},e,this,[[0,9]])}));return function(){return e.apply(this,arguments)}}(),showAddModal:function(){this.editedIndex=-1,this.teacher=Object.assign({},c),this.beforeEdit=Object.assign({},c),this.$refs.teacherform.resetValidation(),this.dialog=!0}},components:{UtilModal:o["a"]},created:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,this.$store.dispatch("teachers/getTeachers");case 3:this.loading=!1;case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},d=l,u=(n("70c8"),n("2877")),h=n("6544"),p=n.n(h),f=n("8336"),m=n("b0af"),v=n("99d9"),y=n("12b2"),g=n("a523"),b=n("8fea"),k=n("169a"),x=n("0e8f"),w=n("4bd4"),_=n("132d"),O=n("490a"),j=n("8e36"),I=n("9910"),T=n("2677"),E=n("71d9"),z=n("2a7f"),A=Object(u["a"])(d,r,a,!1,null,"dbdd3894",null);A.options.__file="TeachersAdminView.vue";t["default"]=A.exports;p()(A,{VBtn:f["a"],VCard:m["a"],VCardText:v["a"],VCardTitle:y["a"],VContainer:g["a"],VDataTable:b["a"],VDialog:k["a"],VFlex:x["a"],VForm:w["a"],VIcon:_["a"],VProgressCircular:O["a"],VProgressLinear:j["a"],VSpacer:I["a"],VTextField:T["a"],VToolbar:E["a"],VToolbarTitle:z["b"]})}}]);
//# sourceMappingURL=chunk-0fc9e0d4.2b8ad4bb.js.map