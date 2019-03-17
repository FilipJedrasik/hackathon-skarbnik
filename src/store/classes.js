import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    classes: [],
    freeTeachers: [],
    loadedTeachers: false
  },

  getters: {
    getClasses: state => state.classes,
    getFreeTeachers: state => state.freeTeachers,
    loadedFreeTeachers: state => state.loadedTeachers
  },

  mutations: {
    setClasses(state, payload){
      state.classes = payload;
    },
    setFreeTeachers(state, payload){
      state.freeTeachers = payload;
      state.loadedTeachers = true;
    },
    updateClasses(state, payload){
      const pos = state.classes.findIndex(v => v.id_field == payload.id_field);
      Vue.set(state.classes, pos, payload)
      Vue.set(state.classes[pos], 'user', payload.user)
    },
    deleteClasses(state, payload){
      state.classes.splice(state.classes.findIndex(v => v.id_field == payload.id), 1);
      if(state.loadedTeachers){
        state.freeTeachers.splice(0, 0, payload.teacher);
      }
    },
    addClass(state, payload){
      state.classes.push(payload);
      state.freeTeachers.splice(state.freeTeachers.findIndex(v => v.id_field === payload.user.id_field), 1);
    }
  },

  actions: {
    getClasses: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('class/');

        commit('setClasses', data);
      } catch(e){
        console.log('clas', e);
      }
    },
    getFreeTeachers: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('teachers/');

        const result = data.map(v => ({
          id_field: v.id_field,
          name: v.name
        }));

        commit('setFreeTeachers', result);
      } catch(e){
        console.log('clas', e);
      }
    },
    updateClass: async ({commit}, clas) => {
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
        commit('updateClasses', clas);
      } catch(e){
        console.log('clas', e);
      }
    },
    deleteClass: async ({commit}, {id, teacher}) => {
      try{
        await Vue.axios.delete(
            `class/${id}/`
        );
        commit('deleteClasses', {id, teacher});
      } catch(e){
        console.log('clas', e);
      }
    },
    addClass: async ({commit}, clas) => {
      try{
        const payload = {
          name: clas.name,
          user: clas.user.id_field
        };

        await Vue.axios.post(
            'class/',
            payload
        );
        commit('addClass', clas);
      } catch(e){
        console.log('clas', e);
      }
    }
  }
}