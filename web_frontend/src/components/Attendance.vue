<template>
    <v-container>

        <div v-if="userIsStaff === true">

            <div v-if="students.length !== 0">
                <div v-for="user in students" :key="user.id">
                    <v-card elevation="12" class="pa-4 mb-3">
                        <v-list>
                            <v-list-item-title>
                                UserName: {{user.username}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <div class="d-flex justify-space-between">
                                    email: {{user.email}}
                                    <v-switch
                                            v-model="people"
                                            color="primary"
                                            :label="user.username"
                                            :value="user.id"
                                    ></v-switch>
                                </div>

                            </v-list-item-subtitle>

                        </v-list>
                    </v-card>

                    <v-divider></v-divider>
                </div>

                <div class="d-flex justify-end">
                    <v-btn class="pa-4 mt-4" color="primary" @click="submitAttendance" :disabled="people.length === 0">
                        Submit Attendance
                    </v-btn>
                </div>

            </div>

            <div v-else>
                <h1>Sorry no student exist</h1>
            </div>

        </div>


        <div v-else>
            <div v-if="getAttendance.length !== 0">


                <v-simple-table
                        fixed-header
                        height="300px"
                >
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                Class No:
                            </th>
                            <th class="text-left">
                                Date and Time
                            </th>
                            <th class="text-left">
                                Attendance
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="(attendance, index ) in getAttendance"
                                :key="attendance.id"

                        >
                            <td>{{index+1}}</td>
                            <td>{{ dateTimeConversion(attendance.created_at) }}</td>
                            <td v-if="attendance.is_attend">
                                <v-chip
                                        class="ma-2"
                                        color="green"
                                        text-color="white"
                                >
                                    Yes
                                </v-chip>
                                </td>
                            <td v-else>
                                <v-chip
                                        class="ma-2"
                                        color="red"
                                        text-color="white"
                                >
                                    No
                                </v-chip>

                                </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>


                <div class="d-flex justify-end" v-if="userIsStaff">
                    <v-btn class="pa-4 mt-4" color="primary" @click="submitAttendance" :disabled="people.length === 0">
                        Submit Attendance
                    </v-btn>
                </div>

            </div>

            <div v-else>
                <h1>Sorry no Attendance exist</h1>
            </div>
        </div>

    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import moment from 'moment';

    export default {
        name: "Attendance",

        mounted() {
            // if (this.userIsStaff === false){
            //     console.log("debuge")
            //     this.getAttendance()
            // }
        },

        data() {
            return {
                people: [],
                data: [],
                id: this.$route.params.id
            }
        },

        methods: {
            ...mapActions("user", ['fetchUsersByCourse']),


            dateTimeConversion(value){
                return moment(value).format('MMMM Do YYYY, h:mm:ss a');
            },
            submitAttendance() {
                // http://localhost:8000/api/attendance/create/

                //
                // course = models.ForeignKey(Course, on_delete=models.CASCADE)
                // user = models.ForeignKey(User, on_delete=models.CASCADE)
                // is_attend = models.BooleanField(default=False)
                // created_at = models.DateTimeField(auto_now_add=True)
                // updated_at = models.DateTimeField(auto_now=True)
                // const id = this.$route.params.id

                this.getUsersByCourse.forEach(obj => {

                    if (this.people.includes(obj.id)) {
                        this.data.push({
                            course: this.id,
                            user: obj.id,
                            is_attend: true,
                        })
                    } else {
                        this.data.push({
                            course: this.id,
                            user: obj.id,
                            is_attend: false,
                        })
                    }

                })


                console.log(this.data)

                this.$axios.post('http://localhost:8000/api/attendance/create/', this.data).then(res => {
                    console.log(res)
                  this.$router.push('/submitted-attendance')
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.people = []
                    this.data = []
                })

            },

        },

        computed: {
            ...mapGetters("user", ["getUsersByCourse", "getUserId", "userIsStaff"]),
            ...mapGetters('attendance', ['getAttendance']),

            students: function () {
                let onlyStudents = []
                this.getUsersByCourse.forEach(user => {
                    if (!user.is_staff && !user.is_superuser) {
                        onlyStudents.push(user)
                    }
                })

                return onlyStudents
            }

        }
    }
</script>