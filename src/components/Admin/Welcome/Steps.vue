<template>
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
</template>

<script>
  export default {
    name: 'welcome-steps',
    computed: {
      step() {
        return this.$store.getters['counter/step'];
      }
    }
  };
</script>