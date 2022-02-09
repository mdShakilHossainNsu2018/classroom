
export const isAuthenticated = (state) => {
    return state.token !== '';
}

export const getUserName = (state) => {
    return state.username;
}

export const getUserId = (state) => {
    return state.user_id;
}

export const getToken = (state) => {
    return state.token
}

export const getCoursesData = (state) => {
    return state.courses
}

export const getCourseDetail = (state) => {
    return state.course
}

export const getUsersByCourse = (state) => {
    return state.usersByCourse
}

export const userIsStaff = (state) => {
    // console.log(state.isStaff)
    return state.isStaff
}

export const userIsSuperUser = (state) => {
    return state.user.is_superuser
}


export const getLoadingState = (state) => {
    return state.isLoading;
}

export const getSnackBarShow = (state) => {
    return state.snackBarShow;
}

export const gerErrorRes = (state) => {
    return state.errorRes
}
