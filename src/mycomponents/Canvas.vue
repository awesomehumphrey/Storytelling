<template>
  <div ref="canvas">
  <div v-if="this.spec.data.values.length !== 0 && this.spec.encoding.y.field && this.spec.encoding.x.field">
    <vega-lite :spec="spec"></vega-lite>
    <!-- <div class='dashboard' v-if="dataValues && this.encoding.y.field && this.encoding.x.field">
        <vega-lite :data="dataValues" :mark="mar" :encoding="encoding" :height="h" :width="w" :title="titl"/>
    </div> -->
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
  /* mounted() {
    this.spec.height = this.$refs.canvas.clientHeight;
    this.spec.width = this.$refs.canvas.clientWidth;
    console.log(this.$refs.canv.clientHeight);
  },  */
  created() {
    DataBus.$on('graphSchema', (graphSpec) => {  //Receive the data (array of data values) from Data component via DataBus
      this.spec = graphSpec;
      this.spec.width = this.$refs.canvas.clientWidth - 50;
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
  }
}

</script>

<style scoped>


</style>


