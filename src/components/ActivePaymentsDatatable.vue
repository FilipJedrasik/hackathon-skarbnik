<template>
        <v-data-table
                :headers="headers"
                :items="payments"
                class="elevation-1"
                item-key="name"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.amount }}zł</td>
                    <td class="text-xs-right">
                        <CashBar
                                :current="props.item.amount/3"
                                :target="props.item.amount"
                        />
                    </td>
                </tr>
            </template>
        </v-data-table>
</template>

<script>
    import CashBar from './CashBar'
  export default {
    name: 'active-payments-datatable',
    data: () => ({
      headers: [
        {text: 'Cel zbiórki', value: 'target'},
        {text: 'Kwota na osobę', value: 'amount'},
        {text: 'Postęp', value: 'progress'}
      ],
    }),
    computed:{
      payments(){
        return this.$store.getters['payments/getPayments'];
      }
    },
    components:{
      CashBar
    }
  };
</script>

<style scoped>

</style>