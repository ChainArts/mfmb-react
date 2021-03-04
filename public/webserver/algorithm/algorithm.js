var fs = require('fs-extra');
const homedir = require('os').homedir();
var AlgorithmData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json');
var MediaData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/data.json');
var prevData = AlgorithmData.find(function (item) { return item.prevSelected == true; });
var selection = [];
var i = 0, prevId = 0, companyID = 0;
var priorityMode = false;
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




//if(!priorityMode)

//create selection of companies with samllest and same calculatedTime
AlgorithmData.sort(function (a, b) { return a.calculatedTime - b.calculatedTime; });
for (i = 0; i < AlgorithmData.length; i++) {                                                  
    if (AlgorithmData[0].calculatedTime == AlgorithmData[i].calculatedTime) {
        selection.push(AlgorithmData[i].companyID);
    }
}

//remove previous companyID from the selection
if (typeof prevData !== "undefined") {
    for (i = 0; i < selection.length; i++) {
        if (selection[i] == prevData.companyID) {
            selection.splice(i, 1);
        }
    }

}
if (selection.length == 0) {
    selection = [];

    for (i = 1; i < AlgorithmData.length; i++) {
        if (AlgorithmData[1].calculatedTime == AlgorithmData[i].calculatedTime) {
            selection[i - 1] = AlgorithmData[i].companyID;
        }
    }
}
AlgorithmData.sort(function (a, b) { return a.companyID - b.companyID; });
companyID = selection[Math.floor(Math.random() * selection.length)];
console.log("id is " + companyID);


var media_selection = [];
MediaData.forEach(function (media){
    if(media.companyID == companyID){media_selection.push(media)}
});



if(media_selection.length > 1){
    var prevMedia = media_selection.find(function (item) { return item.prevSelected == true});

    if (typeof prevMedia !== "undefined") {
        for (i = 0; i < media_selection.length; i++) {
            if (media_selection[i].id == prevMedia.id) {
                media_selection.splice(i, 1);
            }
        }
    }
}

var media = media_selection[Math.floor(Math.random() * media_selection.length)];


if (typeof prevMedia !== "undefined") {
    MediaData[MediaData.findIndex(function (item) { return item.prevSelected == true && item.companyID == prevMedia.companyID})].prevSelected = 0;
}
MediaData[MediaData.findIndex(function (item) { return item.companyID == media.companyID && item.campaignID == media.campaignID})].prevSelected = 1;

if (typeof prevData !== "undefined") {
    AlgorithmData[AlgorithmData.findIndex(function (item) { return item.prevSelected == true; })].prevSelected = 0;
}
AlgorithmData[AlgorithmData.findIndex(function (item) { return item.companyID == companyID; })].prevSelected = 1;

index = AlgorithmData.findIndex(function (item) { return item.companyID == companyID});
AlgorithmData[index].calculatedTime += Math.round(media.contentLength / weight(AlgorithmData[index].credits, AlgorithmData.map(function (a) { return a.credits; }).reduce(sum)));
AlgorithmData[index].playbackTime += media.contentLength;

AlgorithmData = JSON.stringify(AlgorithmData, null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json', AlgorithmData, finished);

data = JSON.stringify(MediaData, null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/data.json', data, finished);

while (MediaData[4].companyID != companyID) {
    MediaData.unshift(MediaData.pop());
}
autoData = JSON.stringify(MediaData.slice(0, 9), null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/autodata.json', autoData, finished);

