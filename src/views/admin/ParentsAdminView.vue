<template>
    <v-flex xs12>
        <!--HEADER - PARENTS-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Rodzice</v-toolbar-title>
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
                    v-show="parents.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    data-cy="add-parent"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj konto rodzica'}}</v-btn>
            <!--ADDING PARENTS-->
            <template v-if="loadDialog">
                      <AddModal 
                        v-model="dialog"
                        :beforeEdit="beforeEdit"
                        :editing="isEditing"
                        @add="add"
                        @edit="edit"/>
            </template>
        </v-toolbar>


        <!--PARENTS CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : parents"
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
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.username }}</td>
                </template>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                    <td>{{ props.item.password }}</td>
                </template>
                <td class="justify-center layout px-0"  data-cy="crud">
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
  const basic = { // Currently adding/editing Parent
    email: '',
    name: '',
    password: '',
    username: ''
  };

  const AddModal = () => import('@/components/Admin/Parents/AddModal.vue');

  import parentsModule from '@/store/parents';

  export default {
    components: {
      AddModal
    },
    
    data: () => ({
      processing: false, // Currently doing async operation
      loading: false, // Is data being fetched from the server now?
      dialog: true, // Adding/editing Modal stance
      loadDialog: false,
      valid: false, // is Adding/editing form valid?
      search: null,
      
      beforeEdit: {}, // Editing parent start stance
     
      isEditing: false
    }),

    computed: {
      parents(){
        return this.$store.getters['parents/get'];
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
      async add(parent){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try{
            this.asyncProcess(true);

            await this.$store.dispatch('parents/add', parent);

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się dodać rodzica',
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

      // Editing existing parent
      async edit(parent){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try {
            this.asyncProcess(true);

            await this.$store.dispatch('parents/update', {
              parent,
              id: parent.id_field
            });

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się zaaktualizować rodzica',
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

      // Opening editing parent modal
      // Preparing essential variables
      editItem (parent) {
        this.loadDialog = true;
        this.isEditing = true;
        this.editedIndex = this.parents.findIndex(v => v.id_field === parent.id_field);
        this.beforeEdit = Object.assign({}, parent);
        this.dialog = true;
      },

      // Opening delete parent modal
      // Preparing essential variables
      deleteItem (parent) {
        this.$store.commit('utilModal/SET', {
          header: 'Uwaga',
          content: `Czy na pewno chcesz usunąć konto ${parent.name}?`,
          ok: 'Tak',
          cancel: 'Anuluj',
          type: 'error',
          visible: true,
          onOk: () => this.asDeleteParent(parent.id_field)
        })
      },

      // Deleting existing Parent
      async asDeleteParent(parentId){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('parents/delete', parentId);

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
      // Opening Add Parent Modal
      showAddModal(){
        this.isEditing = false;
        this.beforeEdit = Object.assign({}, basic);
        this.loadDialog = true;
        this.dialog = true;
      }
    },

    async created(){
      // Vuex module
      this.$store.registerModule('parents', parentsModule);

      this.loading = true;
      await this.$store.dispatch('parents/get');
      this.loading = false;
    },

    beforeDestroy(){
      this.$store.unregisterModule('parents');
    }
  }
</script>