<template>
    <v-flex xs12>
        <!-- ASYNC OPERATION MODAL -->
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                :header="response.header !== null ? response.header : undefined"
                :ok="response.ok !== null ? response.ok : undefined"
                :cancel="response.cancel !== null ? response.cancel : undefined"
                @ok="asDeleteStudent"
                @cancel="response.modal = false"
                :okDisabled="processing"
                v-model="response.modal"></util-modal>

        <!--HEADER - TEACHERS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Uczniowie</v-toolbar-title>
            <v-spacer></v-spacer>
            <br>
            <v-btn
                    v-show="students.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj ucznia'}}</v-btn>
            <!--ADDING TEACHER-->
            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <!--ADD/EDIT IN ONE MODAL-->
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-form
                            v-model="valid"
                            lazy-validation
                            @submit="editedIndex === -1 ? add() : edit()"
                            ref="studentform">
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="assignment_ind"
                                            v-model="student.name"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(student) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            :rules="nameRules"
                                            label="Imię i nazwisko"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            :items="parents"
                                            v-model="student.user.id_field"
                                            item-text="name"
                                            item-value="id_field"
                                            menu-props="auto"
                                            label="Rodzic"
                                            :rules="notEmptyRules"
                                            prepend-icon="contacts"
                                            single-line
                                            required
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            :items="classes"
                                            v-model="student.class_field.id_field"
                                            item-text="name"
                                            item-value="id_field"
                                            menu-props="auto"
                                            label="Klasa"
                                            :rules="notEmptyRules"
                                            prepend-icon="event_note"
                                            single-line
                                            required
                                    ></v-select>
                                </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="editedIndex === -1 ? add() : edit()"
                                        :disabled="!valid || JSON.stringify(student) === JSON.stringify(beforeEdit)"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-toolbar>


        <!--TEACHERS CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : students"
                class="elevation-1"
                :loading="loading"
                item-key="name"
        >
            <!--LOADING PROGRESS BAR-->
            <v-progress-linear v-if='loading' slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <template v-if="!$vuetify.breakpoint.xsOnly">
                    <td>{{ props.item.user.name }}</td>
                    <td>{{ props.item.class_field.name }}</td>
                </template>
                <td class="justify-center layout px-0">
                    <v-icon
                            color="blue"
                            class="mr-2"
                            @click="editItem(props.item, props.index)"
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
  import UtilModal from '@/components/UtilModal';

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

  export default {
    data: () => ({
      loadedFullData: false,
      loading: false, // Is data being fetched from the server now?
      dialog: false, // Adding/editing Modal stance
      valid: false, // is Adding/editing form valid?

      beforeEdit: {}, // Editing student start stance

      response:{ // UI Util response obj
        type: 'error',
        modal: false,
        content: null,
        ok: null,
        cancel: null
      },

      student: Object.assign({}, basic), // Currently adding/editing Student

      deletingStudent: { // Student to delete
        student: {}, // Student Object
        index: null // ID in $store.teachers Array
      },

      editedIndex: -1 // Currently edited Index in $store.teachers Array
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodawanie ucznia' : 'Edytowanie ucznia'
      },
      submitTitle () {
        return this.editedIndex === -1 ? 'Dodaj' : 'Zapisz';
      },
      students(){
        return this.$store.getters['students/getStudents'];
      },
      parents(){
        return this.$store.getters['parents/getParents'];
      },
      classes(){
        return this.$store.getters['classes/getClasses'];
      },

      // Basic login rules + unique values
      loginUsed(){
        return [
          ...this.loginRules,
          v => v != null && Array.isArray(this.students) && this.students.filter(
              x => this.editedIndex != -1 ?
                  (this.beforeEdit.username !== x.username && x.username == v.trim() )
                  : x.username == v.trim()
          ).length == 0 || 'Podany login jest już zajęty'
        ];
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
      }
    },

    methods: {
      // Adding new teacher
      async add(){
        if(this.$refs.studentform.validate()){

          this.response.ok = null;
          this.response.cancel = null;

          try{
            this.asyncProcess(true);
            this.fillNames();

            this.$store.dispatch('students/addStudent', this.student);

            this.dialog = false;
            this.student = JSON.parse(JSON.stringify(basic));

            this.asyncProcess(false);

            this.response.content = 'Udało się dodać ucznia';
            this.response.type = 'success';
            this.response.modal = true;
          } catch(e){
            this.asyncProcess(false);
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },

      // Editing existing teacher
      async edit(){
        if(this.$refs.studentform.validate()) {

          this.response.ok = null;
          this.response.cancel = null;

          try {
            this.asyncProcess(true);
            this.fillNames();

            //console.log(this.student);

            this.$store.dispatch('students/updateStudent', {
              student: this.student,
              id: this.student.id_field
            });

            this.dialog = false;

            this.student = Object.assign({}, basic);

            this.asyncProcess(false);

            this.response.content = 'Udało się zaaktualizować studenta';
            this.response.type = 'success';
            this.response.modal = true;
          }
          catch (e) {
            this.asyncProcess(false);
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },

      // Opening editing teacher modal
      // Preparing essential variables
      async editItem (student) {
        this.editedIndex = this.students.findIndex(v => v.id_field === student.id_field);
        this.beforeEdit = JSON.parse(JSON.stringify(student));
        this.student = JSON.parse(JSON.stringify(student));

        await this.parentsAndTeachers();

        this.dialog = true;
      },

      // Opening delete teacher modal
      // Preparing essential variables
      deleteItem (student) {
        this.response.header = 'Uwaga';
        this.response.content = `Czy na pewno chcesz usunąć konto ${student.name}?`;
        this.response.ok = 'Tak';
        this.response.cancel = 'Anuluj';
        this.response.type = 'error';
        this.response.modal = true;

        this.deletingStudent.student = student;
        this.deletingStudent.index = this.students.findIndex(v => v.id_field === student.id_field);
      },

      // Deleting existing teacher
      async asDeleteStudent(){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('students/deleteStudent', this.deletingStudent.student.id_field);

          this.response.modal = false;

          this.deletingStudent = {
            student: {},
            index: null
          };

          this.asyncProcess(false);

        } catch(e){
          this.asyncProcess(false);
          this.response.content = e;
          this.response.type = 'error';
          this.response.modal = true;
          this.response.ok = null;
          this.response.cancel = null;
        }
      },

      // Clearing edit's variables
      // Opening Add Teacher Modal
      async showAddModal(){
        this.editedIndex = -1;
        this.student = JSON.parse(JSON.stringify(basic));

        this.beforeEdit = JSON.parse(JSON.stringify(this.student));

        this.$refs.studentform.resetValidation();

        await this.parentsAndTeachers();

        this.dialog = true;
      },

      async parentsAndTeachers(){
        if(!this.loadedFullData){
          this.asyncProcess(true);

          await this.$store.dispatch('parents/getParents');
          await this.$store.dispatch('classes/getClasses');

          this.loadedFullData = true;

          this.asyncProcess(false);
        }
      },

      fillNames(){
        this.student.user.name = this.parents.find(v => v.id_field === this.student.user.id_field).name;
        this.student.class_field.name = this.classes.find(v => v.id_field === this.student.class_field.id_field).name;
      }
    },
    components: {
      UtilModal
    },

    async created(){
      this.loading = true;
      await this.$store.dispatch('students/getStudents');
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>