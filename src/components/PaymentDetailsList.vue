<template>
    <v-list>
        <h2 class="payment-details__header">
            Szczegóły płatności
        </h2>
        <OneOfThreeControl v-model="filter"/>
        <div class="payers-list">
            <template v-for="(item, index) in filteredItems">
                <transition-group name="t-fade-2" :key="index+1000">
                    <v-divider
                            :inset="item.inset"
                            :key="index"
                    ></v-divider>

                    <v-list-tile
                            :key="item.title"
                            avatar
                            @click="item.details_modal = true"
                    >
                        <PaymentDetailsModal
                                :title="title"
                                :subtitle="subtitle"
                                @toggle="item.details_modal = $event"
                                :dialog="item.details_modal"
                                :name="item.title"/>

                        <v-list-tile-avatar>
                            <v-icon
                                    :class="item.payed ? 'green' : 'red'"
                                    class="white--text">{{ item.payed ? 'done' : 'close' }}</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </transition-group>
            </template>
        </div>
    </v-list>
</template>

<script>
  import OneOfThreeControl from '@/components/OneOfThreeControl'
  import PaymentDetailsModal from '@/components/PaymentDetailsModal'

  export default {
    name: 'payments-details-list',
    props:{
      filteredItems: {
        type: Array,
        required: true,
        validator: (value) => {
          let proper = true;
          for(let payer of value){
            if(!('title' in payer) || !('subtitle' in payer) || !('payed' in payer) || !('details_modal' in payer)){
              proper = false;
              break;
            }
          }
          return proper;
        }
      },
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      }
    },
    data: () => ({
      filter: 0
    }),
    watch:{
      filter(n){
        this.$emit('changeFilter', n);
      }
    },
    components:{
      OneOfThreeControl,
      PaymentDetailsModal
    }
  };
</script>

<style>
    .payment-details__header{
        padding-bottom: 10px;
        padding-left: 15px;
    }

    .payers-list{

    }
</style>