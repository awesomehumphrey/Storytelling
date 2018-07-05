<template>
  <div ref="canvas" v-on:resize="handleResize()">
    <div v-if="this.spec.data.values.length !== 0 && this.spec.encoding.y.field && this.spec.encoding.x.field">
      <div id="vis"></div>
    </div>
    <div v-else-if="this.spec.description === 'histogram' && this.spec.encoding.x.field">
      <div id="vis"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';
import vegaEmbed from 'vega-embed';
//import vegalite from 'vega-lite';

export default{
  data () {
    return {
      spec: {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "description": "Graph",
        "data": {
        "values": [],
        },
        "mark": "line",
        "encoding": {
          "x": {"field": "", "type": ""},   
          "y": {"field": "", "type": ""}}
      }
    }
  },  
  created() {
    DataBus.$on('graphSchema', (graphSpec) => {  //Receive the graph schema from selected graph component via DataBus
      this.spec = graphSpec;
      this.spec.width = this.$refs.canvas.clientWidth - 50;
		});
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);   
    //vegaEmbed("#vis", this.spec , {defaultStyle: true, actions: {export: true, source:false, compiled:false, editor: false}});
  },
  updated () {
    this.renderVis(); //Initially, visualisation is not rendered in mounted() because spec is not yet populated with real data hence rendered in updated() after data selection
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // whenever the document is resized, re-set the 'clientWidth' variable and re-render visualisation
    handleResize(event) {
      this.spec.width = this.$refs.canvas.clientWidth - 50;
      this.renderVis();
    },
    renderVis() {
      //console.log(this.spec);
      vegaEmbed("#vis", this.spec , {defaultStyle: true, actions: {export: true, source:false, compiled:false, editor: false}});
    }
  },
   watch: { // Watch for change in spec properties and re-render visualisation
        spec:{ 
          handler() {
            this.renderVis();
          },
          deep: true      //watches for changes in nested properties    
        }
    } 
}

</script>

<style scoped>


</style>


