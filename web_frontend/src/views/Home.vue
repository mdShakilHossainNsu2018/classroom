<template>
    <div id="home">

        <h1 class="pa-16 mx-auto" v-if="getCoursesData.length === 0">Sorry, You don't have any course registered!!!</h1>

        <div class="d-flex flex-row flex-wrap" v-else>


            <v-card
                    class="mx-auto my-5"
                    width="25rem"
                    height="30rem"
                    outlined
                    hover
                    v-for="item in getCoursesData"
                    v-bind:key="item.id"
                    @click="goToCourseDetail(item.course_code, item.id)"


            >
              <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
              </template>

              <v-img

                  height="10rem"
                  :src="item.cover_image"
              ></v-img>
              <v-card-title>{{item.course_name}}</v-card-title>

              <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
<!--                  <v-rating-->
<!--                      :value="4.5"-->
<!--                      color="amber"-->
<!--                      dense-->
<!--                      half-increments-->
<!--                      readonly-->
<!--                      size="14"-->
<!--                  ></v-rating>-->

<!--                  <div class="grey&#45;&#45;text ms-4">-->
<!--                    4.5 (413)-->
<!--                  </div>-->
                </v-row>

                <div class="mt-2 text-subtitle-1">
                  <b>price:</b> {{item.price}} Wie
                </div>

                <div>
                  <b>Course Code:</b> {{item.course_code}}
                  <br>
                  <b>Section:</b> {{item.course_section}}
                  <br>
                  <b>Start: </b> {{item.start_time}} <br> <b>End: </b> {{item.end_time}}

                </div>
              </v-card-text>



              <v-divider class="mx-2"></v-divider>

              <v-card-title class="my-0 py-0" >Class Days</v-card-title>

              <v-card-text class="py-1 px-3">
                <v-chip-group

                    column
                >
                  <v-chip color="accent" v-for="day in getClassDay(item.class_days)" v-bind:key="day">{{day}}</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions class="py-0">
                <v-btn
                    color="primary"

                    @click="enroll"
                >
                  Enroll To Course
                </v-btn>
              </v-card-actions>

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
            ...mapActions("user", ['getCourses', "getAllCourses"]),
            // ...mapActions("component", ['toggleChatBot']),

            onClickChatBtn(){
                this.isOpen = !this.isOpen;
                // this.toggleChatBot(!this.isOpen)
            },

          getClassDay(days) {
            let dayList = []
            console.log(days);


              [...days.toLowerCase()].forEach(item => {
                if (item === 's'){
                  dayList.push("Sunday")
                }else if (item === "m") {
                  dayList.push("Monday")
                } else if (item === "w") {
                  dayList.push("Wednesday")
                } else if (item === "t") {
                  dayList.push("Tuesday")
                }else if (item === "r") {
                  dayList.push("Thursday")
                } else if (item === "a") {
                  dayList.push("Saturday")
                } else if (item === "f") {
                  dayList.push("Friday")
                }
              });

              return dayList;
          },

          enroll(){

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
            this.getAllCourses();
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

