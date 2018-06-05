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
import dl from 'datalib'
import * as dataForge from 'data-forge';
import { DataBus } from '@/main';


var data;
var csv;
var baa;
var df;

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
                
                //console.log(baa);
                DataBus.$emit('okaaay', data.data);
                }
            });
            
        }//,
        // loadedData() {
        //     console.log(data);
        //     DataBus.$emit('okaaay', data);
        // }   
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


