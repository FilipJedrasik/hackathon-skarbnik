<template>
            <v-dialog
                    v-model="vuexModel"
                    max-width="500px"
            >
                <v-alert
                        :value="true"
                        :type="$store.state.utilModal.type"
                        style="margin: 0;"
                        :style="$store.state.utilModal.type === 'warning' ? 'color:black;' : ''">
                    <h2>{{$store.state.utilModal.header ? $store.state.utilModal.header : headerDef}}</h2>
                    <p v-html="$store.state.utilModal.content ? $store.state.utilModal.content : contentDef"></p>
                    <slot/>
                    <div
                            class="buttons"
                            v-if="$store.state.utilModal.cancel || $store.state.utilModal.ok"
                    >
                        <v-spacer/>
                        <v-btn
                                v-if="$store.state.utilModal.cancel !== undefined"
                                :color="$store.state.utilModal.type === 'warning' ? 'black' : 'white'"
                                flat
                                @click.native="$store.state.utilModal.onCancel()"
                        >{{$store.state.utilModal.cancel}}</v-btn>
                        <v-btn
                                v-if="$store.state.utilModal.ok !== undefined"
                                :color="$store.state.utilModal.type === 'warning' ? 'black' : 'white'"
                                flat
                                :disabled="$store.state.utilModal.okDisabled"
                                @click.native="$store.state.utilModal.onOk()"
                        >{{$store.state.utilModal.ok}}</v-btn>
                    </div>
                </v-alert>
            </v-dialog>
</template>

<script>
  export default {
    data(){
      return {
        localMod: false
      };
    },
    computed:{
      headerDef(){
        switch(this.$store.state.utilModal.type){
          case 'error':
            return "Błąd";
          case 'success':
            return "Sukces";
          case 'warning':
            return "Uwaga";
          case 'info':
            return "Uwaga";
        }
        return "Uwaga"
      },
      contentDef(){
        switch(this.$store.state.utilModal.type){
          case 'error':
            return "Niestety z jakiegoś powodu nie udało się wykonać zadania... Przepraszamy";
          case 'success':
            return "Udało się wykonać zadanie!";
          case 'warning':
            return "Uwaga";
          case 'info':
            return "Uwaga";
        }
        return "Uwaga"
      },
      vuexModel:{
        get(){
            return this.$store.getters['utilModal/isVisible'];
        },
        set(value){
            this.$store.commit('utilModal/SET_VISIBLE', value);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
    div.buttons{
        display:flex;
        flex-wrap:wrap;
        align-items: flex-end;
    }
</style>