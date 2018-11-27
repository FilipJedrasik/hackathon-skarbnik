<template>
    <v-flex xs12>
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                v-model="response.modal"></util-modal>
        <v-toolbar flat color="white">
            <v-toolbar-title>Klasy</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    v-show="classes.length"
                    color="primary"
                    @click.native="showAddModal"
                    dark
                    class="mb-2">Dodaj klase</v-btn>
            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-form
                            v-model="valid"
                            ref="classes"
                            @submit="editedIndex === -1 ? add() : edit()">
                        <v-card-text>
                            <v-container grid-list-md>

                                    <v-form style="width:100%" ref="classesForm" v-model="valid">
                                        <v-flex xs12>
                                            <v-text-field
                                                    v-model="one_class.name"
                                                    :rules="classnameRules"
                                                    label="Nazwa klasy"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-select
                                                    :items="freeTeachers"
                                                    v-model="one_class.supervisor"
                                                    :menu-props="{ maxHeight: '400' }"
                                                    label="Wychowawca"
                                                    hint="Wybierz wychowawce dla klasy"
                                                    persistent-hint
                                                    item-text="name"
                                                    item-value="id"
                                            ></v-select>
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
                :items="classes"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.supervisor }}</td>
                <td class="layout px-0">
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
                    <v-btn color="primary" @click="dialog = true">Utwórz klase</v-btn>
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
        { text: 'Klasa', value: 'class_name' },
        { text: 'Wychowawca', value: 'supervisor' },
        { text: 'Akcje', value: 'name', sortable: false }
      ],
      classnameRules:[
        v => v && v.length >= 3 || "Za krótka nazwa klasy",
        v => v && /\d[a-zA-Z]+\d$/.test(v) || "Błędna nazwa klasy"
      ],
      teachers: [
        {
          value: 4,
          text: 'Darek Nowak',
          login: 'daro123',
          password: 'abcabcabc',
          email: 'abc@op.pl'
        }
      ],
      beforeEdit: {},
      response:{
        type: 'error',
        modal: false,
        content: null
      },
      one_class: {
        name: '',
        supervisor: -1
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
      classes(){
        return this.$store.getters['classes/getClasses'];
      },
      freeTeachers(){
        return this.$store.getters['classes/getFreeTeachers'];
      }
    },

    methods: {
      async add(){
        if(this.$refs.teacherForm.validate()){
          try{
            this.$store.dispatch('parents/addTeacher', this.teacher);
            this.teachers.push(this.teacher);
            this.dialog = false;
            this.teacher = {
              name: '',
              login: '',
              password: '',
              email: ''
            };
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
            this.$store.dispatch('parents/updateTeacher', this.teacher);
            this.teachers[this.editedIndex] = this.teacher;
            this.dialog = false;

            this.teacher = {
              name: '',
              login: '',
              password: '',
              email: ''
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

      async showAddModal(){
        if(this.$store.getters['classes/getFreeTeachers'] === null){
          await this.$store.dispatch('classes/getFreeTeachers');
        }
        this.one_class = {
              name: '',
              supervisor: -1
        };
        this.dialog = true;
      },

      editItem(teacher, index) {
        this.editedIndex = index;
        this.beforeEdit = Object.assign({}, teacher);
        this.one_class = Object.assign({}, teacher);
        this.dialog = true;
      },

      deleteItem (teacher, index) {
        if(confirm('Czy na pewno chcesz usunąć tego nauczyciela?')){
            try{
              this.$store.dispatch('parents/deleteTeacher', this.teacher.id);
              this.teachers.splice(index, 1);
            } catch(e){
              this.response.content = e;
              this.response.type = 'error';
              this.response.modal = true;
            }
        }
      }
    },
    async created(){
      await this.$store.dispatch('classes/getClasses');
    },
    components: {
      UtilModal
    }
  }
</script>

<style scoped>

</style>