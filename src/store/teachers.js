import Vue from 'vue'

export default {
  namespaced: true,
  state: {
      teachers: []
  },

  getters: {
    get: state => state.teachers
  },

  mutations: {
    SET_TEACHERS(state, payload){
      state.teachers = payload;
    },
    UPDATE_TEACHER(state, payload){
      Vue.set(state.teachers, state.teachers.findIndex(v => v.id_field == payload.id_field), payload)
    },
    DELETE_TEACHER(state, teacherId){
      state.teachers.splice(state.teachers.findIndex(v => v.id_field == teacherId), 1);
    },
    ADD_TEACHER(state, payload){
      state.teachers.push(payload);
    }
  },

  actions: {
    get: async ({commit}) => {
      try{
        let {data} = await Vue.axios.get('users/?role=1');

        const result = data.map(v => ({
          ...v,
          password: v.password.length <= 8 ? v.password : '********'
        }));
        commit('SET_TEACHERS', result);
      } catch(e){
        console.log('teach', e);
      }
    },
    update: async ({commit}, teacher) => {
        try{
          await Vue.axios.patch(
              'users/' + teacher.id + '/',
              teacher.teacher
          );
          teacher = {
              ...teacher.teacher,
              password: '********'
          };
          commit('UPDATE_TEACHER', teacher);
        } catch(e){
          console.log('teach', e);
        }
    },
    delete: async ({commit}, teacherId) => {
      try{
        await Vue.axios.delete(
            'users/' + teacherId + '/'
        );
        commit('DELETE_TEACHER', teacherId);
      } catch(e){
        console.log('teach', e);
      }
    },
    add: async ({commit}, teacher) => {
      try{
        await Vue.axios.post(
            'users/',
            {
                ...teacher,
              role: 1
            }
        );
        commit('ADD_TEACHER', teacher);
      } catch(e){
        console.log('teach', e);
      }
    }
  }
}