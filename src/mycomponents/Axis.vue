<template>
<div>
    <hr>
    <label for="y-axis">Y-Axis</label>
    <select v-model="ySelected">
        <option v-for="(option, index) in fieldNames" v-bind:value="fieldNames[index]">
            {{fieldNames[index]}}
        </option>
    </select>
    <span>Selected: {{ ySelected }}</span>
    <br>
    <label for="x-axis">X-Axis</label>
    <select v-model="xSelected">
        <option v-for="(option, index) in fieldNames" v-bind:value="fieldNames[index]">
            {{fieldNames[index]}}
        </option>
    </select>
    <span>Selected: {{ xSelected }}</span>

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
         ySelected: '',
         xSelected: ''
        }
    },
    created() {
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
    }
}

</script>

<style scoped>


</style>


