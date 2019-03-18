<template>
    <!--ADDING STUDENT-->
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
                            ref="studentform">
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="assignment_ind"
                                            v-model="student.name"
                                            @keyup.native.esc="dialog = false"
                                            @keyup.native.enter="valid || JSON.stringify(student) !== JSON.stringify(beforeEdit) ? (editedIndex === -1 ? add() : edit()) : ''"
                                            :rules="nameRules"
                                            label="Imię i nazwisko"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            :items="parents"
                                            v-model="student.user.id_field"
                                            item-text="name"
                                            item-value="id_field"
                                            menu-props="auto"
                                            label="Rodzic"
                                            :rules="notEmptyRules"
                                            prepend-icon="contacts"
                                            single-line
                                            required
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            :items="classes"
                                            v-model="student.class_field.id_field"
                                            item-text="name"
                                            item-value="id_field"
                                            menu-props="auto"
                                            label="Klasa"
                                            :rules="notEmptyRules"
                                            prepend-icon="event_note"
                                            single-line
                                            required
                                    ></v-select>
                                </v-flex>
                            </v-container>
                            <div style="text-align:right;">
                                <v-btn color="secondary" @click.native="dialog = false">Anuluj</v-btn>
                                <v-btn
                                        color="primary"
                                        @click.native="!editing ? add() : edit()"
                                        :disabled="!formValid || JSON.stringify(student) === JSON.stringify(beforeEdit) || processing"
                                >{{submitTitle}}</v-btn>
                            </div>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-dialog>
</template>

<script>
    const studentSignature = {
        name: '',
        class_field: {
            id: null,
            name: ''
        },
        user: {
            id_field: null,
            name: ''
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
                student: Object.assign({}, studentSignature),
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
                this.$refs.studentform.resetValidation();
                if(n){
                    this.student = Object.assign({}, this.beforeEdit);
                }
            },
            beforeEdit(n){
                this.student = JSON.parse(JSON.stringify(n));
                this.$refs.studentform.resetValidation();
            }
        },
        computed: {
            formTitle () {
                return !this.editing ? 'Dodawanie ucznia' : 'Edytowanie ucznia'
            },
            submitTitle () {
                return !this.editing ? 'Dodaj' : 'Zapisz';
            },
            // Basic login rules + unique values
            loginUsed(){
                return [
                    ...this.loginRules,
                    v => v != null && Array.isArray(this.students) && this.students.filter(
                        x => this.editing ?
                            (this.beforeEdit.username !== x.username && x.username == v.trim() )
                            : x.username == v.trim()
                    ).length == 0 || 'Podany login jest już zajęty'
                ];
            },

            students(){
                return this.$store.getters['students/get'];
            },
            parents(){
                return this.$store.getters['parents/getParents'];
            },
            classes(){
                return this.$store.getters['classes/getClasses'];
            }
        },
        methods: {
            enterConfirm(){
                this.formValid || JSON.stringify(this.student) !== JSON.stringify(this.beforeEdit) 
                ? (!this.editing ? this.add() : this.edit()) 
                : ''; 
            },
            add(){
                if(!this.$refs.studentform.validate()){
                    return;
                }
                this.$emit('add', this.student);
                this.student = Object.assign({}, studentSignature);
                this.$refs.studentform.resetValidation();

                this.dialog = false;
            },
            edit(){
                if(!this.$refs.studentform.validate()){
                    return;
                }
                this.$emit('edit', this.student);
                this.student = Object.assign({}, studentSignature);
                this.$refs.studentform.resetValidation();

                this.dialog = false;
            }
        },
        mounted() {
            if(this.beforeEdit.name.length) {
                this.$refs.studentform.resetValidation();
                this.student = JSON.parse(JSON.stringify(this.beforeEdit));
            }
        }
    };
</script>