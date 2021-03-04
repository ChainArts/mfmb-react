console.log("hallo i bims da insertData");
const homedir = require('os').homedir();
const fs = require('fs-extra')
var mysql = require('mysql');
var childProcess = require('child_process');
const MediaData = fs.readJsonSync(homedir + '/AppData/Roaming/MFMB/AutoData/updateData.json');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mfmb"
});

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

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

runScript(__dirname + '/algorithm/select.js', function (err) {
    if (err) throw err;
    console.log('finished running select.js');
});