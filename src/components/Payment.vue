<template>
    <div class="abc">
        <v-hover>
            <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                    width="344"
                    style="padding-top: 30px;"
            >
                <v-img
                        :aspect-ratio="16/3"
                        :src="img"
                ></v-img>
                <v-card-title>
                    <div>
                        <span class="headline">{{name}}</span>
                        <div class="d-flex">
                            <v-rating
                                    value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                            ></v-rating>
                            <div class="ml-2 grey--text text--darken-2">
                                <span>{{mark}}</span>
                                <span> ({{votes}})</span>
                            </div>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn @click.native="changeURL" icon class="mr-0">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
    </div>
</template>

<script>
  export default {
    name: 'payment',
    props:{
      img: String,
      path: String,
      name: String,
      mark: String,
      votes: Number
    },
    methods:{
      changeURL(){
        window.location.href = this.path;
      }
    }
  };
</script>

<style scoped>
    .abc{
        margin-bottom:25px;
    }
    .abc .v-image__image--cover{
        background-size:contain !important;
    }
</style>