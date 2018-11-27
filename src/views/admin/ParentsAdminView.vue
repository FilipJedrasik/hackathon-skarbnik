<template>
    <v-flex xs12>
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                v-model="response.modal"></util-modal>
        <v-toolbar flat color="white">
            <v-toolbar-title>Rodzice</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    v-show="teachers.length"
                    @click="showAddModal"
                    color="primary"
                    dark
                    class="mb-2">Dodaj rodzica</v-btn>
            <v-dialog v-model="dialog" max-width="600px">

                <v-card>
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
                                                v-model="teacher.name"
                                                :rules="nameRules"
                                                label="Imię i nazwisko"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                v-model="teacher.email"
                                                :rules="emailRules"
                                                label="Adres email"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                v-model="teacher.login"
                                                :rules="loginRules"
                                                label="Login"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 v-if="editedIndex === -1">
                                        <v-text-field
                                                v-model="teacher.password"
                                                :rules="passwordRules"
                                                label="Hasło"
                                                type="password"
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
                                        :disabled="!valid"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="teachers"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.login }}</td>
                <td>{{ props.item.password }}</td>
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
                            @click="deleteItem(props.item, props.index)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template slot="no-data">
                <div style="text-align:center;padding: 15px 0;">
                    <v-btn color="primary" @click="dialog = true">Utwórz konto rodzica</v-btn>
                </div>
            </template>
        </v-data-table>
    </v-flex>
</template>

<script>
  import UtilModal from '@/components/UtilModal';
  export default {
    data: () => ({
      dialog: false,
      valid: false,
      headers: [
        { text: 'Imię i nazwisko', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Login', value: 'login' },
        { text: 'Hasło', value: 'password' },
        { text: 'Akcje', value: 'name', sortable: false }
      ],
      beforeEdit: {},
      response:{
        type: 'error',
        modal: false,
        content: null
      },
      teacher: {
        email: '',
        name: '',
        password: '',
        role: 1,
        username: '',
        login: ''
      },
      nameRules: [
        v => !!v || 'Imię i nazwisko jest wymagane',
        v => (v && v.length >= 5) || 'Login musi mieć conajmniej 5 znaków',
        v => (v.split(' ').length === 2) || 'Błędna forma'
      ],
      loginRules: [
        v => !!v || 'Login jest wymagany',
        v => (v && v.length >= 5) || 'Login musi mieć conajmniej 5 znaków'
      ],
      passwordRules: [
        v => !!v || 'Hasło jest wymagane',
        v => (v && v.length >= 5) || 'Hasło musi mieć conajmniej 8 znaków'
      ],
      emailRules: [
        v => !!v || 'E-mail jest wymagany',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
      ],

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
        return this.$store.getters['parents/getParents'];
      }
    },

    methods: {
      async add(){
        if(this.$refs.teacherForm.validate()){
          try{
            this.teacher.username = this.teacher.login;

            this.$store.dispatch('parents/addParent', this.teacher);

            this.dialog = false;
            this.teacher = {
              email: '',
              name: '',
              password: '',
              role: 1,
              username: '',
              login: ''
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
            this.$store.dispatch('parents/updateParent', {
              teacher: this.teacher,
              pos: this.editedIndex
            });
            this.dialog = false;

            this.teacher = {
              email: '',
              name: '',
              password: '',
              role: 1,
              username: ''
            };

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
        this.editedIndex = index;
        this.beforeEdit = Object.assign({}, teacher);
        this.teacher = Object.assign({}, teacher);
        this.dialog = true;
      },

      deleteItem (teacher, index) {
        if(confirm('Czy na pewno chcesz usunąć tego nauczyciela?')){
          try{
            this.$store.dispatch('parents/deleteParent', {
              id: teacher.id,
              pos: index
            });
            this.teachers.splice(index, 1);
          } catch(e){
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
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
      await this.$store.dispatch('parents/getParents');
    }
  }
</script>

<style scoped>

</style>