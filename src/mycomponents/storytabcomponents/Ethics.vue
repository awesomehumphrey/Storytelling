<template>
  <div>
    <b-button v-b-modal="'EthicsModal'" variant="primary" class="btn-block" size="md">Ethics Record</b-button>
    <b-modal
      id="EthicsModal"
      title-tag="h4"
      ok-title="Save"
      button-size="md"
      title="Ethical Consideration"
      size="lg"
      @ok="handleOk"
      @cancel
    >
      <b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="Data Source:"
          label-align-sm="right"
          label-for="dataSource"
        >
          <b-form-input v-model="dataSource" placeholder="Enter data source" id="dataSource"/>
        </b-form-group>
        <b-form-checkbox class="ethics" v-model="normalisation" name="Normalisation">Normalisation</b-form-checkbox>
        <multiselect
          v-if="normalisation"
          :multiple="true"
          placeholder="Select normalised variables"
          :options="fieldNames"
          v-model="normalisationValue"
          class="selection"
        ></multiselect>
        <b-form-checkbox class="ethics" v-model="aggregation" name="Aggregation">Aggregation</b-form-checkbox>
        <multiselect
          v-if="aggregation"
          :multiple="true"
          placeholder="Select aggregated variables"
          :options="fieldNames"
          v-model="aggregatedValue"
          class="selection"
        ></multiselect>
        <b-form-group
          label-cols-sm="3"
          label="Other Comments"
          label-align-sm="right"
          label-for="comments"
        >
          <b-form-textarea
            rows="3"
            max-rows="6"
            v-model="otherComments"
            placeholder="Enter other comments here"
            id="comments"
          />
        </b-form-group>
      </b-form-group>
    </b-modal>
    <br>
    <hr>
  </div>
</template>
<script>
/* eslint-disable */

import { DataBus } from "@/main";

export default {
  data() {
    return {
      dataSource: "",
      otherComments: "",
      fieldNames: [],
      normalisation: false,
      aggregation: false,
      normalisationValue: [],
      aggregatedValue: []
    };
  },
  created() {
    DataBus.$on("fieldArray", fieldArray => {
      //Receive the data (field names) from Data component via DataBus
      this.fieldNames = fieldArray;
    });

    DataBus.$on("graphCanvasCleared", () => {
      //When graphCanvas is cleared i.e. all nodes are deleted, reinitialise
      this.dataSource = "";
      this.otherComments = "";
      this.normalisation = false;
      this.aggregation = false;
      this.normalisationValue = [];
      this.aggregatedValue = [];
      this.handleOk();
    });
  },
  methods: {
    handleOk() {
      DataBus.$emit("normalisation", this.normalisationValue);
      DataBus.$emit("aggregation", this.aggregatedValue);
      DataBus.$emit("dataSource", this.dataSource);
      DataBus.$emit("otherComments", this.otherComments);
    }
  },
  watch: {
    normalisation(val) {
      if (val == false) {
        this.normalisationValue = [];
      }
    },
    aggregation(val) {
      if (val == false) {
        this.aggregatedValue = [];
      }
    }
  }
};
</script>
<style>
.ethics {
  display: block;
}
.selection {
  margin-bottom: 15px;
}
</style>

