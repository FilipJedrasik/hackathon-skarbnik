<template>
  <v-app>
    <!-- ASYNC OPERATION MODAL -->
    <util-modal v-if="$store.state.utilModal.visible"/>

    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    created(){
      //this.$store.dispatch('user/update');
    },
    components: {
      UtilModal: () => import('@/components/Util/Modal.vue')
    }
  }
</script>

<style lang="scss">
  @import './assets/main';
</style>