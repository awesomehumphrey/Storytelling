<template>
  <div ref="graphCanvas">
    <div ref="graphVis" id="graphVis" class="vis-network">Testing</div>
    <b-button size="md" variant="primary" class="float-right">Done</b-button>

    <!--<b-button size="md" variant="primary" class="float-left">Import</b-button>
    <b-button size="md" variant="primary" class="float-left">Export</b-button> -->
  </div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';
import vis from 'vis';

var  nodes = new vis.DataSet([
    { id: 0, index: 0, label: '0', x: -147, y: -77 },
    { id: 1, index: 1, label: '1', x: -186, y: 88 },
    { id: 2, index: 2, label: '2', x: 8, y: 160 },
    { id: 3, index: 3, label: '3', x: 159, y: 28 },
    { id: 4, index: 4, label: '4', x: 45, y: -111 }
    ]);
                
var  edges = new vis.DataSet([
    { from: 0, to: 1, id: 99},
    { from: 0, to: 1, id: 1},
    { from: 0, to: 2, id: 2 },
    { from: 0, to: 3, id: 3 },
    { from: 0, to: 4, id: 4},
    { from: 0, to: 4 , id: 5},
    { from: 1, to: 2, id: 6},
    { from: 1, to: 3 , id: 7},
    { from: 1, to: 3 , id: 8},
    { from: 2, to: 3 , id: 9},
    { from: 2, to: 4 , id: 10},
    { from: 3, to: 4 , id: 11}
    ]);

// provide the data in the vis format:
var data = {
    nodes: nodes,
    edges: edges
};

var locales = {
    en: {
        edit: 'Edit',
        del: 'Delete selected',
        back: 'Back',
        addNode: 'Add Node',
        addEdge: 'Add Edge',
        editNode: 'Edit Node',
        editEdge: 'Edit Edge',
        addDescription: 'Click in an empty space to place a new node.',
        edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
        createEdgeError: 'Cannot link edges to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
    }
}

var options = {
    autoResize: true,
    width: '99%',
    height: '99%',
    locale: 'en',
    locales: locales,
    interaction:{
        hover: true,
    },
    manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode(nodeData, callback) {
            DataBus.$emit('add-node', nodeData);
        callback(nodeData);
        },
        addEdge(edgeData, callback) {
            if (edgeData.from === edgeData.to) {
                alert('You cannot connect the node to itself!');
            } else {
                DataBus.$emit('add-edge', edgeData);
                callback(edgeData)
            }
        },
        deleteNode(deleteData, callback) {
            DataBus.$emit('delete-node', deleteData);
            callback(deleteData)
        },
        deleteEdge(deleteData, callback) {
            DataBus.$emit('delete-edge', deleteData);
            callback(deleteData)
         }
    },
    nodes:{
        borderWidth: 1,
        shape: 'ellipse',
        size: 35,
        shadow:true,
        physics: false
    }   
}

export default{
    data() {
        return {
            network: null,
            count: 15,                
            container: ''
        }
    },
    created() {
        DataBus.$on('add-node', this.addNode);
        DataBus.$on('delete-node', this.deleteNode);
        DataBus.$on('add-edge', this.addEdge);
        DataBus.$on('delete-edge', this.deleteEdge);
    },
    mounted() {
        this.container = this.$refs.graphVis;
        /* var data = {
            nodes: this.nodes,
            edges: this.edges
        }; */
        window.network = new vis.Network(this.container, data, options);
        },
    beforeDestroy() {
        DataBus.$off('add-node', this.addNode);
        DataBus.$off('delete-node', this.deleteNode);
        DataBus.$off('add-edge', this.addEdge);
        DataBus.$off('delete-edge', this.deleteEdge);
    },
    methods: {
        addNode(nodeData) {
            nodes.update(nodeData)
    	    console.log(nodeData);
            console.log(nodes);
        },

        deleteNode(deleteData) {
     
            console.log(nodes)
        },

        addEdge(edgeData) {
            //var nodeOne = nodes.get(edgeData.from);
            //var nodeTwo = nodes.get(edgeData.to);
            edgeData.id = this.count++;
            edges.update(edgeData);
            console.log(edgeData);
            console.log(edges);
        },

        deleteEdge(deleteData) {

            console.log(edges);
     
        }
    }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css");
#graphVis {
    min-width: 500px;
    min-height: 500px;
    border: 1px solid lightgray;
}
.vis-network {
    height: 600px;
    min-width: 500px;
}
</style>