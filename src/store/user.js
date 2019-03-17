import Vue from 'vue'
import router from './../router'
import Cookie from 'js-cookie';

export default {
  namespaced: true,

  state: {
    user: {},
    myClass: null // Name of my class if I am a supervisor
  },

  getters: {
    getUser: state => state.user || {},
    getRole: state => 'role' in state.user ? state.user.role : -1,
    changedPassword: state => 'changed_password' in state.user ? state.user.changed_password : 0,
    getMyClass: state => state.myClass
  },

  mutations: {
    setUserObject(state, payload){
      state.user = Object.assign({}, payload);
    },
    changedPasswordAndEmail(state, email){
      state.user.changed_password = 1;
      state.user.email = email;
    },
    setMyClass(state, name){
      state.myClass = name;
    }
  },

  actions: {
    update: async ({commit, dispatch}) => {
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

          // if(new Date(localStorage.getItem(process.env.VUE_APP_EXPIRES_KEY)) <= new Date()){
          //   dispatch('auth/logout')
          // }
          let { data } = await Vue.axios.get('users/current/');

          commit('setUserObject', {
            name: data.name,
            id: data.id_field,
            email: data.email,
            login: data.username,
            role: data.role,
            changed_password: data.password.length <= 8 ? 0 : 1
          });

          if(new Date(new Date(localStorage.getItem(process.env.VUE_APP_EXPIRES_KEY)).getTime() - (12 * 60 * 60 * 1000)) <= new Date()){
            dispatch('refresh');
          }
        }
      } catch(e){
        console.log(e)
        dispatch('auth/logout', {}, { root:true });
        router.push('/');
      }
    },

    refresh: async ({dispatch}) => {
      try{
        delete Vue.axios.defaults.headers.common['Authorization'];

        await Vue.axios.post('users/refresh', {
          token: localStorage.getItem(process.env.VUE_APP_STORAGE_KEY)
        });

        const expires = new Date(new Date().getTime() + (30 * 60 * 60 * 1000));
        localStorage.setItem(process.env.VUE_APP_EXPIRES_KEY, expires);
        Cookie.set(process.env.VUE_APP_EXPIRES_KEY, expires);

      } catch(e){
        dispatch('auth/logout', {}, { root:true });
        router.push('/');
      }
    },

    // changePassword: async ({commit}, data) => {
    //   try{
    //     if(process.env.VUE_APP_NOAPI !== 'true'){
    //       await Vue.axios.post('users/password', data);
    //     }
    //     commit('changedPasswordAndEmail', data.email);
    //   } catch(e){
    //     console.log(e)
    //     throw 'Nie udało się zmienić hasła!';
    //   }
    // },

    // SUPERVISOR ONLY
    getMyClass: async({commit, state}) => {
      try{
        let {data} = await Vue.axios.get(`class/?user=${state.user.id}`);
        commit('setMyClass', data[0]);
      } catch(e){
        console.log(e)
      }
    }
  }
}