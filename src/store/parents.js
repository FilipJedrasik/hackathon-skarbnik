import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    parents: {}
  },

  getters: {
    getParents: state => state.parents
  },

  mutations: {
    setParents(state, payload){
      state.parents = payload;
    },
    updateParents(state, payload){
      Vue.set(state.parents, payload.pos, payload.teacher)
      //state.parents[payload.id] = payload.parents;
    },
    deleteParents(state, payload){
      state.parents.split(payload, 1);
    },
    addParent(state, payload){
      state.parents.push(payload);
    }
  },

  actions: {
    getParents: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('users/?role=0');

        const result = data.map(v => ({
          ...v,
          id: v.id_field,
          password: v.password.length <= 8 ? v.password : '********',
          login: v.username
        }));
        commit('setParents', result);
      } catch(e){
        console.log('parent', e);
      }
    },
    updateParent: async ({commit}, parent) => {
      try{
        await Vue.axios.patch(
            'users/' + parent.teacher.id + '/',
            parent.teacher
        );
        parent.teacher = {
          ...parent.teacher,
          password: '********'
        };
        commit('updateParents', parent);
      } catch(e){
        console.log('parent', e);
      }
    },
    deleteParent: async ({commit}, parent) => {
      try{
        await Vue.axios.delete(
            'users/' + parent.id + '/'
        );
        commit('deleteParents', parent);
      } catch(e){
        console.log('parent', e);
      }
    },
    addParent: async ({commit}, parent) => {
      try{
        await Vue.axios.post(
            'users/',
            parent
        );
        commit('addParent', parent);
      } catch(e){
        console.log('parent', e);
      }
    }
  }
}