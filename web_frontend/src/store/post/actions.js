import {axiosLocal} from '../user/actions'

export const fetchPostData = ({commit}, data) => {
    console.log("fetching post");
    console.log(data)

    axiosLocal.get('post', { params: data }).then(res => {
        console.log(res.data)
        commit('SET_POST', res.data)
    }).catch(err => {
        console.log(err)
    })


}


