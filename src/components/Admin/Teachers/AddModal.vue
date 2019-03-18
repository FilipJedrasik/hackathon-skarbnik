<template>
    <!--ADDING TEACHER-->
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
                            ref="teacherform">
                        <v-card-text>
                            <v-container grid-list-md>
                                        <v-flex xs12>
                                            <v-text-field
                                                    prepend-icon="assignment_ind"
                                                    v-model="teacher.name"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
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
                                                    @keyup.native.enter="enterConfirm"
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
                                                    @keyup.native.enter="enterConfirm"
                                                    label="Login"
                                                    required
                                            ></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 v-if="!editing">
                                            <v-text-field
                                                    prepend-icon="lock"
                                                    v-model="teacher.password"
                                                    :rules="passwordRules"
                                                    label="Hasło"
                                                    type="password"
                                                    @keyup.native.esc="dialog = false"
                                                    @keyup.native.enter="enterConfirm"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="!editing ? add() : edit()"
                                        :disabled="!formValid || JSON.stringify(teacher) === JSON.stringify(beforeEdit) || processing"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
</template>

<script>
    const teacherSignature = {
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
                teacher: Object.assign({}, teacherSignature),
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
                this.$refs.teacherform.resetValidation();
                if(n){
                    this.teacher = Object.assign({}, this.beforeEdit);
                }
            },
            beforeEdit(n){
                this.teacher = Object.assign({}, n)
                this.$refs.teacherform.resetValidation();
            }
        },
        computed: {
            formTitle () {
                return !this.editing ? 'Dodawanie nauczyciela' : 'Edytowanie nauczyciela'
            },
            submitTitle () {
                return !this.editing ? 'Dodaj' : 'Zapisz';
            },
            // Basic email rules + unique values
            emailUsed(){
                return [
                    ...this.emailRules,
                v => v != null && Array.isArray(this.teachers) && this.teachers.filter(
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
                v => v != null && Array.isArray(this.teachers) && this.teachers.filter(
                    x => this.editing ?
                        (this.beforeEdit.username !== x.username && x.username == v.trim() )
                        : x.username == v.trim()
                ).length == 0 || 'Podany login jest już zajęty'
                ];
            },

            teachers(){
                return this.$store.getters['teachers/getTeachers'];
            },
        },
        methods: {
            enterConfirm(){
                this.formValid || JSON.stringify(this.teacher) !== JSON.stringify(this.beforeEdit) 
                ? (!this.editing ? this.add() : this.edit()) 
                : ''; 
            },
            add(){
                if(!this.$refs.teacherform.validate()){
                    return;
                }
                this.$emit('add', this.teacher);
                this.teacher = Object.assign({}, teacherSignature);
                this.$refs.teacherform.resetValidation();

                this.dialog = false;
            },
            edit(){
                if(!this.$refs.teacherform.validate()){
                    return;
                }
                this.$emit('edit', this.teacher);
                this.teacher = Object.assign({}, teacherSignature);
                this.$refs.teacherform.resetValidation();

                this.dialog = false;
            }
        }
    };
</script>