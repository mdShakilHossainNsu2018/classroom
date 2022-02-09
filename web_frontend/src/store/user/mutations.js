import router from "@/router"

export const SET_USER = (state, data) => {
    // console.log("userData",data)
    state.token = data.token;
    state.username = data.username
    state.userEmail = data.email
    state.user_id = data.user_id
    state.isAuthenticated = true;
    state.isStaff = data.is_staff

    router.push('/')

    // var data2 = localStorage.getItem('user')
    // console.log(JSON.parse(data2))
}


export const INIT = (state, data) => {
    if(data === null){
        state.token = ''
        state.username = ''
        state.userEmail = ''
        state.user_id = ''
        state.isAuthenticated = false;
    } else {
        state.token = data.token;
        state.username = data.username
        state.userEmail = data.email
        state.user_id = data.user_id
        // if (state.data.token)
        state.isAuthenticated = true;


    }


}


export const LOG_OUT = (state) => {
    state.token = '';

    state.username = '';
    state.userEmail = '';
    state.user_id = '';
    state.isAuthenticated = false;
    state.course = {}

    router.push('/login')
}


export const SET_COURSES = (state, data) => {
    state.courses = data
}
export const SET_COURSE = (state, data) => {
    state.course = data
}


export const SELL_USERS_BY_COURSE = (state, data) => {
    state.usersByCourse = data
}

export const SET_USER_DETAIL = (state, data) => {
    state.user = data
}

export const SET_LOADING_STATE = (state, data) => {
    state.isLoading = data
}

export const SET_SNACKBARSHOW = (state, data)=> {
    state.snackBarShow = data
}

export const ERROR_SET = (state, data) => {
    state.snackBarShow = true
    state.errorRes = data
}


