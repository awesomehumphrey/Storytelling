<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="punchcard"
      :src="require('@/assets/punchcard.png')"
      alt="Thumbnail"
      v-on:click="sendPunchCardSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'punchcard'"
      :placement="'top'"
      title="Punch card"
      triggers="hover focus"
      :content="'2 nominal/temporal variables and 1 quantitative variable subsetted by colour and/or shape.'"
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
        description: "punchCard",
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
        config: { invalidValues: "filter" },
        mark: "circle",
        encoding: {
          x: { field: "", type: "ordinal" },
          y: { field: "", type: "ordinal" },
          color: { field: "", type: "quantitative", aggregate: "sum" },
          size: { field: "", type: "quantitative", aggregate: "sum" }
          //"tooltip": {"field": "", "type": "quantitative", "aggregate": "sum"} //Tooltip now comes with the latest version of vega-embed
        }
      }
    };
  },
  created() {
    DataBus.$on("dataJson", dataJson => {
      //Receive the data (array of data values) from Data component via DataBus
      this.spec.data.values = dataJson;
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
    DataBus.$on("Colour", colour => {
      //Receive the colour value from Axis component via DataBus
      this.spec.encoding["color"]["field"] = colour;
      //this.spec.encoding["tooltip"]["field"] = colour; //Tooltip now comes with the latest version of vega-embed
      this.spec.encoding["size"]["field"] = colour;
    });
    //DataBus.$on('Size', (size) => {  //Receive the size value from Axis component via DataBus
    //	this.spec.encoding["size"]["field"] = size;
    // });
  },
  methods: {
    sendPunchCardSpec() {
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


