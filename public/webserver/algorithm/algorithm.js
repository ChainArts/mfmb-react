const fs = require('fs-extra');               //File-System module to read from and write to files
const homedir = require('os').homedir();    //OS module to require user directory (homedir)

var algorithmData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json'); //Data to determine the next selected company which media will be displayed
var mediaData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/data.json');              //Data to prepare Media-Data-Set for the Auto-Mode
var optionData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/options.json');          //Data to evaluate if priorityMode is o nor not
var settings = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/settings.json');           //Settings from setup (ip address ...)

var prevData = algorithmData.find(function (item) { return item.prevSelected == true; });
const prioritizedCompany = mediaData.find(function (item) { return item.name == settings.prioritizedCompany; });
const priorityMode = optionData[0].priorityMode;        //array for advancements in the futur

var selection = [];
var media_selection = [];
var i = 0, selectedID = 0;

//Callback function for reduce() function
function sum(total, num) {
    return total + num;
}
//calculated factor for calculatedTime
function weight(money, sum) {
    return (money / sum) * 10;
}
//check for priorityMode
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
//if selection only consists of the previous selected ID it ends up empty
if (selection.length == 0) {
    selection = [];

    for (i = 1; i < algorithmData.length; i++) {
        if (algorithmData[1].calculatedTime == algorithmData[i].calculatedTime) {
            selection.push(algorithmData[i].companyID);
        }
    }
}
algorithmData.sort(function (a, b) { return a.companyID - b.companyID; });
}

//randomly selected ID of selection
selectedID = selection[Math.floor(Math.random() * selection.length)];   
console.log("id is " + selectedID);


//create selection of media the company has activated
mediaData.forEach(function (media){
    if(media.companyID == selectedID){media_selection.push(media)}
});


//if there is more than one active, remove the previous one from selection
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

//randomly select media from media selection
var media = media_selection[Math.floor(Math.random() * media_selection.length)];

//update prevSelected flags
if (typeof prevMedia !== "undefined") {
    mediaData[mediaData.findIndex(function (item) { return item.prevSelected == true && item.companyID == prevMedia.companyID})].prevSelected = 0;
}
mediaData[mediaData.findIndex(function (item) { return item.companyID == media.companyID && item.campaignID == media.campaignID})].prevSelected = 1;

if (typeof prevData !== "undefined") {
    algorithmData[algorithmData.findIndex(function (item) { return item.prevSelected == true; })].prevSelected = 0;
}
algorithmData[algorithmData.findIndex(function (item) { return item.companyID == selectedID; })].prevSelected = 1;

//update calculatedTime and playbackTime
//if priorityMode is active the calculatedTime is adjusted for the prioritized Company
index = algorithmData.findIndex(function (item) { return item.companyID == selectedID});
if(typeof prevData !== "undefined" && priorityMode && prevData.companyID != prioritizedCompany.companyID){
    algorithmData[index].calculatedTime += Math.round(media.contentLength / (Math.ceil(algorithmData.length/2) * weight(algorithmData[index].credits, algorithmData.map(function (a) { return a.credits; }).reduce(sum))));
}else{
    algorithmData[index].calculatedTime += Math.round(media.contentLength / weight(algorithmData[index].credits, algorithmData.map(function (a) { return a.credits; }).reduce(sum)));
}
algorithmData[index].playbackTime += media.contentLength;

//write updated Data to files
fs.writeJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json', algorithmData, {spaces:1});
fs.writeJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/data.json', mediaData, {spaces:1});
//shift array so selected Media is on 4th position (Auto-Mode)
while (mediaData[4].companyID != selectedID) {
    mediaData.unshift(mediaData.pop());
}
fs.writeJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/autodata.json', mediaData.slice(0, 9), {spaces:1});

