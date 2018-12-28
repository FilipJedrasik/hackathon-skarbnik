<template>
    <v-timeline
            align-top
            dense
    >
        <v-timeline-item
                :color="('color' in payment ? payment.color : (index % 2 === 0 ? 'pink' : 'teal'))"
                small
                v-for="(payment, index) in payments"
                :key="index"
        >
            <v-layout pt-3>
                <v-flex xs3>
                    <strong>{{ payment.date }}</strong>
                </v-flex>
                <v-flex>
                    <strong>{{ payment.amount }}zł</strong>
                    <div class="caption">{{ amountAfterPayment[index] }}/660zł</div>
                </v-flex>
            </v-layout>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
  export default {
    name: 'payment-history-timeline',
    props: {
      payments: {
        type: Array,
        validator(value) {
          let proper = true;
          for(let payment of value){
            if(!('date' in payment) || !('amount' in payment)){
              proper = false;
              break;
            }
          }

          return proper;
        }
      },
      target: {
        type: Number,
        required: true
      }
    },
    computed: {
      amountAfterPayment(){
        const amounts = [];
        const reversed = this.payments.slice().reverse();
        reversed.forEach((el, index) => {
          if(index == 0)
            amounts.push(el.amount);
          else
            amounts.push(el.amount + amounts[index-1]);
        });

        return amounts.reverse();
      }
    }
  };
</script>

<style scoped>

</style>