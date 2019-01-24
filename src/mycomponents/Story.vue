<template>
  <div>
    <b-row>
      <b-col col lg="2" id="storyOps"></b-col>
      <b-col col lg="9.5" class="storySections">
        <b-row>
          <b-col col lg="9.5">
            <div id="pres" ref="bar" v-on:resize="handleResize()">
              <div class="reveal">
                <div class="slides">
                  <section>Gravity++: Telling stories with data...</section>
                  <section :id="item" v-for="(item, index) in id" :key="index">{{item}}</section>
                  <section>Thank you!</section>
                </div>
                <!--Move 'Thank you' to a different div before adding conditional statements or render it dynamically like the charts-->
              </div>
            </div>
          </b-col>
          <b-col col lg="2" id="presOps"></b-col>
        </b-row>
      </b-col>
    </b-row>
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
    Reveal.initialize({
      transition: "zoom",
      embedded: true,
      margin: 0,
      minScale: 1,
      maxScale: 1
    });
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("load", this.handleLoad);
    });
  },
  updated() {
    //this.renderVisStory();
    this.handleLoad();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.addEventListener("load", this.handleLoad);
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
    },
    renderVisStory() {
      for (var i = 0; i < myNodes.length; i++) {
        myNodes[i].nData.title = myNodes[i].label; //Add graph title to graph spec
        vegaEmbed("#" + this.id[i], myNodes[i].nData, {
          defaultStyle: false,
          actions: false
        });
      }
    },
    handleResize(event) {
      //console.log(this.$refs.bar.clientWidth);
      for (var i = 0; i < myNodes.length; i++) {
        if (this.$refs.bar.clientWidth >= 1000) {
          myNodes[i].nData.width = this.$refs.bar.clientWidth - 360;
        } else {
          myNodes[i].nData.width = this.$refs.bar.clientWidth - 160;
        }
      }
      this.renderVisStory();
    },
    handleLoad(event) {
      for (var i = 0; i < myNodes.length; i++) {
        myNodes[i].nData.width = document.documentElement.clientWidth / 2 + 40;
      }
      this.renderVisStory();
      //console.log(event.currentTarget.innerWidth / 2 + 40);
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
  /* margin-top: 60px; height: 70vh; */
  height: 100%;
  border: 1px solid grey;
  border-radius: 2px;
  margin-top: 0px; /* Perhaps remove all margins when no longer using revealjs */
  margin-left: -15px;
  margin-right: -15px;
  /* margin-bottom: 5px; */
  /*  min-height: 600px; */
}

#storyOps {
  margin: 5px;
  min-height: 600px;
  border: 1px solid grey; /* border: 1px solid grey; */
  border-radius: 2px;
  background-color: #f1f1f1;
  max-width: 250px;
}
#presOps {
  margin: 1px;
  min-height: 600px;
  border: 1px solid grey; /* border: 1px solid grey; */
  border-radius: 2px;
  background-color: #f1f1f1;
  /* max-width: 300px; */
}
.storySections {
  margin: 5px;
  min-height: 600px;
  border: 1px solid grey; /* border: 1px solid grey; */
  border-radius: 2px;
}
</style>