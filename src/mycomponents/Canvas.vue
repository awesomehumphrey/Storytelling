<template>
    <div class='dashboard' v-if="dataValues.length > 0">
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
    values: [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ],
  titl: "The simple bar chart",
  h: 500,
  w: 500,
  mar: "bar",
  encoding: {
    "x": {"field": "Item_Weight", "type": "ordinal"},
    "y": {"field": "Item_Visibility", "type": "quantitative"},
    "tooltip": {"field": "b", "type": "quantitative"}
  }
    }
  },
  created() {
		DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
			this.dataValues = dataJson;
		});
	}
}

</script>

<style scoped>


</style>


