<template>
    <v-container>
      <div class="d-flex">
        <v-card class="py-9 px-9" width="600">
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
            ></v-text-field>

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="password"
                type="password"
                required
            ></v-text-field>


            <v-btn
                color="warning"
                to="/register"
            >
              Registration
            </v-btn>

            <v-btn
                color="primary"
                class="ml-4"
                @click="login"
            >
              Login
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
        
        <img src="https://cdn.dribbble.com/users/1517677/screenshots/4938618/ng_3-1.jpg" alt="">
      </div>

        <v-snackbar
                v-if="getSnackBarShow"
                v-model="getSnackBarShow"

        >
            Some thing wrong try again

<!--            {{ gerErrorRes.data != null ? gerErrorRes.data.error : "" }}-->
<!--            something wrong in http request-->

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
        name: "Login",
        data: () => ({
            valid: true,
            userName: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',

            ],

        }),

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            login () {
                var data = {username: this.userName, password: this.password}
                this.$store.dispatch('user/login', data)
                },

        },

        computed:  {

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
