import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    students: null,
    teachers: null,
    parents: null,
    classes: null
  },
  getters: {
    step: state => {
      let counter = 1;
      if (state.teachers >= 1) {
        counter++;
        if (state.classes >= 1) {
          counter++;
          if (state.parents >= 1) {
            counter++;
            if (state.students >= 1) {
              counter++;
            }
          }
        }
      }

      return counter;
    }
  },
  mutations: {
    SET(state, d){
      state.students = d.student_count;
      state.teachers = d.teachers_count;
      state.parents = d.parent_count;
      state.classes = d.class_count;
    }
  },
  actions: {
    getCounters: async ({commit}) => {
      try {
        let {data} = await Vue.axios.get('counter/');
        commit('SET', data.constructor === Array ? data[0] : data);
      } catch(e){
        console.log('clas', e);
      }
    }
  }
};