import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import Vuetify from 'vuetify';
//index.js or main.js
import 'vuetify/dist/vuetify.min.css' //Ensure you are using A Css Loader

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

import WebRTC from 'vue-webrtc'


Vue.use(WebRTC)

Vue.use(VuePeerJS, new Peer({
  host: '3677-45-248-151-134.in.ngrok.io',
  secure: true,
  }));

const socket = io('https://fcf9-45-248-151-134.in.ngrok.io');

Vue.use(VueSocketIOExt, socket);


Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
