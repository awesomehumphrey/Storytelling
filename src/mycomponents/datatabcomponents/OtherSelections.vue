<template>
  <div>
    <div v-if="this.spec.description !== 'barChart' && this.spec.description !== 'histogram'">
      <hr>
      <label for="color">Colour</label>
      <multiselect
        v-model="color"
        placeholder="Select variable"
        :searchable="true"
        :options="fieldNames"
        @select="sendColourValue"
      >
        <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
      </multiselect>
      <br>
    </div>
    <div v-if="this.spec.description === 'scatterplot'">
      <label for="shape">Shape</label>
      <multiselect
        v-model="shape"
        placeholder="Select variable"
        :searchable="true"
        :options="fieldNames"
        @select="sendShapeValue"
      >
        <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
      </multiselect>
      <br>
    </div>
    <!-- <div v-if="this.spec.description === 'scatterplot'">
        <label for="labelToolTip">Label</label>
        <multiselect v-model="toolTipLabel" placeholder="Select variable" :searchable="true" :options="fieldNames" @select="sendLabelToolTip">
        </multiselect>
    </div> No longer necessary since the latest version of vega-embed now comes with a tooltip-->
    <!-- <br>
    <label for="size">Size</label>
    <multiselect v-model="size" placeholder="Select variable" :searchable="true" :options="fieldNames" @select="sendSizeValue">  
    </multiselect>-->
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      spec: {
        description: ""
      },
      fieldNames: [],
      toolTipLabel: "",
      color: "",
      shape: "" //,
      //size: ''
    };
  },
  created() {
    DataBus.$on("fieldArray", fieldArray => {
      //Receive the data (field names) from Data component via DataBus
      this.fieldNames = fieldArray;
      //console.log(this.fieldNames);
    });
    DataBus.$on("graphSchema", graphSpec => {
      //Receive the graph schema from selected graph component via DataBus
      this.spec = graphSpec;
    });
  },
  methods: {
    sendLabelToolTip(val) {
      // val contains currently selected label value from select input
      DataBus.$emit("ToolTipLabel", val); // Send label values through the event bus...
      //console.log(val)
    },
    sendColourValue(val) {
      // val contains currently selected colour value from select input
      DataBus.$emit("Colour", val); // Send colour values through the event bus...
      //console.log(val)
    },
    sendShapeValue(val) {
      // val contains currently selected shape value from select input
      DataBus.$emit("Shape", val); // Send shape values through the event bus...
      //console.log(val)
    } //,
    //sendSizeValue(val) { // val contains currently selected shape value from select input
    //    DataBus.$emit('Size', val); // Send shape values through the event bus...
    //    console.log(val)
    //}
  },
  watch: {
    // Watch for change in fieldNames which is triggered by a new file upload and reset the x and y axis and then resend their values
    fieldNames(val) {
      this.toolTipLabel = "";
      DataBus.$emit("ToolTipLabel", this.toolTipLabel);
      this.color = "";
      DataBus.$emit("Colour", this.color);
      this.shape = "";
      DataBus.$emit("Shape", this.shape);
      //this.size = '';
      //DataBus.$emit('Size', this.size);
    },
    color(val) {
      DataBus.$emit("Colour", this.color);
    },
    shape(val) {
      DataBus.$emit("Shape", this.shape);
    },
    toolTipLabel(val) {
      DataBus.$emit("ToolTipLabel", this.toolTipLabel);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>


