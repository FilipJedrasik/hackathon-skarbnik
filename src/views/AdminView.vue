<template>
    <v-app>
        <transition name="t-fade">
            <v-progress-linear v-if='asyncAction' color="blue" style="position:fixed;top:0;margin:0;z-index:1000;" indeterminate></v-progress-linear>
        </transition>
        <v-navigation-drawer
                :clipped="$vuetify.breakpoint.lgAndUp"
                v-model="drawer"
                fixed
                app
        >
            <v-toolbar color="secondary" dark class="transparent" v-if="!$vuetify.breakpoint.lgAndUp">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-icon class="drawer-header-icon" dark>account_circle</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title class="drawer-header-name">{{$store.getters['user/getUser'].name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense>
                <template v-for="item in items">
                        <v-list-tile
                                :key="item.text"
                                :disabled="fullPath == item.target"
                                @click="fullPath != item.target ? $router.push(item.target) : ''">
                            <v-list-tile-action>
                                <v-icon :color="fullPath == item.target ? 'primary' : ''">{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title :class="{ 'drawer-menu-current': fullPath == item.target }">
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
                    <router-view @async="asyncAction = $event"></router-view>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    name: 'AdminViewLayout',
    beforeRouteEnter (to, from, next) {
      if(to.fullPath === '/admin')
        next('/admin/');
      else
        next();
    },
    data: () => ({
      dialog: false,
      drawer: null,
      asyncAction: false,
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
      },
      fullPath(){
        return this.$route.path;
      }
    }
  }
</script>