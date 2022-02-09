<template>
  <v-container>
    <h1>WebGL</h1>
    <div id="container"></div>
  </v-container>

</template>

<script>
// import * as THREE from '../../../../three.module';
// import * as THREE from "three";

export default {
  name: "Moclecule",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      geometry: null,
      material: null,
      html: ""
    }
  },

  mounted() {

  },

  methods: {}

}
</script>

<style scoped>

</style>