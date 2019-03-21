<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="boxplot"
      :src="require('@/assets/boxplot.png')"
      alt="Thumbnail"
      v-on:click="sendBoxPlotSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'boxplot'"
      :placement="'top'"
      title="Boxplot"
      triggers="hover focus"
      :content="'1 nominal/ordinal variable and 1 quantitative variable.'"
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
        description: "boxPlot",
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
        selection: {
          brush: {
            type: "interval",
            init: { x: [0, 0], y: [0, 0] }
          }
        },
        mark: {
          type: "boxplot",
          extent: "min-max"
        },
        //mark: "circle",
        encoding: {
          x: { field: "", type: "ordinal" },
          y: { field: "", type: "quantitative" },
          color: { field: "", type: "nominal" }
        },
        config: { invalidValues: "filter" }
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
    DataBus.$on("Y-axisValue", yAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["y"]["field"] = yAxisSelected;
      //this.spec.encoding["tooltip"]["field"] = yAxisSelected;
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
  },
  methods: {
    sendBoxPlotSpec() {
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


