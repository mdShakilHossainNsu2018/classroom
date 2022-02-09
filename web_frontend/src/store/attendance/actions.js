import {axiosLocal} from '../user/actions'


export const fetchAttendance = ({commit}, data) => {
    // {user: this.getUserId, course: this.id}

    axiosLocal.get('attendance/', { params: data }).then(res => {
        // console.log(res.data)
        commit('SET_ATTENDANCE', res.data)
    }).catch(err => {
        console.log(err)
    })


}


