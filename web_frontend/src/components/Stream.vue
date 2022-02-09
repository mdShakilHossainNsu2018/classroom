<template>
    <v-container>
        <!--        <h1>Stream View</h1>-->

        <div v-if="getPosts.length !== 0">


            <v-expansion-panels focusable>
                <v-expansion-panel
                        v-for="post in getPosts" :key="post.id"
                >
                    <v-expansion-panel-header>
                        <v-card class="pa-4 mb-3" elevation="12" >
                            <v-card-title>
                                Created By: {{getUserById(post.user).username}}
                                <br>
                                Email: {{getUserById(post.user).email}}
                            </v-card-title>
                            <v-card-subtitle>
                                Created At: {{convertTime(post.created_at)}}
                                <br>
                                Post Type: {{post.type}}
                                <br>

                                <div v-if="post.due_date !== null">
                                    Due Date: {{post.due_date}}
                                </div>

                                <br>

                                <div v-if="post.due_time !== null">
                                    Due Time: {{post.due_time}}
                                </div>

                            </v-card-subtitle>

                            <v-card-text>

                                <div class="pa-4" v-html="compiledMarkdown(post.context)"></div>

                                <!--                    {{}}-->
                            </v-card-text>

                            <div v-if="post.attachment !== null">
                                <h1>Attachment: </h1>
<!--                                <object :data="post.attachment" type="application/pdf">-->
                                    <iframe scrolling="no" allowfullscreen :src="post.attachment"></iframe>
<!--                                </object>-->

                                <v-btn class="pa-4" icon shaped color="primary" fab :href="post.attachment" ><v-icon dense size="5rem">mdi-cloud-download</v-icon></v-btn>


                            </div>

                        </v-card>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>



                        <v-list-item three-line v-for="comment in post.comment_set" :key="comment.id">
                            <v-list-item-content>
                                <v-list-item-title ><h2>
                                  {{comment.comment}}
                                </h2></v-list-item-title>
                                <v-list-item-subtitle>
                                    Commented By: {{comment.username}}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    Created At: {{convertTime(comment.created_at)}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <div class="d-flex pa-4">
                            <v-text-field shaped rounded outlined v-model="comment"></v-text-field>
                            <v-btn color="primary" @click="createComment(post.id)" icon class="mt-4 ml-6"><v-icon>mdi-send</v-icon></v-btn>
                        </div>

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


            <!--            <v-btn-->
            <!--                    color="pink"-->
            <!--                    text-->
            <!--                    v-bind="attrs"-->
            <!--                    @click="streamSnackbar = true"-->
            <!--            >-->
            <!--                Close-->
            <!--            </v-btn>-->

            <v-snackbar
                    v-model="streamSnackbar"
            >
                Stream Updated... :)

                <template v-slot:action="{ attrs }">
                    <v-btn
                            color="pink"
                            text
                            v-bind="attrs"
                            @click="streamSnackbar = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>

        </div>

        <div v-else><h1>Sorry you don't have any posts yet!</h1></div>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import marked from "marked";
    var moment = require('moment');


    // let isUpdated = false;

    export default {
        name: "Stream",
        mounted() {

        },

        data() {
            return {
                id: this.$route.params.id,
                // socket: null,
                streamSnackbar: false,
                comment: ""
            }
        },

        created: function () {
            let socket = new WebSocket('ws://localhost:8000/ws/room/' + this.id + '/');
            const id = this.id;
            const userId = this.getUserId

            // const method = this.test();


            // this.streamSnackbar = isUpdated;
            socket.onopen = function (event) {
                console.log("ws connected from Stream..." + id)

                console.log(event)
            }

            socket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                // console.log(data)
                // console.log("userId", userId, "posted", data.posted_by)

                if (data.message === "updated" && userId !== data.posted_by) {

                    // const course = {
                    //     course: id
                    // }

                    location.reload();
                    // isUpdated = true;
                    // this.test();

                    // this.$methods.test()

                    this.streamSnackbar = true;


                    console.log("Stream updated console log...")
                }
                // console.log(data)
            }

            socket.onclose = function () {
                console.error('Chat socket closed unexpectedly');
            }
        },

        methods: {
            //
            // test(){
            //     console.log("testing")
            // },

            ...mapActions("post", ['fetchPostData']),

          convertTime(time){
              return moment(time).format('MMMM Do YYYY, h:mm:ss a')
          },


            createComment(postId){

                const comment = {

                    user: this.getUserId,
                    post: postId,
                    comment: this.comment

                }

                this.$axios.post('http://localhost:8000/api/post/comment/', comment
                ).then(res => {
                    console.log(res)

                    // this.getPosts.forEach(post => {
                    //     if (post.id === res.post){
                    //         post.comment_set.push({res})
                    //     }
                    // })

                    location.reload();

                    // console.log(this.getPosts)
                    // this.$router.push({name: "ClassDetail", params: {class_name: this.class_name, id: this.id}})
                }).catch(err => {
                    console.log(err)
                }).finally(() => {

                    // const message = {
                    //     "message": "updated"
                    // }
                    // this.socket.send(JSON.stringify(message))
                })
            },

            getUserById(id) {
                let users = this.getUsersByCourse
                let user = null;

                users.forEach(item => {
                    if (item.id === id) {
                        user = item;
                    }
                })
                return user;
            },

            compiledMarkdown: function (input) {
                return marked(input, {sanitize: true});
            }


        },

        computed: {

            ...mapGetters("post", ["getPosts"]),
            ...mapGetters("user", ["getUsersByCourse", "getUserId"]),


        }
    }
</script>

<style scoped>

</style>