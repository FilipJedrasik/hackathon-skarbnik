<template>
    <v-dialog v-model="localModel" transition="fade-transition">
        <v-card>
            <v-toolbar dark color="grey darken-4">
                <v-btn icon dark @click="localModel = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Zbiórka {{title}} - {{name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="localModel = false">Dodaj przelew</v-btn>
                </v-toolbar-items>
            </v-toolbar>

                <v-layout row wrap>
                        <v-flex class="payment-details-modal-flex" xs12 sm4>
                            <v-card color="green darken-1" dark flat style="height:100%;">
                                <div class="special">
                                    <v-avatar color="light-green" size="120" class="person-avatar">
                                        <v-icon dark>account_circle</v-icon>
                                    </v-avatar>
                                    <h2 class="display-1 pt-3">{{name}}</h2>
                                    <h2 class="trip-name">{{title}}</h2>
                                    <p class="subtitle px-4">{{subtitle}}</p>
                                </div>
                            </v-card>
                        </v-flex>
                        <v-flex class="payment-details-modal-flex" xs12 sm5>
                           <v-card>
                               <v-card-text class="py-0">
                                   <v-timeline
                                           align-top
                                           dense
                                   >
                                       <v-timeline-item
                                               color="pink"
                                               small
                                       >
                                           <v-layout pt-3>
                                               <v-flex xs3>
                                                   <strong>25.06.2018r.</strong>
                                               </v-flex>
                                               <v-flex>
                                                   <strong>280zł</strong>
                                                   <div class="caption">540/660zł</div>
                                               </v-flex>
                                           </v-layout>
                                       </v-timeline-item>

                                       <v-timeline-item
                                               color="teal lighten-3"
                                               small
                                       >
                                           <v-layout pt-3>
                                               <v-flex xs3>
                                                   <strong>21.06.2018r.</strong>
                                               </v-flex>
                                               <v-flex>
                                                   <strong>70zł</strong>
                                                   <div class="caption">260/660zł</div>
                                               </v-flex>
                                           </v-layout>
                                       </v-timeline-item>

                                       <v-timeline-item
                                               color="pink"
                                               small
                                       >
                                           <v-layout pt-3>
                                               <v-flex xs3>
                                                   <strong>18.05.2018r.</strong>
                                               </v-flex>
                                               <v-flex>
                                                   <strong>82zł</strong>
                                                   <div class="caption">190/660zł</div>
                                               </v-flex>
                                           </v-layout>
                                       </v-timeline-item>

                                       <v-timeline-item
                                               color="teal lighten-3"
                                               small
                                       >
                                           <v-layout pt-3>
                                               <v-flex xs3>
                                                   <strong>21.06.2018r.</strong>
                                               </v-flex>
                                               <v-flex>
                                                   <strong>83zł</strong>
                                                   <div class="caption">108/660zł</div>
                                               </v-flex>
                                           </v-layout>
                                       </v-timeline-item>

                                       <v-timeline-item
                                               color="teal lighten-3"
                                               small
                                       >
                                           <v-layout pt-3>
                                               <v-flex xs3>
                                                   <strong>21.06.2018r.</strong>
                                               </v-flex>
                                               <v-flex>
                                                   <strong>25zł</strong>
                                                   <div class="caption">25/660zł</div>
                                               </v-flex>
                                           </v-layout>
                                       </v-timeline-item>
                                   </v-timeline>
                               </v-card-text>
                           </v-card>
                        </v-flex>
                        <v-flex xs12 sm3>
                                <v-card class="flex-center" color="secondary" style="height:50%" dark>
                                    <div class="flex-center">
                                        <v-progress-circular
                                                :rotate="310"
                                                :size="100"
                                                :width="15"
                                                :value="20"
                                                color="white"
                                        >
                                            120 zł
                                        </v-progress-circular>
                                        <p class="headline full-width">Do zapłaty</p>
                                    </div>
                                </v-card>
                            <v-card class="flex-center" color="red" style="height:50%" dark>
                                <div class="flex-center">
                                    <v-progress-circular
                                            :rotate="310"
                                            :size="100"
                                            :width="15"
                                            :value="63"
                                            color="white"
                                    >
                                        56
                                    </v-progress-circular>
                                    <p class="headline full-width">Pozostało dni</p>
                                </div>
                            </v-card>
                        </v-flex>
                </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'payment-detail-modal',
    props:{
      dialog: {
        type: Boolean,
        required: true
      },
      title:{
        type: String,
        required: true
      },
      subtitle:{
        type: String,
        required: true
      },
      name:{
        type: String,
        required: true
      }
    },
    data () {
      return {
        localModel: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    },
    watch:{
      localModel(n){
        this.$emit('toggle', n);
      },
      dialog(n){
        this.localModel = n;
      }
    }
  };
</script>

<style lang="scss" scoped>
    .headline{
        margin:0;
        padding-top: 4.5px;
    }

    .payment-details-modal-flex{

        .special {
            display:flex;
            flex-wrap:wrap;
            justify-content: center;
            align-items: center;
            padding: 30px 0;

            h2 {
                width: 100%;
                text-align:center;

            }
        }
    }

    .trip-name{
        color: rgba(255,255,255,.6);
    }

    .subtitle{
        color: #eee;
        text-align:center;
    }

    .person-avatar{
        margin: auto;
    }

    .person-avatar i {
        font-size: 102px;
    }

    .payment-big-dialog{
        width:100%;
    }
</style>