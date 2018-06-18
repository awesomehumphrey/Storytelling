<template>
<div>
   <b-img thumbnail fluid :src="require('@/assets/scatterplot.png')" alt="Thumbnail" v-on:click="sendScatterPlotSpec" style="max-height: 7rem;" /> <!--style="max-width: 7rem;" -->
</div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default{
    data() {
        return {
           spec: {
                "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
                "description": "scatterplot",
                "height": 500,  // Default height of graph
                "width": 650,   // Default width of graph, but is dynamically updated to fit the width of the device
                "autosize": {
                    "type": "fit",
                    "contains": "padding"
                 },
                "data": {
                 "values": []
                 },
                "mark": "point",
                "encoding": {
                "x": {"field": "", "type": "quantitative"},
                "y": {"field": "", "type": "quantitative"}
                }
            } 
        }
    },
    created() {
		DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
			this.spec.data.values = dataJson;
		});
        DataBus.$on('Y-axisValue', (yAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.spec.encoding["y"]["field"] = yAxisSelected;
		});
        DataBus.$on('X-axisValue', (xAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.spec.encoding["x"]["field"] = xAxisSelected;
		});
	},
    methods: {
        sendScatterPlotSpec() {
            DataBus.$emit('graphSchema', this.spec);
        }
    }
}

</script>

<style scoped>
div {
    cursor: pointer;
}


</style>


