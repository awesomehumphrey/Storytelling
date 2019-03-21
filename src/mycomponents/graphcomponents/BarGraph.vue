<template>
  <div>
    <b-img
      thumbnail
      fluid
      id="bargraph"
      :src="require('@/assets/bar.png')"
      alt="Thumbnail"
      v-on:click="sendBarGraphSpec"
    />
    <!--style="max-width: 7rem;" -->
    <b-popover
      :target="'bargraph'"
      :placement="'top'"
      title="Bar graph"
      triggers="hover focus"
      :content="'1 categorical variable and 1 quantitative variable.'"
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
        description: "barChart",
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
          highlight: { type: "single", empty: "none", on: "mouseover" },
          select: { type: "multi" }
        },
        mark: {
          type: "bar",
          fill: "#4C78A8",
          stroke: "black",
          cursor: "pointer"
        },
        //"mark": {"type": "bar", "cursor": "pointer"},
        //mark: "bar",
        encoding: {
          x: { field: "", type: "ordinal" },
          y: { aggregate: "sum", field: "", type: "quantitative" },
          detail: { field: "", type: "nominal" },
          color: { field: "", type: "nominal" },
          //shape: { field: "", type: "nominal" },
          fillOpacity: {
            condition: { selection: "select", value: 1 },
            value: 0.3
          },
          strokeWidth: {
            condition: [
              {
                test: {
                  and: [{ selection: "select" }, 'length(data("select_store"))']
                },
                value: 2
              },
              { selection: "highlight", value: 1 }
            ],
            value: 0
          }
          //tooltip: { field: "", type: "quantitative" } //Tooltip now comes with the latest version of vega-embed
        },
        config: {
          scale: {
            bandPaddingInner: 0.2
          },
          invalidValues: "filter"
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
    DataBus.$on("Y-axisValue", yAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["y"]["field"] = yAxisSelected;
      //this.spec.encoding["tooltip"]["field"] = yAxisSelected;
    });
    DataBus.$on("X-axisValue", xAxisSelected => {
      //Receive the y-axis value from Axis component via DataBus
      this.spec.encoding["x"]["field"] = xAxisSelected;
    });
    DataBus.$on("yAggregateValue", yAggregateValue => {
      if (
        yAggregateValue != "" &&
        yAggregateValue != undefined &&
        yAggregateValue != null
      ) {
        this.spec.encoding["y"]["aggregate"] = yAggregateValue;
      }
    });
    /* DataBus.$on("xAggregateValue", xAggregateValue => {
      this.spec.encoding["x"]["aggregate"] = xAggregateValue;
    }); */
    DataBus.$on("groupByValue", groupByValue => {
      this.spec.encoding["detail"]["field"] = groupByValue;
    });
  },
  methods: {
    sendBarGraphSpec() {
      this.spec.encoding.y.aggregate = "sum"; //For an unknown reason, aggregate is populated with field names without this line
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


