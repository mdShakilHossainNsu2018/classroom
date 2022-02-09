<template >
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        <digital-clock :blink="false" :twelveHour="true" :displaySeconds="true"/>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Server Time
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                    dense
                    nav
                    v-if="isAuthenticated"
            >
                <v-list-item

                        v-for="item in getCoursesData"
                        :key="item.id"
                        link
                        :to="{name: 'ClassDetail', params: {class_name: item.course_code , id: item.id}}"

                >
                    <v-list-item-icon>
                        <v-icon>mdi-book</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.course_code }} sec: {{item.course_section}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <!--  -->
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <router-link exact to="/" v-if="userIsStaff === true && isAuthenticated">
                <v-toolbar-title >Teacher Portal</v-toolbar-title>
            </router-link>

            <router-link exact  to="/" v-if="userIsStaff !== true && isAuthenticated">
                <v-toolbar-title >Student Portal</v-toolbar-title>

            </router-link>

            <v-spacer></v-spacer>

          <v-menu
              open-on-hover
              down
              offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  text
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
              >
                WebGL <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
              >
                <v-btn text @click="onClickMolecule">
                  molecule
                </v-btn>
<!--                <v-list-item-title  onClick="onClickMolecule">item</v-list-item-title>-->
              </v-list-item>
            </v-list>
          </v-menu>

            <!--      {{getUserName}}-->
            <v-avatar v-if="isAuthenticated" color="brown"
                      class="pa-4 mx-3"
                      size="48"><span class="white--text headline">{{getUserName.substring(0,3)}}</span></v-avatar>
            <v-btn @click="logout" v-if="isAuthenticated">Logout</v-btn>
        </v-app-bar>

        <v-main>
            <router-view :key="$route.fullPath"></router-view>
        </v-main>
    </v-app>
</template>


<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    a:link {
        text-decoration: none;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import DigitalClock from "vue-digital-clock";

    export default {
        components: {
            DigitalClock
        },

        data() {
            return {
                isBlocked: false,
                drawer: false,
                items: [
                    {title: 'Home', icon: 'mdi-home', to: '/'},
                    {title: 'Attendance', icon: 'mdi-account-multiple', to: '/attendance'},
                    {title: 'ClassDetail', icon: 'mdi-book-open', to: '/classes'},
                    {title: 'Notification', icon: 'mdi-information-outline', to: '/notification'},
                    {title: 'ChatBot', icon: 'mdi-clippy', to: '/chatbot'},
                ],
                right: null,
            }
        },

        created: function(){
            this.socket = new WebSocket('ws://localhost:8000/ws/siteblocker/');
            this.socket.onopen = function(event){
                console.log("ws connected...")

                console.log(event)
            }

            this.socket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data)
            }

            this.socket.onclose = function() {
                console.error('Chat socket closed unexpectedly');
            }
        },

        methods: {
            ...mapActions("user", ['logout', 'init', 'getCourses']),
          onClickMolecule(){
           window.open("molecules/index.html", "_blank");
          }

        },

        computed: {
            ...mapGetters("user", ["isAuthenticated", "getToken", "getCoursesData", "userIsStaff", "getUserName"])
        },

        mounted() {
            this.init()
        }
    }
</script>