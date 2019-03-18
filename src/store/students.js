import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    students: {},
    /*
    * id_field
    * name
    * class_field
    *   id
    *   name
    * user(parent)
    *   id_field
    *   name
    * */
  },

  getters: {
    get: state => state.students
  },

  mutations: {
    SET_STUDENTS(state, payload){
      state.students = payload;
    },
    UPDATE_STUDENTS(state, payload){
      Vue.set(state.students, state.students.findIndex(v => v.id_field == payload.id), payload.student)
    },
    DELETE_STUDENT(state, studentId){
      state.students.splice(state.students.findIndex(v => v.id_field == studentId), 1);
    },
    ADD_STUDENT(state, payload){
      state.students.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let { data } = await Vue.axios.get('student/');
        commit('SET_STUDENTS', data);
      } catch(e){
        console.log('Students', e);
      }
    },
    update: async ({commit}, student) => {
      try{
        const values = {
          name: student.student.name,
          user: student.student.user.id_field,
          class_field: student.student.class_field.id_field
        };

        await Vue.axios.put(
            `student/${student.id}/`,
            values
        );
        commit('UPDATE_STUDENTS', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    delete: async ({commit}, student) => {
      try{
        await Vue.axios.delete(
            `student/${student}/`
        );
        commit('DELETE_STUDENT', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    add: async ({commit}, student) => {
      try{
        const values = {
          name: student.name,
          user: student.user.id_field,
          class_field: student.class_field.id_field
        };
        await Vue.axios.post(
            'student/',
            values
        );
        commit('ADD_STUDENT', student);
      } catch(e){
        console.log('Students', e);
      }
    }
  }
}