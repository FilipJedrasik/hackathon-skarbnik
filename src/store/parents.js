import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    parents: []
  },

  getters: {
    getParents: state => state.parents
  },

  mutations: {
    setParents(state, payload){
      state.parents = payload;
    },
    updateParents(state, payload){
      Vue.set(state.parents, state.parents.findIndex(v => v.id_field == payload.id_field), payload)
    },
    deleteParents(state, parentId){
      state.parents.splice(state.parents.findIndex(v => v.id_field == parentId), 1);
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
          password: v.password.length <= 8 ? v.password : '********'
        }));
        commit('setParents', result);
      } catch(e){
        console.log('parent', e);
      }
    },
    updateParent: async ({commit}, parent) => {
      try{
        await Vue.axios.patch(
            'users/' + parent.id + '/',
            parent.parent
        );
        parent = {
          ...parent.parent,
          password: '********'
        };
        commit('updateParents', parent);
      } catch(e){
        console.log('parent', e);
      }
    },
    deleteParent: async ({commit}, parentId) => {
      try{
        await Vue.axios.delete(
            'users/' + parentId + '/'
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
            {
              ...parent,
              role: 0
            }
        );
        commit('addParent', parent);
      } catch(e){
        console.log('parent', e);
      }
    }
  }
}