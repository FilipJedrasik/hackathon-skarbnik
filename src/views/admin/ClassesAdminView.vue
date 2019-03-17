<template>
    <v-flex xs12>
        <!--HEADER - CLASSES-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Klasy</v-toolbar-title>
            <v-spacer></v-spacer>
            <br>
            <v-btn
                    v-show="classes.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj nową klasę'}}</v-btn>
            <!--ADDING CLASS-->
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
                            ref="classform">
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="event_note"
                                            v-model="theClass.name"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(theClass) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            :rules="classnameRulesUnique"
                                            label="Nazwa klasy"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            :items="freeTeachers"
                                            v-model="theClass.user.id_field"
                                            item-text="name"
                                            item-value="id_field"
                                            menu-props="auto"
                                            label="Wychowawca"
                                            hide-details
                                            prepend-icon="school"
                                            single-line
                                            :rules="pickedUserObjRule"
                                    ></v-select>
                                </v-flex>

                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="editedIndex === -1 ? add() : edit()"
                                        :disabled="processing || !valid || JSON.stringify(theClass) === JSON.stringify(beforeEdit)"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-toolbar>


        <!--CLASSES CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : classes"
                class="elevation-1"
                :loading="loading"
                item-key="name"
        >
            <!--LOADING PROGRESS BAR-->
            <v-progress-linear v-if='loading' slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.user.name }}</td>
                <td class="justify-end layout px-3">
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
                    <v-btn color="primary" @click="dialog = true" v-if="!loading">Utwórz nową klasę</v-btn>
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
  const aClass = { // Currently adding/editing Class
    name: '',
    user:{
      name: '',
      id_field: null
    }
  };

  export default {
    data() {
      return {
        loading: false, // Is data being fetched from the server now?
        dialog: false, // Adding/editing Modal stance
        valid: false, // is Adding/editing form valid?

        beforeEdit: {}, // Editing class start stance

        response:{ // UI Util response obj
          type: 'error',
          modal: false,
          content: null,
          ok: null,
          cancel: null
        },

        theClass: JSON.parse(JSON.stringify(aClass)), // Currently adding/editing Class

        deletingClass: { // Class to delete
          theClass: {}, // Class Object
          index: null // ID in $store.classes Array
        },

        editedIndex: -1 // Currently edited Index in $store.classes Array
      };
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodawanie klasy' : 'Edytowanie klasy'
      },
      submitTitle () {
        return this.editedIndex === -1 ? 'Dodaj' : 'Zapisz';
      },
      classes(){
        return this.$store.getters['classes/getClasses'];
      },
      freeTeachers(){
        return this.editedIndex === -1 ? this.$store.getters['classes/getFreeTeachers'] : [...this.$store.getters['classes/getFreeTeachers'], this.theClass.user];
      },
      classnameRulesUnique(){
        return [
            ...this.classnameRules,
          v => v != null && Array.isArray(this.classes) && this.classes.filter(
              x => this.editedIndex != -1 ?
                  (this.beforeEdit.name !== x.name && x.name == v.trim() )
                  : x.name == v.trim()
          ).length == 0 || 'Podana klasa już istnieje'
        ];
      },

      // Responsive headers
      headers(){
        return [
          { text: 'Nazwa klasy', value: 'name' },
          { text: 'Wychowawca', value: 'user.name' },
          { text: 'Akcje', value: 'name', align: 'right', sortable: false }
        ];
      }
    },

    methods: {
      // Adding new class
      async add(){
        if(this.$refs.classform.validate()){
          try{
            this.asyncProcess(true);

            this.theClass.user.name = this.freeTeachers.find(v => v.id_field === this.theClass.user.id_field).name;

            await this.$store.dispatch('classes/addClass', this.theClass);

            this.dialog = false;
            this.theClass = JSON.parse(JSON.stringify(aClass));

            this.asyncProcess(false);

            this.response.content = 'Udało się dodać nową klasę';
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

      // Editing existing class
      async edit(){
        if(this.$refs.classform.validate()) {
          try {
            this.asyncProcess(true);

            this.theClass.user.name = this.freeTeachers.find(v => v.id_field === this.theClass.user.id_field).name;
            await this.$store.dispatch('classes/updateClass', this.theClass);

            this.dialog = false;

            this.theClass = JSON.parse(JSON.stringify(aClass));

            this.asyncProcess(false);

            this.response.content = 'Udało się zaaktualizować klasę';
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

      // Opening editing class modal
      // Preparing essential variables
      async editItem (theClass) {
        this.editedIndex = this.classes.findIndex(v => v.id_field === theClass.id_field);
        this.beforeEdit = JSON.parse(JSON.stringify(theClass));
        this.theClass = JSON.parse(JSON.stringify(theClass));

        if(!this.$store.getters['classes/loadedFreeTeachers']){
          this.asyncProcess(true);
          await this.$store.dispatch('classes/getFreeTeachers');
          this.asyncProcess(false);
        }

        this.dialog = true;
      },

      // Opening delete class modal
      // Preparing essential variables
      deleteItem (theClass) {
        this.response.header = 'Uwaga';
        this.response.content = `Czy na pewno chcesz usunąć klasę ${theClass.name}?`;
        this.response.ok = 'Tak';
        this.response.cancel = 'Anuluj';
        this.response.type = 'error';
        this.response.modal = true;

        this.deletingClass.theClass = theClass;
        this.deletingClass.index = this.classes.findIndex(v => v.id_field === theClass.id_field);
      },

      // Deleting existing class
      async asDeleteClass(){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('classes/deleteClass', {
            id: this.deletingClass.theClass.id_field,
            teacher: this.deletingClass.theClass.user
          });

          this.response.modal = false;

          this.deletingClass = {
            theClass: {},
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
      // Opening Add Class Modal
      async showAddModal(){
        this.editedIndex = -1;
        this.theClass = {
          name: '',
          user: {
            name: '',
            id_field: null
          }
        };

        this.$refs.classform.resetValidation();
        if(this.$store.getters['classes/loadedFreeTeachers'] === false){
          this.$emit('async', true);
          await this.$store.dispatch('classes/getFreeTeachers');
          this.$emit('async', false);
        }

        this.dialog = true;
      }
    },

    async created(){
      this.loading = true;
      await this.$store.dispatch('classes/getClasses');
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>