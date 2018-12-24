<template>
    <v-dialog v-model="localModel" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card color="blue-grey lighten-4">
            <v-toolbar dark color="secondary">
                <v-btn icon dark @click="localModel = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="localModel = false">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-flex xs12 sm10 offset-sm1>
            <v-timeline>
                <v-timeline-item
                        color="purple lighten-2"
                        fill-dot
                        right
                >
                    <v-card>
                        <v-card-title class="purple lighten-2">
                            <v-icon
                                    dark
                                    size="42"
                                    class="mr-2"
                            >
                                mdi-magnify
                            </v-icon>
                            <h2 class="white--text font-weight-light">21.08.2016r.</h2>
                        </v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex xs10>
                                    <p class="subheader">120zł</p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                        color="amber lighten-1"
                        fill-dot
                        left
                        small
                >
                    <v-card>
                        <v-card-title class="amber lighten-1 justify-end">
                            <h2 class="display-1 mr-3 white--text font-weight-light">Title 2</h2>
                            <v-icon
                                    dark
                                    size="42"
                            >mdi-home-outline</v-icon>
                        </v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex xs8>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                                </v-flex>
                                <v-flex xs4>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus.
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                        color="cyan lighten-1"
                        fill-dot
                        right
                >
                    <v-card>
                        <v-card-title class="cyan lighten-1">
                            <v-icon
                                    class="mr-3"
                                    dark
                                    size="42"
                            >
                                mdi-email-outline
                            </v-icon>
                            <h2 class="display-1 white--text font-weight-light">Title 3</h2>
                        </v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex
                                        v-for="n in 3"
                                        :key="n"
                                        xs4
                                >
                                    Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                        color="red lighten-1"
                        fill-dot
                        left
                        small
                >
                    <v-card>
                        <v-card-title class="red lighten-1 justify-end">
                            <h2 class="display-1 mr-3 white--text font-weight-light">Title 4</h2>
                            <v-icon
                                    dark
                                    size="42"
                            >
                                mdi-account-multiple-outline
                            </v-icon>
                        </v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex xs2>
                                    <v-icon size="64">mdi-server-network</v-icon>
                                </v-flex>
                                <v-flex xs10>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                        color="green lighten-1"
                        fill-dot
                        right
                >
                    <v-card>
                        <v-card-title class="green lighten-1">
                            <v-icon
                                    class="mr-3"
                                    dark
                                    size="42"
                            >
                                mdi-phone-in-talk
                            </v-icon>
                            <h2 class="display-1 white--text font-weight-light">Title 5</h2>
                        </v-card-title>
                        <v-container>
                            <v-layout>
                                <v-flex>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
            </v-flex>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'payment-detail-modal',
    props:{
      dialog: {
        type: Boolean,
        required: true
      },
      title:{
        type: String,
        required: true
      }
    },
    data () {
      return {
        localModel: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    },
    watch:{
      localModel(n){
        this.$emit('toggle', n);
      },
      dialog(n){
        this.localModel = n;
      }
    }
  };
</script>

<style scoped>

</style>