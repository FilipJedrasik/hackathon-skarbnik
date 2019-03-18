import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import user from './user'
// import teachers from './teachers'
// import parents from './parents'
// import classes from './classes'
// import students from './students'
// import supervisor from './supervisor'
// import payments from './payments'
// import payment_details from './payment_details'
import utilModal from './utilModal'

//import counter from './counter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    //teachers,
    //parents,
    //classes,
    //payments,
    //payment_details,
    //students,
    //counter,
    //supervisor,
    utilModal
  }
})