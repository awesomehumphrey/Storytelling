<template>
  <b-card no-body>
  <b-tabs card>
    <b-tab title="DATA" active>
      <b-row>
        <b-col col lg="2" class="tabsections" id="datasection1">
          <b-row>
            <b-col id="dataupload">
              <hr>
              <h5>Data</h5>
              <p>Data Upload...</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col id="measures">
              <hr>
              <h5>Measures</h5>
              <p>Measures dropdown....</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col id="dimensions">
              <hr>
              <h5>Dimensions</h5>
              <p>Dimensions dropdown...</p>
            </b-col>
          </b-row>
        </b-col>
        <!-- <b-col col lg="1.5" class="tabsections" id="datasection2">2 of 4</b-col> -->
        <b-col col lg="9.5" class="tabsections" id="datasection3">
          <b-row>
            <b-col col lg="9" class="canvas">1</b-col>
            <b-col col lg="2.5" class="canvas">2</b-col>
          </b-row>
        </b-col>
        <!-- <b-col col lg="2" class="tabsections" id="datasection4">4 of 4</b-col> -->
    </b-row>
    </b-tab>
    <b-tab title="STORY">
      Stories here...
    </b-tab>
  </b-tabs>
</b-card>
</template>

<script>
/* eslint-disable */

export default {
  
}
</script>

<style>
.tabsections {
  margin: 5px;
  min-height: 500px;
  border: 1px solid grey;
  border-radius: 2px;
}

.canvas {
  margin: 1px;
  min-height: 500px;
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

#dimensions {
  min-height: 200px;  
}

</style>


