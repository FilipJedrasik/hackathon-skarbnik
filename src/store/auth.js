import Vue from 'vue'
import Cookie from 'js-cookie'

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem(process.env.VUE_APP_STORAGE_KEY) || Cookie.get(process.env.VUE_APP_STORAGE_KEY) || null,
    status: 0
  },

  getters: {
    isAuth: state => !!state.token
  },

  mutations: {
    update(state, payload){
      state.token = payload;
    },
    clearToken(state){
      state.token = null;
    },
    changeStatus(state, payload){
      state.status = payload;
    }
  },

  actions: {
    auth: async ({commit}, user) => {
      commit('changeStatus', 1);
      try{
        const dt = new FormData();
        dt.append('username', user.login);
        dt.append('password', user.password);
        let {data} = await Vue.axios.post('users/login', dt);

        localStorage.setItem(process.env.VUE_APP_STORAGE_KEY, data.token);
        Cookie.set(process.env.VUE_APP_STORAGE_KEY, data.token);
        Vue.axios.defaults.headers.common['Authorization'] = 'Basic ' + data.token;

        commit('changeStatus', 2);
        commit('update', data.token);

      } catch(e){
        console.log(e)
        commit('changeStatus', 3); // Error
        localStorage.removeItem(process.env.VUE_APP_STORAGE_KEY);
        throw 'Podane dane są nieprawidłowe!';
      }
    },

    logout: async ({commit}) => {
      commit('clearToken');
      Cookie.remove(process.env.VUE_APP_STORAGE_KEY);
      localStorage.removeItem(process.env.VUE_APP_STORAGE_KEY);
    }
  }
}