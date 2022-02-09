<template>
    <v-container>
        <v-card class="py-9 px-9">
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        v-model="userName"
                        :counter="10"
                        :rules="nameRules"
                        label="ID"
                        required
                >
                </v-text-field>
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="password"
                        type="password"
                        required
                ></v-text-field>


                <v-text-field
                        v-model="password2"
                        :rules="passwordRules2"
                        label="confirm password"
                        type="password"
                        required
                ></v-text-field>

                <v-btn
                        color="primary"
                        class="mr-4"
                        to="/login"
                >
                    Already registered
                </v-btn>

                <v-btn
                        color="warning"
                        @click="submit"
                >
                    Submit
                </v-btn>

                <v-progress-circular

                        v-if="getLoadingState"
                        class="ml-16"
                        :size="70"
                        :width="7"
                        color="purple"
                        indeterminate
                ></v-progress-circular>

            </v-form>
        </v-card>

        <v-snackbar
                v-if="getSnackBarShow"
                v-model="getSnackBarShow"

        >
                        Some thing wrong try again
<!--          {{ gerErrorRes.data != null ? gerErrorRes.data.error : "" }}-->

            <!--            <template v-slot:action="{ attrs }">-->
            <!--                <v-btn-->
            <!--                        color="pink"-->
            <!--                        text-->
            <!--                        v-bind="attrs"-->
            <!--                        @click="snackbar = false"-->
            <!--                >-->
            <!--                    Close-->
            <!--                </v-btn>-->
            <!--            </template>-->
        </v-snackbar>

    </v-container>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: "Register",

        data() {
            return {
                valid: true,
                userName: '',
                email: '',
                emailRules: [
                    v => !!v || 'email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'password is required',

                ],


                password2: '',
                passwordRules2: [
                    v => !!v || 'password is required',
                    v => (v === this.password) || "password must match."
                ],

            }
        },


        methods: {


            submit() {
                let data = {
                    username: this.userName,
                    email: this.email,
                    password: this.password,
                    is_staff: false,

                }
                this.$store.dispatch('user/register', data)
            }
        },
        computed: {

            getSnackBarShow: {
                get(){
                    return this.$store.getters["user/getSnackBarShow"]
                },
                set(value){
                    this.$store.commit("user/SET_SNACKBARSHOW", value)
                }
            },

            ...mapGetters('user', ["getLoadingState", "gerErrorRes",])
        }
    }
</script>

<style scoped>

</style>