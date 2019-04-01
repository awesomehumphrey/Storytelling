<template>
  <div>
    <b-row>
      <b-col class="evaluation">
        <h3 class="headers">(A) Instructions</h3>
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-center"
          >1. Watch the short tutorial videos in the right panel</b-list-group-item>
          <b-list-group-item class="d-flex justify-content-center">
            2. Go through the task sheet handed you by the researcher
            <!-- <b-badge variant="primary" pill></b-badge> -->
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-center"
          >3. When you are ready, click the START TASK button in section C in the right panel to begin the task section of the evaluation</b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-center"
          >4. Click the STOP TASK button in section C in the right panel to end the task section of the evaluation</b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-center"
          >5. Complete the survey by clicking the survey button in section D in the right panel</b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-center"
          >6. Feel free to ask any questions during the course of the evaluation</b-list-group-item>
        </b-list-group>
        <div v-show="taskCompletion">
          <h3 class="headers">
            Task Completion Time:
            <b-badge variant="primary" pill>{{hours}} h {{minutes}} m {{seconds}} s</b-badge>
          </h3>
        </div>
      </b-col>
      <b-col class="evaluation">
        <hr>
        <h4 class="headers">(B) Watch tutorial videos</h4>
        <div class="d-flex justify-content-center rightPanel">
          <!-- <a href="https://www.w3schools.com/tags/movie.mp4" target="_blank">
            <b-button
              size="lg"
              variant="primary"
              title="Click to open video in a new tab"
            >Tutorial Video</b-button>
          </a>-->
          <b-button
            size="lg"
            variant="primary"
            title="Click to open video in a new tab"
            @click="openVisVideo"
          >Creating Visualisations</b-button>
          <b-button
            size="lg"
            variant="primary"
            title="Click to open video in a new tab"
            @click="openGraphVideo"
          >Creating Sequences</b-button>
          <b-button
            size="lg"
            variant="primary"
            title="Click to open video in a new tab"
            @click="openStoryVideo"
          >Creating Stories</b-button>
        </div>
        <hr>
        <h4 class="headers">(C) Start and stop task</h4>
        <div class="d-flex justify-content-center rightPanel">
          <b-button
            size="lg"
            variant="outline-primary"
            title="Click to start task"
            @click="startTask"
          >
            <span style="display: inline-flex !important;">
              Start Task
              <bounce-loader :loading="spinner" :color="spinnerColor" :size="spinnerSize"></bounce-loader>
            </span>
          </b-button>
          <b-button
            size="lg"
            variant="outline-danger"
            title="Click to stop task"
            @click="stopTask"
          >Stop Task</b-button>
        </div>
        <hr>
        <h4 class="headers">(D) Complete evaluation survey</h4>
        <div class="d-flex justify-content-center rightPanel">
          <a href="https://swinuw.au1.qualtrics.com/jfe/form/SV_9zzaSKc8PqVwciF" target="_blank">
            <b-button size="lg" variant="primary" title="Click to begin survey">Survey</b-button>
          </a>
        </div>
        <hr>
      </b-col>
    </b-row>
  </div>
</template>
<script>
/* eslint-disable */
import { BounceLoader } from "vue-spinner/dist/vue-spinner.min.js";

export default {
  components: {
    "bounce-loader": BounceLoader
  },
  data() {
    return {
      startTime: 0,
      currentTime: 0,
      timeSpent: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      taskCompletion: false,
      spinner: false,
      spinnerColor: "blue",
      spinnerSize: "15px",
      visVideoSrc: require("@/assets/Visualisation.mp4"),
      graphVideoSrc: require("@/assets/Graph.mp4"),
      storyVideoSrc: require("@/assets/Story.mp4")
    };
  },
  methods: {
    startTask() {
      this.taskCompletion = false;
      this.spinner = true;
      this.startTime = new Date().getTime();
    },
    stopTask() {
      //console.log("stop task");
      this.taskCompletion = true;
      this.spinner = false;
      this.currentTime = new Date().getTime();
      this.timeSpent = this.currentTime - this.startTime;
      this.hours = Math.floor(
        (this.timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor(
        (this.timeSpent % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.seconds = Math.floor((this.timeSpent % (1000 * 60)) / 1000);
    },
    openVisVideo() {
      window.open(this.visVideoSrc, "_blank");
    },
    openGraphVideo() {
      window.open(this.graphVideoSrc, "_blank");
    },
    openStoryVideo() {
      window.open(this.storyVideoSrc, "_blank");
    }
  }
};
</script>
<style scoped>
.evaluation {
  margin: 1px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 5px;
  line-height: 1.6;
}

.headers {
  text-align: center;
  margin: 15px;
}

.rightPanel {
  /* border: 1px grey solid; */
  margin: 5px;
  border-radius: 5px;
}
</style>

