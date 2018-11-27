<template>
    <div>
        <util-modal
            :type="response.type"
            :content="response.content !== null ? response.content : undefined"
            v-model="response.modal"></util-modal>
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
    </div>
</template>

<script>
    import UtilModal from './UtilModal';

  export default {
    name: 'login-form',
    components: {
      UtilModal
    },
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
          try {
            await this.$store.dispatch('auth/auth', this.user);
            await this.$store.dispatch('user/update');

            this.$router.push('/app');
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