<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="histogram"
      :src="require('@/assets/histogram.png')"
      alt="Thumbnail"
      v-on:click="sendHistogramSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'histogram'"
      :placement="'top'"
      title="Histogram"
      triggers="hover focus"
      :content="'1 quantitative variable that supports binning calculation.'"
    ></b-popover>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      spec: {
        $schema: "https://vega.github.io/schema/vega-lite/v3.json",
        description: "histogram",
        height: 380, // Default height of graph
        width: 650, // Default width of graph, but is dynamically updated to fit the width of the device
        autosize: {
          type: "fit",
          contains: "padding"
          //"resize": true  //
        },
        data: {
          values: []
        },
        mark: "bar",
        encoding: {
          x: { bin: true, field: "", type: "quantitative" },
          y: { aggregate: "count", type: "quantitative" },
          color: { field: "", type: "nominal" },
          shape: { field: "", type: "nominal" }
          //"tooltip": {"aggregate": "count", "type": "quantitative"}, //Tooltip now comes with the latest version of vega-embed
        }
      }
    };
  },
  created() {
    DataBus.$on("dataJson", dataJson => {
      //Receive the data (array of data values) from Data component via DataBus
      this.spec.data.values = dataJson;
    });
    //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("specFromGraphCanvas", newSpec => {
      //You receive this event when miniVis "send to data tab" button is clicked in graph canvas. Then reset the following axis values
      this.spec.data.values = newSpec.data.values;
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
  },
  methods: {
    sendHistogramSpec() {
      DataBus.$emit("graphSchema", this.spec);
    }
  }
};
</script>

<style scoped>
div {
  cursor: pointer;
  margin-bottom: 5px;
}
</style>


