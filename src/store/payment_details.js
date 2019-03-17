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
    setPaymentDetails(state, payload){
      state.paymentDetails = payload;
    },
    updatePaymentDetails(state, payload){
      state.paymentDetails[payload.id] = payload.paymentDetails;
    },
    deletePaymentDetails(state, payload){
      state.paymentDetails.split(payload, 1);
    },
    addPaymentDetails(state, payload){
      state.paymentDetails.push(payload);
    }
  },

  actions: {
    getPaymentDetails: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get(process.env.VUE_APP_ROUTES_GET_PAYMENT_DETAILS);
        commit('setClasses', data.paymentDetails);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    updatePaymentDetails: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_UPDATE_PAYMENT_DETAILS + paymentDetail.id,
            paymentDetail
        );
        commit('updatePaymentDetails', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    deleteClass: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_DELETE_PAYMENT_DETAILS + paymentDetail
        );
        commit('deletePaymentDetails', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    },
    addClass: async ({commit}, paymentDetail) => {
      try{
        await Vue.axios.post(
            process.env.VUE_APP_ROUTES_ADD_PAYMENT_DETAILS,
            paymentDetail
        );
        commit('addClass', paymentDetail);
      } catch(e){
        console.log('paymentDetails', e);
      }
    }
  }
}