<template>
  <v-app>
    <transition name="t-fade">
      <v-progress-linear v-if='logging' color="primary" style="position:fixed;top:0;margin:0;" indeterminate></v-progress-linear>
    </transition>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm9 md5 lg4>
            <div class="center-image">
              <img class="login-logo" src="@/assets/logo.svg" alt="Skarbnik logo"/>
            </div>
            <h1 class="text-xs-center font-weight-bold display-2 sk-color sk-headline">Skarbnik</h1>
            <v-card class="elevation-12 my-2">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Logowanie</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <LoginForm @operation="logging = !logging"/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import LoginForm from '@/components/LoginForm'
  export default {
    components:{
      LoginForm
    },
    data: () => ({
      logging: false
    })
  }
</script>

<style lang="scss">
</style>