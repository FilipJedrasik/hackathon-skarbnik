import Vue from 'vue'

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
    updatePayment(state, payload){
      Vue.set(state.payments, state.payments.findIndex(v => v.id_field == payload.id), payload);
    },
    deletePayment(state, id){
      state.payments.splice(state.payments.findIndex(v => v.id_field == id), 1);
    },
    addPayments(state, payload){
      state.payments.push(payload);
    }
  },

  actions: {
    getPayments: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('payment/');

        commit('setPayments', data);
      } catch(e){
        console.log('Payment', e);
      }
    },
    updatePayment: async ({commit}, payment) => {
      try{
        await Vue.axios.patch(
            `payment/${payment.id}/`,
            payment
        );
        commit('updatePayment', {
            ...payment,
            id_field: payment.id
        });
      } catch(e){
        console.log('Payment', e);
      }
    },
    deletePayment: async ({commit}, payment_id) => {
      try{
        await Vue.axios.delete(
            `payment/${payment_id}/`
        );
        commit('deletePayment', payment_id);
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