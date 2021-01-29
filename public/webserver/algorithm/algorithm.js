var fs = require('fs');
var AlgorithmData = require('../algorithmdata.json');
var MediaData = require('../data.json');
var prevData = AlgorithmData.find(function (item) { return item.prevSelected == true; });
var selection = [];
var i = 0, prevId = 0, id = 0;
function sum(total, num) {
    return total + num;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function weight(money, sum) {
    return (money / sum) * 10;
}
function finished(err) {
    console.log('Data written');
}
//console.log(AlgorithmData.map(a => a.calculatedTime));
//create selection of companies with samllest and same calculatedTime
AlgorithmData.sort(function (a, b) { return a.calculatedTime - b.calculatedTime; });
for (i = 0; i < AlgorithmData.length; i++) {
    if (AlgorithmData[0].calculatedTime == AlgorithmData[i].calculatedTime) {
        selection[i] = AlgorithmData[i].id;
    }
}
AlgorithmData.sort(function (a, b) { return a.id - b.id; });
//remove previous id from the selection
if (typeof prevData !== "undefined") {
    for (i = 0; i < selection.length; i++) {
        if (selection[i] == prevData.id) {
            selection.splice(i, 1);
        }
    }
}
console.log(selection);
if (selection.length == 0) {
    selection = [];
    AlgorithmData.sort(function (a, b) { return a.calculatedTime - b.calculatedTime; });
    for (i = 1; i < AlgorithmData.length; i++) {
        if (AlgorithmData[1].calculatedTime == AlgorithmData[i].calculatedTime) {
            selection[i - 1] = AlgorithmData[i].id;
        }
    }
    AlgorithmData.sort(function (a, b) { return a.id - b.id; });
}
id = selection[Math.floor(Math.random() * selection.length)];
AlgorithmData[id].calculatedTime += Math.round(AlgorithmData[id].contentLength / weight(AlgorithmData[id].credits, AlgorithmData.map(function (a) { return a.credits; }).reduce(sum)));
AlgorithmData[id].playbackTime += AlgorithmData[id].contentLength;

console.log(id);
if (typeof prevData !== "undefined") {
AlgorithmData[AlgorithmData.findIndex(function (item) { return item.prevSelected == true; })].prevSelected = 0;
}
AlgorithmData[AlgorithmData.findIndex(function (item) { return item.id == id; })].prevSelected = 1;

AlgorithmData = JSON.stringify(AlgorithmData, null, 2);
fs.writeFile('./webserver/algorithmdata.json', AlgorithmData, finished);

while (MediaData[4].id != id) {
    MediaData.unshift(MediaData.pop());
}
MediaData = JSON.stringify(MediaData, null, 2);
fs.writeFile('./webserver/autodata.json', MediaData, finished);
//var MediaData = JSON.parse(MediaData);
//console.log(selection);
//console.log(AlgorithmData); 
// console.log(lastUpdate);
// console.log(money);
// console.log(topicality);
// console.log(noise, id, money.length);
