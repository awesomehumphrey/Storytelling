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
import * as dataForge from 'data-forge';


var data;
var csv;
var baa;
var df;

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
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                data = results;
                console.log(data);
                csv = Papa.unparse(data);
               //console.log(csv);

                //baa = dl.read(csv, {type: 'csv', parse: 'auto'});
               //console.log(dl.type.inferAll(baa));
                //console.log(baa);
                //console.log(results.data[0]);

                df = dataForge.fromCSV(csv);
                var newDf = df.subset(["Year", "Month"]);
                baa = newDf.toArray();
                //baa = Papa.unparse(baa);
                
                console.log(baa);
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


