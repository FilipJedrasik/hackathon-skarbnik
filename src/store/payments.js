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
    SET(state, payload){
      state.payments = payload;
    },
    UPDATE(state, payload){
      Vue.set(state.payments, state.payments.findIndex(v => v.id_field == payload.id), payload);
    },
    DELETE(state, id){
      state.payments.splice(state.payments.findIndex(v => v.id_field == id), 1);
    },
    ADD(state, payload){
      state.payments.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('payment/');

        commit('SET', data);
      } catch(e){
        console.log('Payment', e);
      }
    },
    update: async ({commit}, payment) => {
      try{
        await Vue.axios.patch(
            `payment/${payment.id}/`,
            payment
        );
        commit('UPDATE', {
            ...payment,
            id_field: payment.id
        });
      } catch(e){
        console.log('Payment', e);
      }
    },
    delete: async ({commit}, payment_id) => {
      try{
        await Vue.axios.delete(
            `payment/${payment_id}/`
        );
        commit('DELETE', payment_id);
      } catch(e){
        console.log('Payment', e);
      }
    },
    add: async ({commit}, payment) => {
      try{
        let {data} = await Vue.axios.post(
            'payment/',
            payment
        );
        commit('ADD', data);
      } catch(e){
        console.log('Payment', e);
      }
    }
  }
}