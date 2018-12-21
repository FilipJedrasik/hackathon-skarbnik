<template>
    <v-flex xs12>
        <!-- ASYNC OPERATION MODAL -->
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                :header="response.header !== null ? response.header : undefined"
                :ok="response.ok !== null ? response.ok : undefined"
                :cancel="response.cancel !== null ? response.cancel : undefined"
                @ok="asDeleteParent"
                @cancel="response.modal = false"
                v-model="response.modal"></util-modal>

        <!--HEADER - TEACHERS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Rodzice</v-toolbar-title>
            <v-spacer></v-spacer>
            <br>
            <v-btn
                    v-show="parents.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj konto rodzica'}}</v-btn>
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
                            ref="parentform">
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="assignment_ind"
                                            v-model="parent.name"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(parent) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            :rules="nameRules"
                                            label="Imię i nazwisko"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="mail"
                                            v-model="parent.email"
                                            :rules="emailUsed"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(parent) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            label="Adres email"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="person"
                                            v-model="parent.username"
                                            :rules="loginUsed"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(parent) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            label="Login"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 v-if="editedIndex === -1">
                                    <v-text-field
                                            prepend-icon="lock"
                                            v-model="parent.password"
                                            :rules="passwordRules"
                                            label="Hasło"
                                            type="password"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(parent) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="editedIndex === -1 ? add() : edit()"
                                        :disabled="!valid || JSON.stringify(parent) === JSON.stringify(beforeEdit)"
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
                :items="loading ? [] : parents"
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
                    <v-btn color="primary" @click="dialog = true" v-if="!loading">Utwórz konto rodzica</v-btn>
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

  const basic = { // Currently adding/editing Parent
    email: '',
    name: '',
    password: '',
    username: ''
  };

  export default {
    data: () => ({
      loading: false, // Is data being fetched from the server now?
      dialog: false, // Adding/editing Modal stance
      valid: false, // is Adding/editing form valid?

      beforeEdit: {}, // Editing parent start stance

      response:{ // UI Util response obj
        type: 'error',
        modal: false,
        content: null,
        ok: null,
        cancel: null
      },

      parent: basic, // Currently adding/editing Parent

      deletingParent: { // Parent to delete
        parent: {}, // Parent Object
        index: null // ID in $store.parents Array
      },

      editedIndex: -1 // Currently edited Index in $store.parents Array
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Dodawanie rodzica' : 'Edytowanie rodzica'
      },
      submitTitle () {
        return this.editedIndex === -1 ? 'Dodaj' : 'Zapisz';
      },
      parents(){
        return this.$store.getters['parents/getParents'];
      },

      // Basic email rules + unique values
      emailUsed(){
        return [
          ...this.emailRules,
          v => v != null && Array.isArray(this.parents) && this.parents.filter(
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
          v => v != null && Array.isArray(this.parents) && this.parents.filter(
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
      // Adding new parent
      async add(){
        if(this.$refs.parentform.validate()){

          this.response.ok = null;
          this.response.cancel = null;

          try{
            this.asyncProcess(true);

            await this.$store.dispatch('parents/addParent', this.parent);

            this.dialog = false;
            this.parent = Object.assign({}, basic);

            this.asyncProcess(false);

            this.response.content = 'Udało się dodać konto rodzica';
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

      // Editing existing parent
      async edit(){
        if(this.$refs.parentform.validate()) {

          this.response.ok = null;
          this.response.cancel = null;

          try {
            delete this.parent.password;

            this.asyncProcess(true);

            await this.$store.dispatch('parents/updateParent', {
              parent: this.parent,
              id: this.parent.id_field
            });

            this.dialog = false;

            this.parent = Object.assign({}, basic);

            this.asyncProcess(false);

            this.response.content = 'Udało się zaaktualizować konto rodzica';
            this.response.type = 'success';
            this.response.ok = 'OK';
            this.response.cancel = null;
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

      // Opening editing parent modal
      // Preparing essential variables
      editItem (parent) {
        this.editedIndex = this.parents.findIndex(v => v.id_field === parent.id_field);
        this.beforeEdit = Object.assign({}, parent);
        this.parent = Object.assign({}, parent);
        this.dialog = true;
      },

      // Opening delete parent modal
      // Preparing essential variables
      deleteItem (parent) {
        this.response.header = 'Uwaga';
        this.response.content = `Czy na pewno chcesz usunąć konto ${parent.name}?`;
        this.response.ok = 'Tak';
        this.response.cancel = 'Anuluj';
        this.response.type = 'error';
        this.response.modal = true;

        this.deletingParent.parent = parent;
        this.deletingParent.index = this.parents.findIndex(v => v.id_field === parent.id_field);
      },

      // Deleting existing Parent
      async asDeleteParent(){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('parents/deleteParent', this.deletingParent.parent.id_field);

          this.response.modal = false;

          this.deletingParent = {
            parent: {},
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
      // Opening Add Parent Modal
      showAddModal(){
        this.editedIndex = -1;
        this.parent = basic;

        this.$refs.parentform.resetValidation();

        this.dialog = true;
      }
    },
    components: {
      UtilModal
    },

    async created(){
      this.loading = true;
      await this.$store.dispatch('parents/getParents');
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>