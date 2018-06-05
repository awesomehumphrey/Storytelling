<template>
<div class="input">
    <hr>
    <h5>Data</h5>
    <input type="file" accept=".csv" @change="onFileChanged">
    <button class="button" @click="onUpload()">Upload</button>
    <!--<p @click="loadedData"> Click</p> -->
</div>
</template>

<script>
/* eslint-disable */
import Papa from 'papaparse'
import dl from 'datalib'    // ToDo - remove datalib and dataforge from Data component and use only in the components they are needed
import * as dataForge from 'data-forge';
import { DataBus } from '@/main';

export default {
    data() {
        return {
         selectedFile: null
         //data: 0
        }
    },
    methods: {
        onFileChanged (event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
        // upload file, get it from this.selectedFile
            Papa.parse(this.selectedFile, { //parse blob into array of Json(if header is true) or array of rows (if header is false)
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                //data = results;   // results is an array of three objects: data, errors, meta (fields is contained within meta)
                DataBus.$emit('dataJson', results.data); // Send the data values through the event bus
                DataBus.$emit('fieldArray', results.meta.fields);// Send the field names through the event
                }
            });
        } 
    }
}
</script>

<style scoped>
.button{
    background-color: #33cccc;
    cursor: pointer;
}

.input{
    overflow: hidden;
}

</style>


