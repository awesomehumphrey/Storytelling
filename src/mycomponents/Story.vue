<template>
  <div>
    <b-row>
      <b-col col sm="2" id="storyOps">
        <b-card
          header-bg-variant="info"
          header-text-variant="white"
          header="Presentation & Ethics"
          header-class="text-center"
          style="min-height: 99%; background-color: #f1f1f1; padding: 0px;"
        >
          <app-authorinformation></app-authorinformation>
          <app-ethics></app-ethics>
        </b-card>
      </b-col>
      <b-col col sm="9.5" class="storySections">
        <b-row>
          <b-col col sm="7.5">
            <div id="pres" ref="bar" v-on:resize="handleResize()">
              <div class="reveal">
                <div class="slides">
                  <section>
                    <hr>
                    <p style="font-size: 1em;">Gravity: Telling stories with data...</p>
                    <hr>
                  </section>
                  <section>
                    <hr>
                    <h4 style="color:#002b80;">{{authorDetails.presentationTitle}}</h4>
                    <h5 style="color:#002b80;">{{authorDetails.name}}</h5>
                    <hr>
                    <p v-if="authorDetails.email!= null" style="font-size: 0.5em;">
                      <i class="fas fa-envelope"></i>
                      {{authorDetails.email}}
                    </p>
                    <h5 v-if="authorDetails.institution!= null ">
                      <i class="fa fa-institution"></i>
                      {{authorDetails.institution}}
                    </h5>
                    <h5>{{authorDetails.date}}</h5>
                  </section>
                  <section :id="item" v-for="(item, index) in id" :key="index">{{item}}</section>
                  <section>
                    <hr>
                    <p style="font-size: 1em; color:#002b80;">Ethical Consideration</p>
                    <hr>
                    <div style="font-size: 0.5em; ">
                      <!-- <p>Transformations</p> -->
                      <p v-if="ethicsDataSource.length!=0" class="ethicsList">Data Source:</p>
                      <p class="ethicsItem">{{ethicsDataSource}}</p>
                      <p
                        v-if="ethicsNormalisation.length!=0"
                        class="ethicsList"
                      >Normalised Variables:</p>
                      <p class="ethicsItem">{{ethicsNormalisation.join(', ') }}</p>
                      <p v-if="ethicsAggregation.length!=0" class="ethicsList">Aggregated Variables:</p>
                      <p class="ethicsItem">{{ethicsAggregation.join(', ') }}</p>
                      <p v-if="ethicsOtherComments.length!=0" class="ethicsList">Other Comments:</p>
                      <p class="ethicsItem" style="white-space: pre-wrap;">{{ethicsOtherComments }}</p>
                    </div>
                  </section>
                  <section>Thank you!</section>
                  <!-- <section>Thank you!</section> -->
                </div>
                <!--Move 'Thank you' to a different div before adding conditional statements or render it dynamically like the charts-->
              </div>
            </div>
          </b-col>
          <b-col col sm="4" id="presOps">
            <!-- <b-card
              header-bg-variant="info"
              header-text-variant="white"
              header="Storytelling"
              class="text-center"
              style="height: 60%; width:100%; margin-bottom: 5px; "
            >-->
            <div style="display: table;  margin: 0 auto;">
              <button
                class="btn btn-primary btn-sm"
                title="Start recording"
                id="btn-start-recording"
                ref="btnStartRecording"
                @click="myStartRecording()"
                style="border-radius:50px"
              >
                Start
                <i class="fas fa-microphone-alt"></i>
              </button>
              <button
                class="btn btn-primary btn-sm"
                title="Pause/resume recording"
                id="btn-pause-resume-recording"
                ref="btnPauseResumeRecording"
                @click="pauseResumeRecording()"
                style="border-radius:50px"
                disabled
              >
                Pause
                <i class="fas fa-pause"></i>
              </button>
              <button
                class="btn btn-primary btn-sm"
                title="Stop recording"
                id="btn-stop-recording"
                ref="btnStopRecording"
                @click="myStopRecording()"
                style="border-radius:50px"
                disabled
              >
                Stop
                <i class="fas fa-stop"></i>
              </button>
            </div>
            <hr>
            <div
              style="border: 2px solid gray; border-radius: 5px; width: 100%; height: 35%; margin-bottom:5px;"
            >
              <video
                controls
                id="preview-video"
                ref="previewVideo"
                :poster="require('@/assets/story.jpg')"
                :src="videoSrc"
              ></video>
            </div>
            <!-- </b-card> -->
            <canvas
              id="background-canvas"
              ref="backgroundCanvas"
              style="position:absolute; top:-99999999px; left:-9999999999px; float: right"
            ></canvas>
            <b-card
              header-bg-variant="info"
              header-text-variant="white"
              header="Notes"
              class="text-center"
              style="height: 48%; width:100%; overflow-y: auto;"
            >
              <div v-if="notesIndex == null || notesIndex < 0 || notesIndex >= id.length">
                <h5 style="font-weight: bold;">No notes.</h5>
                <!-- <p style="white-space: pre-wrap; text-align: left">No notes.</p> -->
              </div>
              <div v-else>
                <h5 style="font-weight: bold;">{{reactiveNodes[notesIndex].title}}</h5>
                <p
                  style="white-space: pre-wrap; text-align: left"
                >{{reactiveNodes[notesIndex].notes}}</p>
              </div>
            </b-card>
          </b-col>
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
import AuthorInformation from "@/mycomponents/storytabcomponents/AuthorInformation";
import Ethics from "@/mycomponents/storytabcomponents/Ethics";
var myNodes = []; //To hold non-reactive array of objects(nodes) because reactive data doesn't work nicely with v-for directive in the template

var isRecordingStarted = false;
var isStoppedRecording = false;

var elementToRecord = null;
var canvas2d = null;
var context = null;
var recorder = null;
var blob = null;
//////
var canvasStream = null;
var finalStream = null;
export default {
  components: {
    "app-authorinformation": AuthorInformation,
    "app-ethics": Ethics
  },
  data() {
    return {
      notesIndex: null,
      reactiveNodes: null, //For use in v-for directive
      id: [],
      videoSrc: require("@/assets/Gapminder.mp4"), //"https://www.w3schools.com/tags/movie.mp4",
      pause: false,
      authorDetails: {
        presentationTitle: "Presentation Title"
      },
      ethicsNormalisation: [],
      ethicsAggregation: [],
      ethicsDataSource: "",
      ethicsOtherComments: ""
    };
  },
  created() {
    DataBus.$on("nodeArray", this.getNodeArray); //receive connection/sequenced ordered node array from graph canvas and handle in a dedicated function
    DataBus.$on("authorDetails", authorDetails => {
      this.authorDetails = authorDetails;
      console.log(this.authorDetails);
    });
    DataBus.$on("normalisation", value => {
      this.ethicsNormalisation = value;
      console.log(this.ethicsNormalisation);
    });
    DataBus.$on("aggregation", value => {
      this.ethicsAggregation = value;
      console.log(this.ethicsAggregation);
    });
    DataBus.$on("dataSource", value => {
      this.ethicsDataSource = value;
      console.log(this.ethicsDataSource);
    });
    DataBus.$on("otherComments", value => {
      this.ethicsOtherComments = value;
      console.log(this.ethicsOtherComments);
    });
  },
  mounted() {
    this.$nextTick(() => {
      var halfWidth = document.documentElement.clientWidth / 2 + 50;
      console.log(halfWidth);
      Reveal.initialize({
        transition: "zoom",
        /* backgroundTransition: "slide", */
        embedded: true,
        margin: 0,
        width: halfWidth, //735,
        minScale: 1,
        maxScale: 1
        /*maxScale: 1 */
      });
      window.addEventListener("resize", this.handleResize);
      window.addEventListener("load", this.handleLoad);
    });

    const myThis = this;
    Reveal.addEventListener("slidechanged", function(event) {
      // event.previousSlide, event.currentSlide, event.indexh, event.indexv
      myThis.notesIndex = event.indexh - 2; //event.indexh - 1;so as to account for the first slide
      console.log(myThis.notesIndex);
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
    myStartRecording() {
      //elementToRecord = this.$refs.elementRecord;
      elementToRecord = this.$refs.bar;
      canvas2d = this.$refs.backgroundCanvas;
      context = canvas2d.getContext("2d");

      canvas2d.width = elementToRecord.clientWidth;
      canvas2d.height = elementToRecord.clientHeight;

      (function looper() {
        if (!isRecordingStarted) {
          return setTimeout(looper, 150); //500
        }
        //scale for improving quality, the default is 1
        html2canvas(elementToRecord, { logging: false, scale: 2 }).then(
          function(canvas) {
            context.clearRect(0, 0, canvas2d.width, canvas2d.height);
            context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

            if (isStoppedRecording) {
              return;
            }

            requestAnimationFrame(looper);
          }
        );
      })();

      /* recorder = new RecordRTC(canvas2d, {
        type: "canvas",
        showMousePointer: true
      }); */

      const myThis = this; //Can't use "this" in a callback in vuejs because of clashing of its scope
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function(audioStream) {
          //var canvas = document.getElementById('canvas');
          canvasStream = canvas2d.captureStream();
          finalStream = new MediaStream();

          getTracks(audioStream, "audio").forEach(function(track) {
            finalStream.addTrack(track);
          });
          getTracks(canvasStream, "video").forEach(function(track) {
            finalStream.addTrack(track);
          });
          recorder = RecordRTC(finalStream, {
            type: "video"
          });
          recorder.startRecording();
        })
        .catch(function(err) {
          myThis.$refs.btnStartRecording.disabled = false;
          myThis.$refs.btnStopRecording.disabled = true;
          myThis.$refs.btnPauseResumeRecording.disabled = true;
          console.log(err.name + ": " + err.message);
          alert(err.name + ": " + err.message);
        });

      this.$refs.btnStartRecording.disabled = true;
      //console.log("Hey! Iam recording!!!");
      isStoppedRecording = false;
      isRecordingStarted = true;

      //recorder.startRecording();
      this.$refs.btnStopRecording.disabled = false;
      this.$refs.btnPauseResumeRecording.disabled = false;
      //document.getElementById("btn-stop-recording").disabled = false;
    },
    pauseResumeRecording() {
      this.pause = !this.pause;
      if (this.pause) {
        recorder.pauseRecording();
        this.$refs.btnPauseResumeRecording.innerHTML =
          "Resume <i class='fas fa-play'></i>";
      } else {
        recorder.resumeRecording();
        this.$refs.btnPauseResumeRecording.innerHTML =
          "Pause <i class='fas fa-pause'></i>";
      }
    },
    myStopRecording() {
      this.$refs.btnPauseResumeRecording.innerHTML =
        "Pause <i class='fas fa-pause'></i>";
      this.$refs.btnStartRecording.disabled = false;
      this.$refs.btnStopRecording.disabled = true;
      this.$refs.btnPauseResumeRecording.disabled = true;
      //this.videoSrc = "http://techslides.com/demos/sample-videos/small.mp4";
      const self = this;
      recorder.stopRecording(function(bar) {
        isRecordingStarted = false;
        isStoppedRecording = true;
        console.log(bar);
        blob = recorder.getBlob();
        // document.getElementById('preview-video').srcObject = null;
        //this.$refs.previewVideo.src = URL.createObjectURL(blob);
        console.log(blob);
        //blob = blob.slice(0, blob.size, "video/mp4");
        //console.log(blob);
        this.videoSrc = URL.createObjectURL(blob);
        console.log(this.videoSrc);

        self.assignVideo(bar);
        /* document.getElementById("preview-video").parentNode.style.display =
          "block";
        elementToRecord.style.display = "none"; */

        //window.open(URL.createObjectURL(blob));
      });
    },
    assignVideo(bar) {
      this.videoSrc = URL.createObjectURL(blob);
      //this.videoSrc = bar;
    },
    getNodeArray(nodeArray) {
      //console.log(nodeArray);
      myNodes = JSON.parse(JSON.stringify(nodeArray)); //convert reactive array of objects to normal objects
      this.reactiveNodes = Object.values(myNodes);
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
      /*  var newSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v3.json",
        description: "A simple bar chart with embedded data.",
        data: {
          values: [
            { a: "A", b: 28 },
            { a: "A", b: 55 },
            { a: "B", b: 56 },
            { a: "C", b: 43 },
            { a: "D", b: 91 },
            { a: "E", b: 81 },
            { a: "F", b: 53 },
            { a: "G", b: 19 },
            { a: "H", b: 87 },
            { a: "I", b: 52 }
          ]
        },
        transform: [
          {
            filter: { field: "a", oneOf: ["A", "B"] }
          },
          { filter: { field: "b", gte: "28" } }
        ],
        mark: "point",
        encoding: {
          x: { field: "b", type: "quantitative" },
          y: { field: "b", type: "quantitative" }
        }
      }; */
      for (var i = 0; i < myNodes.length; i++) {
        myNodes[i].nData.title = myNodes[i].label; //Add graph title to graph spec
        myNodes[i].nData.width = document.documentElement.clientWidth / 2; //Modify width of the graph
        //console.log(myNodes[i].nData.height);
        vegaEmbed("#" + this.id[i], myNodes[i].nData, {
          defaultStyle: false,
          actions: false,
          renderer: "canvas" //or svg
        });
      }
    },
    handleResize(event) {
      /* for (var i = 0; i < myNodes.length; i++) {
        myNodes[i].nData.width = this.$refs.bar.clientWidth - 150;

        if (this.$refs.bar.clientWidth >= 1000) {
          myNodes[i].nData.width = this.$refs.bar.clientWidth - 360;
        } else {
          myNodes[i].nData.width = this.$refs.bar.clientWidth - 160;
        } 
      } */
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
  min-height: 500px;
  /* border: 1px solid grey;  border: 1px solid grey; */
  border-radius: 5px;
  background-color: #f1f1f1;
  max-width: 250px;
  padding: 0px;
}
#presOps {
  padding: 10px;
  margin: 1px;
  min-height: 500px;
  border: 1px solid grey; /* border: 1px solid grey; */
  border-radius: 2px;
  background-color: white;
  /* max-width: 300px; */
}
.storySections {
  margin: 5px;
  min-height: 500px;
  /*border: 1px solid grey;  border: 1px solid grey; */
  border-radius: 2px;
}

#preview-video {
  object-fit: initial;
  /* width: 400px;
  height: 300px; */
  width: 100%;
  height: 100%;
}
.ethicsItem {
  font-style: italic;
  /*  float: right; */
}
.ethicsList {
  margin: 7px;
  color: #002b80;
}
</style>