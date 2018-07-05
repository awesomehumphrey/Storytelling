<template>
<div>
    <hr>
    <label for="y-axis">Y-Axis</label>
    <multiselect v-model="ySelected" placeholder="Select Y-axis" :searchable="true" :options="fieldNames" @select="sendYValues">  <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
    </multiselect>
    <br>
    <label for="x-axis">X-Axis</label>
    <multiselect v-model="xSelected" placeholder="Select X-axis" :searchable="true" :options="fieldNames" @select="sendXValues">  <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
    </multiselect>

</div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default {
    data() {
        return {
         //dataValues: 0,
         fieldNames: [],
         ySelected: '',  //Might change these to array depending on...
         xSelected: ''
        }
    },
    created() {
        /* DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
            this.dataValues = dataJson;
            console.log(this.dataValues);
        }); */
        DataBus.$on('fieldArray', (fieldArray) => { //Receive the data (field names) from Data component via DataBus
            this.fieldNames = fieldArray;
            //console.log(this.fieldNames);
        });
    },
    methods: {
        sendYValues(val) { // val contains currently selected ySelected value from select input
            DataBus.$emit('Y-axisValue', val); // Send Y-axis values through the event bus...
        },
        sendXValues(val) { // val contains currently selected xSelected value from select input
            DataBus.$emit('X-axisValue', val); // Send X-axis values through the event bus...
        }
    } ,
    watch: { // Watch for change in fieldNames which is triggered by a new file upload and reset the x and y axis and then resend their values
        fieldNames(val){
            this.ySelected = '';
            DataBus.$emit('Y-axisValue', this.ySelected);
            this.xSelected = '';
            DataBus.$emit('X-axisValue', this.xSelected);
        }
    } 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">


</style>


