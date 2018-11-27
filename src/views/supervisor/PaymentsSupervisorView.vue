<template>
    <div style="width:100%">
        <v-btn
                @click.native="dialog = true"
                color="secondary">Dodaj zbiórkę</v-btn>
        <v-dialog v-model="dialog" max-width="600px">

            <v-card>
                <v-card-title>
                    <span class="headline">Dodawanie zbiórki</span>
                </v-card-title>
                <v-form
                        v-model="valid"
                        ref="payment"
                        @submit="add">
                    <v-card-text>
                        <v-container grid-list-md>

                            <v-form style="width:100%" ref="paydetForm" v-model="valid">
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="pd.target"
                                            label="Cel zbiórki"
                                            placeholder="np. Wycieczka w góry"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            name="input-7-1"
                                            label="Opis zbiórki"
                                            v-model="pd.desc"
                                            placeholder="np. Wielodniowa wycieczka w Alpy, autokarem lub pociągiem."
                                            hint="Opisz zbiórkę"
                                    ></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="pd.amount"
                                            label="Kwota od ucznia"
                                            placeholder="np. 123.55zł"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                        <v-menu
                                                ref="menu"
                                                :close-on-content-click="false"
                                                v-model="menu"
                                                :nudge-right="40"
                                                :return-value.sync="date"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model="pd.date_start"
                                                    label="Start zbiórki"
                                                    prepend-icon="event"
                                                    readonly
                                            ></v-text-field>
                                            <v-date-picker v-model="pd.date_start" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menu = false">Anuluj</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                </v-flex>
                                <v-flex xs12>
                                    <v-menu
                                            ref="menu2"
                                            :close-on-content-click="false"
                                            v-model="menu2"
                                            :nudge-right="40"
                                            :return-value.sync="date"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                v-model="pd.date_end"
                                                label="Koniec zbiórki"
                                                prepend-icon="event"
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="pd.date_end" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu2 = false">Anuluj</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu2.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-form>

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
            </v-card>
        </v-dialog>
        <v-tabs
                centered
                color="black"
                dark
                icons-and-text
                style="width:100%"
        >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab href="#tab-1">
                Aktywne
                <v-icon>money</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                Przyszłe
                <v-icon>date_range</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
                Historia
                <v-icon>hourglass_full</v-icon>
            </v-tab>

            <v-tab-item value="tab-1">
                <ActivePaymentsDatatable/>
            </v-tab-item>

        </v-tabs>
    </div>
</template>

<script>
    import ActivePaymentsDatatable from '@/components/ActivePaymentsDatatable';

  export default {
    data:() => ({
      dialog: false,
      valid: false,
      pd:{
        target: '',
        amount: null,
        desc: '',
        date_start: null,
        date_end: null
      },
      menu: false,
      menu2: false
    }),
    components:{
      ActivePaymentsDatatable
    },
    async created(){
      await this.$store.dispatch('payments/getPayments');
    },
    methods:{
      async add(){
        const sObj = {
            class_field: 1,
            start_date: this.pd.date_start,
            end_date: this.pd.date_end,
          amount: this.pd.amount,
          name: this.pd.target,
          description: this.pd.desc,
          creation_date: '2018-09-19T10:12:20Z'
        };

        await this.$store.dispatch('payments/addPayment', sObj);

        this.pd = {
          target: '',
              amount: null,
              desc: '',
              date_start: null,
              date_end: null
        };

        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>