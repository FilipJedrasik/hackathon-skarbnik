<template>
    <v-flex xs12>
        <!-- ASYNC OPERATION MODAL -->
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                :header="response.header !== null ? response.header : undefined"
                :ok="response.ok !== null ? response.ok : undefined"
                :cancel="response.cancel !== null ? response.cancel : undefined"
                @ok="asDeleteTeacher"
                @cancel="response.modal = false"
                v-model="response.modal"></util-modal>

        <!--HEADER - TEACHERS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Nauczyciele</v-toolbar-title>
            <v-spacer></v-spacer>
            <br>
            <v-btn
                    v-show="teachers.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj nauczyciela'}}</v-btn>
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
                            ref="teacherform">
                        <v-card-text>
                            <v-container grid-list-md>
                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="assignment_ind"
                                                    v-model="teacher.name"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="valid || JSON.stringify(teacher) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                                    :rules="nameRules"
                                                    label="Imię i nazwisko"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="mail"
                                                    v-model="teacher.email"
                                                    :rules="emailUsed"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="valid || JSON.stringify(teacher) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                                    label="Adres email"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="person"
                                                    v-model="teacher.username"
                                                    :rules="loginUsed"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="valid || JSON.stringify(teacher) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                                    label="Login"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 v-if="editedIndex === -1">
                                            <v-text-field
                                                    prepend-icon="lock"
                                                    v-model="teacher.password"
                                                    :rules="passwordRules"
                                                    label="Hasło"
                                                    type="password"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="valid || JSON.stringify(teacher) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="editedIndex === -1 ? add() : edit()"
                                        :disabled="!valid || JSON.stringify(teacher) === JSON.stringify(beforeEdit)"
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
  import UtilModal from '@/components/UtilModal';

  export default {
    data: () => ({
      loading: false, // Is data being fetched from the server now?
      dialog: false, // Adding/editing Modal stance
      valid: false, // is Adding/editing form valid?

      beforeEdit: {}, // Editing teacher start stance

      response:{ // UI Util response obj
        type: 'error',
        modal: false,
        content: null,
        ok: null,
        cancel: null
      },

      teacher: { // Currently adding/editing Teacher
        email: '',
        name: '',
        password: '',
        username: ''
      },

      deletingTeacher: { // Teacher to delete
        teacher: {}, // Teacher Object
        index: null // ID in $store.teachers Array
      },

      editedIndex: -1 // Currently edited Index in $store.teachers Array
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodawanie nauczyciela' : 'Edytowanie nauczyciela'
      },
      submitTitle () {
        return this.editedIndex === -1 ? 'Dodaj' : 'Zapisz';
      },
      teachers(){
        return this.$store.getters['teachers/getTeachers'];
      },

      // Basic email rules + unique values
      emailUsed(){
        return [
            ...this.emailRules,
          v => v != null && Array.isArray(this.teachers) && this.teachers.filter(
                x => this.editedIndex != -1 ?
                    (this.beforeEdit.email !== x.email && x.email == v.trim() )
                    : x.email == v.trim()
            ).length == 0 || 'Podany email jest już zajęty'
        ];
      },

      // Basic login rules + unique values
      loginUsed(){
        return [
          ...this.loginRules,
          v => v != null && Array.isArray(this.teachers) && this.teachers.filter(
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
      async add(){
        if(this.$refs.teacherform.validate()){
          try{
            this.$emit('async', true);
            await this.$store.dispatch('teachers/addTeacher', this.teacher);

            this.dialog = false;
            this.teacher = {
                email: '',
                name: '',
                password: '',
                username: '',
                ok: null,
                cancel: null
            };

            this.$emit('async', false);

            this.response.content = 'Udało się dodać nauczyciela';
            this.response.type = 'success';
            this.response.modal = true;
          } catch(e){
            this.$emit('async', false);
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },

      // Editing existing teacher
      async edit(){
        if(this.$refs.teacherform.validate()) {
          try {
            delete this.teacher.password;

            this.$emit('async', true);

            await this.$store.dispatch('teachers/updateTeacher', {
              teacher: this.teacher,
              id: this.teacher.id_field
            });

            this.dialog = false;

            this.teacher = Object.assign({}, {
              email: '',
              name: '',
              password: '',
              username: ''
            });

            this.$emit('async', false);

            this.response.content = 'Udało się zaaktualizować nauczyciela';
            this.response.type = 'success';
            this.response.modal = true;
          }
          catch (e) {
            this.$emit('async', false);

            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },

      // Opening editing teacher modal
      // Preparing essential variables
      editItem (teacher) {
        this.editedIndex = this.teachers.findIndex(v => v.id_field === teacher.id_field);
        this.beforeEdit = Object.assign({}, teacher);
        this.teacher = Object.assign({}, teacher);
        this.dialog = true;
      },

      // Opening delete teacher modal
      // Preparing essential variables
      deleteItem (teacher) {
        this.response.header = 'Uwaga';
        this.response.content = `Czy na pewno chcesz usunąć konto ${teacher.name}?`;
        this.response.ok = 'Tak';
        this.response.cancel = 'Anuluj';
        this.response.type = 'error';
        this.response.modal = true;

        this.deletingTeacher.teacher = teacher;
        this.deletingTeacher.index = this.teachers.findIndex(v => v.id_field === teacher.id_field);
      },

      // Deleting existing teacher
      async asDeleteTeacher(){
        try{
          this.$emit('async', true);
          await this.$store.dispatch('teachers/deleteTeacher', this.deletingTeacher.teacher.id_field);

          this.response.modal = false;

          this.deletingTeacher = {
            teacher: {},
            index: null
          };

          this.$emit('async', false);

        } catch(e){
          this.$emit('async', false);
          this.response.content = e;
          this.response.type = 'error';
          this.response.modal = true;
          this.response.ok = null;
          this.response.cancel = null;
        }
      },

      // Clearing edit's variables
      // Opening Add Teacher Modal
      showAddModal(){
        this.editedIndex = -1;
        this.teacher = {
          email: null,
          name: null,
          password: null,
          username: null
        };

        this.$refs.teacherform.resetValidation();

        this.dialog = true;
      }
    },
    components: {
      UtilModal
    },

    async created(){
      this.loading = true;
      await this.$store.dispatch('teachers/getTeachers');
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>