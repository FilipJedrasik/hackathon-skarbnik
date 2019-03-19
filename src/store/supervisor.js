import Vue from 'vue';
import queryFilter from '@/utils/queryFilter.js';

export default {
  namespaced: true,
  state: {
    students: null
  },
  getters: {
    getStudents: state => state.students,
    getStudentsAmount: state => state.students !== null && state.students !== undefined ? state.students.length : 0
  },
  mutations: {
    SET(state, payload) {
      Vue.set(state, 'students', payload);
    }
  },
  actions: {
    loadStudents: async ({commit}, classId) => {
      try {
        const url = queryFilter({
          class_field: classId
        }, 'student/');
        let { data } = await Vue.axios.get(url);
        console.log(data)
        commit('SET', data);
      } catch(e) {
        console.log('Err supervisor/loadStudents', e);
      }
    }
  }
};