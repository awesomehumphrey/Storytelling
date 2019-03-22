<template>
  <div class="input">
    <!--  <hr>
    <h5>Data</h5>-->
    <b-button
      v-b-modal="'sampleDataModal'"
      variant="primary"
      class="btn-block"
      size="md"
    >Sample data</b-button>
    <b-modal
      id="sampleDataModal"
      title-tag="h4"
      ok-title="Load"
      button-size="md"
      title="Try sample data"
      @ok="handleOk()"
      @cancel="handleCancel()"
    >
      <b-form-group id="data">
        <b-form-radio-group v-model="selectedRadio" :options="options" stacked name="radiosStacked"></b-form-radio-group>
        <div v-if="selectedRadio=='temperature'">
          <hr>This is temperature dataset for Melbourne, Australia, for the year 2013.
        </div>
        <div v-if="selectedRadio=='car'">
          <hr>This car dataset covers between 1970 and 1982 for cars made in Japan, USA and Europe.
        </div>
        <div v-if="selectedRadio=='iris'">
          <hr>The iris flower dataset was collected by Ronald Fisher in 1936 to quantify the variation between 3 species - virginica, setosa and verisicolor.
        </div>
        <div v-if="selectedRadio=='weather'">
          <hr>This is weather dataset for the city of Seattle, USA. It covers 2012 to 2015.
        </div>
        <div v-if="selectedRadio=='movies'">
          <hr>This is dataset for 3200 movies released between 1929 and 2016.
        </div>
      </b-form-group>
    </b-modal>
    <br>
    <b-form-file
      ref="fileReader"
      v-model="selectedFile"
      placeholder="Select file..."
      accept=".csv"
      @change="onFileChanged"
      no-drop
    ></b-form-file>
  </div>
</template>

<script>
/* eslint-disable */
import Papa from "papaparse";
import { DataBus } from "@/main";

var carData = require("@/data/cars.json");
var temperatureData = require("@/data/temperature.json");
var irisData = require("@/data/iris.json");
var weatherData = require("@/data/seattle_weather.json");
var moviesData = require("@/data/movies.json");

export default {
  data() {
    return {
      selectedFile: null,
      selectedRadio: "",
      options: [
        { text: "Melbourne Temperature", value: "temperature" },
        { text: "Cars", value: "car" },
        { text: "Iris Flower", value: "iris" },
        { text: "Seattle Weather", value: "weather" },
        { text: "Movies", value: "movies" }
      ]
    };
  },
  created() {
    //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("sendToDataTabEvent", () => {
      document
        .getElementsByClassName("custom-file-control")[0] //Change the placeholder text from "Select file" to fileName
        .setAttribute("data-selected", "Temp file"); //To get the classname and attributes, inspect the b-form-file element. If in the future you do not use bootstrap-vue, then use v-model to bind to placeholder attribute
    });
  },
  methods: {
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]; //ToDo: get name of file, determine file type using the extension,
      //and pass extension through a switch statement with each case calling a specific function to process that file type e.g tsv,excel, txt etc.
      if (this.selectedFile) {
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
    },
    handleOk() {
      //console.log(this.selectedRadio);
      switch (this.selectedRadio) {
        case "temperature":
          this.sampleData(temperatureData, this.selectedRadio);
          break;
        case "car":
          this.sampleData(carData, this.selectedRadio);
          break;
        case "iris":
          this.sampleData(irisData, this.selectedRadio);
          break;
        case "weather":
          this.sampleData(weatherData, this.selectedRadio);
          break;
        case "movies":
          this.sampleData(moviesData, this.selectedRadio);
          break;
        default:
          this.selectedRadio = "";
      }
    },
    handleCancel() {
      //console.log("Cancel!");
      this.selectedRadio = "";
    },
    sampleData(sData, fileName) {
      document
        .getElementsByClassName("custom-file-control")[0] //Change the placeholder text from "Select file" to fileName
        .setAttribute("data-selected", fileName); //To get the classname and attributes, inspect the b-form-file element. If in the future you do not use bootstrap-vue, then use v-model to bind to placeholder attribute
      //this.$refs.fileReader.placeholder = "Cars.json";
      var fieldNames = Object.keys(sData[0]);
      DataBus.$emit("dataJson", sData); // Send the data values through the event bus
      DataBus.$emit("fieldArray", fieldNames); // Send the field names through the event
      this.selectedRadio = "";
    }
  }
};
</script>

<style scoped>
#data {
  line-height: 1.6;
}
</style>


