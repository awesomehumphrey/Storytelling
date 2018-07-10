<template>
  <div ref="graphCanvas">
    <div ref="graphVis" id="graphVis">Testing</div>
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';
import vis from 'vis';

    var options = {
                    manipulation: {
                        enabled: true,
                        initiallyActive: true,
                        deleteNode: function (deleteData, callback) {
                            callback(deleteData)
                        }
                    }
                }
export default{

        data() {
            return {
                network: null,
                nodes: [
                    { id: 0, label: '0' },
                    { id: 1, label: '1' },
                    { id: 2, label: '2' },
                    { id: 3, label: '3' },
                    { id: 4, label: '4' }
                ],
                edges: [],
                
                container: ''
            }
        },

        mounted() {
            this.container = this.$refs.graphVis;
            var data = {
                nodes: this.nodes,
                edges: this.edges
            };
            this.network = new vis.Network(this.container, data, options);
        }
}

</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css");
#graphVis {
    width: 800px;
    height: 400px;
    border: 1px solid lightgray;
}

</style>


