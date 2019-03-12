<template>
  <div>
    <hr>
    <label for="y-axis">Y-Axis</label>
    <multiselect
      v-model="ySelected"
      placeholder="Select Y-axis"
      :searchable="true"
      :options="fieldNames"
      @select="sendYValues"
    >
      <!--Inline-block to place label and multiselect side by side-->
      <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
    </multiselect>
    <br>
    <label for="x-axis">X-Axis</label>
    <multiselect
      v-model="xSelected"
      placeholder="Select X-axis"
      :searchable="true"
      :options="fieldNames"
      @select="sendXValues"
    >
      <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
    </multiselect>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      //dataValues: 0,
      fieldNames: [],
      ySelected: "", //Might change these to array depending on...
      xSelected: "",
      defaultTitle: "Title",
      specFromMiniVis: false
    };
  },
  created() {
    /* DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
            this.dataValues = dataJson;
            console.log(this.dataValues);
        }); */
    DataBus.$on("fieldArray", fieldArray => {
      //Receive the data (field names) from Data component via DataBus
      this.fieldNames = fieldArray;
      this.specFromMinivis = false;
      console.log(this.fieldNames);
      console.log(this.specFromMinivis);
    });
    //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("specFromGraphCanvas", newSpec => {
      //You receive this event when miniVis "send to data tab" button is clicked in graph canvas. Then reset the following axis values
      this.specFromMinivis = true;
      this.fieldNames = Object.keys(newSpec.data.values[0]);
      this.ySelected = newSpec.encoding.y.field;
      DataBus.$emit("Y-axisValue", this.ySelected);
      this.xSelected = newSpec.encoding.x.field;
      DataBus.$emit("X-axisValue", this.xSelected);
    });
    /* //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("sendToDataTabEvent", () => {
      //You receive this event when miniVis "send to data tab" button is clicked in graph canvas. Then reset the following axis values
      this.ySelected = "";
      DataBus.$emit("Y-axisValue", this.ySelected);
      this.xSelected = "";
      DataBus.$emit("X-axisValue", this.xSelected);
    }); */
  },
  methods: {
    sendYValues(val) {
      // val contains currently selected ySelected value from select input
      DataBus.$emit("Y-axisValue", val); // Send Y-axis values through the event bus...
    },
    sendXValues(val) {
      // val contains currently selected xSelected value from select input
      DataBus.$emit("X-axisValue", val); // Send X-axis values through the event bus...
      DataBus.$emit("defaultTitle", this.defaultTitle); // Send default title through the event bus...
    }
  },
  watch: {
    // Watch for change in fieldNames which is triggered by a new file upload and reset the x and y axis and then resend their values
    fieldNames(val) {
      if (this.specFromMinivis == false) {
        //if spec is sent from graphTab then update the necessary elements else reset
        this.ySelected = "";
        DataBus.$emit("Y-axisValue", this.ySelected);
        this.xSelected = "";
        DataBus.$emit("X-axisValue", this.xSelected);
        DataBus.$emit("defaultTitle", this.defaultTitle);
      }
    },
    ySelected(val) {
      DataBus.$emit("Y-axisValue", this.ySelected);
      //DataBus.$emit("defaultTitle", this.defaultTitle);
    },
    xSelected(val) {
      DataBus.$emit("X-axisValue", this.xSelected);
      //DataBus.$emit("defaultTitle", this.defaultTitle);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>


