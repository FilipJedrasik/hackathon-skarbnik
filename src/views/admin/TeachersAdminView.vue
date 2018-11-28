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
                            ref="teachers"
                            @submit="editedIndex === -1 ? add() : edit()">
                        <v-card-text>
                            <v-container grid-list-md>
                                    <v-form style="width:100%" ref="teacherForm" v-model="valid">

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

                                    </v-form>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click="dialog = false">Anuluj</v-btn>
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
      loading: false,
      dialog: false,
      valid: false,
      beforeEdit: {},
      response:{
        type: 'error',
        modal: false,
        content: null,
        ok: null,
        cancel: null
      },
      teacher: {
        email: '',
        name: '',
        password: '',
        role: 1,
        username: ''
      },
      deletingTeacher: {
        teacher: {},
        index: null
      },
      editedIndex: -1
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
      emailUsed(){
        return [
          v => Array.isArray(this.teachers) && this.teachers.filter(
                x => this.editedIndex != -1 ?
                    (this.beforeEdit.email !== x.email && x.email == v.trim() )
                    : x.email == v.trim()
            ).length == 0 || 'Podany email jest już zajęty',
            ...this.emailRules
        ];
      },
      loginUsed(){
        return [
          v => Array.isArray(this.teachers) && this.teachers.filter(
              x => this.editedIndex != -1 ?
                  (this.beforeEdit.username !== x.username && x.username == v.trim() )
                  : x.username == v.trim()
          ).length == 0 || 'Podany login jest już zajęty',
          ...this.loginRules
        ];
      },
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
      async add(){
        if(this.$refs.teacherForm.validate()){
          try{
            this.$store.dispatch('teachers/addTeacher', this.teacher);

            this.dialog = false;
            this.teacher = {
                email: '',
                name: '',
                password: '',
                role: 1,
                username: ''
            };

            this.response.content = 'Udało się dodać nauczyciela';
            this.response.type = 'success';
            this.response.modal = true;
          } catch(e){
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },
      async edit(){
        if(this.$refs.teacherForm.validate()) {
          try {
            delete this.teacher.password;
            const pos = this.teachers.findIndex(v => v.id_field === this.teacher.id_field);
            this.$store.dispatch('teachers/updateTeacher', {
              teacher: this.teacher,
              pos
            });

            this.dialog = false;

            this.teacher = Object.assign({}, {
              email: '',
              name: '',
              password: '',
              role: 1,
              username: ''
            });

            this.response.content = 'Udało się zaaktualizować nauczyciela';
            this.response.type = 'success';
            this.response.modal = true;
          }
          catch (e) {
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      },

      editItem (teacher, index) {
        this.editedIndex = this.teachers.findIndex(v => v.id_field === teacher.id_field);
        this.beforeEdit = Object.assign({}, teacher);
        this.teacher = Object.assign({}, teacher);
        this.dialog = true;
      },

      deleteItem (teacher, index) {
        this.response.header = 'Uwaga';
        this.response.content = `Czy na pewno chcesz usunąć konto ${teacher.name}?`;
        this.response.ok = 'Tak';
        this.response.cancel = 'Anuluj';
        this.response.type = 'error';
        this.response.modal = true;

        this.deletingTeacher.teacher = teacher;
        this.deletingTeacher.index = index;
      },
      async asDeleteTeacher(){
        try{
          await this.$store.dispatch('teachers/deleteTeacher', {
            id: this.deletingTeacher.teacher.id,
            pos: this.deletingTeacher.index
          });

          this.response.modal = false;

          this.deletingTeacher = {
            teacher: {},
            index: null
          };

        } catch(e){
          this.response.content = e;
          this.response.type = 'error';
          this.response.modal = true;
          this.response.ok = null;
          this.response.cancel = null;
        }
      },
      showAddModal(){
        this.editedIndex = -1;
        this.teacher = {
          email: '',
          name: '',
          password: '',
          role: 1,
          username: '',
          login: ''
        };
        this.dialog = true;
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    },
    components: {
      UtilModal
    },
    watch:{
      dialog (val) {
        val || this.close()
      }
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