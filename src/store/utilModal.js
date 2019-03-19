import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    visible: false,
    type: null,
    header: null,
    content: null,
    cancel: null,
    ok: null,
    okDisabled: null,
    value: null,
    onOk: null,
    onCancel: null
  },

  getters: {
    isVisible: state => state.visible
  },

  mutations: {
    SET_VISIBLE(state, stance) {
      state.visible = stance
    },

    SET(state, stance) {
      Object.keys(stance).forEach(key => Vue.set(state, key, stance[key]) );
      if(!state.onCancel) {
        Vue.set(state, 'onCancel', () => Vue.set(state, 'visible', false))
      }
      if(!state.onOk) {
        Vue.set(state, 'onOk', () => Vue.set(state, 'visible', false))
      }
    }
  }
}