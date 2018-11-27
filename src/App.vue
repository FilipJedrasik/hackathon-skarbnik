<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created(){
    //this.$store.dispatch('user/update');
  }
}
</script>

<style lang="scss">
  @import './assets/main';
</style>