<template>
  <v-container>
    <h1>Create Post view</h1>
    <div id="editor">
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
                    <textarea
                        cols="60"
                        rows="7"
                        placeholder="Post Markdown"
                        class="custom-textarea"
                        :value="input"
                        @input="update"></textarea>
        </v-col>


        <v-col
            cols="12"
            md="6"

        >
          <v-card>
            <v-card-title>Mark Down Preview</v-card-title>

            <div class="pa-4" v-html="compiledMarkdown"></div>
          </v-card>
        </v-col>
      </v-row>

      <v-file-input
          show-size
          label="File input"
          v-model="attachment"
      >

      </v-file-input>

    </div>

    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
          Post Type
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
            v-model="select"
            :hint="`${select.state}, ${select.abbr}`"
            :items="items"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
        ></v-select>
      </v-col>
    </v-row>

    <v-card v-if="select.abbr === 'assignment'">
      <v-card-title><h1>Pick A Due Data Time</h1></v-card-title>
      <v-row justify="space-around" class="pa-4">
        <v-date-picker v-model="picker"></v-date-picker>
        <v-time-picker
            v-model="timePicker"
            :landscape="$vuetify.breakpoint.smAndUp"

        ></v-time-picker>
      </v-row>
    </v-card>
    <div class="d-flex justify-end mt-6">
      <v-btn @click="submit" right color="primary">
        Submit Post
      </v-btn>
    </div>

  </v-container>
</template>

<script>
var _ = require('lodash');

import marked from 'marked';
import {mapGetters} from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      input: "",
      id: this.$route.params.id,
      class_name: this.$route.params.class_name,
      attachment: null,
      select: {state: 'Post', abbr: 'post'},
      items: [
        {state: 'Post', abbr: 'post'},
        {state: 'Assignment', abbr: 'assignment'},
        // { state: 'Nebraska', abbr: 'NE' },
        // { state: 'California', abbr: 'CA' },
        // { state: 'New York', abbr: 'NY' },
      ],

      data: new FormData(),

      // picker: new Date().toISOString().substr(0, 10),
      picker: null,
      timePicker: null,
      socket: null,
    }
  },

  created: function () {
    this.socket = new WebSocket('ws://localhost:8000/ws/room/' + this.id + '/');
    const id = this.id;
    this.socket.onopen = function (event) {
      console.log("ws connected CreatePost Stream..." + id)

      console.log(event)
    }

    this.socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log(data)
    }

    this.socket.onclose = function () {
      console.error('Chat socket closed unexpectedly');
    }
  },
  computed: {
    ...mapGetters('user', ['getUserId']),

    compiledMarkdown: function () {
      return marked(this.input, {sanitize: true});
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value;
    }, 300),

    submit() {
      // console.log(this.picker)
      // console.log(this.timePicker)

      // const id = this.$route.params.id
      // user = models.ForeignKey(User, on_delete=models.CASCADE)
      // course = models.ForeignKey(Course, on_delete=models.CASCADE)
      // context = models.CharField(max_length=500)
      // attachment = models.FileField(blank=True, null=True, upload_to='attachment/')
      // due_date = models.DateField(blank=True, null=True)
      // due_time = models.TimeField(blank=True, null=True)
      // type = models.CharField(choices=post_type, max_length=100)
      // created_at = models.DateTimeField(auto_now_add=True)
      // updated_at = models.DateTimeField(auto_now=True)
      // http://localhost:8000/api/post/create/
      console.log(this.picker);
      console.log(this.timePicker);


      this.data.append('user', this.getUserId)
      this.data.append('course', this.id)
      this.data.append('context', this.input)
      this.attachment !== null ? this.data.append('attachment', this.attachment) : ""
      this.picker !== null ? this.data.append('due_date', this.picker) : ""
      this.timePicker !== null ? this.data.append('due_time', this.timePicker) : ''
      this.data.append('type', this.select.abbr)


      // console.log(this.data)

      this.$axios.post('http://localhost:8000/api/post/create/', this.data,

          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
              // "Access-Control-Allow-Headers": "*",
              'content-type': 'multipart/form-data',
            }
          }
      ).then(res => {
        console.log(res)
        // this.$router.push({
        //     name: "ClassDetail",
        //     params: {class_name: this.class_name, id: this.id}
        // })
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        const message = {
          "message": "updated",
          "posted_by": this.getUserId
        }
        this.socket.send(JSON.stringify(message))
      })
    }
  }
}
</script>

<style scoped>
.custom-textarea {
  border: 1px solid #888;
}
</style>