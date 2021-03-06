<template>
  <div ref="canvas" v-on:resize="handleResize()">
    <div
      v-if="spec.data.values.length !== 0 && spec.encoding.y.field 
    && spec.encoding.x.field && track == true"
    >
      <b-form-input id="visTitle" size="small" v-model.lazy="myTitle"></b-form-input>
      <!-- v-model.lazy v-if="spec.data.values.length !== 0 && spec.encoding.y.field 
      && spec.encoding.x.field"-->
      <!--Perhaps switch to the use of modals and then delete updateTitle, 
      update watcher and sendNodeData-->
      <div id="vis"></div>
    </div>
    <div v-else-if="spec.description === 'histogram' && spec.encoding.x.field">
      <b-form-input id="visTitle" size="small" v-model.lazy="myTitle"></b-form-input>
      <!--Perhaps switch to the use of modals and then delete updateTitle, 
      update watcher and sendNodeData-->
      <div id="vis"></div>
    </div>
    <!--Ensure there is an x-axis value and a graph has been selected before 
    showing button-->
    <b-button
      v-show="(spec.encoding.x.field && spec.description == 'histogram' && track == true) || 
      (spec.encoding.x.field && spec.encoding.y.field && spec.description != 'Graph' && track == true)"
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
      track: true,
      myWidth: 0,
      myTitle: "Title",
      spec: {
        $schema: "https://vega.github.io/schema/vega-lite/v3.json",
        description: "Graph",
        data: {
          values: []
        },
        mark: "line",
        encoding: {
          x: { aggregate: "", field: "", type: "" },
          y: { aggregate: "", field: "", type: "" },
          detail: { field: "", type: "nominal" },
          color: { field: "", type: "nominal" }
          // shape: { field: "", type: "nominal" }
        }
      }
    };
  },
  created() {
    DataBus.$on("graphSchema", graphSpec => {
      //Receive the graph schema from selected graph component via DataBus
      this.spec = graphSpec;
      this.spec.width = this.myWidth - 50;
      this.myTitle = "Title";
    });
    DataBus.$on("defaultTitle", defaultTitle => {
      //could have sent an "empty" event from axis component
      this.myTitle = "Title"; //defaultTitle
    });

    DataBus.$on("specFromGraphCanvas", this.handleSpecFromGraphCanvas);
    //New additions for updating select elements based on spec from graphtab minivis
    DataBus.$on("Y-axisValue", yAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["y"]["field"] = yAxisSelected;
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
    DataBus.$on("Colour", colour => {
      //Receive the colour value from Axis component via DataBus
      this.spec.encoding["color"]["field"] = colour;
    });
    DataBus.$on("Shape", shape => {
      //Receive the colour value from Axis component via DataBus
      //this.spec.encoding["shape"]["field"] = shape;
    });

    DataBus.$on("yAggregateValue", yAggregateValue => {
      this.spec.encoding["y"]["aggregate"] = yAggregateValue;
    });
    DataBus.$on("xAggregateValue", xAggregateValue => {
      this.spec.encoding["x"]["aggregate"] = xAggregateValue;
    });
    DataBus.$on("groupByValue", groupByValue => {
      this.spec.encoding["detail"]["field"] = groupByValue;
    });
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    //vegaEmbed("#vis", this.spec , {defaultStyle: true, actions: {export: true, source:false, compiled:false, editor: false}});
    this.$nextTick(() => {
      this.myWidth = this.$refs.canvas.clientWidth;
      this.spec.width = this.myWidth - 50;
      console.log(this.myWidth);
      this.renderVis();
    });
  },
  updated() {
    this.myWidth = this.$refs.canvas.clientWidth; //This is because when app is idle width becomes 0
    this.spec.width = this.myWidth - 50;
    this.renderVis(); //Initially, visualisation is not rendered in mounted()
    //because spec is not yet populated with real data hence rendered in updated() after data selection
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleSpecFromGraphCanvas(graphSpec) {
      //Receive the graph schema from miniVis from graph canvas via DataBus
      this.spec = graphSpec;
      console.log(this.$refs.canvas.clientWidth);
      this.spec.width = this.myWidth - 50;
      this.myTitle = graphSpec.myTitle;
      console.log(this.myWidth);
      this.renderVis();
    },
    // whenever the document is resized, re-set the 'clientWidth' variable and re-render visualisation
    handleResize(event) {
      this.myWidth = this.$refs.canvas.clientWidth;
      this.spec.width = this.myWidth - 50;
      this.renderVis();
    },
    renderVis() {
      //console.log(this.spec);
      vegaEmbed("#vis", this.spec, {
        defaultStyle: true,
        tooltip: true,
        actions: { export: true, source: false, compiled: false, editor: false }
      })
        .then(result => {
          this.track = true;
          console.log("success!");
        })
        .catch(error => {
          this.track = false;
          console.log("error!");
          console.log(error);
        });
    },
    sendNodeData() {
      this.$swal({
        position: "top",
        type: "success",
        title: "Node successfully created!",
        showConfirmButton: false,
        timer: 1500
      });
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
      handler(val) {
        this.renderVis();
      },
      deep: true //watches for changes in nested properties in spec
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


