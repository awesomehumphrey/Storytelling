<template>
  <div ref="canvas" v-on:resize="handleResize()">
    <div v-if="this.spec.data.values.length !== 0 && this.spec.encoding.y.field && this.spec.encoding.x.field">
    <vega-lite :spec="spec"></vega-lite>
    <!-- <div class='dashboard' v-if="dataValues && this.encoding.y.field && this.encoding.x.field">
        <vega-lite :data="dataValues" :mark="mar" :encoding="encoding" :height="h" :width="w" :title="titl"/>
    </div> -->
    </div>
    <div v-else-if="this.spec.description === 'histogram'">
    <vega-lite :spec="spec"></vega-lite>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default{
  data () {
    return {
      spec: {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "description": "Graph",
        "data": {
        "values": []
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);   
  },  
  created() {
    DataBus.$on('graphSchema', (graphSpec) => {  //Receive the data (array of data values) from Data component via DataBus
      this.spec = graphSpec;
      this.spec.width = this.$refs.canvas.clientWidth - 50;
     // window.addEventListener('resize', this.handleResize);
		});
/* 		DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
			this.dataValues = dataJson;
		});
    DataBus.$on('Y-axisValue', (yAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.encoding["y"]["field"] = yAxisSelected;
      //console.log(this.encoding.y.field);
		});
    DataBus.$on('X-axisValue', (xAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.encoding["x"]["field"] = xAxisSelected;
		}); */
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // whenever the document is resized, re-set the 'clientWidth' variable
    handleResize (event) {
      this.spec.width = this.$refs.canvas.clientWidth - 50;
      //console.log(this.$refs.canvas.clientWidth);
    }
  }
}

</script>

<style scoped>


</style>


