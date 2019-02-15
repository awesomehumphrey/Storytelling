<template>
  <div>
    <label for="filter1" style="display: block">Filter 1</label>
    <div>
      <multi-select
        v-model="fieldSelected"
        search
        historyButton
        :btnLabel="fieldBtnLabel"
        :selectOptions="fieldNames"
        style="width:35%; display: inline;"
      />
      <multi-select
        v-model="operandSelected"
        search
        historyButton
        :btnLabel="operandBtnLabel"
        :selectOptions="optionsOperands"
        style="width:30%; display: inline;"
      />
      <multi-select
        v-model="dataSelected"
        search
        historyButton
        :btnLabel="dataBtnLabel"
        :selectOptions="fieldNames"
        style="width:35%; display: inline;"
      />
      <!-- <h5>{{fieldSelected}}</h5> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";
import multiSelect from "vue-multi-select";
import "vue-multi-select/dist/lib/vue-multi-select.min.css";

export default {
  data() {
    return {
      fieldSelected: [],
      operandSelected: [],
      dataSelected: [],
      fieldBtnLabel: "Fields",
      operandBtnLabel: "",
      dataBtnLabel: "Values",
      fieldNames: [],
      graphData: null,
      optionsOperands: [
        { value: "equal", name: "=" },
        { value: "gt", name: ">" },
        { value: "gte", name: ">=" },
        { value: "lt", name: "<" },
        { value: "lte", name: "<=" }
      ]
    };
  },
  created() {
    DataBus.$on("fieldArray", fieldArray => {
      //Receive the data (field names) from Data component via DataBus
      this.fieldNames = fieldArray;
      //console.log(this.fieldNames);
    });
    DataBus.$on("dataJson", dataJson => {
      //Receive the data (array of data values) from Data component via DataBus
      this.graphData = dataJson;
      //console.log(this.graphData);
    });
  },
  methods: {
    doSomething(a) {
      console.log(a);
    }
  },
  components: {
    multiSelect
  },
  watch: {
    fieldSelected(val) {
      if (val.length != 0) {
        this.doSomething(val);
      } else {
        console.log("Nullll");
      }
    }
  }
};
</script>