<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="linegraph"
      :src="require('@/assets/linegraph.png')"
      alt="Thumbnail"
      v-on:click="sendLineGraphSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'linegraph'"
      :placement="'top'"
      title="Line graph"
      triggers="hover focus"
      :content="'1 nominal/temporal variable and 1 quantitative variable. For multi-line, subset by colour.'"
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
        description: "lineGraph",
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
        mark: { type: "line" },
        encoding: {
          x: { field: "", type: "ordinal" }, // type can also be ordinal temporal
          y: { aggregate: "sum", field: "", type: "quantitative" },
          detail: { field: "", type: "nominal" },
          //"tooltip": {"field": "", "type": "quantitative"},
          color: { field: "", type: "nominal" }
          //shape: { field: "", type: "nominal" }
        },
        layer: [
          {
            selection: {
              brush: {
                type: "interval",
                encodings: ["x"]
              }
            },
            mark: "line"
          },
          {
            transform: [{ filter: { selection: "brush" } }],
            mark: { type: "line", color: "teal" }
          }
        ],
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
      //this.spec.encoding["tooltip"]["field"] = yAxisSelected; //There's a bug in the tooltip that might come from the Vuevega wrapper...
      //because it works on plain vegalite
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
    DataBus.$on("Colour", colour => {
      //Receive the colour value from Axis component via DataBus
      this.spec.encoding["color"]["field"] = colour;
    });

    DataBus.$on("yAggregateValue", yAggregateValue => {
      this.spec.encoding["y"]["aggregate"] = yAggregateValue;
    });

    DataBus.$on("groupByValue", groupByValue => {
      this.spec.encoding["detail"]["field"] = groupByValue;
    });
  },
  methods: {
    sendLineGraphSpec() {
      this.spec.encoding.y.aggregate = "sum";
      this.spec.encoding.detail.field = "null";
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


