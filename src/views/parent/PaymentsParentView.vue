<template>
    <div style="width:100%">
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
                <UserPaymentsDatatable/>
            </v-tab-item>

        </v-tabs>
    </div>
</template>

<script>
  import UserPaymentsDatatable from '@/components/UserPaymentsDatatable';

  export default {
    data:() => ({
      dialog: false,
      valid: false,
      menu: false,
      menu2: false
    }),
    components:{
      UserPaymentsDatatable
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