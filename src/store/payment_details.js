import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    paymentDetails: {}
  },

  getters: {
    getPaymentDetails: state => state.paymentDetails
  },

  mutations: {
    SET(state, payload){
      state.paymentDetails = payload;
    },
    UPDATE(state, payload){
      state.paymentDetails[payload.id] = payload.paymentDetails;
    },
    DELETE(state, payload){
      state.paymentDetails.split(payload, 1);
    },
    ADD(state, payload){
      state.paymentDetails.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get(process.env.VUE_APP_ROUTES_GET_PAYMENT_DETAILS);
        commit('SET', data.paymentDetails);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    update: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_UPDATE_PAYMENT_DETAILS + paymentDetail.id,
            paymentDetail
        );
        commit('UPDATE', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    delete: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_DELETE_PAYMENT_DETAILS + paymentDetail
        );
        commit('DELETE', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    add: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.post(
            process.env.VUE_APP_ROUTES_ADD_PAYMENT_DETAILS,
            paymentDetail
        );
        commit('ADD', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    }
  }
}