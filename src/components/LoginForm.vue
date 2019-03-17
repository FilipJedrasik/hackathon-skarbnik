<template>
        <v-form
                v-model="valid"
                ref="loginForm"
                @submit="login">
            <v-text-field
                    prepend-icon="person"
                    label="Login"
                    v-model="user.login"
                    required=""
                    :rules="loginRules"
                    @keyup.enter="valid ? login() : ''"
                    type="text"></v-text-field>
            <v-text-field
                    prepend-icon="lock"
                    v-model="user.password"
                    label="Hasło"
                    required=""
                    :rules="passwordRules"
                    @keyup.enter="valid ? login() : ''"
                    type="password"></v-text-field>
            <div class="text-xs-center">
                <v-btn
                        color="primary"
                        :disabled="!valid"
                        @click.native="login">Zaloguj</v-btn>
            </div>
        </v-form>
</template>

<script>
    import { redirectToRoleView } from '@/router/guards'

  export default {
    name: 'login-form',
    data: () => ({
        valid: false,
        user:{
          login: '',
          password: null
        },
        response:{
          type: 'error',
          modal: false,
          content: null
        }
    }),
    methods:{
      async login() {
        if (this.$refs.loginForm.validate()) {
          this.$emit('operation');
          try {
            await this.$store.dispatch('auth/auth', this.user);
            await this.$store.dispatch('user/update');

            this.$router.push(redirectToRoleView(null, true));
          }
          catch (e) {
            console.log(e)
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;
            this.$emit('operation');
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>