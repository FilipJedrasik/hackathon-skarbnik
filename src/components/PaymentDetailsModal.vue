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
                    <v-btn dark flat v-if="!addingPayment" @click="addingPayment = true">Dodaj przelew</v-btn>
                    <v-btn dark flat color="primary" v-else @click="addingPayment = false">Anuluj</v-btn>
                </v-toolbar-items>
            </v-toolbar>

                <v-layout row wrap>
                        <UserPaymentCard
                            :name="name"
                            :payment_name="title"
                            :payment_description="subtitle"
                        />
                        <v-flex class="payment-details-modal-flex" xs12 sm5>
                           <v-card flat>
                               <v-card-text class="py-0">
                                   <transition name="t-fade" mode="out-in">
                                       <PaymentHistoryTimeline
                                               :payments="sortedPayments"
                                               :target="660"
                                               v-if="!addingPayment"
                                       />
                                       <UpdatePaymentTransfer @add="addPayment" v-else/>
                                   </transition>
                               </v-card-text>
                           </v-card>
                        </v-flex>
                        <v-flex xs12 sm3>
                                <CircleProgressCard
                                        height="50%"
                                        :progress="20"
                                        description="Do zapłaty"
                                        incircleValue="120 zł"
                                        color="secondary"
                                />
                                <CircleProgressCard
                                        height="50%"
                                        :progress="63"
                                        description="Pozostało dni"
                                        incircleValue="56"
                                        color="red"
                                />
                        </v-flex>
                </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
    import UserPaymentCard from '@/components/UserPaymentCard.vue'
    import CircleProgressCard from '@/components/CircleProgressCard.vue'
    import PaymentHistoryTimeline from '@/components/PaymentHistoryTimeline.vue'
    import UpdatePaymentTransfer from '@/components/UpdatePaymentTransfer.vue'

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
        widgets: false,
        addingPayment: false,
        payments: [
          {
            date: '25.06.2018r.',
            amount: 280
          },
          {
            date: '23.06.2015r.',
            amount: 70
          },
          {
            date: '19.06.2018r.',
            amount: 82
          },
          {
            date: '11.06.2018r.',
            amount: 83
          },
          {
            date: '07.06.2018r.',
            amount: 25
          }
        ]
      }
    },
    watch: {
      localModel(n) {
        this.$emit('toggle', n);
      },
      dialog(n) {
        this.localModel = n;
      }
    },
    computed:{
      sortedPayments(){
        const tmp = this.payments.slice();
        tmp.sort((a, b) => {
          const tmpA = a.date.substr(0, 10).split('.');
          const dateA = `${tmpA[2]}-${tmpA[1]}-${tmpA[0]}`;

          const tmpB = b.date.substr(0, 10).split('.');
          const dateB = `${tmpB[2]}-${tmpB[1]}-${tmpB[0]}`;
          return new Date(dateB) - new Date(dateA);
        });

        return tmp;
      }
    },
    components: {
      UserPaymentCard,
      CircleProgressCard,
      PaymentHistoryTimeline,
      UpdatePaymentTransfer
    },
    methods:{
      addPayment(ev){
        // MOCK
        this.payments.push(ev);
        this.addingPayment = false;
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>