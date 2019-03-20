<template>
    <!--ADDING PARENT-->
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
                            ref="parentform">
                        <v-card-text>
                            <v-container grid-list-md>
                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="assignment_ind"
                                                    v-model="parent.name"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
                                                    :rules="nameRules"
                                                    label="Imię i nazwisko"
                                                    data-cy="name"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="mail"
                                                    v-model="parent.email"
                                                    :rules="emailUsed"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
                                                    label="Adres email"
                                                    data-cy="mail"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="person"
                                                    v-model="parent.username"
                                                    :rules="loginUsed"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
                                                    label="Login"
                                                    data-cy="login"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 v-if="!editing">
                                            <v-text-field
                                                    prepend-icon="lock"
                                                    v-model="parent.password"
                                                    :rules="passwordRules"
                                                    label="Hasło"
                                                    type="password"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
                                                    data-cy="password"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        data-cy="submit"
                                        color="primary"
                                        @click.native="!editing ? add() : edit()"
                                        :disabled="!formValid || JSON.stringify(parent) === JSON.stringify(beforeEdit) || processing"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
</template>

<script>
    const parentSignature = {
                    name: null,
                    email: null,
                    username: null, 
                    password: null
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
                parent: Object.assign({}, parentSignature),
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
                this.$refs.parentform.resetValidation();
                if(n){
                    this.parent = Object.assign({}, this.beforeEdit);
                }
            },
            beforeEdit(n){
                this.parent = Object.assign({}, n)
                this.$refs.parentform.resetValidation();
            }
        },
        computed: {
            formTitle () {
                return !this.editing ? 'Dodawanie rodzica' : 'Edytowanie rodzica'
            },
            submitTitle () {
                return !this.editing ? 'Dodaj' : 'Zapisz';
            },
            // Basic email rules + unique values
            emailUsed(){
                return [
                ...this.emailRules,
                v => v != null && Array.isArray(this.parents) && this.parents.filter(
                    x => this.editing ?
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
                    x => this.editing ?
                        (this.beforeEdit.username !== x.username && x.username == v.trim() )
                        : x.username == v.trim()
                ).length == 0 || 'Podany login jest już zajęty'
                ];
            },

            parents(){
                return this.$store.getters['parents/get'];
            },
        },
        methods: {
            enterConfirm(){
                this.formValid || JSON.stringify(this.parent) !== JSON.stringify(this.beforeEdit) 
                ? (!this.editing ? this.add() : this.edit()) 
                : ''; 
            },
            add(){
                if(!this.$refs.parentform.validate()){
                    return;
                }
                this.$emit('add', this.parent);
                this.parent = Object.assign({}, parentSignature);
                this.$refs.parentform.resetValidation();

                this.dialog = false;
            },
            edit(){
                if(!this.$refs.parentform.validate()){
                    return;
                }
                this.$emit('edit', this.parent);
                this.parent = Object.assign({}, parentSignature);
                this.$refs.parentform.resetValidation();

                this.dialog = false;
            }
        },
        mounted(){
            if(this.editing) {
                this.parent = Object.assign({}, this.beforeEdit)
                this.$refs.parentform.resetValidation();
            }
        }
    };
</script>