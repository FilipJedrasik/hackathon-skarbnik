<template>
    <div style="width:100%">
        <div v-if="processing"></div>
        <template v-else-if="this.$store.state.user.myClass">

            <!--ADD/EDIT PAYMENT MODAL -->
            <v-btn
                    @click.native="dialog = true"
                    color="secondary">Dodaj zbiórkę</v-btn>
            <v-dialog v-model="dialog" max-width="600px">

                <v-card>
                    <v-card-title>
                        <span class="headline">Dodawanie zbiórki</span>
                    </v-card-title>
                    <PaymentForm
                        :paymentObject="pd"
                        @submit="editingIndex === -1 ? add : edit"
                    />
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

                <v-tab-item value="tab-2">
                    <FuturePaymentsDatatable
                        @edit="editRequest"/>
                </v-tab-item>

            </v-tabs>
        </template>
        <v-card v-else>
            <p class="subheading">Nie możesz zarządzać zbiórkami, ponieważ nie jesteś wychowawcą żadnej klasy. W celu rozwiązania problemu, skontaktuj się z administratorem.</p>
        </v-card>
    </div>
</template>

<script>
    import ActivePaymentsDatatable from '@/components/ActivePaymentsDatatable';
    import FuturePaymentsDatatable from '@/components/FuturePaymentsDatatable';
    import PaymentForm from '@/components/PaymentForm';

    const basic = {
      target: '',
      amount: null,
      desc: '',
      date_start: null,
      date_end: null
    };

  export default {
    data:() => ({
      dialog: false,
      valid: false,
      pd: Object.assign({}, basic),
      editingIndex: -1,
      menu: false,
      menu2: false
    }),
    components:{
      ActivePaymentsDatatable,
      FuturePaymentsDatatable,
      PaymentForm
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

        this.asyncProcess(true);
        await this.$store.dispatch('payments/addPayment', sObj);
        this.asyncProcess(false);

        this.pd = Object.assign({}, basic);

        this.dialog = false;
      },

      editRequest(item){
        this.pd = Object.assign({}, item);
        this.dialog = true;
      }
    },

    async created(){
      this.asyncProcess(true);
      this.$emit('asyncAction', true);
      await this.$store.dispatch('payments/getPayments');
      await this.$store.dispatch('user/getMyClass');
      this.$emit('asyncAction', false);
      this.asyncProcess(false);
    },
  };
</script>

<style scoped>
    .subheading{
        padding: 20px;
    }
</style>