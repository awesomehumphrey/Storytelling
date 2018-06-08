<template>
    <div class='dashboard' v-if="dataValues && this.encoding.y.field && this.encoding.x.field">
        <vega-lite :data="dataValues" :mark="mar" :encoding="encoding" :height="h" :width="w" :title="titl"/>
    </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default{
  data () {
    return {
    dataValues: [],
  titl: "A simple scatterplot",
  h: 500,
  w: 500,
  yAxis: '',
  xAxis: '',
  mar: "point",
  encoding: {
    "x": {"field": "", "type": "quantitative"},
    "y": {"field": "", "type": "quantitative"},
    "tooltip": {"field": "max", "type": "quantitative"}
  }
    }
  },
  
  created() {
		DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
			this.dataValues = dataJson;
		});
    DataBus.$on('Y-axisValue', (yAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.encoding["y"]["field"] = yAxisSelected;
      //console.log(this.encoding.y.field);
		});
    DataBus.$on('X-axisValue', (xAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.encoding["x"]["field"] = xAxisSelected;
		});
	}
}

</script>

<style scoped>


</style>


