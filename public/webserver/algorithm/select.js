console.log("hallo i bims da select");
var fs = require('fs');
var mysql = require('mysql');
var i = 0;
var MediaData = [];
var AlgorithmData = [];
function finished(err) {
    console.log('Data written');
}
function Algorithm(credits, playbackTime, calculatedTime, prevSelected, companyID) {
    this.credits = credits;
    this.playbackTime = playbackTime;
    this.calculatedTime = calculatedTime;
    this.prevSelected = prevSelected;
    this.companyID = companyID;
}
function Media(id, image, name, backgroundColor, website, videolink, companyID, campaignID, contentLength, prevSelected) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.website = website;
    this.videolink = videolink;
    this.companyID = companyID;
    this.campaignID = campaignID;
    this.contentLength = contentLength;
    this.prevSelected = prevSelected;
}
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
            i = 0;
            result.forEach(function (media) {
                MediaData[i] = new Media(media.MediaID - 1, media.Image, media.company, media.BackgroundColor, media.WebsiteLink, media.VideoLink, media.uid-1, media.CampaignID, media.ContentLength, media.PrevSelected);
                i++;
            });
            var data = JSON.stringify(MediaData, null, 2);
            fs.writeFile('./webserver/data.json', data, finished);
        }
    });
    query = "SELECT algorithm.Credits, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.uid FROM Algorithm;";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            i = 0;
            result.forEach(function (algorithm) {
                AlgorithmData[i] = new Algorithm(algorithm.Credits, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.uid - 1);
                i++;
            });
            var data = JSON.stringify(AlgorithmData, null, 2);
            fs.writeFile('./webserver/algorithmdata.json', data, finished);
        }
    });
    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
});
