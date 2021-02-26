console.log("hallo i bims da mysql");
var mysql = require('mysql');
const { promisify } = require('util');
const selectStatements = ["SELECT * from fe_users","SELECT * from media","SELECT * from algorithm"];
const insertStatements = ["INSERT INTO fe_users (uid, company) VALUES ? ON DUPLICATE KEY UPDATE company=VALUES(company)",
                          "INSERT INTO media VALUES ? ON DUPLICATE KEY UPDATE CampaignID=VALUES(CampaignID), Active=VALUES(Active), Image=VALUES(Image), BackgroundColor=VALUES(BackgroundColor), WebsiteLink=VALUES(WebsiteLink), VideoLink=VALUES(VideoLink), uid=VALUES(uid), ContentLength=VALUES(ContentLength), PrevSelected=VALUES(PrevSelected)",
                          "INSERT INTO algorithm VALUES ? ON DUPLICATE KEY UPDATE Credits=VALUES(Credits), PlaybackTime=VALUES(PlaybackTime), CalculatedTime=VALUES(CalculatedTime), PrevSelected=VALUES(PrevSelected), uid=VALUES(uid)"];
const deleteStatements = ["DELETE FROM fe_users where uid = ?","DELETE FROM media where MediaID = ?","DELETE FROM algorithm where AlgorithmID = ?"];

var server = mysql.createConnection({
    host: "192.168.8.13",
    user: "mfmb",
    password: "mfmb",
    database: "mfmb"
});

var client = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mfmb"
});

function arr_diff (array1, array2) {

    var array = [], diff = [];

    for (var i = 0; i < array1.length; i++) {
        array[array1[i][0]] = true;
    }

    for (var i = 0; i < array2.length; i++) {
        if (array[array2[i][0]]) {
            delete array[array2[i][0]];
        } else {
            array[array2[i][0]] = true;
        }
    }

    for (var k in array) {
        diff.push(k);
    }
    return diff;
}

var ObjArrayToTwoDimArray = function(query_result,StatementIndex) {
    var data = [];
    var x = 0; 
    switch(StatementIndex){
        case 0:
            query_result.forEach(function (users){
                data[x] = [users.uid,users.company];
                x++;
            });
        break;
          
        case 1:
            query_result.forEach(function (media){
                data[x] = [media.MediaID, media.CampaignID, media.Active, media.Image, media.BackgroundColor, media.WebsiteLink, media.VideoLink, media.uid, media.ContentLength, media.PrevSelected];
                x++;
            });
            break;
    
        case 2:
            query_result.forEach(function (algorithm){
                data[x] = [algorithm.AlgorithmID, algorithm.Credits, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.uid];
                x++;
            });
            break;
  }
  return data;
}

var getServerAsync = async function(i) {
    var promisfyserver = promisify(server.query).bind(server);
    var result = await promisfyserver(selectStatements[i]);
    return ObjArrayToTwoDimArray(result,i);
};

var setClientAsync = async function(i,server_values) {
    var promisfyclient = promisify(client.query).bind(client);
    var ins_message = await promisfyclient(insertStatements[i], [server_values]);
    console.log(ins_message.affectedRows + " Rows checked");
    var sel_ObjArray = await promisfyclient(selectStatements[i]);
    var client_values = ObjArrayToTwoDimArray(sel_ObjArray,i);
    diff = arr_diff(client_values,server_values);

    diff.forEach(async function(item){
        var del_message = await promisfyclient(deleteStatements[i], item);
        console.log(del_message.affectedRows + " Rows deleted\n");
    });
};

var processDataAsync = async function() {
    for(var i = 0; i<3; i++){
        var data = [];
        try {
            data = await getServerAsync(i);
            await setClientAsync(i,data);
          } catch (error) {
            console.log(error);
          }
    }
    server.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Server-Database connection closed');
    });
    client.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Client-Database connection closed');
    });
};

processDataAsync();




