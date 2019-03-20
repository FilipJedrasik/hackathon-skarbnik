<template>
    <!--ADDING CLASS-->
            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <!--ADD/EDIT IN ONE MODAL-->
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-form
                            v-model="formValid"
                            lazy-validation
                            @submit="!editing ? add() : edit()"
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
                                            data-cy="name"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 data-cy="supervisor">
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
                                        data-cy="submit"
                                        color="primary"
                                        @click.native="!editing ? add() : edit()"
                                        :disabled="!formValid || JSON.stringify(theClass) === JSON.stringify(beforeEdit) || processing"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
</template>

<script>

    const classSignature = { // Currently adding/editing Class
        name: '',
        user:{
            name: '',
            id_field: null
        }
    };

    export default {
        props:{
            value: {
                type: Boolean,
                required: true
            },
            editing: {
                type: Boolean,
                required: true
            },
            beforeEdit: Object
        },
        data(){
            return {
                dialog: true,
                theClass: Object.assign({}, classSignature),
                formValid: false
            }
        },
        watch: {
            value(n){
                this.dialog = n; 
            },
            dialog(n) {
                this.$emit('input', n)
            },
            editing(n) {
                this.$refs.classform.resetValidation();
                if(n){
                    this.classSignature = Object.assign({}, this.beforeEdit);
                }
            },
            beforeEdit(n){
                this.theClass = JSON.parse(JSON.stringify(n));
                this.$refs.classform.resetValidation();
            }
        },
        computed: {
            formTitle () {
                return !this.editing ? 'Dodawanie klasy' : 'Edytowanie klasy'
            },
            submitTitle () {
                return !this.editing ? 'Dodaj' : 'Zapisz';
            },
            freeTeachers(){
                return !this.editing? this.$store.getters['classes/getFreeTeachers'] : [...this.$store.getters['classes/getFreeTeachers'], this.theClass.user];
            },
            classes(){
                return this.$store.getters['classes/get'];
            },
            classnameRulesUnique(){
                return [
                    ...this.classnameRules,
                v => v != null && Array.isArray(this.classes) && this.classes.filter(
                    x => this.editing ?
                        (this.beforeEdit.name !== x.name && x.name == v.trim() )
                        : x.name == v.trim()
                ).length == 0 || 'Podana klasa już istnieje'
                ];
            },

            parents(){
                return this.$store.getters['parents/get'];
            },
        },
        methods: {
            enterConfirm(){
                this.formValid || JSON.stringify(this.theClass) !== JSON.stringify(this.beforeEdit) 
                ? (!this.editing ? this.add() : this.edit()) 
                : ''; 
            },
            add(){
                if(!this.$refs.classform.validate()){
                    return;
                }
                this.theClass.user.name = this.freeTeachers.find(v => v.id_field === this.theClass.user.id_field).name;
                this.$emit('add', this.theClass);
                this.theClass = Object.assign({}, classSignature);
                this.$refs.classform.resetValidation();

                this.dialog = false;
            },
            edit(){
                if(!this.$refs.classform.validate()){
                    return;
                }
                this.theClass.user.name = this.freeTeachers.find(v => v.id_field === this.theClass.user.id_field).name;
                this.$emit('edit', this.theClass);
                this.theClass = Object.assign({}, classSignature);
                this.$refs.classform.resetValidation();

                this.dialog = false;
            }
        },
        mounted(){
            if(this.editing) {
                this.theClass = Object.assign({}, this.beforeEdit)
                this.$refs.classform.resetValidation();
            }
        }
    };
</script>