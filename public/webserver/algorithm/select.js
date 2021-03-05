console.log("hallo i bims da select");
const homedir = require('os').homedir();
var childProcess = require('child_process');
var fs = require('fs');
var mysql = require('mysql');
var resultData = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mfmb"
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected");
    var query = "SELECT media.MediaID, media.Image, fe_users.company, media.BackgroundColor, media.WebsiteLink, media.VideoLink, media.uid, media.CampaignID, media.ContentLength, media.PrevSelected FROM media INNER JOIN fe_users on media.uid=fe_users.uid where media.Active = 1";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            result.forEach(function (media, index) {
                resultData[index] = {id: String(media.MediaID - 1), image: media.Image, name: media.company, backgroundColor: media.BackgroundColor, website: media.WebsiteLink, videolink: media.VideoLink, companyID: media.uid-1, campaignID: media.CampaignID, contentLength: media.ContentLength, prevSelected: media.PrevSelected};
            });
            var data = JSON.stringify(resultData, null, 2);
            fs.writeFileSync(homedir + '/AppData/Roaming/MFMB/AutoData/data.json', data);
        }
    });
    query = "SELECT algorithm.Credits, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.uid FROM Algorithm;";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            resultData = [];
            result.forEach(function (algorithm, index) {
                resultData[index] = {credits: algorithm.Credits, playbackTime: algorithm.PlaybackTime, calculatedTime: algorithm.CalculatedTime, prevSelected: algorithm.PrevSelected, companyID: algorithm.uid - 1};
            });
            var data = JSON.stringify(resultData, null, 2);
            
            fs.writeFileSync(homedir + '/AppData/Roaming/MFMB/AutoData/algorithmdata.json', data);
        }
    });
    query = "SELECT * FROM options";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            resultData = [];
            result.forEach(function (options, index) {
                resultData[index] = {optionID: options.OptionID,priorityMode: options.PriorityMode};
            });
            var data = JSON.stringify(resultData, null, 2);
            fs.writeFileSync(homedir + '/AppData/Roaming/MFMB/AutoData/options.json', data);
        }
    });
    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
});
