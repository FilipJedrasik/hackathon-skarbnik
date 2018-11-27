import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    user: {}
  },

  getters: {
    getUser: state => state.user || {},
    getRole: state => 'role' in state.user ? state.user.role : -1,
    changedPassword: state => 'changed_password' in state.user ? state.user.changed_password : 0
  },

  mutations: {
    setUserObject(state, payload){
      state.user = Object.assign({}, payload);
    },
    changedPasswordAndEmail(state, email){
      state.user.changed_password = 1;
      state.user.email = email;
    }
  },

  actions: {
    update: async ({commit}) => {
      try{
        if(process.env.VUE_APP_NOAPI === 'true'){
          if(process.env.VUE_APP_USERSEED_TYPE === 'nochanges') {
            commit('setUserObject', {
              name: 'Dariusz Nowak',
              login: 'darnow',
              role: 0,
              changed_password: 0,
              email: null
            })
          } else{
            commit('setUserObject', {
              name: 'Dariusz Nowak',
              login: 'darnow',
              role: 2,
              changed_password: 1,
              email: 'daro@op.pl'
            })
          }
        } else {

          let { data } = await Vue.axios.get('users/current/');

          commit('setUserObject', {
            name: data.name,
            id: data.id_field,
            email: data.email,
            login: data.username,
            role: data.role,
            changed_password: data.password.length <= 8 ? 0 : 1
          });
        }
      } catch(e){
          console.log(e)
          throw 'Wystąpił niezidentyfikowany problem, przepraszamy!';
      }
    },

    changePassword: async ({commit}, data) => {
      try{
        if(process.env.VUE_APP_NOAPI !== 'true'){
          await Vue.axios.post('users/password', data);
        }
        commit('changedPasswordAndEmail', data.email);
      } catch(e){
        console.log(e)
        throw 'Nie udało się zmienić hasła!';
      }
    }
  }
}