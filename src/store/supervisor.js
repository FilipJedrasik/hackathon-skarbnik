import Vue from 'vue';

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
    setStudents(state, payload) {
      Vue.set(state, 'students', payload);
    }
  },
  actions: {
    loadStudents: async ({commit}, classId) => {
      try {
        let { data } = await Vue.axios.get(`student/?class_field=${classId}`);
        console.log(data)
        commit('setStudents', data);
      } catch(e) {
        console.log('Err supervisor/loadStudents', e);
      }
    }
  }
};