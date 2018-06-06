<template>
<div class="input">
    <hr>
    <h5>Data</h5>
    <b-form-file v-model="selectedFile" placeholder="Select a file..." accept=".csv" @change="onFileChanged" no-drop></b-form-file>
</div>
</template>

<script>
/* eslint-disable */
import Papa from 'papaparse'
import { DataBus } from '@/main';

export default {
    data() {
        return {
         selectedFile: null
        }
    },
    methods: {
        onFileChanged (event) {
            this.selectedFile = event.target.files[0];

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

</style>


