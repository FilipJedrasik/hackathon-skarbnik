<template>
    <v-flex xs12>
        <!--HEADER - TEACHERS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Uczniowie</v-toolbar-title>
            <v-spacer/>
            <v-flex xs10 sm3 mr-5>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Szukaj"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
            
            <v-btn
                    v-show="students.length"
                    @click.native="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    data-cy="add-student"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj ucznia'}}</v-btn>
            <!--ADDING TEACHER-->
            <template v-if="loadDialog">
                <AddModal 
                  v-model="dialog"
                  :beforeEdit="beforeEdit"
                  :editing="isEditing"
                  @add="add"
                  @edit="edit"/>
            </template>
        </v-toolbar>


        <!--TEACHERS CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : students"
                class="elevation-1"
                :loading="loading"
                item-key="name"
                :search="search"
        >
            <!--LOADING PROGRESS BAR-->
            <v-progress-linear v-if='loading' slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <template v-if="!$vuetify.breakpoint.xsOnly">
                    <td>{{ props.item.user.name }}</td>
                    <td>{{ props.item.class_field.name }}</td>
                </template>
                <td class="justify-center layout px-0" data-cy="crud">
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
                    <v-btn color="primary" @click="dialog = true" v-if="!loading">Dodaj ucznia</v-btn>
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
        name: '',
        class_field: {
            id: null,
            name: ''
        },
        user: {
            id_field: null,
            name: ''
        }
    };

  const AddModal = () => import('@/components/Admin/Students/AddModal.vue');

  import studentsModule from '@/store/students'
  import parentsModule from '@/store/parents'
  import classesModule from '@/store/classes'

  export default {
    components: {
      AddModal
    },
    data: () => ({
      loadedFullData: false,
      loading: false, // Is data being fetched from the server now?
      dialog: true, // Adding/editing Modal stance
      loadDialog: false,
      valid: false, // is Adding/editing form valid?
      search: null,

      beforeEdit: {}, // Editing student start stance

      isEditing: false
    }),

    computed: {
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
            { text: 'Rodzic', value: 'parent' },
            { text: 'Klasa', value: 'theClass' },
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
      },

      students(){
          return this.$store.getters['students/get'];
      },
      parents(){
          return this.$store.getters['parents/get'];
            },
      classes(){
          return this.$store.getters['classes/get'];
      }
    },

    methods: {
      // Adding new student
      async add(student){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try{
            this.asyncProcess(true);

            student.user.name = this.parents.find(v => v.id_field === student.user.id_field).name;
            student.class_field.name = this.classes.find(v => v.id_field === student.class_field.id_field).name;

            await this.$store.dispatch('students/add', student);

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się dodać ucznia',
              type: 'success',
              ok: 'Ok',
              onOk: null,
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
      async edit(student){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try {
            this.asyncProcess(true);

            // Fuck dry
            student.user.name = this.parents.find(v => v.id_field === student.user.id_field).name;
            student.class_field.name = this.classes.find(v => v.id_field === student.class_field.id_field).name;

            await this.$store.dispatch('students/update', {
              student,
              id: student.id_field
            });

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się zaaktualizować studenta',
              type: 'success',
              ok: 'Ok',
              onOk: null,
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
      async editItem (student) {
        this.isEditing = true;
        this.beforeEdit = JSON.parse(JSON.stringify(student));

        await this.parentsAndTeachers();
        this.dialog = true;
        this.loadDialog = true;
      },

      // Opening delete teacher modal
      // Preparing essential variables
      deleteItem (student) {
        this.$store.commit('utilModal/SET', {
          header: 'Uwaga',
          content: `Czy na pewno chcesz usunąć konto ${student.name}?`,
          ok: 'Tak',
          cancel: 'Anuluj',
          type: 'error',
          visible: true,
          onOk: () => this.asDeleteStudent(student.id_field)
        })
      },

      // Deleting existing teacher
      async asDeleteStudent(studentId){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('students/delete', studentId);

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
      async showAddModal(){
        this.isEditing = false;
        this.beforeEdit = JSON.parse(JSON.stringify(basic));

        await this.parentsAndTeachers();

        this.dialog = true;
        this.loadDialog = true;
      },

      async parentsAndTeachers(){
        if(!this.loadedFullData){
          this.asyncProcess(true);

          await Promise.all([
            this.$store.dispatch('parents/get'),
            this.$store.dispatch('classes/get')
          ]);

          this.loadedFullData = true;

          this.asyncProcess(false);
        }
      }
    },

    async created(){
      // Vuex module
      this.$store.registerModule('students', studentsModule);
      this.$store.registerModule('parents', parentsModule);
      this.$store.registerModule('classes', classesModule);

      this.loading = true;
      await this.$store.dispatch('students/get');
      this.loading = false;
    },

    beforeDestroy() {
      this.$store.unregisterModule('students');
      this.$store.unregisterModule('parents');
      this.$store.unregisterModule('classes');
    }
  }
</script>