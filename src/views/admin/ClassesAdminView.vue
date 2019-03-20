<template>
    <v-flex xs12>
        <!--HEADER - CLASSES-->
        <v-toolbar flat color="white">
            <v-toolbar-title>Klasy</v-toolbar-title>
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
                    v-show="classes.length"
                    @click="showAddModal"
                    color="primary"
                    :disabled="loading"
                    :dark="!loading"
                    data-cy="add-class"
                    class="mb-2">{{$vuetify.breakpoint.xsOnly ? '+' : 'Dodaj nową klasę'}}</v-btn>
            <!--ADDING CLASS-->
           <template v-if="loadDialog">
                      <AddModal 
                        v-model="dialog"
                        :beforeEdit="beforeEdit"
                        :editing="isEditing"
                        @add="add"
                        @edit="edit"/>
            </template>
        </v-toolbar>


        <!--CLASSES CRUD-->
        <v-data-table
                :headers="headers"
                :items="loading ? [] : classes"
                class="elevation-1"
                :loading="loading"
                item-key="name"
                :search="search"
        >
            <!--LOADING PROGRESS BAR-->
            <v-progress-linear v-if='loading' slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.user.name }}</td>
                <td class="justify-end layout px-3" data-cy="crud">
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

  import classesModule from '@/store/classes'

  const AddModal = () => import('@/components/Admin/Classes/AddModal.vue');

  export default {
    components:{
      AddModal
    },

    data() {
      return {
        processing: false, // Currently doing async operation
        loading: false, // Is data being fetched from the server now?
        dialog: true, // Adding/editing Modal stance
        loadDialog: false,
        valid: false, // is Adding/editing form valid?
        search: null,
        
        beforeEdit: {}, // Editing parent start stance
      
        isEditing: false
      };
    },

    computed: {
      
      classes(){
        return this.$store.getters['classes/get'];
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
      async add(theClass){
          try{
            this.asyncProcess(true);

            await this.$store.dispatch('classes/add', theClass);

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się dodać nową klasę',
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

      // Editing existing class
      async edit(theClass){
          this.$store.commit('utilModal/SET', {
            ok: null,
            cancel: null
          })

          try {
            this.asyncProcess(true);

            await this.$store.dispatch('classes/update', theClass);

            this.dialog = false;

            this.asyncProcess(false);

            this.$store.commit('utilModal/SET', {
              content: 'Udało się zaaktualizować klase',
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

      // Opening editing class modal
      // Preparing essential variables
      async editItem (theClass) {
        this.isEditing = true;
        this.beforeEdit = JSON.parse(JSON.stringify(theClass));

        if(!this.$store.getters['classes/loadedFreeTeachers']){
          this.asyncProcess(true);
          await this.$store.dispatch('classes/getFreeTeachers');
          this.asyncProcess(false);
        }

        this.loadDialog = true;
        this.dialog = true;
      },

      // Opening delete class modal
      // Preparing essential variables
      deleteItem (theClass) {
        this.$store.commit('utilModal/SET', {
          header: 'Uwaga',
          content: `Czy na pewno chcesz usunąć klasę ${theClass.name}?`,
          ok: 'Tak',
          cancel: 'Anuluj',
          type: 'error',
          visible: true,
          onOk: () => this.asDeleteClass(theClass.id_field, theClass.user)
        })
      },

      // Deleting existing class
      async asDeleteClass(classId, teacher){
        try{
          this.asyncProcess(true);
          await this.$store.dispatch('classes/delete', {
            id: classId,
            teacher
          });

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
      // Opening Add Class Modal
      async showAddModal(){
        this.isEditing = false;

        if(this.$store.getters['classes/loadedFreeTeachers'] === false){
          this.$emit('async', true);
          await this.$store.dispatch('classes/getFreeTeachers');
          this.$emit('async', false);
        }

        this.loadDialog = true;
        this.dialog = true;
      }
    },

    async created(){
      // Vuex module
      this.$store.registerModule('classes', classesModule);

      this.loading = true;
      await this.$store.dispatch('classes/get');
      this.loading = false;
    },

    beforeDestroy(){
      this.$store.unregisterModule('classes');
    }
  }
</script>