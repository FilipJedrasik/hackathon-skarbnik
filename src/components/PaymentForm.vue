<template>
    <v-form
            v-model="valid"
            ref="payment"
            @submit="add">

        <!-- ASYNC OPERATION MODAL -->
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                :header="response.header !== null ? response.header : undefined"
                :okDisabled="processing"
                v-model="response.modal"></util-modal>

        <v-card-text>
            <v-container grid-list-md>
                <v-flex xs12>
                    <v-text-field
                            v-model="payment.target"
                            label="Cel zbiórki"
                            placeholder="np. Wycieczka w góry"
                            :rules="targetRules"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                            name="input-7-1"
                            label="Opis zbiórki"
                            v-model="payment.desc"
                            :rules="targetDescRules"
                            placeholder="np. Wielodniowa wycieczka w Alpy, autokarem lub pociągiem."
                            hint="Opisz zbiórkę"
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            v-model="payment.amount"
                            label="Kwota od ucznia"
                            placeholder="np. 123.55zł"
                            type="number"
                            step="0.01"
                            min="0.01"
                            :rules="amountRules"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="payment.dates"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <v-combobox
                                slot="activator"
                                v-model="payment.dates"
                                multiple
                                chips
                                small-chips
                                label="Data początku i końca zbiórki"
                                :rules="datesRules"
                                readonly
                        ></v-combobox>
                        <v-date-picker v-model="payment.dates" multiple no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(payment.dates)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-container>

            <div style="text-align:right;">
                <v-btn color="secondary" @click="dialog = false">Anuluj</v-btn>
                <v-btn
                        color="primary"
                        @click.native="add"
                        :disabled="!valid"
                >Dodaj</v-btn>
            </div>
        </v-card-text>
    </v-form>
</template>

<script>
    import UtilModal from '@/components/UtilModal';

    const basic = {
      target: null,
      desc: null,
      amount: null,
      dates: [],
      theClass: 8
    };

  export default {
    name: 'payment-form',
    data(){
      return {
        payment: Object.assign({}, basic),
        valid: false,
        menu: null,
        menu2: null,
        date: new Date().toISOString().substr(0, 10),
        response:{ // UI Util response obj
          type: 'error',
          modal: false,
          content: null,
          ok: null,
          cancel: null
        }
      };
    },
    components:{
      UtilModal
    },
    watch:{
      'payment.dates'(n,o){
        if(n.length > 2){
          this.payment.dates = o;
        }
      }
    },
    computed:{
      myClass(){
        return this.$store.state['user/myClass'];
      }
    },
    methods: {
      /*
      *
Example Value
Model
{
  "class_field": 0,
  "start_date": "string",
  "end_date": "string",
  "amount": 0,
  "name": "string",
  "description": "string"
}
      * */
      async add(){
        if(this.$refs.payment.validate()){
          try {

            this.asyncProcess(true);

            const earlierDateIndex = new Date(this.payment.dates[0]) > new Date(this.payment.dates[1]) ? 0 : 1;
            const d = this.payment;

            this.$store.dispatch('payments/addPayment', {
              class_field: this.myClass.id_field, // have 2put here something!
              start_date: d.dates[earlierDateIndex],
              end_date: d.dates[earlierDateIndex == 1 ? 0 : 1],
              amount: d.amount,
              name: d.target,
              description: d.desc
            });

            this.dialog = false;

            this.payment = Object.assign({}, basic);

            this.asyncProcess(false);

            this.response.content = 'Udało się dodać nową zbiórkę';
            this.response.type = 'success';
            this.response.modal = true;

          } catch(e) {
            this.asyncProcess(false);
            //console.log(e)
            this.response.content = e;
            this.response.type = 'error';
            this.response.modal = true;

          }
        }
      }
    },
    async created(){

    }
  };
</script>

<style scoped>

</style>