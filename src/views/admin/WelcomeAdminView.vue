<template>
  <transition name="t-fade" mode="out-in">
    <div v-if="!processing">
      <div v-if="step < 5">
      <v-card>
        <v-card-text>
          <h2>Witaj administratorze</h2>
            <p>Pora abyś skonfigurował aplikacje <em>Skarbnik</em> dla Swojej placówki. Oto lista kroków, jakie powinieneś/powinnaś wykonać, powodzenia!</p>
        </v-card-text>
      </v-card>
      <p></p>
      <transition name="t-fade" mode="out-in">
      <v-stepper v-model="step" v-if="!loading" vertical>
        <v-stepper-step :complete="step > 1" step="1">
          Dodaj konta nauczycieli
          <small>W karcie nauczyciele</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <div class="stepper-wrapper">
            <div class="centered-icon">
              <v-icon class="stepper-icon">school</v-icon>
            </div>
            <div>Pierwszym krokiem jest oczywiście utworzenie kont dla nauczycieli. Będą oni potem przypisani do wychowawstwa nad swoimi klasami. Dzięki temu będą mogli, czujnie obserwować postępy w zbiórkach! Musisz także ustawić im hasło, możesz oczywiście użyć metody generowania go losowo. Hasło startowe nowego użytkownika musi mieć 8 znaków.<br> Nie jest oczywiście tak, że administrator posiada hasła swoich użytkowników. Po zalogowaniu użytkownik zostanie poproszony o zmiane hasła, do którego już nie będziesz miał dostępu.</div>
          </div>
          <div class="text-xs-center">
            <v-btn color="secondary" depressed @click="$router.push('/admin/teachers')">Karta nauczyciele</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">Utwórz odpowiednie klasy</v-stepper-step>

        <v-stepper-content step="2">
          <div class="stepper-wrapper">
            <div>
              <h2>Gratulacje! Utworzyłeś już konta nauczycieli, pora przejść dalej :)</h2>
              <p>Kolejnym istotnym zadaniem będzie utworzenie wszystkich klas. Tak aby, nauczyciele mogli pełnić opiekę nad swoimi wychowankami. Wychowawcy będą mogli organizować zbiórki dla klasy, nad którą mają zwierzchnictwo.</p>
            </div>
            <div class="centered-icon">
              <v-icon class="stepper-icon">event_note</v-icon>
            </div>
          </div>
          <div class="text-xs-center">
            <v-btn color="secondary" depressed @click="$router.push('/admin/classes')">Przejdź do klas</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">Dodaj konta rodziców</v-stepper-step>

        <v-stepper-content step="3">
          <div class="stepper-wrapper">
            <div>
              <h2>Świetnie, połowa już gotowa!</h2>
              <p>Czas, aby utworzyć konta rodzicom uczniów. To tam będą oni mogli analizować przyszłe oraz obecne wydatki na swoich potomków. Dzięki temu będą mogli przygotować się na przyszłe koszta, jak i opłacać wszystko w odpowiednich ratach.</p>
            </div>
            <div class="centered-icon">
              <v-icon class="stepper-icon">contacts</v-icon>
            </div>
          </div>
          <div class="text-xs-center">
            <v-btn color="secondary" depressed @click="$router.push('/admin/parents')">Utwórz konta rodziców</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="step > 4" step="4">Lista uczniów</v-stepper-step>
        <v-stepper-content>
          <div class="stepper-wrapper">
            <div class="centered-icon">
              <v-icon class="stepper-icon">face</v-icon>
            </div>
            <div>
              <h2>Został tylko jeden punkt, aby Skarbnik został poprawnie skonfigurowany!</h2>
              <p>Bardzo istotnym aspektem jest dodanie oczywiście samych uczniów. Przypisujemy do nich zarówno rodziców jak i odpowiednią klasę. Jako, że zbiórki są przypisane do klas. Przypisanie dzieci do rodzica jak i klasy jest kluczowe dla funkcjonowania całej aplikacji.</p>
            </div>
          </div>
          <div class="text-xs-center">
            <v-btn color="secondary" depressed @click="$router.push('/admin/students')">Dodaj listę uczniów</v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-step step="5">Gratulacje</v-stepper-step>
        <v-stepper-content step="5">
          <div class="stepper-wrapper">
            <div>
              <h2>Skarbnik został pomyślnie skonfigurowany!</h2>
              <p>Gratulacje, Twoja aplikacja może już w pełni funkcjonować.</p>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper>
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
            <v-flex xs12 sm12>
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Panel główny</div>
                    <span>W tym panelu możesz poznać szczegółowe informacje na temat funkcjonowania aplikacji.</span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>


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
  </transition>
</template>

<script>
  import NumberTile from '@/components/NumberTile';
  import Chart from 'chart.js';
  import chaPaidToTarget from '@/charts/PaidToTarget';

  export default {
    data: () => ({
      loading: false,
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
    computed:{
      step(){
        let counter = 1;
        if(this.$store.state.counter.teachers >= 1){
          counter++;
          if(this.$store.state.counter.classes >= 1){
            counter++;
            if(this.$store.state.counter.parents >= 1){
              counter++;
              if(this.$store.state.counter.students >= 1){
                counter++;
              }
            }
          }
        }

        return counter;
      },
      counters(){
        return [
          this.$store.state.counter.teachers,
          this.$store.state.counter.classes,
          this.$store.state.counter.parents,
          this.$store.state.counter.students
        ];
      }
    },
    watch:{
      step(n,o){
        if(n >= 5){
          setTimeout(()=>{
            this.createMoneyChart();
          },0);
        }
      }
    },
    components:{
      NumberTile
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
        const ctx2 = document.querySelector('#chaOther');
        new Chart(ctx, chaPaidToTarget);
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