<template>
  <div>
    <hr>
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
    <hr>
    <b-button
      variant="primary"
      class="btn-block"
      size="md"
      @click="downloadSlides()"
    >Download Slides</b-button>
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
      email: ""
    };
  },
  methods: {
    handleOk() {
      var today = new Date();
      var day = today.getDate();
      var year = today.getFullYear();
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
      var month = monthsArray[today.getMonth()];

      if (day < 10) {
        day = "0" + day;
      }

      today = month + " " + day + ", " + year;
      var authorDetails = {};
      authorDetails.name = this.name;
      authorDetails.presentationTitle = this.presentationTitle;
      authorDetails.institution = this.institution;
      authorDetails.email = this.email;
      authorDetails.date = today;

      DataBus.$emit("authorDetails", authorDetails);
    },
    downloadSlides() {
      const puppeteer = require("puppeteer");
      var test = document.querySelector("#pres");
      window.print();
      /* 
      (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://news.ycombinator.com", {
          waitUntil: "networkidle2"
        });
        await page.pdf({ path: "hn.pdf", format: "A4" });

        await browser.close();
      })(); */
    }
  },
  computed: {
    nameState() {
      return this.name.length > 2 ? true : false;
    }
  }
};
</script>

