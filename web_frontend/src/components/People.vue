<template>
    <v-container>

        <div v-if="getUsersByCourse.length !== 0">
            <div v-for="user in getUsersByCourse" :key="user.id">
                <v-card elevation="12" class="pa-4 mb-3">
                    <v-list>
                        <v-list-item-title>
                            UserName: {{user.username}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            email: {{user.email}}
                        </v-list-item-subtitle>
                    </v-list>
                </v-card>

                <v-divider></v-divider>
            </div>
        </div>

        <div v-else>
            <h1>Sorry no user exist</h1>
        </div>



    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    export default {
        name: "People",

        mounted() {

            // if (this.getUsersByCourse.length === 0){
            //
            //     const id = this.$route.params.id
            //     const course = {
            //         "course": id
            //     }
            //     this.fetchUsersByCourse(course)
            // }

        },

        methods: {
            ...mapActions("user", ['fetchUsersByCourse']),
        },

        computed: {
            ...mapGetters("user", ["getUsersByCourse"]),
        }
    }
</script>

<style scoped>

</style>