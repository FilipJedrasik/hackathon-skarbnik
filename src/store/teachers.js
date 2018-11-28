import Vue from 'vue'

export default {
  namespaced: true,
  state: {
      teachers: []
  },

  getters: {
    getTeachers: state => state.teachers
  },

  mutations: {
    setTeachers(state, payload){
      state.teachers = payload;
    },
    updateTeacher(state, payload){
      Vue.set(state.teachers, state.teachers.findIndex(v => v.id_field == payload.id_field), payload)
    },
    deleteTeacher(state, teacherId){
      state.teachers.splice(state.teachers.findIndex(v => v.id_field == teacherId), 1);
    },
    addTeacher(state, payload){
      state.teachers.push(payload);
    }
  },

  actions: {
    getTeachers: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('users/?role=1');

        const result = data.map(v => ({
          ...v,
          password: v.password.length <= 8 ? v.password : '********'
        }));
        commit('setTeachers', result);
      } catch(e){
        console.log('teach', e);
      }
    },
    updateTeacher: async ({commit}, teacher) => {
        try{
          await Vue.axios.patch(
              'users/' + teacher.id + '/',
              teacher.teacher
          );
          teacher.teacher = {
              ...teacher.teacher,
              password: '********'
          };
          commit('updateTeacher', teacher.teacher);
        } catch(e){
          console.log('teach', e);
        }
    },
    deleteTeacher: async ({commit}, teacherId) => {
      try{
        await Vue.axios.delete(
            'users/' + teacherId + '/'
        );
        commit('deleteTeacher', teacherId);
      } catch(e){
        console.log('teach', e);
      }
    },
    addTeacher: async ({commit}, teacher) => {
      try{
        await Vue.axios.post(
            'users/',
            {
                ...teacher,
              role: 1
            }
        );
        commit('addTeacher', teacher);
      } catch(e){
        console.log('teach', e);
      }
    }
  }
}