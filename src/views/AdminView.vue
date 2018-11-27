<template>
    <v-app id="inspire">
        <v-navigation-drawer
                :clipped="$vuetify.breakpoint.lgAndUp"
                v-model="drawer"
                fixed
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-list-tile
                            :key="item.text"
                            @click="$router.push(item.target)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                color="primary"
                dark
                app
                fixed
        >
            <v-toolbar-title style="width: 300px; display:flex; align-items: center;" class="ml-0">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Skarbnik</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <h3 style="white-space:nowrap;">{{firstName}}</h3>

            <v-btn icon>
            <v-icon>notifications</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-start>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {
      if(to.fullPath === '/admin')
        next('/admin/');
      else
        next();
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'dashboard', text: 'Strona główna', target: '/admin/' },
        { icon: 'school', text: 'Nauczyciele', target: '/admin/teachers' },
        { icon: 'contacts', text: 'Rodzice', target: '/admin/parents' },
        { icon: 'face', text: 'Uczniowe', target: '/admin/students' },
        { icon: 'event_note', text: 'Klasy', target: '/admin/classes' },
        { icon: 'exit_to_app', text: 'Wyloguj', target: '/logout' }
      ]
    }),
    computed:{
      firstName(){
        return this.$store.getters['user/getUser'].name.split(' ')[0];
      }
    },
    props: {
      source: String
    }
  }
</script>