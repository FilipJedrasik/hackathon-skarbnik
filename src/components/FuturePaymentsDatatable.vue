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
                    <td>{{ props.item.start_date }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                color="blue"
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                color="red"
                                @click="deleteItem(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card
                        color="blue"
                        class="description-card"
                        dark
                        flat
                >
                    <v-icon>school</v-icon> <h2 class="description-card__title">Opis zbiórki</h2>
                    <p class="description-card__content">{{props.item.description}}</p>
                </v-card>
            </template>
        </v-data-table>
</template>

<script>
  export default {
    name: 'active-payments-datatable',
    data: () => ({
      filter: 0,
      headers: [
        {text: 'Cel zbiórki', value: 'name'},
        {text: 'Kwota na osobę', value: 'amount'},
        {text: 'Start zbiórki', value: 'start_date'},
        {text: 'Akcja', value: 'action', sortable: false }
      ]
    }),
    computed:{
      payments(){
        const today = new Date();
        return this.$store.getters['payments/getPayments'].filter(v => {
          return today < new Date(v.start_date);
        });
      }
    },
    methods:{
      editItem(item){
        this.$emit('edit', {
          target: item.name,
          amount: item.amount,
          desc: item.description,
          date_start: item.start_date,
          date_end: item.end_date
        });
      }
    }
  };
</script>

<style scoped>
    .trip-card{
        margin-top:30px;
    }

    .description-card{
        padding: 10px 25px;
        border-radius: 0px;
        display:flex;
        align-items: center;
    }

    .description-card__content{
        padding-left: 13px;
        margin:0;
    }

    .description-card__title{
        padding-left: 10px;
        min-width: 150px;
    }

</style>