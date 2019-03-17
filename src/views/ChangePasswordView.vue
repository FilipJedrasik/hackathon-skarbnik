<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm9 md5 lg4>
                        <div class="center-image">
                            <img class="login-logo" src="@/assets/logo.svg" alt="Skarbnik logo"/>
                        </div>
                        <v-card class="elevation-12 my-2">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Formularz zmiany hasła</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <strong>{{$store.getters['user/getUser'].name}}</strong>
                                <p>W trosce o Twoje bezpieczeństwo, wymagamy zmiany hasła po pierwszym logowaniu. Proszę, użyć silnego hasła. Powinno ono zawierać conajmniej 8 znaków, min. jedną duża literkę, małą literkę, cyfre, znak specjalny (np. #, @, !, $, % itd.)</p>
                                <p>Dodatkowo potrzebujemy również adresu email, aby ułatwić kontakt i umożliwić potencjalne odzyskanie hasła.</p>
                                <ChangePasswordForm/>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import ChangePasswordForm from '@/components/ChangePasswordForm'
  export default {
    name: 'change-password-view',
    components:{
      ChangePasswordForm
    }
  }
</script>

<style scoped>

</style>