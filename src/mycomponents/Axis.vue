<template>
<div>
    <hr>
    <label for="y-axis">Y-Axis</label>
    <b-form-select v-model="ySelected" @change="sendYValues">  <!--Might add the multiple property to make it accept multiple values stored in an array/ or split into y and x into separate components -->
        <option value="">Select y-axis field</option>
        <option v-for="(option, index) in fieldNames" v-bind:value="fieldNames[index]">
            {{fieldNames[index]}}
        </option>
    </b-form-select>
    <br>
    <label for="x-axis">X-Axis</label>
    <b-form-select v-model="xSelected" @change="sendXValues"> <!--Might add the multiple property to make it accept multiple values stored in an array -->
        <option value="">Select x-axis field</option>
        <option v-for="(option, index) in fieldNames" v-bind:value="fieldNames[index]">
            {{fieldNames[index]}}
        </option>
    </b-form-select>

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
         xSelected: 'fdsf'
        }
    },
    created() {
         console.log(this.selected);
        DataBus.$on('dataJson', (dataJson) => {  //Receive the data (array of data values) from Data component via DataBus
            this.dataValues = dataJson;
            console.log(this.dataValues);
            this.ySelected = '';
            this.xSelected = '';
        });
        DataBus.$on('fieldArray', (fieldArray) => { //Receive the data (field names) from Data component via DataBus
            this.fieldNames = fieldArray;
            console.log(this.fieldNames);
        });
    },
    computed: {
        sendYValues() {
            return DataBus.$emit('Y-axisValue', this.ySelected); // Send Y-axis values through the event bus
            console.log(this.ySelected);
            //alert('Select Changed');
        },
        sendXValues() {
            return DataBus.$emit('X-axisValue', this.xSelected); // Send X-axis values through the event bus
            //console.log(this.ySelected);
        }
    } 
}

</script>

<style scoped>


</style>


