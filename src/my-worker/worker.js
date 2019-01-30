// worker.js
//var registerPromiseWorker = require('promise-worker/register');
import registerPromiseWorker from 'promise-worker/register'
var gs = require("@/graphscape-master/graphscape.js");

registerPromiseWorker(function(input) {
    //console.log(input.message);
    var chartSpec = input.message[0];
    var sequenceOptions = input.message[1]
    var result = gs.sequence(chartSpec, sequenceOptions);
    return result;
});