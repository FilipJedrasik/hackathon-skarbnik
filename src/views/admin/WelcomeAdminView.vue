<template>
  <div>
    <v-card>
      <v-card-text>
        <h2>Witaj administratorze</h2>
          <p>Pora abyś skonfigurował aplikacje <em>Skarbnik</em> dla Swojej placówki. Oto lista kroków, jakie powinieneś/powinnaś wykonać, powodzenia!</p>
      </v-card-text>
    </v-card>
    <p></p>
    <v-stepper v-model="step" vertical>
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

      <v-stepper-step step="4">Lista uczniów</v-stepper-step>
      <v-stepper-content step="4">
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
    </v-stepper>
  </div>
</template>

<script>
  export default {
    data: () => ({
      step: 1,
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>