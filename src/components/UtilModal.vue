<template>
    <v-layout row justify-center>
        <v-dialog
            v-model="localMod"
            max-width="500px"
        >
            <v-alert
                    :value="true"
                    :type="type"
                    style="margin: 0;"
                    :style="type === 'warning' ? 'color:black;' : ''">
                <h2>{{header ? header : headerDef}}</h2>
                <p v-html="content ? content : contentDef"></p>
                <slot/>
                <div
                        class="buttons"
                        v-if="cancel !== undefined || ok !== undefined"
                >
                    <v-spacer/>
                    <v-btn
                            v-if="cancel !== undefined"
                            v-bind:color="type === 'warning' ? 'black' : 'white'"
                            flat
                            @click.native="$emit('cancel')"
                    >{{cancel}}</v-btn>
                    <v-btn
                            v-if="ok !== undefined"
                            v-bind:color="type === 'warning' ? 'black' : 'white'"
                            flat
                            :disabled="okDisabled"
                            @click.native="$emit('ok')"
                    >{{ok}}</v-btn>
                </div>
            </v-alert>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    props:{
      type:{
        type: String,
        required: true
      },
      header: String,
      content: String,
      cancel: String,
      ok: String,
      okDisabled: Boolean,
      value: Boolean
    },
    data(){
      return {
        localMod: false
      };
    },
    computed:{
      headerDef(){
        switch(this.type){
          case 'error':
            return "Błąd";
          case 'success':
            return "Sukces";
          case 'warning':
            return "Uwaga";
          case 'info':
            return "Uwaga";
        }
      },
      contentDef(){
        switch(this.type){
          case 'error':
            return "Niestety z jakiegoś powodu nie udało się wykonać zadania... Przepraszamy";
          case 'success':
            return "Udało się wykonać zadanie!";
          case 'warning':
            return "Uwaga";
          case 'info':
            return "Uwaga";
        }
      }
    },
    watch:{
      localMod(n){
        this.$emit("input", n);
      },
      value(n){
        this.localMod = n;
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