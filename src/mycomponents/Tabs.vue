<template>
  <b-card no-body>
    <b-tabs pills card id="idForProgressBar" v-model="tabIndex">
      <b-tab title="DATA">
        <b-row>
          <b-col col sm="2" class="tabsections" id="datasection1">
            <b-card
              header-bg-variant="info"
              header-text-variant="white"
              header="Data & Encoding"
              header-class="text-center"
              style="height: 99%; width:100%; background-color: #f1f1f1;"
            >
              <b-row>
                <b-col id="dataupload">
                  <app-data></app-data>
                </b-col>
              </b-row>
              <b-row>
                <b-col id="measures">
                  <app-axis></app-axis>
                </b-col>
              </b-row>
              <b-row>
                <b-col id="otherSelections">
                  <app-otherselections></app-otherselections>
                  <!-- <hr> <h5>Others</h5>
              <p>Colour...</p>
              <p>Shape...</p>
              <p>Size...</p>
                  <p>Opacity...</p>-->
                  <!-- <p>Tooltip...</p> Bin, filter, order, sort,transform, aggregate-->
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <!-- <b-col col lg="1.5" class="tabsections" id="datasection2">2 of 4</b-col> -->
          <b-col col sm="9.5" class="tabsections">
            <b-row>
              <b-col col sm="2.5" class="canvas" id="filter">
                <b-card
                  header-bg-variant="info"
                  header-text-variant="white"
                  header="Aggregation"
                  header-class="text-center"
                  style="height: 99%; width:100%; background-color: #f1f1f1;"
                >
                  <app-filters></app-filters>
                </b-card>
              </b-col>

              <b-col col sm="7" class="canvas" id="datasection3">
                <app-canvas></app-canvas>
              </b-col>
              <b-col col sm="2.3" class="canvas" id="datasection4">
                <b-card
                  header-bg-variant="info"
                  header-text-variant="white"
                  header="Charts"
                  class="text-center"
                  style="height: 99%; width:100%; background-color: #f1f1f1;"
                >
                  <b-row>
                    <b-col>
                      <app-bargraph></app-bargraph>
                    </b-col>
                    <b-col>
                      <app-scatterplot></app-scatterplot>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <app-linegraph></app-linegraph>
                    </b-col>
                    <b-col>
                      <app-areachart></app-areachart>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <app-histogram></app-histogram>
                    </b-col>
                    <b-col>
                      <app-punchcard></app-punchcard>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <!-- <b-col col lg="2" class="tabsections" id="datasection4">4 of 4</b-col> -->
        </b-row>
      </b-tab>
      <b-tab title="GRAPH">
        <b-row>
          <b-col>
            <app-graphcanvas></app-graphcanvas>
          </b-col>
          <!-- <b-col class="tabsections"><app-graphcanvas></app-graphcanvas></b-col> -->
        </b-row>
      </b-tab>
      <b-tab title="STORY">
        <b-row>
          <b-col>
            <!-- <b-col class="tabsections"> -->
            <app-story></app-story>
          </b-col>
        </b-row>
        <!--Stories (Slideshows, gifs and videos) here... -->
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
/* eslint-disable */
import { DataBus } from "@/main";
import Data from "@/mycomponents/datatabcomponents/Data";
import Axis from "@/mycomponents/datatabcomponents/Axis";
import Canvas from "@/mycomponents/datatabcomponents/Canvas";
import OtherSelections from "@/mycomponents/datatabcomponents/OtherSelections";
import BarGraph from "@/mycomponents/graphcomponents/BarGraph";
import ScatterPlot from "@/mycomponents/graphcomponents/Scatterplot";
import LineGraph from "@/mycomponents/graphcomponents/LineGraph";
import AreaChart from "@/mycomponents/graphcomponents/AreaChart";
import Histogram from "@/mycomponents/graphcomponents/Histogram";
import PunchCard from "@/mycomponents/graphcomponents/PunchCard";
import GraphCanvas from "@/mycomponents/GraphCanvas";
import Story from "@/mycomponents/Story";
import Filters from "@/mycomponents/datatabcomponents/Filters";

export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  components: {
    "app-data": Data,
    "app-axis": Axis,
    "app-canvas": Canvas,
    "app-bargraph": BarGraph,
    "app-scatterplot": ScatterPlot,
    "app-otherselections": OtherSelections,
    "app-linegraph": LineGraph,
    "app-areachart": AreaChart,
    "app-histogram": Histogram,
    "app-punchcard": PunchCard,
    "app-graphcanvas": GraphCanvas,
    "app-story": Story,
    "app-filters": Filters
  },
  created() {
    //Get the click event from miniVis "send to Data tab" button
    DataBus.$on("sendToDataTabEvent", () => {
      this.tabIndex = 0; //Set data tab to active when "send to Data Tab" button is clicked in graphtab miniVis
    });
  }
};
</script>

<style>
body {
  overflow: auto !important; /* To overwrite overflow:hidden in reveal.css */
}
.tabsections {
  margin: 5px;
  min-height: 500px;
  /* border: 1px solid grey; */ /* border: 1px solid grey; */
  border-radius: 2px;
}

.canvas {
  margin: 1px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 5px;
}

#datasection1 {
  background-color: #f1f1f1;
  /* max-width: 240px; */
  padding: 0px;
  border-radius: 5px;
}

#datasection2 {
  background-color: blue;
}

#datasection3 {
  /*background-color: #f0f0f0; */
  padding: 20px;
  min-height: 500px;
  min-width: 500px;
}

#datasection4 {
  background-color: #f1f1f1;
  padding: 0px;
  min-height: 500px;
  border-radius: 5px;
  border: 0px;
}

#filter {
  background-color: #f1f1f1;
  padding: 0px;
  border-radius: 5px;
  border: 0px;
}
#dataupload {
  /* min-height: 100px; */
}

#measures {
  /* min-height: 200px; */
}

#otherSelections {
  /* min-height: 200px; */
}
</style>
