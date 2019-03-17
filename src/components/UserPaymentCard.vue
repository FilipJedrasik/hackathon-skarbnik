<template>
    <v-flex class="payment-details-modal-flex" xs12 sm4>
        <v-card color="green darken-1" dark flat style="height:100%;">
            <div class="special">
                <v-avatar color="light-green" size="120" class="person-avatar">
                    <v-icon dark>account_circle</v-icon>
                </v-avatar>
                <h2 class="display-1 pt-3">{{name}}</h2>
                <h2 class="trip-name">{{payment_name}}</h2>
                <p class="subtitle px-4">{{payment_description}}</p>
            </div>
        </v-card>
    </v-flex>
</template>

<script>
  export default {
    name: 'user-payment',
    props: {
      name: {
        type: String,
        required: true
      },
      payment_name: {
        type: String,
        required: true
      },
      payment_description: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
    .payment-details-modal-flex{
        .special {
            display:flex;
            flex-wrap:wrap;
            justify-content: center;
            align-items: center;
            padding: 30px 0;

            h2 {
                width: 100%;
                text-align:center;
            }

            .person-avatar{
                margin: auto;
            }

            .person-avatar i {
                font-size: 102px;
            }

            .trip-name{
                color: rgba(255,255,255,.6);
            }

            .subtitle{
                color: #eee;
                text-align:center;
            }
        }
    }
</style>