<template>
    <v-layout class="update-payment-transfer" row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <p class="subheader">Któryś z rodziców, bądź uczniów zapłacił na żywo? Aby baza danych była aktualna, wprowadź niezaksięgowane w systemie wpłaty.</p>
        </v-flex>
        <v-flex xs12>
            <v-form v-model="valid"
                    ref="update_payment">
                <v-flex xs12 sm10 offset-sm1>
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
                                v-model="date"
                                label="Data przelewu"
                                readonly
                        ></v-text-field>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm10 offset-sm1>
                    <v-text-field
                            label="Kwota"
                            placeholder="np. 123.55zł"
                            type="number"
                            step="0.01"
                            min="0.01"
                            v-model="amount"
                            :rules="amountRules"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm10 offset-sm1 align-center justify-center>
                    <v-btn
                            color="primary"
                            @click.native="emitAddPaymentRequest"
                            :disabled="!valid">Dodaj</v-btn>
                </v-flex>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'update-payment-transfer',
    data(){
      return {
        menu: null,
        date: null,
        amount: null,
        valid: false
      };
    },
    methods: {
      emitAddPaymentRequest(){
        this.$emit('add', {
          date: this.changeDateFormat(this.date),
          amount: parseFloat(this.amount)
        });

        this.menu = false;
        this.date = null;
        this.amount = null;
        this.$refs.update_payment.reset();
      },
      changeDateFormat(date){
        const fragments = date.split('-');
        return `${fragments[2]}.${fragments[1]}.${fragments[0]}r.`;
      }
    }
  };
</script>

<style scoped>
    .update-payment-transfer{
        padding: 30px 0;
    }
</style>