console.log("hallo i bims da insertData");
const fs = require('fs-extra')
var mysql = require('mysql');
const MediaData = fs.readJsonSync(__dirname + '/updateData.json');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mfmb"
});

con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected");
    var query = "INSERT INTO media VALUES ? ON DUPLICATE KEY UPDATE CampaignID=VALUES(CampaignID), Active=VALUES(Active), Image=VALUES(Image), BackgroundColor=VALUES(BackgroundColor), WebsiteLink=VALUES(WebsiteLink), VideoLink=VALUES(VideoLink), uid=VALUES(uid), ContentLength=VALUES(ContentLength), PrevSelected=VALUES(PrevSelected)";
    var values = [];
    MediaData.forEach( function(media,index) {
        values[index] = [media.id,media.campaignID,media.active,media.image,media.backgroundColor,media.website,media.videolink,media.companyID,media.contentLength,media.prevSelected];
    });
    con.query(query, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
    con.end(function(err){
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
});