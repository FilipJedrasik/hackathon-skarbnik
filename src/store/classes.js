import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    classes: [],
    freeTeachers: [],
    loadedTeachers: false
  },

  getters: {
    get: state => state.classes,
    getFreeTeachers: state => state.freeTeachers,
    loadedFreeTeachers: state => state.loadedTeachers
  },

  mutations: {
    SET_CLASSES(state, payload){
      state.classes = payload;
    },
    SET_FREE_TEACHERS(state, payload){
      state.freeTeachers = payload;
      state.loadedTeachers = true;
    },
    UPDATE_CLASSES(state, payload){
      const pos = state.classes.findIndex(v => v.id_field == payload.id_field);
      Vue.set(state.classes, pos, payload)
      Vue.set(state.classes[pos], 'user', payload.user)
    },
    DELETE_CLASSES(state, payload){
      state.classes.splice(state.classes.findIndex(v => v.id_field == payload.id), 1);
      if(state.loadedTeachers){
        state.freeTeachers.splice(0, 0, payload.teacher);
      }
    },
    ADD_CLASS(state, payload){
      state.classes.push(payload);
      state.freeTeachers.splice(state.freeTeachers.findIndex(v => v.id_field === payload.user.id_field), 1);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('class/');

        commit('SET_CLASSES', data);
      } catch(e){
        console.log('clas', e);
      }
    },
    getFreeTeachers: async ({commit}) => {
      try{
        let { data } = await Vue.axios.get('teachers/');

        const result = data.map(v => ({
          id_field: v.id_field,
          name: v.name
        }));

        commit('SET_FREE_TEACHERS', result);
      } catch(e){
        console.log('clas', e);
      }
    },
    update: async ({commit}, clas) => {
      try{
        // Cuz of database struct
        const payload = {
          name: clas.name,
          user: clas.user.id_field
        };

        await Vue.axios.patch(
            `class/${clas.id_field}/`,
            payload
        );
        commit('UPDATE_CLASSES', clas);
      } catch(e){
        console.log('clas', e);
      }
    },
    delete: async ({commit}, {id, teacher}) => {
      try{
        await Vue.axios.delete(
            `class/${id}/`
        );
        commit('DELETE_CLASSES', {id, teacher});
      } catch(e){
        console.log('clas', e);
      }
    },
    add: async ({commit}, clas) => {
      try{
        const payload = {
          name: clas.name,
          user: clas.user.id_field
        };

        let { data } = await Vue.axios.post(
            'class/',
            payload
        );
        commit('ADD_CLASS', data);
      } catch(e){
        console.log('clas', e);
      }
    }
  }
}