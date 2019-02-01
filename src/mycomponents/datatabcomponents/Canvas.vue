<template>
  <div ref="canvas" v-on:resize="handleResize()">
    <div v-if="spec.data.values.length !== 0 && spec.encoding.y.field && spec.encoding.x.field">
      <b-form-input id="visTitle" size="small" v-model.lazy="myTitle"></b-form-input>
      <!--Perhaps switch to the use of modals and then delete updateTitle, update watcher and sendNodeData-->
      <div id="vis"></div>
    </div>
    <div v-else-if="spec.description === 'histogram' && spec.encoding.x.field">
      <b-form-input id="visTitle" size="small" v-model.lazy="myTitle"></b-form-input>
      <!--Perhaps switch to the use of modals and then delete updateTitle, update watcher and sendNodeData-->
      <div id="vis"></div>
    </div>
    <b-button
      v-show="spec.encoding.x.field"
      size="md"
      variant="primary"
      class="float-right"
      v-on:click="sendNodeData"
    >Create Node</b-button>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";
import vegaEmbed from "vega-embed";
//import vegalite from 'vega-lite';
import NProgress from "nprogress";

export default {
  data() {
    return {
      myTitle: "Title",
      spec: {
        $schema: "https://vega.github.io/schema/vega-lite/v3.json",
        description: "Graph",
        data: {
          values: []
        },
        mark: "line",
        encoding: {
          x: { field: "", type: "" },
          y: { field: "", type: "" }
        }
      }
    };
  },
  created() {
    DataBus.$on("graphSchema", graphSpec => {
      //Receive the graph schema from selected graph component via DataBus
      this.spec = graphSpec;
      this.spec.width = this.$refs.canvas.clientWidth - 50;
    });
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    //vegaEmbed("#vis", this.spec , {defaultStyle: true, actions: {export: true, source:false, compiled:false, editor: false}});
  },
  updated() {
    this.renderVis(); //Initially, visualisation is not rendered in mounted() because spec is not yet populated with real data hence rendered in updated() after data selection
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // whenever the document is resized, re-set the 'clientWidth' variable and re-render visualisation
    handleResize(event) {
      this.spec.width = this.$refs.canvas.clientWidth - 50;
      this.renderVis();
    },
    renderVis() {
      //console.log(this.spec);
      vegaEmbed("#vis", this.spec, {
        defaultStyle: true,
        tooltip: true,
        actions: { export: true, source: false, compiled: false, editor: false }
      });
    },
    updateTitle() {
      this.myTitle = "Title";
    },
    sendNodeData() {
      NProgress.configure({ parent: "#idForProgressBar", showSpinner: false });
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 200);
      this.spec.myTitle = this.myTitle; //the object property, "myTitle" is not part of the spec. It's only used to send the title to GraphTab...
      // ...The spec property, "title" will be used instead when modals are used for title and axis labels update.
      DataBus.$emit("nodeData", this.spec);
      //console.log(this.spec);
    }
  },
  watch: {
    // Watch for change in spec properties and re-render visualisation
    spec: {
      handler() {
        this.renderVis();
      },
      deep: true //watches for changes in nested properties in spec
    },
    "spec.description"() {
      //watch for changes in spec.description
      this.updateTitle(); //Update title when spec description changes, triggered by selection of a different visualisation type
    },
    "spec.encoding.x.field"() {
      this.updateTitle(); //Update title when x-axis changes
    }
  }
};
</script>

<style scoped>
#visTitle {
  border: none;
  text-align: center;
  font-weight: bolder;
}
</style>


