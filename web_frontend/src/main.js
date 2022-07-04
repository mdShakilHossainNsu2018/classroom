import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css' //Ensure you are using A Css Loader

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

import WebRTC from 'vue-webrtc'


Vue.use(WebRTC)

Vue.use(VuePeerJS, new Peer({
  host: process.env.VUE_APP_HOST + ":3001",
  secure: true,
  }));

const socket = io(process.env.VUE_APP_HOST + ":3000");

Vue.use(VueSocketIOExt, socket);


Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
