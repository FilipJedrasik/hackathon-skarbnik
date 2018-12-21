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
                                :target="props.item.amount"
                        />
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs12 sm6>
                                <v-list three-line>
                                    <h2 class="payment-details__header" :key="items[0].header">
                                        Szczegóły płatności
                                    </h2>
                                    <OneOfThreeControl v-model="filter"/>
                                    <template v-for="(item, index) in filteredItems">
                                        <transition-group name="t-fade-2">
                                        <v-divider
                                                v-if="item.divider"
                                                :inset="item.inset"
                                                :key="index"
                                        ></v-divider>

                                        <v-list-tile
                                                v-else
                                                :key="item.title"
                                                avatar
                                                @click=""
                                        >

                                            <v-list-tile-avatar>
                                                <v-icon :class="item.iconClass">{{ item.payed ? 'done' : 'close' }}</v-icon>
                                            </v-list-tile-avatar>

                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
</transition-group>
                                    </template>
                                </v-list>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-card class="trip-card">
                                    <v-img
                                            :src="svgMap"
                                            aspect-ratio="2.75"
                                    ></v-img>

                                    <v-card-title>
                                        <div>
                                            <h3 class="headline mb-0">{{ props.item.name }}</h3>
                                            <div>{{ props.item.description }}</div>
                                        </div>
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
</template>

<script>
    import CashBar from './CashBar'
    import OneOfThreeControl from '@/components/OneOfThreeControl'
    import svgMap from '@/assets/map.svg';

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
          iconClass: 'green white--text',
          subtitle: "<span class='text--primary'>Zapłacono</span> &mdash; 373.00zł",
          payed: true
        },
        { divider: true, inset: true },
        {
          title: 'Adrian Merlin',
          iconClass: 'red white--text',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>125.67</strong>/373.00zł",
          payed: false
        },
        { divider: true, inset: true },
        {
          title: 'Dionizy Amer',
          iconClass: 'red white--text',
          subtitle: "<span class='text--primary'>Nie zapłacono</span> &mdash; <strong>86.13</strong>/373.00zł",
          payed: false
        },
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
            return this.items;
          case 1:
            return this.items.filter((el, index) => {
              return el.payed === true || (index > 0 && this.items[index-1].payed === true)
            });
          default:
            return this.items.filter((el, index) => {
              return el.payed === false || (index > 0 && this.items[index-1].payed === false)
            });
        }
      }
    },
    components:{
      CashBar,
      OneOfThreeControl
    }
  };
</script>

<style scoped>
    .trip-card{
        margin-top:30px;
    }

    .payment-details__header{
        padding-bottom: 10px;
        padding-left: 15px;
    }
</style>