<template>
    <v-flex xs12 sm3>
        <v-card :color="background" :dark="dark">
            <div class="subpage-icon">
                <v-icon>{{icon}}</v-icon>
            </div>
            <div class="subpage-info pb-4">
                <h3 class="headline">{{amount}}</h3>
                <div>{{description}}</div>
                <slot/>
            </div>
        </v-card>
    </v-flex>
</template>

<script>
  export default {
    props:{
      icon:{
        type: String,
        required: true
      },
      amount:{
        type: Number,
        required: true
      },
      description:{
        type: String,
        required: true
      },
      background:{
        type: String,
        default: '#fff'
      },
      dark:{
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style lang="scss" scoped>
    .subpage-icon{
        text-align:center;
        padding: 30px 0 10px;
        .v-icon{
            font-size:5em;
        }
    }

    .subpage-info{
        text-align:center;

        .headline{
            font-weight: bold;
        }
    }
</style>