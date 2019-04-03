<template>
  <div>
    <div>
      <label for="aggregateY">Aggregate Y-Axis</label>
      <multiselect
        placeholder="Select Operation"
        v-model="yAxisOperator"
        :searchable="true"
        :options="aggregationOptions"
        @select="sendYAggregation"
      ></multiselect>
      <br>
      <label for="aggregateX">Aggregate X-Axis</label>
      <multiselect
        placeholder="Select Operation"
        v-model="xAxisOperator"
        :searchable="true"
        :options="aggregationOptions"
        @select="sendXAggregation"
      ></multiselect>
      <!-- <h5>{{yAxisOperator}}</h5> -->
    </div>
    <div
      v-if="(yAxisOperator!='' && yAxisOperator!=null) || (xAxisOperator!='' && xAxisOperator!=null)"
    >
      <hr>
      <label for="groupBy">Group By (optional)</label>
      <multiselect
        placeholder="Select field"
        v-model="groupBySelected"
        :searchable="true"
        :options="fieldNames"
        @select="sendGroupBy"
      ></multiselect>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      yAxisOperator: "",
      xAxisOperator: "",
      groupBySelected: "null", //If this is empty on initial page load, vegalite throws an error. However, it can be empty after that initial load
      aggregationOptions: ["sum", "average", "min", "max", "median", "count"],
      fieldNames: [],
      specFromMiniVis: false
    };
  },
  created() {
    DataBus.$on("fieldArray", fieldArray => {
      //Receive the data (field names) from Data component via DataBus
      this.fieldNames = fieldArray;
      this.specFromMinivis = false;
      //console.log(this.fieldNames);
    });
    //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("specFromGraphCanvas", newSpec => {
      //You receive this event when miniVis "send to data tab" button is clicked in graph canvas. Then reset the following axis values
      this.specFromMinivis = true;
      this.fieldNames = Object.keys(newSpec.data.values[0]);
      this.yAxisOperator = newSpec.encoding.y.aggregate;
      DataBus.$emit("yAggregateValue", this.yAxisOperator);
      this.xAxisOperator = newSpec.encoding.x.aggregate;
      DataBus.$emit("xAggregateValue", this.xAxisOperator);
      this.groupBySelected = newSpec.encoding.detail.field;
      DataBus.$emit("groupByValue", this.groupBySelected);
    });
  },
  methods: {
    sendYAggregation(val) {
      DataBus.$emit("yAggregateValue", val); // Send values through the event bus...
    },
    sendXAggregation(val) {
      DataBus.$emit("xAggregateValue", val); // Send values through the event bus...
    },
    sendGroupBy(val) {
      DataBus.$emit("groupByValue", val); // Send values through the event bus...
    }
  },
  watch: {
    fieldNames(val) {
      if (this.specFromMinivis == false) {
        this.yAxisOperator = "";
        DataBus.$emit("yAggregateValue", val);
        this.xAxisOperator = "";
        DataBus.$emit("xAggregateValue", val);
        this.groupBySelected = "";
        DataBus.$emit("groupByValue", val);
      }
    },
    yAxisOperator(val) {
      DataBus.$emit("yAggregateValue", val);
    },
    xAxisOperator(val) {
      DataBus.$emit("xAggregateValue", val);
    },
    groupBySelected(val) {
      DataBus.$emit("groupByValue", val);
    }
  }
};
</script>