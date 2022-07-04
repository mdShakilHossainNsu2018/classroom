import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Attendance from '../components/Attendance.vue'
import ClassDetail from '../views/ClassDetail.vue'

// import Notification from '../components/Notification.vue'
import store from "@/store";
import Login from "../views/Login";
import Register from "../views/Register";
import VideoCall from "../views/test_views/VideoCall";
import VideoCall2 from "../views/VideoCall2";
import VueWebRTC from "../views/test_views/VueWebRTC";
import CreatePost from "../views/CreatePost";
import AttendanceSubmitted from "@/views/AttendanceSubmitted";
import Moclecule from "../views/WebGl/molecule_3d/Moclecule";

Vue.use(VueRouter)

let checkAuth = (to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.isAuthenticated) next({name: 'Login'})
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: checkAuth
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/submitted-attendance',
    name: 'SubmittedAttendance',
    component: AttendanceSubmitted,
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance,
    beforeEnter: checkAuth
  },
  {
    path: '/video',
    name: 'Video',
    component: VideoCall,
  },

  {
    path: '/video_call/:class_code/:section/:id',
    name: 'VideoCall',
    component: VideoCall2,
    beforeEnter: checkAuth
  },

  {
    path: '/create_post/:class_code/:section/:id',
    name: 'CreatePost',
    component: CreatePost,
    beforeEnter: checkAuth
  },

  // {
  //   path: '/video2',
  //   name: 'VideoCall2',
  //   component: VideoCall2,
  // },
  {
    path: '/vue-webrtc',
    name: 'VueWebRTC',
    component: VueWebRTC,
  },

  {
    path: '/molecule',
    name: 'Molecule',
    component: Moclecule,
  },

  {
    path: '/class/:class_name/:id',
    name: 'ClassDetail',
    component: ClassDetail,
    beforeEnter: checkAuth
  },

  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    beforeEnter: checkAuth
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
