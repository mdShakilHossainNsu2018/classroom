<template>
  <v-container fluid>

    <!--        <v-text-field v-model="roomId" label="roomId"></v-text-field>-->
    <!--        <v-btn @click="go">go</v-btn>-->
    <div id="video-grid" class="d-flex flex-row flex-wrap pa-4"></div>


    <v-bottom-sheet
        v-model="bottomSheet"
        persistent
        hide-overlay
    >
      <v-sheet
          class="text-center"
          height="100px"
      >
        <div class="py-3">
          <v-btn
              fab
              dark
              large
              class="mx-2"
              color="red"
              @click="onClickVideoToggle"
          >
            <!--              mdi-video-off-outline-->
            <v-icon v-if="isLocalVideoPlaying">mdi-video-outline</v-icon>
            <v-icon v-if="!isLocalVideoPlaying">mdi-video-off-outline</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              large
              color="red"
              class="mx-2"
              @click="onClickAudioToggle"
          >
            <!--              mdi-microphone-off -->
            <v-icon v-if="!isMuted">mdi-microphone-outline</v-icon>
            <v-icon v-if="isMuted">mdi-microphone-off</v-icon>

          </v-btn>

          <v-btn
              fab
              dark
              large
              color="red"
              class="mx-2"
          >
            <!--              mdi-microphone-off -->
            <v-icon>mdi-projector-screen-outline</v-icon>

          </v-btn>
          <v-btn
              fab
              dark
              large
              color="red"
              class="mx-2"
              @click="closeTab"
          >
            <v-icon>mdi-phone</v-icon>
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import Peer from 'peerjs'


export default {
  name: "VideoCall2",

  mounted() {
    console.log('peer', this.peer)
    const class_code = this.$route.params.class_code
    const section = this.$route.params.class_code
    const course_id = this.$route.params.id
    this.peer.on('open', id => {
      console.log('open id: ', id)
      this.$socket.client.emit('join-room', class_code + section + course_id, id)

    })

    this.myVideo = document.createElement('video')

    this.myVideo.muted = true
    // myVideo.setAttribute('id', "test")

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {

      this.localStream = stream;

      this.addVideoStream(this.myVideo, stream)

      this.peer.on('call', call => {

        console.log('from answering')
        call.answer(stream)
        const video = document.createElement('video')
        video.muted = true
        // video.setAttribute('id', "test")
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })
      this.$socket.client.on('userConnected', userId => {
        console.log('from new user')
        this.connectToNewUser(userId, stream, this.peer)
      })

    })
  },

  sockets: {

    userDisconnected: function (userId) {
      console.log('userDisconnected', userId)
      if (this.peers[userId]) this.peers[userId].close()

      let video = document.getElementById(userId)

      if (video !== null) {
        video.remove()
      }


    },

    // userConnected: function (user) {
    //
    //     console.log("connected user", user)
    //
    //     const myVideo = document.createElement('video')
    //     myVideo.muted = true
    //
    //     // navigator.mediaDevices.getUserMedia({
    //     //     video: true,
    //     //     audio: true
    //     // }).then(stream => {
    //         this.addVideoStream(myVideo, stream)
    //
    //         this.connectToNewUser(user, stream)
    //
    //     // })
    //
    // }
  },

  data() {
    return {
      roomId: '',
      peers: {},
      peer: new Peer(),
      myVideo: "",
      isLocalVideoPlaying: true,
      bottomSheet: true,
      localStream: null,
      isMuted: false,
    }
  },

  methods: {
    onClickVideoToggle() {
      if (this.isLocalVideoPlaying) {
        // this.myVideo.srcObject.getTracks().map(t => t.stop());
        this.myVideo.srcObject.getVideoTracks()[0].enabled = false;

        this.isLocalVideoPlaying = false;
      } else {
        // this.myVideo.srcObject.getTracks().forEach(t => t.enabled = true);
        this.myVideo.srcObject.getVideoTracks()[0].enabled = true;
        // console.log(this.localStream);
        // this.myVideo.srcObject = this.localStream;
        this.isLocalVideoPlaying = true;
        // this.myVideo.get(0).play();
        console.log("play");
        // console.log(this.myVideo.srcObject.getTracks());
      }

      console.log(this.myVideo);
    },


    onClickAudioToggle() {
      if (this.isMuted) {
        this.myVideo.srcObject.getAudioTracks()[0].enabled = true;
        this.isMuted = false;
      } else {
        this.myVideo.srcObject.getAudioTracks()[0].enabled = false;
        this.isMuted = true;
      }
    },

    closeTab() {
      window.close()
    },

    async connectToNewUser(userId, stream, myPeer) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      // video.id = userId
      // video.height = 50
      // video.weight = 50
      video.setAttribute('id', userId)
      await call.on('stream', userVideoStream => {
        console.log('from calling')
        this.addVideoStream(video, userVideoStream)
      })
      await call.on('close', () => {
        console.log('from calling close')
        video.remove()
      })

      this.peers[userId] = call
    },


    go() {


      // const dataConnection = this.$peer.connect('newUser');
      // const peer = new Peer('pick-an-id', {
      //     host: '/',
      //     port: '3001'}
      // );
      // const conn = peer.connect('another-peers-id');
      // conn.on('open', () => {
      //
      //
      //     conn.send('hi!');
      // });

      // console.log('dataConnection', dataConnection)


      // this.$peer.on('open', function(id) {
      //
      //     console.log('id', id)
      //
      // });
    },

    addVideoStream(video, stream) {
      video.height = 300
      video.weight = 300
      const videoGrid = document.getElementById('video-grid')

      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })

      videoGrid.append(video)
    }
  }
}
</script>

<style>

/*#video-grid {*/
/*    display: grid;*/
/*    grid-template-columns: repeat(auto-fill, 300px);*/
/*    grid-auto-rows: 300px;*/
/*}*/


video {
  /*width: 100;*/
  /*height: 100%;*/
  margin: 1rem;
  /*padding: 3rem;*/
  display: block;
  object-fit: cover;
}

</style>