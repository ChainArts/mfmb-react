var mysql = require('mysql');
const { promisify } = require('util');
const selectStatements = ["SELECT * from fe_users","SELECT * from media","SELECT * from algorithm"];
const insertStatements = ["INSERT INTO fe_users (uid, company) VALUES ? ON DUPLICATE KEY UPDATE company=VALUES(company)",
                          "INSERT INTO media VALUES ? ON DUPLICATE KEY UPDATE CampaignID=VALUES(CampaignID), Active=VALUES(Active), Image=VALUES(Image), BackgroundColor=VALUES(BackgroundColor), WebsiteLink=VALUES(WebsiteLink), VideoLink=VALUES(VideoLink), uid=VALUES(uid)",
                          "INSERT INTO algorithm VALUES ? ON DUPLICATE KEY UPDATE Credits=VALUES(Credits), ContentLength=VALUES(ContentLength), PlaybackTime=VALUES(PlaybackTime), CalculatedTime=VALUES(CalculatedTime), PrevSelected=VALUES(PrevSelected), uid=VALUES(uid)"];
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

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i][0]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i][0]]) {
            delete a[a2[i][0]];
        } else {
            a[a2[i][0]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}


var Arrayify = function(query_result,StatementIndex) {
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
                data[x] = [media.MediaID, media.CampaignID, media.Active, media.Image, media.BackgroundColor, media.WebsiteLink, media.VideoLink, media.uid];
                x++;
            });
            break;
    
        case 2:
            query_result.forEach(function (algorithm){
                data[x] = [algorithm.AlgorithmID, algorithm.Credits, algorithm.ContentLength, algorithm.PlaybackTime, algorithm.CalculatedTime, algorithm.PrevSelected, algorithm.uid];
                x++;
            });
            break;
  }
  return data;
}

var getServerAsync = async function(i) {
    var promisfyserver = promisify(server.query).bind(server);

    var result = await promisfyserver(selectStatements[i]);
    return Arrayify(result,i);
    
};

var setClientAsync = async function(i,values) {
    var testarray = [];
    var promisfyclient = promisify(client.query).bind(client);
    var message = await promisfyclient(insertStatements[i], [values]);
    var buffer = await promisfyclient(selectStatements[i]);
    var test = Arrayify(buffer,i);
    //console.log(test);
    diff = arr_diff(test,values);
    console.log(diff);

    diff.forEach(async function(item){
        await promisfyclient(deleteStatements[i], item);
    });

    





    return message;
  };

var processDataAsync = async function() {
    var i;
    for(i = 0; i<3; i++){
        var data = [];
        try {
            data = await getServerAsync(i);
            //console.log(data);
            message = await setClientAsync(i,data);
            console.log(message.affectedRows + " rows have been affected.");

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




