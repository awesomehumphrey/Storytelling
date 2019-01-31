<template>
  <div>
    <b-row>
      <b-col col sm="2" id="storyOps"></b-col>
      <b-col col sm="9.5" class="storySections">
        <b-row>
          <b-col col sm="7.5">
            <div id="pres" ref="bar" v-on:resize="handleResize()">
              <div class="reveal">
                <div class="slides">
                  <section>Gravity++: Telling stories with data...</section>
                  <section :id="item" v-for="(item, index) in id" :key="index">{{item}}</section>
                  <section></section>
                  <!-- <section>Thank you!</section> -->
                </div>
                <!--Move 'Thank you' to a different div before adding conditional statements or render it dynamically like the charts-->
              </div>
            </div>
          </b-col>
          <b-col col sm="4" id="presOps">
            <button
              id="btn-start-recording"
              ref="btnStartRecording"
              @click="sttRecording()"
            >Start Recording</button>
            <button
              id="btn-stop-recording"
              ref="btnStopRecording"
              @click="sppRecording()"
              disabled
            >Stop Recording</button>

            <hr>
            <div
              id="element-to-record"
              ref="elementRecord"
              style="border: 5px solid gray; border-radius: 5px; padding: 20px; margin: 20px;width: 480px; height: 360px;"
            >
              <input value="type something" style="width: 80%;font-size: 16px;">
              <br>
              <br>
              <span id="timer"></span>
              <br>
              <br>
              <span id="counter"></span>
              <br>
              <br>
            </div>

            <canvas
              id="background-canvas"
              ref="backgroundCanvas"
              style="position:absolute; top:-99999999px; left:-9999999999px; float: right"
            ></canvas>
            <hr>
            <div style="display: block; background-color:white height: 300px; width: 300px">
              <video controls autoplay id="preview-video" ref="previewVideo" :src="videoSrc"></video>
            </div>
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
  data() {
    return {
      id: [],
      videoSrc: "https://www.w3schools.com/tags/movie.mp4"
    };
  },
  created() {
    DataBus.$on("nodeArray", this.getNodeArray); //receive connection/sequenced ordered node array from graph canvas and handle in a dedicated function
  },
  mounted() {
    /*     elementToRecord = this.$refs.elementRecord;
    canvas2d = this.$refs.backgroundCanvas;
    context = canvas2d.getContext("2d");

    console.log(context);

    canvas2d.width = elementToRecord.clientWidth;
    canvas2d.height = elementToRecord.clientHeight;

    (function looper() {
      if (!isRecordingStarted) {
        return setTimeout(looper, 500);
      }

      html2canvas(elementToRecord).then(function(canvas) {
        context.clearRect(0, 0, canvas2d.width, canvas2d.height);
        context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

        if (isStoppedRecording) {
          return;
        }

        requestAnimationFrame(looper);
      });
    })();

    recorder = new RecordRTC(canvas2d, {
      type: "canvas",
      showMousePointer: true
    });

    var timer = document.getElementById("timer");
    var counter = document.getElementById("counter");
    var interval = setInterval(function() {
      timer.innerHTML = new Date();
      counter.innerHTML = (Math.random() * 100).toString().replace(".", "");
    }, 1000); */

    Reveal.initialize({
      transition: "zoom",
      backgroundTransition: "slide",
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
    sttRecording() {
      elementToRecord = this.$refs.elementRecord;
      //elementToRecord = this.$refs.bar;
      canvas2d = this.$refs.backgroundCanvas;
      context = canvas2d.getContext("2d");

      console.log(context);

      canvas2d.width = elementToRecord.clientWidth;
      canvas2d.height = elementToRecord.clientHeight;

      (function looper() {
        if (!isRecordingStarted) {
          return setTimeout(looper, 500);
        }

        html2canvas(elementToRecord).then(function(canvas) {
          context.clearRect(0, 0, canvas2d.width, canvas2d.height);
          context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);

          if (isStoppedRecording) {
            return;
          }

          requestAnimationFrame(looper);
        });
      })();

      /* recorder = new RecordRTC(canvas2d, {
        type: "canvas",
        showMousePointer: true
      }); */

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function(audioStream) {
          //var canvas = document.getElementById('canvas');
          canvasStream = canvas2d.captureStream();
          finalStream = new MediaStream();
          console.log(canvasStream);
          console.log(finalStream);
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
          //var stop = false;
          /*                 (function looper() {
                    if(stop) {
                        recorder.stopRecording(function() {
                            var blob = recorder.getBlob();
                            document.body.innerHTML = '<video controls src="' + URL.createObjectURL(blob) + '" autoplay loop></video>';
                            audioStream.stop();
                            canvasStream.stop();
                        });
                        return;
                    }
                    setTimeout(looper, 100);
                })();
                var seconds = 15;
                var interval = setInterval(function() {
                    seconds--;
                    if(document.querySelector('h1')) {
                        document.querySelector('h1').innerHTML = seconds + ' seconds remaining.';
                    }
                }, 1000);
                setTimeout(function() {
                    clearTimeout(interval);
                    stop = true;
                }, seconds * 1000); */
        });

      var timer = document.getElementById("timer");
      var counter = document.getElementById("counter");
      var interval = setInterval(function() {
        timer.innerHTML = new Date();
        counter.innerHTML = (Math.random() * 100).toString().replace(".", "");
      }, 1000);
      this.$refs.btnStartRecording.disabled = true;
      console.log("Hey! Iam recording!!!");
      isStoppedRecording = false;
      isRecordingStarted = true;

      //recorder.startRecording();
      this.$refs.btnStopRecording.disabled = false;
      //document.getElementById("btn-stop-recording").disabled = false;
    },
    sppRecording() {
      this.$refs.btnStartRecording.disabled = false;
      this.$refs.btnStopRecording.disabled = true;
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
      this.videoSrc = "http://techslides.com/demos/sample-videos/small.mp4";
      this.videoSrc = URL.createObjectURL(blob);
      console.log(canvas2d);
      //this.videoSrc = bar;
    },
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
  border: 1px solid red; /* border: 1px solid grey; */
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

#preview-video {
  object-fit: initial;
  width: 400px;
  height: 300px;
}
</style>