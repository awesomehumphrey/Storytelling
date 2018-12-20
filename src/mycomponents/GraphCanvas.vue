<template>
  <div ref="graphCanvas">
    <div ref="graphVis" id="graphVis" class="vis-network">Testing</div>
    <b-button v-show="nodeCount!=0" size="md" variant="primary" class="float-right" @click="prepareAndSendData">Done</b-button>

   <!--<b-button size="md" variant="primary" class="float-left">Import</b-button>
    <b-button size="md" variant="primary" class="float-left">Export</b-button> -->
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";
import vis from "vis";

var nodes = new vis.DataSet([
  /* { id: 0, index: 0, label: '0', x: -147, y: -77 },
    { id: 1, index: 1, label: '1', x: -186, y: 88 },
    { id: 2, index: 2, label: '2', x: 8, y: 160 },
    { id: 3, index: 3, label: '3', x: 159, y: 28 },
    { id: 4, index: 4, label: '4', x: 45, y: -111 } */
]);

var edges = new vis.DataSet([
  /* { from: 0, to: 1, id: 99},
    { from: 0, to: 1, id: 1},
    { from: 0, to: 2, id: 2 },
    { from: 0, to: 3, id: 3 },
    { from: 0, to: 4, id: 4},
    { from: 0, to: 4 , id: 5},
    { from: 1, to: 2, id: 6},
    { from: 1, to: 3 , id: 7},
    { from: 1, to: 3 , id: 8},
    { from: 2, to: 3 , id: 9},
    { from: 2, to: 4 , id: 10},
    { from: 3, to: 4 , id: 11} */
]);

// provide the data in the vis format:
var data = {
  nodes: nodes,
  edges: edges
};

var locales = {
  en: {
    edit: "Edit",
    del: "Delete selected",
    back: "Back",
    addNode: "Add Node",
    addEdge: "Add Edge",
    editNode: "Edit Node",
    editEdge: "Edit Edge",
    addDescription: "Click in an empty space to place a new node.",
    edgeDescription:
      "Click on a node and drag the edge to another node to connect them.",
    editEdgeDescription:
      "Click on the control points and drag them to a node to connect to it.",
    createEdgeError: "Cannot link edges to a cluster.",
    deleteClusterError: "Clusters cannot be deleted.",
    editClusterError: "Clusters cannot be edited."
  }
};

var options = {
  autoResize: true,
  width: "99%",
  height: "99%",
  locale: "en",
  locales: locales,
  layout: {
    improvedLayout: true
  },
  interaction: {
    hover: true,
    dragView: true,
    zoomView: false
  },
  manipulation: {
    enabled: true,
    initiallyActive: true,
    /* addNode(nodeData, callback) {
            DataBus.$emit('add-node', nodeData);
        callback(nodeData);
        }, */
    addNode: false,
    addEdge(edgeData, callback) {
      if (edgeData.from === edgeData.to) {
        alert("You cannot connect the node to itself!");
      } else {
        DataBus.$emit("add-edge", edgeData);
        callback(edgeData);
      }
    },
    deleteNode(deleteData, callback) {
      DataBus.$emit("delete-node", deleteData);
      callback(deleteData);
    },
    deleteEdge(deleteData, callback) {
      DataBus.$emit("delete-edge", deleteData);
      callback(deleteData);
    }
  },
  nodes: {
    borderWidth: 1,
    shape: "ellipse",
    size: 35,
    shadow: true,
    shape: "circularImage",
    physics: false
  },
  edges: {
    arrows: "to",
    font: "12px arial #ff0000"
  }
};

export default {
  data() {
    return {
      network: null,
      container: "",
      nodeCount: 0,
      edgeCount: 0,
      newNode: {
        id: 0,
        index: 0,
        label: "",
        title: "",
        nData: null,
        x: 0,
        y: 0,
        image: null
      }
    };
  },
  created() {
    DataBus.$on("add-node", this.addNode);
    DataBus.$on("delete-node", this.deleteNode);
    DataBus.$on("add-edge", this.addEdge);
    DataBus.$on("delete-edge", this.deleteEdge);
    DataBus.$on("nodeData", this.visNodeData);
  },
  mounted() {
    this.container = this.$refs.graphVis;
    /* var data = {
            nodes: this.nodes,
            edges: this.edges
        }; */
    window.network = new vis.Network(this.container, data, options);
  },
  beforeDestroy() {
    DataBus.$off("add-node", this.addNode);
    DataBus.$off("delete-node", this.deleteNode);
    DataBus.$off("add-edge", this.addEdge);
    DataBus.$off("delete-edge", this.deleteEdge);
    DataBus.$off("nodeData", this.visNodeData);
  },
  methods: {
    /* addNode(nodeData) {
            nodes.update(nodeData)
    	    console.log(nodeData);
            console.log(nodes);
        }, */

    deleteNode(deleteData) {
      console.log(nodes);
    },

    addEdge(edgeData) {
      //var nodeOne = nodes.get(edgeData.from);
      //var nodeTwo = nodes.get(edgeData.to);

      edgeData.id = this.edgeCount;
      this.edgeCount++;
      edges.update(edgeData);
      //console.log(edgeData);
      //console.log(edges); //all attributes of edges object
      console.log(edges._data); //only data attribute of edges object
    },

    deleteEdge(deleteData) {
      console.log(edges);
    },
    visNodeData(nodeData) {
      this.newNode.id = this.nodeCount;
      this.newNode.index = this.nodeCount;
      this.newNode.nData = nodeData;
      this.newNode.title = nodeData.myTitle; //newnode.title is for the visjs tooltip and different from vega spec.title
      this.newNode.label = nodeData.myTitle; //newnode.title is for the visjs tooltip and different from vega spec.title
      this.newNode.x = 800; // x coordinate on the screen
      this.newNode.y = 250; // y coordinate on the screen

      switch (
        nodeData.description //select node image based on the graph type
      ) {
        case "barChart":
          this.newNode.image = require("@/assets/bar.png");
          break;
        case "scatterplot":
          this.newNode.image = require("@/assets/scatterplot.png");
          break;
        case "lineGraph":
          this.newNode.image = require("@/assets/linegraph.png");
          break;
        case "areaChart":
          this.newNode.image = require("@/assets/areachart.png");
          break;
        case "histogram":
          this.newNode.image = require("@/assets/histogram.png");
          break;
        case "punchCard":
          this.newNode.image = require("@/assets/punchcard.png");
          break;
        default:
          this.newNode.image = require("@/assets/logo.png");
      }
      this.nodeCount++;
      nodes.update(this.newNode);
      //console.log(nodes);    //All attributes of nodes object
      console.log(nodes._data); //Only data attribute of nodes object
    },
    // me() { //test function to add new node to graph canvas
    //     var a = { id: 14, index: 14, label: 14, testing: {a:5}}
    //     nodes.update(a)
    //     console.log(nodes);
    // },

    prepareAndSendData() {
      //NOTE-Important: the derived variables from the main nodes and edges variables are reactive and also automatically update their base variables from which they were assigned
      var prepEdges = edges._data;
      var edgeArray = [];
      var nodeArray = [];
      for (var key in prepEdges) {
        //create array of 'from' and 'to' from edges object
        //delete prepEdges[key].id;  //delete all id property of edges
        edgeArray.push(prepEdges[key].from);
        edgeArray.push(prepEdges[key].to);
      }
      //console.log(edgeArray);
      edgeArray = [...new Set(edgeArray)]; //deduplicate array using set and keep original order/direction of connection
      console.log(edgeArray);

      nodeArray = Object.values(nodes._data); //convert object of objects to array of objects
      //console.log(nodeArray);

      nodeArray = this.mapOrder(nodeArray, edgeArray, "id"); //Sort nodeArray of objects based on the order of edgeArray using id as key
      console.log(nodeArray);

      //send array of node objects containing graphschema with the connection order preserved to storytab
      DataBus.$emit("nodeArray", nodeArray);
    },

    mapOrder(array, order, key) {
      array.sort(function(a, b) {
        var A = a[key],
          B = b[key];

        if (order.indexOf(A) > order.indexOf(B)) {
          return 1;
        } else {
          return -1;
        }
      });

      return array;
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css");
#graphVis {
  min-width: 500px;
  min-height: 600px;
  border: 1px solid lightgray;
}
.vis-network {
  height: 600px;
  min-width: 500px;
}
</style>