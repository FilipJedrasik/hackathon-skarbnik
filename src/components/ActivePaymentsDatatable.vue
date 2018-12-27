<template>
        <v-data-table
                :headers="headers"
                :items="payments"
                class="elevation-1"
                item-key="id_field"
        >
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.amount }}zł</td>
                    <td class="text-xs-right">
                        <CashBar
                                :current="props.item.amount/3"
                                :target="+props.item.amount"
                        />
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs12 sm6>
                                <PaymentDetailsList
                                        :title="props.item.name"
                                        :subtitle="props.item.description"
                                        @changeFilter="filter = $event"
                                        :filteredItems="filteredItems"/>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <PaymentPreviewCard :image="svgMap" :name="props.item.name" :description="props.item.description"/>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
</template>

<script>
    import CashBar from './CashBar'
    import PaymentDetailsList from '@/components/PaymentDetailsList';
    import PaymentPreviewCard from '@/components/PaymentPreviewCard';
    import svgMap from '@/assets/map.svg';

    const alphabeticSort = (a,b) => {
      if(a.title < b.title)
        return -1;
      if(a.title > b.title)
        return 1;

      return 0;
    };

  export default {
    name: 'active-payments-datatable',
    data: () => ({
      filter: 0,
      svgMap,
      headers: [
        {text: 'Cel zbiórki', value: 'target'},
        {text: 'Kwota na osobę', value: 'amount'},
        {text: 'Postęp', value: 'progress'}
      ],
      items: [
        {
          title: 'Dawid Godziek',
          subtitle: "<span class='text--primary'>Zapłacono</span> &mdash; 373.00zł",
          payed: true,
          details_modal: false
        },
        {
          title: 'Adrian Merlin',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>125.67</strong>/373.00zł",
          payed: false,
          details_modal: false
        },
        {
          title: 'Darosław Amer',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>86.13</strong>/373.00zł",
          payed: false,
          details_modal: false
        },
        {
          title: 'Marek Merlin',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>125.67</strong>/373.00zł",
          payed: false,
          details_modal: false
        },
        {
          title: 'Jarosław Amer',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>86.13</strong>/373.00zł",
          payed: false,
          details_modal: false
        }
      ]
    }),
    computed:{
      payments(){
        const today = new Date();
        return this.$store.getters['payments/getPayments'].filter(v => {
          return today >= new Date(v.start_date) && today <= new Date(v.end_date);
        });
      },
      filteredItems(){
        switch(this.filter){
          case 0:
            return this.items.slice().sort(alphabeticSort);
          case 1:
            return this.items.filter(el => {
              return el.payed === true;
            }).sort(alphabeticSort);
          default:
            return this.items.filter(el => {
              return el.payed === false;
            }).sort(alphabeticSort);
        }
      }
    },
    components:{
      CashBar,
      PaymentDetailsList,
      PaymentPreviewCard
    }
  };
</script>

<style scoped>
    .trip-card{
        margin-top:30px;
    }

</style>