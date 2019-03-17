<template>
        <v-form
                v-model="valid"
                ref="passwordForm"
                @submit="change">
            <v-text-field
                    prepend-icon="mail"
                    label="Email"
                    v-model="user.email"
                    required=""
                    :rules="emailRules"
                    @keyup.enter="valid ? change() : ''"
                    type="text"></v-text-field>
            <v-text-field
                    prepend-icon="lock"
                    v-model="user.password"
                    label="Hasło"
                    required=""
                    :rules="passwordRules"
                    @keyup.enter="valid ? change() : ''"
                    type="password"></v-text-field>
            <div class="text-xs-center">
                <v-btn
                        color="primary"
                        :disabled="!valid"
                        @click.native="change">Zmień</v-btn>
            </div>
        </v-form>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'login-form',
    data: () => ({
        valid: false,
        user:{
          email: '',
          password: null
        },
        emailRules: [
          v => !!v || 'E-mail jest wymagany',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail musi być poprawny'
        ],
        passwordRules: [
          v => !!v || 'Hasło jest wymagane',
          v => (v && v.length >= 8) || 'Hasło musi mieć conajmniej 8 znaków',
          v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Hasło musi być silniejsze!'
        ],
        response:{
          type: 'error',
          modal: false,
          content: null
        }
    }),
    methods:{
      async change() {
        if (this.$refs.passwordForm.validate()) {
          try {
            await this.$store.dispatch('user/changePassword',{
              email: this.user.email,
              password: this.user.password
            });
            this.$router.push({name: 'app'});
          }
          catch (e) {
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>