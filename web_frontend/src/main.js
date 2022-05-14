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
  host: '204.152.197.187',
  port: '3001'}));

const socket = io('http://204.152.197.187:3000');

Vue.use(VueSocketIOExt, socket);


Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
