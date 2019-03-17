<template>
    <div v-if="!processing">
      <div v-if="step < 5">

        <v-card>
          <v-card-text>
            <h2>Witaj administratorze</h2>
              <p>Pora abyś skonfigurował aplikacje <em>Skarbnik</em> dla Swojej placówki. Oto lista kroków, jakie powinieneś/powinnaś wykonać, powodzenia!</p>
          </v-card-text>
        </v-card>

        <transition name="t-fade" mode="out-in">
          <AdminWelcomeSteps v-if="!loading"/>

          <div style="text-align:center;padding: 15px 0;" v-else>
            <v-progress-circular
                    :size="70"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
          </div>
        </transition>

      </div>

      <v-card color="transparent" flat v-else>
        <v-container
                fluid
                grid-list-lg
        >
          <v-layout row wrap>
            <AdminWelcomeIntroMessage/>

            <NumberTile
                    v-for="(record, index) in records"
                    :key="index"
                    :icon="record.icon"
                    :amount="counters[index]"
                    :background="record.background"
                    :dark="record.dark"
                    :description="record.description">

              <router-link :to="record.target" tag="span">
                <v-btn :dark="record.darkButton !== undefined">
                  <v-icon>{{record.button}}</v-icon>
                </v-btn>
              </router-link>

            </NumberTile>

            <v-flex xs12 sm6 :class="{'mobile-higher': $vuetify.breakpoint.xsOnly}">
              <v-card>
                  <canvas id="chaPaidToTarget"></canvas>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6>
              <v-card>
                <canvas id="chaOther"></canvas>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>
    </div>
</template>

<script>
  import NumberTile from '@/components/NumberTile';
  import Chart from 'chart.js';
  import chaPaidToTarget from '@/charts/PaidToTarget';
  import AdminWelcomeSteps from '@/components/Admin/Welcome/Steps.vue'
  import AdminWelcomeIntroMessage from '@/components/Admin/Welcome/ConfiguredIntroMsg.vue'

  export default {
    data: () => ({
      loading: true,
      dialog: false,
      drawer: null,
      records: [
        {
          icon: 'school',
          background: 'indigo darken-1',
          description: 'Ilość nauczycieli',
          button: 'keyboard_arrow_right', // Additional computed value called counters
          target: '/admin/teachers'
        },
        {
          icon: 'event_note',
          background: 'pink darken-2',
          description: 'Ilość klas',
          button: 'keyboard_arrow_right',
          darkButton: true,
          target: '/admin/classes'
        },
        {
          icon: 'contacts',
          background: 'deep-orange darken-2',
          description: 'Ilość rodziców',
          button: 'keyboard_arrow_right',
          target: '/admin/parents'
        },
        {
          icon: 'face',
          background: 'green darken-3',
          description: 'Ilość uczniów',
          button: 'keyboard_arrow_right',
          target: '/admin/students'
        }
      ]
    }),
      computed: {
        counters() {
          return [
            this.$store.state.counter.teachers,
            this.$store.state.counter.classes,
            this.$store.state.counter.parents,
            this.$store.state.counter.students
          ];
        },
        step() {
          return this.$store.getters['counter/step'];
        }
    },
    watch: {
      processing(n) {
        if(!n){
          setTimeout(this.createMoneyChart, 0)
        }
      }
    },
    components:{
      NumberTile,
      AdminWelcomeSteps,
      AdminWelcomeIntroMessage
    },
    async created(){
      this.loading = true;
      this.asyncProcess(true);
      await this.$store.dispatch('counter/getCounters');
      this.asyncProcess(false);
      this.loading = false;
    },
    methods:{
      createMoneyChart(){
        const ctx = document.querySelector('#chaPaidToTarget');
        if(ctx)
          new Chart(ctx, chaPaidToTarget);

        const ctx2 = document.querySelector('#chaOther');
        if(ctx2)
          new Chart(ctx2, chaPaidToTarget);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .headline{
    font-weight: bold;
  }

  .mobile-higher{
    height:120%;
  }
</style>