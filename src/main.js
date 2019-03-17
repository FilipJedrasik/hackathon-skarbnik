import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'
import store from './store/index'
import Async from '@/mixins/async'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#FA3CB1',
    secondary: '#5CC5EA'
  }
})

import utilRules from '@/utils/rules'

Vue.use(VueAxios, axios)
Vue.mixin(Async)

Vue.axios.defaults.baseURL = process.env.VUE_APP_API;
Vue.config.productionTip = false

Vue.mixin({
  data: () => (utilRules)
})

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app')
