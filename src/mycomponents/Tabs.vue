<template>
  <b-card no-body>
  <b-tabs card>
    <b-tab title="DATA" active>
      <b-row>
        <b-col col lg="2" class="tabsections" id="datasection1">
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
              <p>Opacity...</p> -->
             <!-- <p>Tooltip...</p> Bin, filter, order, sort,transform, aggregate-->
            </b-col>
          </b-row>
        </b-col>
        <!-- <b-col col lg="1.5" class="tabsections" id="datasection2">2 of 4</b-col> -->
        <b-col col lg="9.5" class="tabsections" id="datasection3">
          <b-row>
            <b-col col lg="9" class="canvas">1 <app-canvas></app-canvas></b-col>
            <b-col col lg="2.5" class="canvas">
              <b-row>
                <b-col><app-bargraph></app-bargraph></b-col>
                <b-col><app-scatterplot></app-scatterplot></b-col>
              </b-row>
              <b-row>
                <b-col><app-linegraph></app-linegraph></b-col>
                <b-col><app-areachart></app-areachart></b-col>
              </b-row>
              <b-row>
                <b-col><app-histogram></app-histogram></b-col>
                <b-col><app-punchcard></app-punchcard></b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <!-- <b-col col lg="2" class="tabsections" id="datasection4">4 of 4</b-col> -->
    </b-row>
    </b-tab>
    <b-tab title="GRAPH">
      Graph (Visualisation nodes and edges) here...
    </b-tab>
    <b-tab title="STORY">
      Stories (Slideshows, gifs and videos) here...
    </b-tab>
  </b-tabs>
</b-card>
</template>

<script>
/* eslint-disable */
import Data from '@/mycomponents/Data';
import Axis from '@/mycomponents/Axis';
import Canvas from '@/mycomponents/Canvas';
import BarGraph from '@/mycomponents/graphcomponents/BarGraph';
import ScatterPlot from '@/mycomponents/graphcomponents/Scatterplot';
import otherSelections from '@/mycomponents/OtherSelections';
import LineGraph from '@/mycomponents/graphcomponents/LineGraph';
import AreaChart from '@/mycomponents/graphcomponents/AreaChart';
import Histogram from '@/mycomponents/graphcomponents/Histogram';
import PunchCard from '@/mycomponents/graphcomponents/PunchCard';

export default {
  components: {
        'app-data': Data,
        'app-axis': Axis,
        'app-canvas': Canvas,
        'app-bargraph': BarGraph,
        'app-scatterplot': ScatterPlot,
        'app-otherselections': otherSelections,
        'app-linegraph': LineGraph,
        'app-areachart': AreaChart,
        'app-histogram': Histogram,
        'app-punchcard': PunchCard
      },
}
</script>

<style>
.tabsections {
  margin: 5px;
  min-height: 600px;
  border: 1px solid grey;
  border-radius: 2px;
}

.canvas {
  margin: 1px;
  min-height: 600px;
  border: 1px solid grey;
  border-radius: 2px;
}

#datasection1 {
  background-color: #f1f1f1; 
}

#datasection2 {
  background-color: blue;
}

#datasection3 {
  background-color: #f0f0f0;
}

#datasection4 {
  background-color: #b9428b;
}

#dataupload {
  min-height: 100px;
}

#measures {
  min-height: 200px;  
}

#otherSelections {
  min-height: 200px;  
}

</style>


