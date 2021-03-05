var fs = require('fs-extra');
const homedir = require('os').homedir();
var algorithmData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json');
var mediaData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/data.json');
var optionData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/options.json');
var prevData = algorithmData.find(function (item) { return item.prevSelected == true; });
const prioritizedCompany = mediaData.find(function (item) { return item.name == "AD Space"; });
var selection = [];
var i = 0, companyID = 0;
var priorityMode = optionData[0].priorityMode;
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

if(typeof prevData !== "undefined" && priorityMode && prevData.companyID != prioritizedCompany.companyID){
    selection[0] = prioritizedCompany.companyID;
}else{
//create selection of companies with samllest and same calculatedTime
algorithmData.sort(function (a, b) { return a.calculatedTime - b.calculatedTime; });
for (i = 0; i < algorithmData.length; i++) {                                                  
    if (algorithmData[0].calculatedTime == algorithmData[i].calculatedTime) {
        selection.push(algorithmData[i].companyID);
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

    for (i = 1; i < algorithmData.length; i++) {
        if (algorithmData[1].calculatedTime == algorithmData[i].calculatedTime) {
            selection[i - 1] = algorithmData[i].companyID;
        }
    }
}
algorithmData.sort(function (a, b) { return a.companyID - b.companyID; });
}


companyID = selection[Math.floor(Math.random() * selection.length)];
console.log("id is " + companyID);


var media_selection = [];
mediaData.forEach(function (media){
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
    mediaData[mediaData.findIndex(function (item) { return item.prevSelected == true && item.companyID == prevMedia.companyID})].prevSelected = 0;
}
mediaData[mediaData.findIndex(function (item) { return item.companyID == media.companyID && item.campaignID == media.campaignID})].prevSelected = 1;

if (typeof prevData !== "undefined") {
    algorithmData[algorithmData.findIndex(function (item) { return item.prevSelected == true; })].prevSelected = 0;
}
algorithmData[algorithmData.findIndex(function (item) { return item.companyID == companyID; })].prevSelected = 1;

index = algorithmData.findIndex(function (item) { return item.companyID == companyID});
if(typeof prevData !== "undefined" && priorityMode && prevData.companyID != prioritizedCompany.companyID){
    algorithmData[index].calculatedTime += Math.round(media.contentLength / (Math.ceil(algorithmData.length/2) * weight(algorithmData[index].credits, algorithmData.map(function (a) { return a.credits; }).reduce(sum))));
}else{
    algorithmData[index].calculatedTime += Math.round(media.contentLength / weight(algorithmData[index].credits, algorithmData.map(function (a) { return a.credits; }).reduce(sum)));
}
algorithmData[index].playbackTime += media.contentLength;

algorithmData = JSON.stringify(algorithmData, null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json', algorithmData, finished);

data = JSON.stringify(mediaData, null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/data.json', data, finished);

while (mediaData[4].companyID != companyID) {
    mediaData.unshift(mediaData.pop());
}
autoData = JSON.stringify(mediaData.slice(0, 9), null, 2);
fs.writeFile(homedir + '/AppData/Roaming/MFMB/AutoData/autodata.json', autoData, finished);

