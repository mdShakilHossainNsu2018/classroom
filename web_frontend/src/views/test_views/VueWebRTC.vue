<template>
    <div>
<!--        <vue-webrtc ref="webrtc"-->
<!--                    width="100%"-->
<!--                    :roomId="roomId"-->
<!--                    v-on:joined-room="logEvent"-->
<!--                    v-on:left-room="logEvent"-->
<!--                    v-on:opened-room="logEvent"-->
<!--                    v-on:share-started="logEvent"-->
<!--                    v-on:share-stopped="logEvent"-->
<!--                    @error="onError"/>-->

        <vue-webrtc ref="webrtc" width="100%" roomId="sample-room" stunServer="stun:stun.l.google.com:19302"/>


        <div class="row">
            <div class="col-md-12 my-3">
                <v-btn type="button"  @click="onJoin">Join</v-btn>
                <v-btn type="button" @click="onLeave">Leave</v-btn>
                <v-btn type="button" @click="onCapture">Capture Photo</v-btn>
                <v-btn  @click="onShareScreen">Share Screen</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import * as io from 'socket.io-client'
    window.io = io

    export default {
        name: "VueWebRTC",
        mounted: function () {
            this.$refs.webrtc.join()
        },
        data() {
            return {
                img: null,
                roomId: "public-room",
                iceServers: {'iceServer': [
                        { "urls": 'stun:stun.services.mozilla.com'},
                        { "urls": 'stun:stun.l.google.com:19302'},
                    ]},
            };
        },
        computed: {},
        watch: {},
        methods: {
            onCapture() {
                this.img = this.$refs.webrtc.capture();
            },
            onJoin() {
                console.log('clicked on joined')
                this.$refs.webrtc.join();
            },
            onLeave() {
                this.$refs.webrtc.leave();
            },
            onShareScreen() {
                this.img = this.$refs.webrtc.shareScreen();
            },
            onError(error, stream) {
                console.log('On Error Event', error, stream);
            },
            logEvent(event) {
                console.log('Event : ', event);
            },
        }
    }
</script>

<style scoped>

</style>