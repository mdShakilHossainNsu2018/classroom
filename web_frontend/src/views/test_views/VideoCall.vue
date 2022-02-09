<!--<template>-->
<!--    <div class="container">-->
<!--        <div class="row">-->
<!--            <div class="col-md-12 my-3">-->
<!--                <h2>Room</h2>-->
<!--                <input v-model="roomId">-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-md-12">-->
<!--                <div class="">-->
<!--                    <vue-webrtc ref="webrtc"-->
<!--                                width="100%"-->
<!--                                :roomId="roomId"-->
<!--                                v-on:joined-room="logEvent"-->
<!--                                v-on:left-room="logEvent"-->
<!--                                v-on:opened-room="logEvent"-->
<!--                                v-on:share-started="logEvent"-->
<!--                                v-on:share-stopped="logEvent"-->
<!--                                @error="onError" />-->
<!--                </div>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-12 my-3">-->
<!--                        <button type="button" class="btn btn-primary" @click="onJoin">Join</button>-->
<!--                        <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>-->
<!--                        <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>-->
<!--                        <button type="button" class="btn btn-primary" @click="onShareScreen">Share Screen</button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-md-12">-->
<!--                <h2>Captured Image</h2>-->
<!--                <figure class="figure">-->
<!--                    <img :src="img" class="img-responsive" />-->
<!--                </figure>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    // import * as io from 'socket.io-client'-->
<!--    // window.io = io-->
<!--    // import Vue from 'vue'-->
<!--    // import WebRTC from 'vue-webrtc'-->
<!--    // import { find, head } from 'lodash';-->
<!--    // Vue.component(WebRTC.name, WebRTC);-->

<!--    export default {-->
<!--        name: 'app',-->
<!--        components: {-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                img: null,-->
<!--                roomId: "public-room"-->
<!--            };-->
<!--        },-->
<!--        computed: {-->
<!--        },-->
<!--        watch: {-->
<!--        },-->
<!--        methods: {-->
<!--            onCapture() {-->
<!--                this.img = this.$refs.webrtc.capture();-->
<!--            },-->
<!--            onJoin() {-->
<!--                this.$refs.webrtc.join();-->
<!--            },-->
<!--            onLeave() {-->
<!--                this.$refs.webrtc.leave();-->
<!--            },-->
<!--            onShareScreen() {-->
<!--                this.img = this.$refs.webrtc.shareScreen();-->
<!--            },-->
<!--            onError(error, stream) {-->
<!--                console.log('On Error Event', error, stream);-->
<!--            },-->
<!--            logEvent(event) {-->
<!--                console.log('Event : ', event);-->
<!--            },-->
<!--        }-->
<!--    };-->
<!--</script>-->


<template>
    <div>

        <v-text-field label="Room" v-model="roomId"></v-text-field>

        <v-btn @click="goToRoom">Go room</v-btn>

        <div id="consultingRoom" style="display: none;">

            <video id="localVideo" autoplay></video>
            <video id="remoteVideo" autoplay></video>
        </div>

<!--        <vue-webrtc width="100%" roomId="roomId">-->

<!--        </vue-webrtc>-->
    </div>
</template>

<script>
    export default {
        name: "VideoCall",

        sockets: {
            connect: function () {
                console.log('socket to notification channel connected')
            },

            created: function (room) {

             console.log('room', room)
                let localVideo = document.getElementById('localVideo')
                navigator.mediaDevices.getUserMedia(this.streamConstraints).then(
                    stream => {
                        this.localStream = stream
                        localVideo.srcObject = stream
                        this.isCaller = true
                    }
                ).catch(err => console.log('an error occurred',err)).finally(()=>{
                    // console.log(this.localStream.getTracks())
                })

                console.log('created end.')



            },

            joined: function (room) {
                console.log('room', room)
                console.log('from joined')
                let localVideo = document.getElementById('localVideo')
                navigator.mediaDevices.getUserMedia(this.streamConstraints).then(
                    stream => {
                        this.localStream = stream
                        localVideo.srcObject = stream
                        this.$socket.client.emit('ready', this.roomId)
                    }

                ).catch(err => console.log('an error occurred',err)).finally(()=>{
                    // console.log(this.localStream.getTracks())
                })

                // console.log(this.localStream.getTracks())

            },

            ready: function(){
                console.log('from ready')

                if(this.isCaller){
                    this.rtcPeerConnection = new RTCPeerConnection(this.iceServers)
                    this.rtcPeerConnection.onicecandidate = this.onIceCandidate
                    this.rtcPeerConnection.ontrack = this.onAddStream
                    console.log(this.localStream.getTracks()[0])
                    console.log(this.localStream.getTracks()[1])
                    this.rtcPeerConnection.addTrack(this.localStream.getTracks()[0], this.localStream)
                    console.log('debug 1')
                    // this.rtcPeerConnection.addTrack(this.localStream.getTracks()[1], this.localStream)
                    console.log('debug 2')
                    this.rtcPeerConnection.createOffer().then( sessionDescription => {
                        this.rtcPeerConnection.setLocalDescription(sessionDescription)

                        this.$socket.client.emit('offer', {
                            type: 'offer',
                            sdp: sessionDescription,
                            room: this.roomId,
                        })
                    }).catch( error => console.log(error))

                }
            },

            offer: function(event){
                console.log('from offer')
                if(!this.isCaller){
                    this.rtcPeerConnection = new RTCPeerConnection(this.iceServers)
                    this.rtcPeerConnection.onicecandidate = this.onIceCandidate
                    this.rtcPeerConnection.ontrack = this.onAddStream
                    this.rtcPeerConnection.addTrack(this.localStream.getTracks()[0], this.localStream)
                    // this.rtcPeerConnection.addTrack(this.localStream.getTracks()[1], this.localStream)

                    this.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))

                    this.rtcPeerConnection.createAnswer().then( sessionDescription => {
                        this.rtcPeerConnection.setLocalDescription(sessionDescription)

                        this.$socket.client.emit('answer', {
                            type: 'answer',
                            sdp: sessionDescription,
                            room: this.roomId,
                        })
                    }).catch( error => console.log(error))

                }
            },

            candidate: function(event){
                console.log('From candidate')
                const candidate = new RTCIceCandidate({
                    sdpMLineIndex: event.label,
                    candidate: event.candidate
                })

                this.rtcPeerConnection.addIceCandidate(candidate)
            }


        },

        data() {
            return {
                roomId: "",

                localStream: null,

                remoteStream: null,

                isCaller: false,

                rtcPeerConnection: null,

                iceServers: {'iceServer': [
                    { "urls": 'stun:stun.services.mozilla.com'},
                    { "urls": 'stun:stun.l.google.com:19302'},
                ]},

                streamConstraints: {
                    audio: false,
                    video: true,
                }
            }
        },

        // mounted() {
        //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        //     var constraints = {audio: false, video: true}
        //
        //     navigator.getUserMedia(constraints, this.successCallback, this.errorCallback)
        //
        // },

        methods: {

            onAddStream(event){
                console.log('onAddStream')
                let remoteVideo = document.getElementById('remoteVideo')

                remoteVideo.srcObject = event.streams[0]
                this.remoteStream = event.streams[0]
            },

            onIceCandidate(event){
              if (event.candidate){
                  console.log('sending the ice candidate', event.candidate)

                  this.$socket.client.emit('candidate', {
                      type: 'candidate',
                      label: event.candidate.sdpMLineIndex,
                      id: event.candidate.sdpMid,
                      candidate: event.candidate.candidate,
                      room: this.roomId,
                  })
              }
            },

            goToRoom(){


                let consultingRoom = document.getElementById('consultingRoom')

                if (this.roomId === ''){
                    alert('Please enter roomId')
                } else {

                    this.$socket.client.emit('createOrJoin', this.roomId)
                    // navigator.mediaDevices.getUserMedia(this.streamConstraints).then(
                    //     stream => {
                    //         this.localStream = stream
                    //         localVideo.srcObject = stream
                    //     }
                    // ).catch(err => console.log('an error occurred',err))

                    consultingRoom.style = "display: block";

                }
            },

            // successCallback(stream) {
            //     var video = document.getElementById('video_player')
            //     window.stream = stream
            //
            //     if (window.URL) {
            //         video.srcObject = stream;
            //     } else {
            //         video.srcObject = stream
            //     }
            //     video.play()
            // },
            //
            // errorCallback(error){
            //   console.log('error: ', error)
            // }
        }
    }
</script>

<style scoped>

</style>