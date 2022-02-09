<template>
    <div>
        <v-row justify="center">
            <v-dialog
                    v-model="isOpen"
                    scrollable

                    @click:outside="$emit('update', false)"
                    max-width="500px"
            >
                <v-card>
                    <div class="d-flex flex-wrap">
                        <v-card-title>Chat BOT</v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="blue darken-1"
                                icon
                                class="pa-4 ma-3"
                                @click="$emit('update', false)"

                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">
                        <div v-for="m in messages" :key="m.id">
                            <v-card color="#c3fdff" rounded class="ma-2 pa-2 d-flex ">
                               <v-icon class="mr-3" color="primary">mdi-account</v-icon> <h1>{{m.in_response_to}}</h1>
                            </v-card>
                            <v-card color="#cfff95"  rounded class="ma-2 pa-2 d-flex ">
                               <v-icon class="mr-3" color="pink">mdi-android</v-icon> <h1>{{m.text}}</h1>
                            </v-card>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-progress-circular
                                v-if="isLoading"
                                indeterminate
                                class="mb-4 mr-3 pa-2"
                                color="green"
                        ></v-progress-circular>
                        <v-text-field @keypress.enter="sendMessage" prepend-inner-icon="mdi-message" class="mt-3" outlined rounded v-model="message">

                        </v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="blue darken-1"
                                icon
                                @click="sendMessage"
                        >
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    // import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "Message",
        props: {
            isOpen: Boolean
        },
        data() {
            return {
                dialogm1: '',
                message: '',
                messages: [],
                isLoading: false
            }
        },
        methods: {
            // ...mapActions("component", ['toggleChatBot']),

            sendMessage(){
                this.isLoading = true
                this.$axios.post('http://localhost:8000/api/chatbot/', {text: this.message}).then(res=> {
                    this.messages.push(res.data)
                    // console.log(res)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.message = ""
                    this.isLoading = false
                })
            }


        },
        computed: {
            // ...mapGetters("component", ["isOpen"]),
        }
    }
</script>

<style scoped>

</style>