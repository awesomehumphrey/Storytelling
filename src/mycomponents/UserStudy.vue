<template>
  <div>
    <b-row>
      <b-col class="evaluation">
        <h3 class="headers">(A) Instructions</h3>
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-center"
          >1. Watch the short tutorial video in the right panel</b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-center"
          >2. Go through the task sheet handed you by the researcher
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
        <div>
          <h3 class="headers">Task Completion Time: 0:00</h3>
        </div>
      </b-col>
      <b-col class="evaluation">
        <hr>
        <h4 class="headers">(B) Watch tutorial video</h4>
        <div class="d-flex justify-content-center rightPanel">
          <a href="https://www.w3schools.com/tags/movie.mp4" target="_blank">
            <b-button
              size="lg"
              variant="primary"
              title="Click to open video in a new tab"
            >Tutorial Video</b-button>
          </a>
        </div>
        <hr>
        <h4 class="headers">(C) Start and stop task</h4>
        <div class="d-flex justify-content-center rightPanel">
          <b-button size="lg" variant="outline-primary" title="Click to start task">Start Task</b-button>
          <b-button size="lg" variant="outline-danger" title="Click to stop task">Stop Task</b-button>
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
export default {};
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

