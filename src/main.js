import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Rules from './rules'
import Async from './mixins/async'

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API;

import './plugins/vuetify'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  data: () => (Rules)
});

Vue.mixin(Async);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
