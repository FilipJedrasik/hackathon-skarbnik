import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/auth'
import user from './store/user'
import teachers from './store/teachers'
import parents from './store/parents'
import classes from './store/classes'
import students from './store/students'
import payments from './store/payments'
import payment_details from './store/payment_details'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    teachers,
    parents,
    classes,
    payments,
    payment_details,
    students
  }
})
