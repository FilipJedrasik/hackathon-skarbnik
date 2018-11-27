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
      Vue.set(state.teachers, payload.pos, payload.teacher)
      //state.teachers[payload.pos] = payload.teacher;
    },
    deleteTeacher(state, payload){
      state.teachers.splice(payload, 1);
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
          id: v.id_field,
          password: v.password.length <= 8 ? v.password : '********',
          login: v.username
        }));
        commit('setTeachers', result);
      } catch(e){
        console.log('teach', e);
      }
    },
    updateTeacher: async ({commit}, teacher) => {
        try{
          console.log(teacher)
          await Vue.axios.patch(
              'users/' + teacher.teacher.id + '/',
              teacher.teacher
          );
          teacher.teacher = {
              ...teacher.teacher,
              password: '********'
          };
          commit('updateTeacher', teacher);
        } catch(e){
          console.log('teach', e);
        }
    },
    deleteTeacher: async ({commit}, teacher) => {
      try{
        await Vue.axios.delete(
            'users/' + teacher.id + '/'
        );
        commit('deleteTeacher', teacher.pos);
      } catch(e){
        console.log('teach', e);
      }
    },
    addTeacher: async ({commit}, teacher) => {
      try{
        await Vue.axios.post(
            'users/',
            teacher
        );
        commit('addTeacher', teacher);
      } catch(e){
        console.log('teach', e);
      }
    }
  }
}