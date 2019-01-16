<template>
  <div class="input">
    <hr>
    <b-form-file
      v-model="selectedFile"
      placeholder="Import graph..."
      accept=".json"
      @change="onImport"
      no-drop
    ></b-form-file>
  </div>
</template>

<script>
/* eslint-disable */
import Papa from "papaparse";
import { DataBus } from "@/main";

export default {
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    //Update method to handle json and not csv
    onImport(event) {
      this.selectedFile = event.target.files[0]; //ToDo: get name of file, determine file type using the extension,
      //and pass extension through a switch statement with each case calling a specific function to process that file type

      Papa.parse(this.selectedFile, {
        //parse blob into array of Json(if header is true) or array of rows (if header is false)
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          //data = results;   // results is an array of three objects: data, errors, meta (fields is contained within meta)
          DataBus.$emit("dataJson", results.data); // Send the data values through the event bus
          DataBus.$emit("fieldArray", results.meta.fields); // Send the field names through the event
        }
      });
    }
  }
};
</script>

<style scoped>
</style>


