<template>
<div>
    <hr>
    <label for="y-axis">Y-Axis</label>
    <select v-model="ySelected" @change="sendYValues">  <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
        <option value="">Select y-axis field</option>
        <option v-for="(option, index) in fieldNames" v-bind:value="option">
            {{fieldNames[index]}}
        </option>
    </select>
    <br>
    <label for="x-axis">X-Axis</label>
    <select v-model="xSelected" @change="sendXValues"> <!--Might add the multiple property to make it accept multiple values stored in an array -->
        <option value="">Select x-axis field</option>
        <option v-for="(option, index) in fieldNames" v-bind:value="option">
            {{fieldNames[index]}}
        </option>
    </select>

</div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default {
    data() {
        return {
         dataValues: 0,
         fieldNames: '',
         ySelected: '',  //Might change these to array depending on...
         xSelected: ''
        }
    },
    created() {
        DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
            this.dataValues = dataJson;
            console.log(this.dataValues);

            //this.ySelected = '';
            //this.xSelected = '';
        });
        DataBus.$on('fieldArray', (fieldArray) => { //Receive the data (field names) from Data component via DataBus
            this.fieldNames = fieldArray;
            console.log(this.fieldNames);
        });
    },
    methods: {
        sendYValues() {
            DataBus.$emit('Y-axisValue', this.ySelected); // Send Y-axis values through the event bus...When I use the methods object, select returns previous value, not current
        },
        sendXValues() {
            DataBus.$emit('X-axisValue', this.xSelected); // Send X-axis values through the event bus...When I use the methods object, select returns previous value, not current
        }
    },
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

<style scoped>


</style>


