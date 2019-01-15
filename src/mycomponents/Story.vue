<template>
  <div id="pres">
  
    <div class="reveal">
      <div class="slides">
        <section>Gravity++: Telling stories with data...</section>
        <section :id="item" v-for="(item, index) in id" :key="index">{{item}}</section>
        <section>Thank you!</section>
      </div> <!--Move 'Thank you' to a different div before adding conditional statements-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";
import Reveal from "reveal.js/js/reveal";
import vegaEmbed from "vega-embed";

var myNodes = []; //To hold non-reactive array of objects(nodes) because reactive data doesn't work nicely with v-for directive in the template

export default {
  data() {
    return {
      id: []
    };
  },
  created() {
    DataBus.$on("nodeArray", this.getNodeArray); //receive connection/sequenced ordered node array from graph canvas and handle in a dedicated function
  },

  mounted() {
    Reveal.initialize({ transition: "zoom", embedded: true });
  },

  updated() {
    for (var i = 0; i < myNodes.length; i++) {
      myNodes[i].nData.title = myNodes[i].label; //Add graph title to graph spec
      vegaEmbed("#" + this.id[i], myNodes[i].nData, {
        defaultStyle: false,
        actions: false
      });
    }
  },

  methods: {
    getNodeArray(nodeArray) {
      //console.log(nodeArray);
      myNodes = JSON.parse(JSON.stringify(nodeArray)); //convert reactive array of objects to normal objects
      this.id = [];
      //generate ids for dynamic slide elements based on number of incoming graph nodes
      for (var i = 0; i < myNodes.length; i++) {
        this.id.push(
          "vis" +
            Math.random()
              .toString(36)
              .substr(2, 7)
        );
        //console.log(this.id[i]);
        //console.log(myNodes[i].nData);
      }
    }
  }
};
</script>

<style scoped>
/*@import url("/node_modules/reveal.js/css/reveal.css");
 @import url("/node_modules/reveal.js/css/theme/white.css"); */

#pres {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 70vh;
}
</style>