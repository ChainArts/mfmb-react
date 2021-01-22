var fs = require('fs');
var mysql = require('mysql');
var i = 0;
var MediaData = [];
var AlgorithmData = [];
function finished(err) {
    console.log('Data written');
}
function Algorithm(credits, contentLength, playbackTime, calculatedTime, prevSelected, id) {
    this.credits = credits;
    this.contentLength = contentLength;
    this.playbackTime = playbackTime;
    this.calculatedTime = calculatedTime;
    this.prevSelected = prevSelected;
    this.id = id;
}
function Media(id, image, name, backgroundColor, website, videolink) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.website = website;
    this.videolink = videolink;
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
    var query = "SELECT Media.MediaID, Media.Image, Company.CompanyName, Media.BackgroundColor, Media.WebsiteLink, Media.VideoLink  FROM Company INNER JOIN Media on Company.CompanyID=Media.CompanyID;";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            i = 0;
            result.forEach(function (media) {
                MediaData[i] = new Media(media.MediaID - 1, media.Image, media.CompanyName, media.BackgroundColor, media.WebsiteLink, media.VideoLink);
                i++;
            });
            var data = JSON.stringify(MediaData, null, 2);
            fs.writeFile('./webserver/data.json', data, finished);
        }
    });
    query = "SELECT * FROM Algorithm;";
    con.query(query, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            i = 0;
            result.forEach(function (algorithm) {
                AlgorithmData[i] = new Algorithm(algorithm.Credits, algorithm.ContentLength, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.CompanyID - 1);
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
