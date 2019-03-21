<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="scatterplot"
      :src="require('@/assets/scatterplot.png')"
      alt="Thumbnail"
      v-on:click="sendScatterPlotSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'scatterplot'"
      :placement="'top'"
      title="Scatterplot"
      triggers="hover focus"
      :content="'2 quantitative variables. Can be subsetted by colour and/or shape.'"
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
        description: "scatterplot",
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
          paintbrush: {
            type: "single",
            on: "mouseover",
            empty: "none",
            nearest: false
          },
          brush: {
            type: "interval",
            init: { x: [0, 0], y: [0, 0] }
          }
        },
        mark: { type: "point", cursor: "pointer" },
        //mark: "point",
        encoding: {
          x: { aggregate: "", field: "", type: "quantitative" },
          y: { aggregate: "", field: "", type: "quantitative" },
          detail: { field: "", type: "nominal" },
          //tooltip: { field: "", type: "quantitative" }, //Tooltip now comes with the latest version of vega-embed
          color: { field: "", type: "nominal" },
          //shape: { field: "", type: "nominal" },
          size: {
            condition: { selection: "paintbrush", value: 300 },
            value: 50
          }
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
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
    DataBus.$on("ToolTipLabel", toolTipLabel => {
      //Receive the tooltip label value from Axis component via DataBus
      //this.spec.encoding["tooltip"]["field"] = toolTipLabel; //Tooltip now comes with the latest version of vega-embed
    });
    DataBus.$on("Colour", colour => {
      //Receive the colour value from Axis component via DataBus
      this.spec.encoding["color"]["field"] = colour;
    });
    DataBus.$on("Shape", shape => {
      //Receive the colour value from Axis component via DataBus
      //this.spec.encoding["shape"]["field"] = shape;
    });
    DataBus.$on("yAggregateValue", yAggregateValue => {
      this.spec.encoding["y"]["aggregate"] = yAggregateValue;
    });
    DataBus.$on("xAggregateValue", xAggregateValue => {
      this.spec.encoding["x"]["aggregate"] = xAggregateValue;
    });
    DataBus.$on("groupByValue", groupByValue => {
      this.spec.encoding.detail.field = groupByValue;
    });
  },
  methods: {
    sendScatterPlotSpec() {
      this.spec.encoding.y.aggregate = "";
      this.spec.encoding.x.aggregate = "";
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


