<template>
  <div>
    <!-- <hr> -->
    <br>
    <b-button
      v-b-modal="'AuthorInformationModal'"
      variant="primary"
      class="btn-block"
      size="md"
    >Author Details</b-button>
    <b-modal
      id="AuthorInformationModal"
      title-tag="h4"
      ok-title="Save"
      button-size="md"
      title="Author Details"
      size="lg"
      @ok="handleOk"
      @cancel
    >
      <b-form-group>
        <b-form-group label-cols-sm="3" label="Name:" label-align-sm="right" label-for="authorName">
          <b-form-input v-model="name" placeholder="Enter your name" id="authorName"/>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Presentation Title:"
          label-align-sm="right"
          label-for="presentationTitle"
        >
          <b-form-input
            v-model="presentationTitle"
            placeholder="Enter the title of your presentation"
            id="presentationTitle"
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="Institution:"
          label-align-sm="right"
          label-for="institution"
        >
          <b-form-input
            v-model="institution"
            placeholder="Enter your institution name"
            id="institution"
          />
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Email:" label-align-sm="right" label-for="email">
          <b-form-input
            v-model="email"
            placeholder="Enter your email address"
            type="email"
            id="email"
          />
        </b-form-group>
      </b-form-group>
    </b-modal>
    <br>
    <!-- <hr> -->
    <br>
  </div>
</template>
<script>
/* eslint-disable */

import { DataBus } from "@/main";

export default {
  data() {
    return {
      name: "",
      presentationTitle: "",
      institution: "",
      email: "",
      today: new Date()
    };
  },
  created() {
    DataBus.$on("graphCanvasCleared", () => {
      //When graphCanvas is cleared i.e. all nodes are deleted, reinitialise
      this.name = "";
      this.presentationTitle = "Presentation Title";
      this.institution = null;
      this.email = null;
      this.handleOk();
    });
  },
  methods: {
    handleDate() {
      this.today = new Date();
      var day = this.today.getDate();
      var year = this.today.getFullYear();
      var monthsArray = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );
      var month = monthsArray[this.today.getMonth()];

      if (day < 10) {
        day = "0" + day;
      }

      this.today = month + " " + day + ", " + year;
      return this.today;
    },
    handleOk() {
      var authorDetails = {};
      authorDetails.name = this.name;
      authorDetails.presentationTitle = this.presentationTitle;
      authorDetails.institution = this.institution;
      authorDetails.email = this.email;
      authorDetails.date = this.handleDate();

      DataBus.$emit("authorDetails", authorDetails);
    }
  },
  computed: {
    nameState() {
      // return this.name.length > 2 ? true : false;
    }
  }
};
</script>

