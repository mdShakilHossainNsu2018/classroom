<template>
    <div class="home">

        <h1 class="pa-16 mx-auto" v-if="getCoursesData.length === 0">Sorry, You don't have any course registered!!!</h1>

        <div class="d-flex flex-row flex-wrap" v-else>


            <v-card
                    class="mx-auto my-5"
                    max-width="500"
                    outlined
                    hover
                    v-for="item in getCoursesData"
                    v-bind:key="item.id"
                    @click="goToCourseDetail(item.course_code, item.id)"


            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                            Class Days: {{item.class_days}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                          Course Code: {{item.course_code}}
                          <br>
                          Section: {{item.course_section}}
                        </v-list-item-title>
                        <v-list-item-subtitle><b>Start: </b> {{item.start_time}} <br> <b>End: </b> {{item.end_time}}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            tile
                            size="90"

                    >
                        <v-img eager  :src="require('../assets/nsu_logo.png')"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <!--      <v-card-actions>-->
                <!--        <v-btn-->
                <!--                outlined-->
                <!--                rounded-->
                <!--                text-->
                <!--        >-->
                <!--          Button-->
                <!--        </v-btn>-->
                <!--      </v-card-actions>-->

            </v-card>
        </div>

        <Message :is-open.sync="isOpen" @update="isOpen = $event"/>

        <v-btn
                fixed
                right
                bottom
                @click="onClickChatBtn"
                v-model="fab"
                color="blue darken-2"
                dark
                fab
        >
            <v-icon v-if="isOpen">
                mdi-close
            </v-icon>
            <v-icon v-else>
                mdi-android
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Message from "../components/Message";
    // import {getCourses} from "../store/user/actions";

    export default {
        components: {Message},

        data() {
            return {
                fab: false,
                isOpen: false
            }
        },



        methods: {
            ...mapActions("user", ['getCourses']),
            // ...mapActions("component", ['toggleChatBot']),

            onClickChatBtn(){
                this.isOpen = !this.isOpen;
                // this.toggleChatBot(!this.isOpen)
            },

            goToCourseDetail(code, id) {
                this.$router.push({name: 'ClassDetail', params: {class_name: code, id: id}})
            }
        },

        computed: {
            ...mapGetters("user", ["isAuthenticated", "getToken", "getCoursesData"]),
            // ...mapGetters("component", ["isOpen"]),
        },

        mounted() {
            this.getCourses(this.getToken)
            // console.log(this.getToken)


        }
    }
</script>

<style scoped>

    #lateral .v-btn--example {
        bottom: 0;
        position: absolute;
        margin: 0 0 16px 16px;
    }
</style>

