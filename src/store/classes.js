import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    classes: {},
    freeTeachers: null
  },

  getters: {
    getClasses: state => state.classes,
    getFreeTeachers: state => state.freeTeachers
  },

  mutations: {
    setClasses(state, payload){
      state.classes = payload;
    },
    setFreeTeachers(state, payload){
      state.freeTeachers = payload;
    },
    updateClasses(state, payload){
      state.classes[payload.id] = payload.classes;
    },
    deleteClasses(state, payload){
      state.classes.split(payload, 1);
    },
    addClasses(state, payload){
      state.classes.push(payload);
    }
  },

  actions: {
    getClasses: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('class/');
        //console.log(data)
        const result = data.map(v => ({
          id: v.id_field,
          name: v.name
        }));
        commit('setClasses', result);
      } catch(e){
        console.log('clas', e);
      }
    },
    getFreeTeachers: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('teachers/');
        //console.log(data)
        const result = data.map(v => ({
          id: v.id_field,
          name: v.name
        }));
        commit('setFreeTeachers', result);
      } catch(e){
        console.log('clas', e);
      }
    },
    updateClass: async ({commit}, clas) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_UPDATE_CLASS + clas.id,
            clas
        );
        commit('updateClass', clas);
      } catch(e){
        console.log('clas', e);
      }
    },
    deleteClass: async ({commit}, clas) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_DELETE_CLASS + clas
        );
        commit('deleteClass', clas);
      } catch(e){
        console.log('clas', e);
      }
    },
    addClass: async ({commit}, clas) => {
      try{
        await Vue.axios.post(
            process.env.VUE_APP_ROUTES_ADD_CLASS,
            clas
        );
        commit('addClass', clas);
      } catch(e){
        console.log('clas', e);
      }
    }
  }
}