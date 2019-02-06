<template>
    <div style="width:100%">
        <!-- ASYNC OPERATION MODAL -->
        <util-modal
                :type="response.type"
                :content="response.content !== null ? response.content : undefined"
                :header="response.header !== null ? response.header : undefined"
                :ok="response.ok !== null ? response.ok : undefined"
                :cancel="response.cancel !== null ? response.cancel : undefined"
                @ok="deletePayment"
                @cancel="response.modal = false"
                :okDisabled="processing2"
                v-model="response.modal"></util-modal>

        <div v-if="processing"></div>
        <template v-else-if="this.$store.state.user.myClass">

            <!--ADD/EDIT PAYMENT MODAL -->
            <v-btn
                    @click.native="resetPaymentObj"
                    color="secondary">Dodaj zbiórkę</v-btn>
            <v-dialog v-model="dialog" max-width="600px">

                <v-card>
                    <v-card-title>
                        <span class="headline">Dodawanie zbiórki</span>
                    </v-card-title>
                    <PaymentForm
                        :paymentObject="pd"
                        @cancel="dialog = false"
                        @async="$emit('async', $event)"
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
                        @edit="editRequest"
                        @delete="deleteRequest"/>
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
    import UtilModal from '@/components/UtilModal';

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
      deleteDialog: false,
      valid: false,
      pd: Object.assign({}, basic),
      editingIndex: -1,
      menu: false,
      menu2: false,
      response:{ // UI Util response obj
        type: 'error',
        modal: false,
        content: null,
        ok: null,
        cancel: null
      },
      toDelete: {
        id: null,
        name: null
      },
      processing2: false
    }),
    components:{
      ActivePaymentsDatatable,
      FuturePaymentsDatatable,
      PaymentForm,
      UtilModal
    },
    methods:{

      editRequest(item){
       // this.pd = Object.assign({}, item);
        this.$set(this, 'pd', item);
        this.dialog = true;
      },

      resetPaymentObj(){
        this.$set(this, 'pd', basic);
        this.dialog = true;
      },

      deleteRequest({id, name}){
        this.response.content = `Czy na pewno chcesz usunąć zbiórkę, której celem jest ${name}?`;
        this.response.ok = 'Usuń';
        this.response.cancel = 'Anuluj';

        this.toDelete.id = id;
        this.toDelete.name = name;

        this.response.modal = true;
      },

      async deletePayment(){
        this.$emit('async', true)
        this.processing2 = true;
        await this.$store.dispatch('payments/deletePayment', this.toDelete.id);
        this.$emit('async', false)
        this.processing2 = false;
        this.response.modal = false;

        this.toDelete = {
          id: null,
          name: null
        }
      }
    },

    async created(){
      this.asyncProcess(true);
      this.$emit('asyncAction', true);
      await Promise.all([
          this.$store.dispatch('payments/getPayments'),
          this.$store.dispatch('user/getMyClass')
      ]);

      await this.$store.dispatch('supervisor/loadStudents', this.$store.getters['user/getMyClass'].id_field);
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