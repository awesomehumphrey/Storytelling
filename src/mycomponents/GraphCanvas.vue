<template>
  <div ref="graphCanvas" id="graphCa">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >
    <b-row>
      <b-col col lg="2" class="graphOps">
        <b-card
          header-bg-variant="info"
          header-text-variant="white"
          header="File"
          header-class="text-center"
          style="height: 35%; margin-bottom: 5px; background-color: #f1f1f1;"
        >
          <app-graphimport></app-graphimport>
          <app-graphexport @clickedExport="exportNetwork()"></app-graphexport>
        </b-card>
        <b-card
          header-bg-variant="info"
          header-text-variant="white"
          header="Recommendation"
          header-class="text-center"
          style="height: 63%; width: 100%; background-color: #f1f1f1;"
        >
          <app-recommendsequence @clickedRecommendSequence="recommend()"></app-recommendsequence>
          <div id="sequenceInfo">
            <b-list-group>
              <!-- <b-list-group-item
              id="ts"
              class="d-flex justify-content-between align-items-center"
            ># of recommendations
              <b-badge variant="primary" pill>{{totalRecommendation}}</b-badge>
              </b-list-group-item>-->
              <b-list-group-item
                id="sp"
                class="d-flex justify-content-between align-items-center"
              >Sequence position
                <b-badge variant="primary" pill>{{seqCounter}} of {{totalRecommendation}}</b-badge>
              </b-list-group-item>
              <b-list-group-item
                id="tc"
                class="d-flex justify-content-between align-items-center"
              >Sequence cost
                <b-badge variant="primary" pill>{{sequenceCost}}</b-badge>
              </b-list-group-item>
            </b-list-group>
            <!-- <b-popover
            :target="'ts'"
            :placement="'top'"
            title="Number of recommendations"
            triggers="hover"
            :content="'Number of recommended sequences. This number increases exponentially with more visualisation nodes. Total cost of transitioning between each pair of adjacent charts'"
            ></b-popover>-->
            <b-popover
              :target="'sp'"
              :placement="'top'"
              title="Sequence position"
              triggers="hover"
              :content="'The current sequence index. Sequence cost increases as this number increases.'"
            ></b-popover>
            <b-popover
              :target="'tc'"
              :placement="'top'"
              title="Sequence cost"
              triggers="hover"
              :content="'Total sequence cost. Effective sequences have smaller costs.'"
            ></b-popover>
          </div>
          <div ref="miniVis" :style="miniVisStyleObject">
            <div id="miniVis"></div>
            <b-button
              size="sm"
              style="border-radius: 25px;"
              variant="primary"
              @click="sendSpecDataTab()"
            >Show in DataTab</b-button>
          </div>
          <div style="display: table;  margin: 0 auto;">
            <app-previoussequence class="prevNext" @clickedPrevious="previousSequence()"></app-previoussequence>
            <app-nextsequence class="prevNext" @clickedNext="nextSequence()"></app-nextsequence>
          </div>
          <!--  <hr> -->
        </b-card>
      </b-col>
      <b-col col lg="9.5" id="section2">
        <b-row>
          <b-col col lg="9" id="section3" :style="canvasStyleObject">
            <div ref="graphVis" id="graphVis" class="vis-network"></div>
          </b-col>
          <b-col col lg="2.5" id="section4">
            <!-- <b-card-group deck> -->
            <b-card
              header-bg-variant="info"
              header-text-variant="white"
              header="Notes"
              :title="speakerNoteTitle"
              title-tag="h6"
              class="text-center"
              style="min-height: 50%; margin-bottom: 5px; background-color: #f1f1f1;"
            >
              <b-form-textarea
                v-model.lazy="notes"
                no-resize
                :rows="3"
                :max-rows="3"
                placeholder="Enter speaker notes here"
              ></b-form-textarea>
              <b-button
                class="float-left"
                size="sm"
                variant="outline-info"
                title="Save notes"
                @click="saveNotes()"
              >Save</b-button>
              <b-button
                class="float-right"
                size="sm"
                variant="outline-warning"
                title="Clear notes"
                @click="clearNotes()"
              >clear</b-button>
              <!-- <button class="btn btn-primary btn-sm float-left" title="Save notes">Save</button>
              <button class="btn btn-warning btn-sm float-right" title="Clear notes">clear</button>-->
            </b-card>
            <b-card
              header-bg-variant="info"
              header-text-variant="white"
              header="Operations"
              class="text-center"
              style="min-height: 48%; background-color: #f1f1f1;"
            >
              <app-restoredefaultnodes @clickedRestoreDefaultNodes="clearNodes()"></app-restoredefaultnodes>
              <app-restoredefaultedges @clickedRestoreDefaultEdges="clearEdges()"></app-restoredefaultedges>
              <app-sendtostory @clickedDone="prepareAndSendData()"></app-sendtostory>
            </b-card>
            <!-- </b-card-group> -->
          </b-col>
          <!-- <b-button v-show="nodeCount!=0" size="md" variant="primary" class="float-right" @click="prepareAndSendData">Done</b-button> -->
          <!-- <b-button v-show="nodeCount!=0" size="md" variant="primary" class="float-left">Next Sequence</b-button> -->
          <!--<b-button size="md" variant="primary" class="float-left">Import</b-button>
          <b-button size="md" variant="primary" class="float-left">Export</b-button>-->
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */
import GraphImport from "@/mycomponents/graphtabcomponents/GraphImport";
import GraphExport from "@/mycomponents/graphtabcomponents/GraphExport";
import SendToStory from "@/mycomponents/graphtabcomponents/SendToStory";
import RecommendSequence from "@/mycomponents/graphtabcomponents/RecommendSequence";
import RestoreDefaultEdges from "@/mycomponents/graphtabcomponents/RestoreDefaultEdges";
import RestoreDefaultNodes from "@/mycomponents/graphtabcomponents/RestoreDefaultNodes";
import NextSequence from "@/mycomponents/graphtabcomponents/NextSequence";
import PreviousSequence from "@/mycomponents/graphtabcomponents/PreviousSequence";

import { DataBus } from "@/main";
import vis from "vis";
import { saveAs } from "file-saver";

import myWorker from "@/my-worker";
import NProgress from "nprogress";
import vegaEmbed from "vega-embed";

var gs = require("@/graphscape-master/graphscape.js");
//var gs = require("C:/Users/hobie/Desktop/graphscape-master/graphscape.js");

var sequenceOptions = { fixFirst: false };
var sequenceArray = [];

//console.log(gs.sequence(charts, sequenceOptions));

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
    font: "12px arial #ff0000",
    physics: true,
    smooth: {
      enabled: true,
      type: "cubicBezier",
      forceDirection: "vertical",
      roundness: 0.5
    }
  } /*,
  physics: {
    enabled: true,
    barnesHut: {
      gravitationalConstant: -2000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 1
    },
     repulsion: {
      nodeDistance: 0,
      centralGravity: 1
    },
    hierarchicalRepulsion: {
      centralGravity: 0.9,
      springLength: 100,
      springConstant: 0.01,
      nodeDistance: 0,
      damping: 0.09
    }, 
    stabilization: true
  }*/
};

export default {
  components: {
    "app-graphimport": GraphImport,
    "app-graphexport": GraphExport,
    "app-sendtostory": SendToStory,
    "app-recommendsequence": RecommendSequence,
    "app-restoredefaultedges": RestoreDefaultEdges,
    "app-restoredefaultnodes": RestoreDefaultNodes,
    "app-nextsequence": NextSequence,
    "app-previoussequence": PreviousSequence
  },
  data() {
    return {
      canvasStyleObject: {
        "z-index": 0
      },
      speakerNoteTitle: "Graph title",
      notes: "",
      miniVisStyleObject: {
        "border-radius": "25px",
        "z-index": "1",
        position: "fixed",
        display: "none",
        border: "2px solid grey",
        background: "white"
      },
      resultNode: null,
      myScreenWidth: 0,
      network: null,
      container: "",
      nodeCount: 0, //this should be set to 0 and not 1
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
      },
      seqCounter: 0,
      transitionCost: 0,
      sequenceCost: 0,
      totalRecommendation: 0
    };
  },
  created() {
    DataBus.$on("add-node", this.addNode);
    DataBus.$on("delete-node", this.deleteNode);
    DataBus.$on("add-edge", this.addEdge);
    DataBus.$on("delete-edge", this.deleteEdge);
    DataBus.$on("nodeData", this.visNodeData);
    DataBus.$on("gData", this.importNetwork);
  },
  mounted() {
    this.container = this.$refs.graphVis;
    /* var data = {
            nodes: this.nodes,
            edges: this.edges
        }; */
    window.network = new vis.Network(this.container, data, options);
    /* network.on("hoverNode", function(bar) {
      //using events handlers...Should this be in mounted hook or updated?
      console.log(bar);
    }); */
    const networkThis = this; //because of conflicting scope of 'this'
    network.on("doubleClick", function(params) {
      //Use doubleclick instead of click because click should allow user delete node from canvas
      // click event - your element, edge or node
      // set the popup position by getting the params.pointer attr
      // handle the toggle behavior
      networkThis.myScreenWidth = document.documentElement.clientWidth; //Get the width of the device screen
      console.log(params);
      console.log(params.nodes[0]);
      //networkThis.$refs.miniVis.style.position = "absolute";
      networkThis.$refs.miniVis.style.left = params.pointer.DOM.x + 50 + "px";
      networkThis.$refs.miniVis.style.top = params.pointer.DOM.y - 50 + "px";
      networkThis.miniVisStyleObject.height =
        networkThis.myScreenWidth / 7 + "px";
      networkThis.miniVisStyleObject.width =
        networkThis.myScreenWidth / 5 + "px";
      networkThis.miniVisStyleObject.display = "block";

      if (params.nodes[0]) {
        //Check to see if a node is present before calling function
        networkThis.resultNode = networkThis.getNodeDetails(params.nodes[0]);
        networkThis.renderMiniVis(
          networkThis.resultNode,
          networkThis.myScreenWidth
        );
        //Dynamically update speakerNotes titles and notes
        networkThis.speakerNoteTitle = networkThis.resultNode.title;
        networkThis.notes = networkThis.resultNode.notes;
        //networkThis.resultNode.notes = networkThis.notes;
      } else {
        networkThis.miniVisStyleObject.display = "none";
      }
    });
    network.on("selectNode", function(params) {
      if (params.nodes[0]) {
        //Check to see if a node is present before calling function
        networkThis.resultNode = networkThis.getNodeDetails(params.nodes[0]);
        //Dynamically update speakerNotes titles and notes
        networkThis.speakerNoteTitle = networkThis.resultNode.title;
        networkThis.notes = networkThis.resultNode.notes;
      }
    });

    network.on("deselectNode", function(params) {
      networkThis.miniVisStyleObject.display = "none";
      networkThis.resultNode = null;
      console.log(params);
    });
  },
  beforeDestroy() {
    DataBus.$off("add-node", this.addNode);
    DataBus.$off("delete-node", this.deleteNode);
    DataBus.$off("add-edge", this.addEdge);
    DataBus.$off("delete-edge", this.deleteEdge);
    DataBus.$off("nodeData", this.visNodeData);
    DataBus.$off("gData", this.importNetwork);
  },
  methods: {
    /* addNode(nodeData) {
            nodes.update(nodeData)
    	    console.log(nodeData);
            console.log(nodes);
        }, */

    deleteNode(deleteData) {
      this.miniVisStyleObject.display = "none";
      this.speakerNoteTitle = "Graph title";
      this.notes = "No notes.";
      this.resultNode = null;
      console.log(nodes);
    },

    addEdge(edgeData) {
      //var nodeOne = nodes.get(edgeData.from);
      //var nodeTwo = nodes.get(edgeData.to);
      //edgeData.id = this.edgeCount;  //This is commented so visjs can assign a random uuid
      this.edgeCount++;
      edges.update(edgeData);
      console.log(edgeData);
      console.log(edges);
      console.log(edges._data); //only data attribute of edges object
    },

    deleteEdge(deleteData) {
      this.miniVisStyleObject.display = "none";
      l;
      console.log(deleteData);
      console.log(edges);
    },
    visNodeData(nodeData) {
      //this.newNode.id = this.nodeCount; //This line is commented so as to use system time to generate id...
      //...else when a .gty file is imported, newly created node clashes/overrides nodes from .gty file.
      var dt = new Date();
      this.newNode.id =
        dt.getYear() +
        dt.getDay() +
        dt.getMonth() +
        dt.getHours() +
        dt.getMinutes() +
        dt.getSeconds() +
        dt.getMilliseconds();
      //this.newNode.id = this.nodeCount; //this is for testing
      this.newNode.index = this.nodeCount;
      this.newNode.nData = nodeData;
      this.newNode.title = nodeData.myTitle; //newnode.title is for the visjs tooltip and different from vega spec.title
      this.newNode.label = nodeData.myTitle; //newnode.title is for the visjs tooltip and different from vega spec.title
      this.newNode.x = this.getRandomNum(200, 800); // Former default 800 x coordinate on the screen
      this.newNode.y = this.getRandomNum(150, 450); // Former default 250 y coordinate on the screen
      this.newNode.notes = "No notes.";

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

      //console.log(this.newNode);
      nodes.update(JSON.parse(JSON.stringify(this.newNode))); //use nodes.add instead of nodes.update
      //console.log(nodes);    //All attributes of nodes object
      console.log(nodes._data); //Only data attribute of nodes object
    },
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    },

    // me() { //test function to add new node to graph canvas
    //     var a = { id: 14, index: 14, label: 14, testing: {a:5}}
    //     nodes.update(a)
    //     console.log(nodes);
    // },
    saveNotes() {
      if (this.resultNode) {
        NProgress.configure({
          parent: "#idForProgressBar",
          showSpinner: false
        });
        NProgress.start();
        setTimeout(() => {
          NProgress.done();
        }, 200);
        this.resultNode.notes = this.notes;
        nodes.update(this.resultNode);
        console.log(this.resultNode.notes);
        this.miniVisStyleObject.display = "none";
      } else {
        alert("Please select a node before you write your notes!");
      }
    },
    clearNotes() {
      if (this.resultNode) {
        if (confirm("Please confirm to clear notes.")) {
          NProgress.configure({
            parent: "#idForProgressBar",
            showSpinner: false
          });
          NProgress.start();
          setTimeout(() => {
            NProgress.done();
          }, 200);
          this.notes = "No notes.";
          this.resultNode.notes = this.notes;
          nodes.update(this.resultNode);
          console.log(this.resultNode.notes);
          this.miniVisStyleObject.display = "none";
        }
      } else {
        alert("Please select a node to clear!");
      }
    },
    getNodeDetails(item) {
      var localNode;
      var myNodes = JSON.parse(JSON.stringify(nodes._data)); //convert reactive object of objects to normal objects
      myNodes = Object.values(myNodes); //convert object of objects to array of objects
      for (var key in myNodes) {
        //search for node id in myNodes and assign its spec to result
        if (myNodes[key].id == item) {
          localNode = myNodes[key];
          return localNode;
        }
      }
    },

    renderMiniVis(node, screenSize) {
      node.nData.height = screenSize / 7; //7
      node.nData.width = screenSize / 6; //6
      node.nData.title = node.nData.myTitle;
      if (node) {
        vegaEmbed("#miniVis", node.nData, {
          defaultStyle: false,
          actions: false
        });
      }
    },
    sendSpecDataTab() {
      NProgress.configure({ parent: "#idForProgressBar", showSpinner: false });
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 200);
      delete this.resultNode.nData.title;
      this.resultNode.nData.height = 380;
      this.resultNode.nData.width = 650;
      DataBus.$emit("specFromGraphCanvas", this.resultNode.nData);
      DataBus.$emit("sendToDataTabEvent"); //capture this event and send to tab, axis and other selections components
      this.miniVisStyleObject.display = "none";
      //console.log(this.resultNode);
    },
    recommend() {
      document.getElementById("graphVis").childNodes[0].style.zIndex = -1; //There's a child node with similar vis-network class in graphVis created by visjs
      this.$refs.graphVis.style.background = "rgba(0,24,72,0.20)";
      NProgress.configure({ parent: "#section3", showSpinner: true });
      NProgress.start(); // start progress bar here and end after worker ends

      //console.log(nodes._data);
      edges.clear(); //clear edges before recommending
      this.reInitialiseSeqParam();
      var chartSpec = [];
      var nonReactive = JSON.parse(JSON.stringify(nodes._data)); //convert reactive object of objects to normal objects
      var chartData = Object.values(nonReactive); //convert object of objects to array of objects
      // console.log(chartData[0].nData);
      //console.log(chartData[1].nData);
      //console.log(chartData[2].nData);
      for (var i = 0; i < chartData.length; i++) {
        //chartData[i].nData.data = { url: "data/cars.json" };
        //tooltip is deleted because it causes error with graphscape
        delete chartData[i].nData.encoding.tooltip;
        //The other objects data below are deleted for graphscape optimisation purposes
        delete chartData[i].nData.data;
        delete chartData[i].nData.description;
        delete chartData[i].nData.$schema;
        delete chartData[i].nData.autosize;
        delete chartData[i].nData.height;
        delete chartData[i].nData.width;
        delete chartData[i].nData.myTitle;
        chartSpec.push(chartData[i].nData);
        chartSpec[i].id = chartData[i].id; //assigning id from the node object to graphspec object
      }
      //sequenceArray = gs.sequence(chartSpec, sequenceOptions); //use workers/threads instead for performance and to prevent UI freezing
      var dataForWorkers = [];
      dataForWorkers.push(chartSpec);
      dataForWorkers.push(sequenceOptions);
      myWorker
        .send(dataForWorkers)
        .then(reply => {
          // Handle the reply
          //console.log(reply);
          document.getElementById("graphVis").childNodes[0].style.zIndex = 1;
          this.$refs.graphVis.style.background = "white";
          NProgress.done();
          sequenceArray = reply;
          if (sequenceArray.length > 1) {
            this.displaySequence(sequenceArray[0]);
            this.seqCounter = 1;
            this.transitionCost = sequenceArray[0].sumOfTransitionCosts;
            this.sequenceCost = +sequenceArray[0].sequenceCost.toFixed(2); //truncate to 2 decimal places
            this.totalRecommendation = sequenceArray.length;
          }
        })
        .catch(error => {
          // Handle the error
          NProgress.done();
          console.log(error);
        });
      //console.log(sequenceArray[0].charts);
      //console.log(sequenceArray);
      //console.log(chartSpec);
    },
    reInitialiseSeqParam() {
      this.seqCounter = 0;
      this.transitionCost = 0;
      this.sequenceCost = 0;
      this.totalRecommendation = 0;
      sequenceArray = [];
      this.miniVisStyleObject.display = "none";
    },
    clearNodes() {
      //Check if there are nodes to clear before confirmation box
      if (Object.keys(nodes._data).length == 0) {
        alert("There are no nodes to clear!");
      } else if (confirm("Confirm to clear nodes!")) {
        nodes.clear();
        this.reInitialiseSeqParam();
        //console.log(nodes._data);
      }
    },
    clearEdges() {
      //Check if there are edges to clear before confirmation box
      if (Object.keys(edges._data).length == 0) {
        alert("There are no edges to clear!");
      } else if (confirm("Confirm to clear edges!")) {
        edges.clear();
        this.reInitialiseSeqParam();
        //console.log(edges._data);
      }
    },
    nextSequence() {
      if (sequenceArray.length > 1 && this.seqCounter < sequenceArray.length) {
        this.seqCounter++;
        this.displaySequence(sequenceArray[this.seqCounter - 1]);
      }
    },
    previousSequence() {
      if (sequenceArray.length !== 0 && this.seqCounter > 1) {
        this.seqCounter--;
        this.displaySequence(sequenceArray[this.seqCounter - 1]);
      }
    },
    displaySequence(mySeqArray) {
      edges.clear(); //clear edges before recommending
      var len = mySeqArray.charts.length;
      this.transitionCost = mySeqArray.sumOfTransitionCosts;
      this.sequenceCost = +mySeqArray.sequenceCost.toFixed(2);
      this.totalRecommendation = sequenceArray.length;
      var arr = [];
      for (var i = 1; i < len - 1; i++) {
        //The counter starts from 1 because when options-fixfirst is false(in the graphscape API), the index 0 is a null chart
        //console.log(sequenceArray[0].charts[i]);
        var tempObj = {};
        tempObj.from = mySeqArray.charts[i].id;
        tempObj.to = mySeqArray.charts[i + 1].id;
        arr.push(tempObj);
      }
      console.log(arr);
      //var edgeObj = [{ from: 1, to: 2, id: 74 }, { from: 0, to: 1, id: 75 }];
      edges.update(arr);
      console.log(edges._data);
    },
    prepareAndSendData() {
      NProgress.configure({ parent: "#idForProgressBar", showSpinner: false });
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
      }, 200);
      //NOTE-Important: the derived variables from the main nodes and edges variables are reactive and also automatically update their base variables from which they were assigned
      var prepEdges = edges._data;
      var nodeArray = [];
      var grandEdgeArray = [];
      for (var key in prepEdges) {
        var edgeArray = [];
        //create array of 'from' and 'to' from edges object
        //delete prepEdges[key].id;  //delete all id property of edges
        edgeArray.push(prepEdges[key].from);
        edgeArray.push(prepEdges[key].to);
        grandEdgeArray.push(edgeArray);
      }

      console.log(grandEdgeArray);
      grandEdgeArray = this.tsort(grandEdgeArray);

      console.log(grandEdgeArray);

      nodeArray = Object.values(nodes._data); //convert object of objects to array of objects
      //console.log(nodeArray);

      nodeArray = this.mapOrder(nodeArray, grandEdgeArray, "id"); //Sort nodeArray of objects based on the order of edgeArray using id as key
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
    },
    tsort(edges) {
      var nodes = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
        sorted = [], // sorted list of IDs ( returned value )
        visited = {}; // hash: id of already visited node => true

      var Node = function(id) {
        this.id = id;
        this.afters = [];
      };

      // 1. build data structures
      edges.forEach(function(v) {
        var from = v[0],
          to = v[1];
        if (!nodes[from]) nodes[from] = new Node(from);
        if (!nodes[to]) nodes[to] = new Node(to);
        nodes[from].afters.push(to);
      });

      // 2. topological sort
      Object.keys(nodes).forEach(function visit(idstr, ancestors) {
        var node = nodes[idstr],
          id = node.id;

        // if already exists, do nothing
        if (visited[idstr]) return;

        if (!Array.isArray(ancestors)) ancestors = [];

        ancestors.push(id);

        visited[idstr] = true;

        node.afters.forEach(function(afterID) {
          if (ancestors.indexOf(afterID) >= 0)
            // if already in ancestors, a closed chain exists.
            throw new Error("closed chain : " + afterID + " is in " + id);

          visit(
            afterID.toString(),
            ancestors.map(function(v) {
              return v;
            })
          ); // recursive call
        });

        sorted.unshift(id);
      });

      return sorted;
    },
    exportNetwork() {
      //var nonReactive = JSON.parse(JSON.stringify(nodes._data)); //convert reactive object of objects to normal objects
      //var dataForExport = Object.values(nonReactive); //convert object of objects to array of objects

      /* for (var i = 0; i < dataForExport.length; i++) {
        delete dataForExport[i].image;
      } */
      var nodesToExport = JSON.parse(JSON.stringify(nodes._data)); //convert reactive object of objects to normal objects
      nodesToExport = Object.values(nodesToExport); //convert object of objects to array of objects

      var edgesToExport = JSON.parse(JSON.stringify(edges._data)); //convert reactive object of objects to normal objects
      edgesToExport = Object.values(edgesToExport); //convert object of objects to array of objects
      console.log(nodesToExport);
      console.log(edgesToExport);
      var dataToExport = [];
      dataToExport.push(nodesToExport);
      dataToExport.push(edgesToExport);
      console.log(dataToExport);

      if (nodesToExport.length == 0) {
        alert("There is nothing to export to file!");
      } else {
        //dataForExport.forEach(this.addConnections);

        // pretty print node data
        var exportValue = JSON.stringify(dataToExport, undefined, 2);

        var fileName = "graph.gty"; //gravity.json

        // Create a blob of the data
        var fileToSave = new Blob([exportValue], {
          type: "application/json",
          name: fileName
        });

        // Save the file
        saveAs(fileToSave, fileName);
      }
    },
    importNetwork(inputData) {
      this.reInitialiseSeqParam();
      nodes.clear();
      edges.clear();

      nodes.update(inputData[0]);
      edges.update(inputData[1]);

      console.log(inputData[0]);
      console.log(inputData[1]);
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css");
#graphVis {
  min-width: 500px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
  /* background-color: green; */
  overflow: hidden;
}
.vis-network {
  height: 500px;
  min-width: 500px;
  /* width: auto; */
  /*  border: 1px solid grey; */
  /* background-color: blue; */
}

.graphOps {
  padding: 0px !important;
  margin: 5px;
  min-height: 500px !important;
  border: 1px solid grey; /* border: 1px solid grey; */
  border-radius: 5px;
  background-color: #f1f1f1;
  max-width: 270px !important;
}

#section2 {
  margin: 5px;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
}
#section3 {
  margin: 1px;
  padding: 0px;
  min-height: 500px;
  /* border: 1px solid grey; */
  border-radius: 2px;
}
#section4 {
  margin: 1px;
  padding: 0px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
  background-color: #f1f1f1;
}

#sequenceInfo {
  margin: 4px;
  margin-bottom: 10px;
  /* border: 1px solid grey; 
  border-radius: 15px;*/
  background-color: white;
}

.prevNext {
  display: inline;
}

#graphCa {
  /*  overflow: scroll !important; */
}
</style>