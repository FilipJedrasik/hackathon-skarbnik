import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    parents: []
  },

  getters: {
    get: state => state.parents
  },

  mutations: {
    SET(state, payload){
      state.parents = payload;
    },
    UPDATE(state, payload){
      Vue.set(state.parents, state.parents.findIndex(v => v.id_field == payload.id_field), payload)
    },
    DELETE(state, parentId){
      state.parents.splice(state.parents.findIndex(v => v.id_field == parentId), 1);
    },
    ADD(state, payload){
      state.parents.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('users/?role=0');

        const result = data.map(v => ({
          ...v,
          password: v.password.length <= 8 ? v.password : '********'
        }));
        commit('SET', result);
      } catch(e){
        console.log('parent', e);
      }
    },
    update: async ({commit}, parent) => {
      try{
        await Vue.axios.patch(
            'users/' + parent.id + '/',
            parent.parent
        );
        parent = {
          ...parent.parent,
          password: '********'
        };
        commit('UPDATE', parent);
      } catch(e){
        console.log('parent', e);
      }
    },
    delete: async ({commit}, parentId) => {
      try{
        await Vue.axios.delete(
            'users/' + parentId + '/'
        );
        commit('DELETE', parent);
      } catch(e){
        console.log('parent', e);
      }
    },
    add: async ({commit}, parent) => {
      try{
        let { data } = await Vue.axios.post(
            'users/',
            {
              ...parent,
              role: 0
            }
        );
        data.password = "********";
        commit('ADD', data);
      } catch(e){
        console.log('parent', e);
      }
    }
  }
}