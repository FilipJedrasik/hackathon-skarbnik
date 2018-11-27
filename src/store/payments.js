import Vue from 'vue'
import store from './../store'

export default {
  namespaced: true,
  state: {
    payments: {}
  },

  getters: {
    getPayments: state => state.payments
  },

  mutations: {
    setPayments(state, payload){
      state.payments = payload;
    },
    updatePayments(state, payload){
      state.payments[payload.id] = payload.payments;
    },
    deletePayments(state, payload){
      state.payments.split(payload, 1);
    },
    addPayments(state, payload){
      state.payments.push(payload);
    }
  },

  actions: {
    getPayments: async ({commit}) => {
      try{
        //let {data} = await Vue.axios.get('class/?user=' + store.getters['user/getUser'].id);
        //console.log(data);
        let {data} = await Vue.axios.get('payment/');

        commit('setPayments', data);
      } catch(e){
        console.log('Payment', e);
      }
    },
    updatePayment: async ({commit}, payment) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_UPDATE_PAYMENT + payment.id,
            payment
        );
        commit('updatePayment', payment);
      } catch(e){
        console.log('Payment', e);
      }
    },
    deletePayment: async ({commit}, payment) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_DELETE_PAYMENT + payment
        );
        commit('deletePayment', payment);
      } catch(e){
        console.log('Payment', e);
      }
    },
    addPayment: async ({commit}, payment) => {
      try{
        await Vue.axios.post(
            'payment/',
            payment
        );
        commit('addPayments', payment);
      } catch(e){
        console.log('Payment', e);
      }
    }
  }
}