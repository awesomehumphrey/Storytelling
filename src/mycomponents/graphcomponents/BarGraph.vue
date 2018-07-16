<template>
<div>
   <b-img thumbnail id="bargraph" fluid :src="require('@/assets/bar.png')" alt="Thumbnail" v-on:click="sendBarGraphSpec" /> <!--style="max-width: 7rem;" -->
   <b-popover :target="'bargraph'"
                   :placement="'top'"
                   title="Bar graph"
                   triggers="hover focus"
                   :content="'1 categorical variable and 1 quantitative variable.'">
    </b-popover>
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
                "description": "barChart",
                "height": 500,  // Default height of graph
                "width": 650,   // Default width of graph, but is dynamically updated to fit the width of the device
                "autosize": {
                    "type": "fit",
                    "contains": "padding",
                    "resize": true  //
                 },
                "data": {
                 "values": []
                 },
                "mark": {"type": "bar", "cursor": "pointer"},
                "encoding": {
                "x": {"field": "", "type": "ordinal"},
                "y": {"field": "", "type": "quantitative"},
                "tooltip": {"field": "", "type": "quantitative"}
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
            this.spec.encoding["tooltip"]["field"] = yAxisSelected;
		});
        DataBus.$on('X-axisValue', (xAxisSelected) => {  //Receive the y-axis value from Axis component via DataBus
			this.spec.encoding["x"]["field"] = xAxisSelected;
        });
	},
    methods: {
        sendBarGraphSpec() {
            DataBus.$emit('graphSchema', this.spec);
        }
    }
}

</script>

<style scoped>
div {
    cursor: pointer;
    margin-bottom: 5px;
}


</style>


