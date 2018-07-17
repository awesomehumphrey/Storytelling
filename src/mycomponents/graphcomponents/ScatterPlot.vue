<template>
<div>
   <b-img thumbnail fluid id="scatterplot" :src="require('@/assets/scatterplot.png')" alt="Thumbnail" v-on:click="sendScatterPlotSpec"/> <!--style="max-width: 7rem;" -->
   <b-popover :target="'scatterplot'"
                   :placement="'top'"
                   title="Scatterplot"
                   triggers="hover focus"
                   :content="'2 quantitative variables. Can be subsetted by colour and/or shape.'">
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
                "description": "scatterplot",
                "height": 500,  // Default height of graph
                "width": 650,   // Default width of graph, but is dynamically updated to fit the width of the device
                "autosize": {
                    "type": "fit",
                    "contains": "padding",
                    //"resize": true  //
                 },
                "data": {
                 "values": []
                 },
                "mark": {"type": "point", "cursor": "pointer"},
                "encoding": {
                "x": {"field": "", "type": "quantitative"},
                "y": {"field": "", "type": "quantitative"},
                "tooltip": {"field": "", "type": "quantitative"},
                "color": {"field": "", "type": "nominal"},
                "shape": {"field": "", "type": "nominal"}
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
        DataBus.$on('ToolTipLabel', (toolTipLabel) => {  //Receive the tooltip label value from Axis component via DataBus
			this.spec.encoding["tooltip"]["field"] = toolTipLabel;
        });
        DataBus.$on('Colour', (colour) => {  //Receive the colour value from Axis component via DataBus
			this.spec.encoding["color"]["field"] = colour;
        });
        DataBus.$on('Shape', (shape) => {  //Receive the colour value from Axis component via DataBus
			this.spec.encoding["shape"]["field"] = shape;
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
    margin-bottom: 5px;
}


</style>


