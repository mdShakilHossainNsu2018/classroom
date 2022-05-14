import axios from 'axios'
// import state from "./state";

export var axiosLocal = axios.create({
    baseURL: 'http://204.152.197.187:8000/api/'
})

export const init = ({commit}) => {

    var data = JSON.parse(localStorage.getItem('user'))

    commit('INIT', data)

    if (data !== null){
        getUserById({commit}, data.user_id)

    }
}

export const  login = ({commit}, data) =>  {
    commit('SET_LOADING_STATE', true)
    axiosLocal.post('users/token-auth/', data).then(res => {

        localStorage.setItem('user', JSON.stringify(res.data))
        commit('SET_USER', res.data)

    }).catch(err => {
        console.log(err.message, err.response)
        // if (err.response.status === 401){
            commit("ERROR_SET", err.response)
        // }
    }).finally(() => {

        commit('SET_LOADING_STATE', false)

    })

}

export const getCourses = ({commit}, token) => {

    console.log('state', token)

    axiosLocal.get('courses/user_course/', {
        headers: {
            // 'content-type': 'multipart/form-data',
            'Authorization': `Token ${token}`
        }
    }).then(res => {

        commit('SET_COURSES', res.data)
        console.log('res', res)

        // localStorage.setItem('user', JSON.stringify(res.data))
        // commit('SET_USER', res.data)

    }).catch(err => console.log(err))

}

export const getCourse = ({commit}, obj) => {

    axiosLocal.get('courses/courses/' + obj.id + '/', {
        headers: {
            // 'content-type': 'multipart/form-data',
            'Authorization': `Token ${obj.token}`
        }
    }).then(res => {

        commit('SET_COURSE', res.data)
        console.log('res', res)

        // localStorage.setItem('user', JSON.stringify(res.data))
        // commit('SET_USER', res.data)

    }).catch(err => console.log(err))

}


export const fetchUsersByCourse = ({commit}, obj) => {

    axiosLocal.get('users/user_by_course/', {params: obj}
    ).then(res => {

        commit('SELL_USERS_BY_COURSE', res.data)
        console.log('res', res)

        // localStorage.setItem('user', JSON.stringify(res.data))
        // commit('SET_USER', res.data)

    }).catch(err => console.log(err))

}


export const register = ({dispatch, commit}, data) => {


    commit('SET_LOADING_STATE', true)
    axiosLocal.post('users/users/', data).then(res => {
        var data2 = {
            username: res.data.username,
            password: data.password,
        }
        dispatch('login', data2)
    }).catch(err => {
        console.log(err.response)

        commit('SET_LOADING_STATE', false)

        commit("ERROR_SET", err.response)
    })
}


export const logout = ({commit}) => {
    localStorage.removeItem('user')
    commit('LOG_OUT')
}


export const getUserById = ({commit}, id) => {

    axiosLocal.get('users/users/' + id + '/').then(res => {
        // console.log(res.data)
        commit('SET_USER_DETAIL', res.data)

    }).catch(err => {
        console.log(err)
    })
}



