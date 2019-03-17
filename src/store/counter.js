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
    setState(state, d){
      if(d.constructor === Array){
        state.students = d[0].student_count;
        state.teachers = d[0].teachers_count;
        state.parents = d[0].parent_count;
        state.classes = d[0].class_count;
      } else {
        state.students = d.student_count;
        state.teachers = d.teachers_count;
        state.parents = d.parent_count;
        state.classes = d.class_count;
      }
    }
  },
  actions: {
    getCounters: async ({commit}) => {
      try {
        let {data} = await Vue.axios.get('counter/');
        commit('setState', data);
      } catch(e){
        console.log('clas', e);
      }
    }
  }
};