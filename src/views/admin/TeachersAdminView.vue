<template>
    <v-flex xs12>
        <!--HEADER - TEACHERS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Nauczyciele</v-toolbar-title>
            <v-spacer></v-spacer>
            <br>
            <v-btn
                    v-show="teachers.length"
                    @click.native="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj nauczyciela'}}</v-btn>
            <AddModal 
              v-model="dialog"
              :beforeEdit="beforeEdit"
              :editing="isEditing"
              @add="add"
              @edit="edit"/>
        </v-toolbar>


        <!--TEACHERS CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : teachers"
                class="elevation-1"
                :loading="loading"
                item-key="name"
        >
            <!--LOADING PROGRESS BAR-->
            <v-progress-linear v-if='loading' slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <template v-if="!$vuetify.breakpoint.xsOnly">
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.username }}</td>
                </template>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                    <td>{{ props.item.password }}</td>
                </template>
                <td class="justify-center layout px-0">
                    <v-icon
                            color="blue"
                            class="mr-2"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            color="red"
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>

            <!--LOADING WHILE NO DATA-->
            <template slot="no-data">
                <div style="text-align:center;padding: 15px 0;" >
                    <v-btn color="primary" @click="dialog = true" v-if="!loading">Utwórz konto nauczyciela</v-btn>
                    <v-progress-circular
                            v-else
                            :size="70"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </template>

        </v-data-table>
    </v-flex>
</template>

<script>
  const basic = {
    email: '',
    name: '',
    password: '',
    username: ''
  };

  import AddModal from '@/components/Admin/Teachers/AddModal.vue';

  export default {
    components:{
      AddModal
    },

    data: () => ({
      processing: false, // Currently doing async operation
      loading: false, // Is data being fetched from the server now?
      dialog: false, // Adding/editing Modal stance
      valid: false, // is Adding/editing form valid?

      beforeEdit: {}, // Editing teacher start stance

      isEditing: false
    }),

    computed: {
      teachers(){
        return this.$store.getters['teachers/getTeachers'];
      },

      // Responsive headers
      headers(){
        if(this.$vuetify.breakpoint.xsOnly){
          return [
            { text: 'Imię i nazwisko', value: 'name' },
            { text: 'Akcje', value: 'name', sortable: false }
          ];
        } else if(this.$vuetify.breakpoint.mdAndUp){
          return [
            { text: 'Imię i nazwisko', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Login', value: 'login' },
            { text: 'Hasło', value: 'password' },
            { text: 'Akcje', value: 'name', sortable: false }
          ];
        } else {
          return [
            { text: 'Imię i nazwisko', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Login', value: 'login' },
            { text: 'Akcje', value: 'name', sortable: false }
          ];
        }
      }
    },

    methods: {
      // Adding new teacher
      async add(teacher){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try{
            this.asyncProcess(true);
            await this.$store.dispatch('teachers/addTeacher', teacher);

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się dodać nauczyciela',
              type: 'success',
              visible: true
            })
          } catch(e){
            this.asyncProcess(false);
            
            this.$store.commit('utilModal/SET', {
              content: e.message,
              type: 'error',
              visible: true
            })
          }
      },

      // Editing existing teacher
      async edit(teacher){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try {
            delete this.teacher.password;

            this.asyncProcess(true);

            await this.$store.dispatch('teachers/updateTeacher', {
              teacher,
              id: teacher.id_field
            });

            this.dialog = false;

            this.teacher = Object.assign({}, basic);

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się zaaktualizować nauczyciela',
              type: 'success',
              visible: true
            })
          }
          catch (e) {
            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: e.message,
              type: 'error',
              visible: true
            })
          }
      },

      // Opening editing teacher modal
      // Preparing essential variables
      editItem (teacher) {
        this.isEditing = true;
        this.editedIndex = this.teachers.findIndex(v => v.id_field === teacher.id_field);
        this.beforeEdit = Object.assign({}, teacher);
        this.dialog = true;
      },

      // Opening delete teacher modal
      // Preparing essential variables
      deleteItem (teacher) {
        this.$store.commit('utilModal/SET', {
          header: 'Uwaga',
          content: `Czy na pewno chcesz usunąć konto ${teacher.name}?`,
          ok: 'Tak',
          cancel: 'Anuluj',
          type: 'error',
          visible: true,
          onOk: () => this.asDeleteTeacher(teacher.id_field)
        })
      },

      // Deleting existing teacher
      async asDeleteTeacher(teacherId){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('teachers/deleteTeacher', teacherId);

          this.$store.commit('utilModal/SET_VISIBLE', false)

          this.asyncProcess(false);

        } catch(e){
          this.asyncProcess(false);

          this.$store.commit('utilModal/SET', {
              content: e.message,
              type: 'error',
              visible: true,
              ok: null,
              cancel: null
            })
        }
      },

      // Clearing edit's variables
      // Opening Add Teacher Modal
      showAddModal(){
        this.isEditing = false;
        this.beforeEdit = Object.assign({}, basic);
        this.dialog = true;
      }
    },

    async created(){
      this.loading = true;
      await this.$store.dispatch('teachers/getTeachers');
      this.loading = false;
    }
  }
</script>