import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    students: {}
  },

  getters: {
    getStudents: state => state.students
  },

  mutations: {
    setStudents(state, payload){
      state.students = payload;
    },
    updateStudents(state, payload){
      state.students[payload.id] = payload.students;
    },
    deleteStudents(state, payload){
      state.students.split(payload, 1);
    },
    addStudents(state, payload){
      state.students.push(payload);
    }
  },

  actions: {
    getStudents: async ({commit}) => {
      try{
        let { data } = await Vue.axios.get('student/');
        commit('setStudents', data);
      } catch(e){
        console.log('Students', e);
      }
    },
    updateClass: async ({commit}, student) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_UPDATE_STUDENT + student.id,
            student
        );
        commit('updateClass', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    deleteClass: async ({commit}, student) => {
      try{
        await Vue.axios.put(
            process.env.VUE_APP_ROUTES_DELETE_STUDENT + student
        );
        commit('deleteClass', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    addClass: async ({commit}, student) => {
      try{
        await Vue.axios.post(
            process.env.VUE_APP_ROUTES_ADD_STUDENT,
            student
        );
        commit('addClass', student);
      } catch(e){
        console.log('Students', e);
      }
    }
  }
}