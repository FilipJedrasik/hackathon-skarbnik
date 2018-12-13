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
    getStudents: state => state.students
  },

  mutations: {
    setStudents(state, payload){
      state.students = payload;
    },
    updateStudent(state, payload){
      Vue.set(state.students, state.students.findIndex(v => v.id_field == payload.id), payload.student)
    },
    deleteStudents(state, payload){
      state.students.split(payload, 1);
    },
    addStudent(state, payload){
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
    updateStudent: async ({commit}, student) => {
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
        commit('updateStudent', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    deleteStudent: async ({commit}, student) => {
      try{
        await Vue.axios.delete(
            `student/${student.id}/`
        );
        commit('deleteStudent', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    addStudent: async ({commit}, student) => {
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
        commit('addStudent', student);
      } catch(e){
        console.log('Students', e);
      }
    }
  }
}