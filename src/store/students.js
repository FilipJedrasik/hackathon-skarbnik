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
    SET(state, payload){
      state.students = payload;
    },
    UPDATE(state, payload){
      Vue.set(state.students, state.students.findIndex(v => v.id_field == payload.id), payload.student)
    },
    DELETE(state, studentId){
      state.students.splice(state.students.findIndex(v => v.id_field == studentId), 1);
    },
    ADD(state, payload){
      state.students.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let { data } = await Vue.axios.get('student/');
        commit('SET', data);
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
        commit('UPDATE', student);
      } catch(e){
        console.log('Students', e);
      }
    },
    delete: async ({commit}, student) => {
      try{
        await Vue.axios.delete(
            `student/${student}/`
        );
        commit('DELETE', student);
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
        let { data } = await Vue.axios.post(
            'student/',
            values
        );
        commit('ADD', {
          ...data,
          class_field: student.class_field,
          user: student.user
        });
      } catch(e){
        console.log('Students', e);
      }
    }
  }
}