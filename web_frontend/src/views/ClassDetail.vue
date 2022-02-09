<template>
    <div>
        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                class="mx-2"
                                fab
                                dark
                                large
                                v-bind="attrs"
                                v-on="on"
                                color="purple"
                                :to="{name: 'VideoCall', params: {class_code: getCourseDetail.course_code, section: getCourseDetail.course_section, id: getCourseDetail.id}}"
                        >
                            <v-icon dark>
                                mdi-message-video
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Go to Video Chat room</span>
                </v-tooltip>


                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                class="mx-2"
                                fab
                                dark
                                large
                                v-bind="attrs"
                                v-on="on"
                                color="purple"
                                :to="{name: 'CreatePost', params: {class_code: getCourseDetail.course_code, section: getCourseDetail.course_section, id: getCourseDetail.id}}"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Create post</span>
                </v-tooltip>


            </v-card-actions>

            <v-card-title style="margin-top: -5rem">

                Course Code: {{getCourseDetail.course_code}}

                <br>
                Course Name: {{getCourseDetail.course_name}}
                <br>
                Course Section: {{getCourseDetail.course_section}}
                <br>
                Start - end: {{getCourseDetail.start_time}} - {{getCourseDetail.end_time}}
            </v-card-title>

        </v-card>


        <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
        >
            <v-tab
                    v-for="item in items"
                    :key="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                    v-for="item in items"
                    :key="item"
            >
                <component :is="components[tab]"></component>
                <v-card

                >
                    <v-card-text>{{components[tab]}}</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Stream from "../components/Stream";
    import Attendance from "../components/Attendance";
    import People from "../components/People";

    export default {
        name: 'ClassDetail',
        components: {'stream': Stream, 'attendance': Attendance, 'people': People},
        mounted() {
            // const id = this.$route.params.id
            // console.log(id)


            this.getCourse({token: this.getToken, id: this.id})


            const course = {
                "course": this.id
            }

            this.fetchPostData(course)

            this.fetchUsersByCourse(course)

            if (this.userIsStaff === false) {

                const data = {user: this.getUserId, course: this.id}

                this.fetchAttendance(data)
            }

        },

        data() {
            return {
                course: '',
                tab: null,
                id: this.$route.params.id,
                items: [
                    'Stream', 'Attendance', 'People'
                ],

                components: [
                    'stream',
                    'attendance',
                    'people'
                ],


                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

            }
        },

        methods: {

            ...mapActions("user", ['getCourse', 'fetchUsersByCourse']),
            ...mapActions("attendance", ['fetchAttendance']),
            ...mapActions("post", ['fetchPostData']),

        },

        computed: {

            ...mapGetters("user",
                ["getCoursesData", "getUserId",
                    "getCourseDetail", "getToken",
                    'getUsersByCourse', "userIsStaff"]),

            ...mapGetters("post", ["getPosts"]),
        }

    }
</script>