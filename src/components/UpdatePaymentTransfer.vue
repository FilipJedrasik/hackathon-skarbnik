<template>
    <v-layout class="update-payment-transfer" row wrap>
        <v-flex xs12 sm10 offset-sm1>
            <p class="subheader">Któryś z rodziców, bądź uczniów zapłacił na żywo? Aby baza danych była aktualna, wprowadź niezaksięgowane w systemie wpłaty.</p>
        </v-flex>
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
                    :rules="amountRules"
                    required
            ></v-text-field>
        </v-flex>
        <v-btn style="margin: 0 auto;" color="primary">Dodaj</v-btn>
    </v-layout>
</template>

<script>
  export default {
    name: 'update-payment-transfer',
  };
</script>

<style scoped>
    .update-payment-transfer{
        padding: 30px 0;
    }
</style>