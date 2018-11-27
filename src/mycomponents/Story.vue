<template>
  <div id="pres">
    <!-- <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="reveal">
      <div class="slides">
        <section>Single Horizontal Slide</section>
        <section>
          <section>Vertical Slide 1</section>
          <section>Vertical Slide 2</section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';
import Reveal from 'reveal.js/js/reveal';
export default {
  created() {
    DataBus.$on('nodeArray', this.getNodeArray);  //receive connection/sequenced ordered node array from graph canvas and handle in a dedicated function
  },

  mounted() {
    Reveal.initialize()
  },

  methods: {
    getNodeArray(nodeArray) {
      console.log(nodeArray);
    }
  }
}
</script>

<style scoped>
/* @import url('/node_modules/reveal.js/css/reveal.css');
@import url('/node_modules/reveal.js/css/theme/white.css'); */

#pres {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 70vh;
}

</style>