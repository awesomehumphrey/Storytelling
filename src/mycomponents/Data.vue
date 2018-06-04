<template>
<div class="input">
    <hr>
    <h5>Data</h5>
    <input type="file" accept=".csv" @change="onFileChanged">
    <button class="button" @click="onUpload">Upload</button>
</div>
</template>

<script>
/* eslint-disable */
import Papa from 'papaparse'
import dl from 'datalib'

var data;
var csv;
var baa;

export default {
    data() {
        return {
         selectedFile: null
        }
    },
    methods: {
        onFileChanged (event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
        // upload file, get it from this.selectedFile
            Papa.parse(this.selectedFile, {
                header: false,
                dynamicTyping: true,
                complete: function(results) {
                data = results;
                console.log(data);
                csv = Papa.unparse(data);
               //console.log(csv);

                baa = dl.read(csv, {type: 'csv', parse: 'auto'});
               //console.log(dl.type.inferAll(baa));
                console.log(baa);
                console.log(results.data[0]);
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


