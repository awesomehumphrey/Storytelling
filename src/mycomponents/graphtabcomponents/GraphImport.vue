<template>
  <div class="input">
    <!-- <hr> -->
    <b-form-file
      v-model="selectedFile"
      placeholder="Import graph..."
      accept=".gty"
      @change="onImport"
      no-drop
    ></b-form-file>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    onImport(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        var reader = new FileReader();
        var graphData;
        reader.onload = function(event) {
          // The file's text will be printed here
          graphData = JSON.parse(reader.result);
          //console.log(graphData);
          DataBus.$emit("gData", graphData); // Send the graphdata values through the event bus
        };
        reader.readAsText(this.selectedFile);
      }
    }
  }
};
</script>

<style scoped>
</style>


