<template>
  <div>
    <label for="filter1" style="display: block">Filter 1</label>
    <!--This uses https://uiv.wxsm.space/multi-select  different from used https://vue-multiselect.js.org/ in Axis component  -->
    <b-form-select
      v-model="selectedFieldNames"
      :options="fieldNames"
      class="mb-3"
      size="sm"
      style="display: inline !important; width: 35%;"
    >
      <template slot="first">
        <!-- this slot appears above the options from 'options' prop -->
        <option :value="null" disabled>Field names</option>
      </template>
    </b-form-select>
    <b-form-select
      v-model="selectedOperands"
      :options="optionsOperands"
      class="mb-3"
      size="sm"
      style="display: inline !important; width: 30%;"
    ></b-form-select>
    <b-form-select
      v-model="selectedValues"
      :options="options"
      class="mb-3"
      size="sm"
      style="display: inline !important; width: 30%;"
    >
      <template slot="first">
        <!-- this slot appears above the options from 'options' prop -->
        <option :value="null" disabled>Values</option>
      </template>
    </b-form-select>
    <div>
      Selected:
      <strong>{{ selectedOperands }}</strong>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";

export default {
  data() {
    return {
      selectedFieldNames: null,
      selectedOperands: null,
      selectedValues: [],
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true }
      ],
      options2: [
        { value: 1, label: "Option1" },
        { value: 2, label: "Option2" },
        { value: 3, label: "Option3" },
        { value: 4, label: "Option4" },
        { value: 5, label: "Option5" }
      ],
      optionsOperands: [
        { value: "equal", text: "=" },
        { value: "gt", text: ">" },
        { value: "gte", text: ">=" },
        { value: "lt", text: "<" },
        { value: "lte", text: "<=" }
      ],
      fieldNames: [],
      graphData: null
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
      console.log(this.graphData);
    });
  }
};
</script>