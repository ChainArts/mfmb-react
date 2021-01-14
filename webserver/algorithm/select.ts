    export {}
    var fs = require('fs');
    var mysql = require('mysql');
    var d = new Date();
    var companies = [];

    function finished(err){
        console.log('Data written');
    }
    function Company(id, name, credits, lastUpdate, contentLength, playbackTime, calculatedTime) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.lastUpdate = lastUpdate;
        this.topicality = d.getTime() - this.lastUpdate;
        this.contentLength = contentLength;
        this.playbackTime = playbackTime;
        this.calculatedTime = calculatedTime;
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
        con.query("SELECT * FROM firmen", function (err, result, fields) {
            if (err) {
                throw err;
            }
            else{
                var i = 0;
                
                result.forEach(function (company) {
                    companies [i] = new Company(company.id,company.name,company.credits,company.last_update,company.content_length,company.playback_time,company.calculated_time);
                    i++;
                });
                var data = JSON.stringify(companies, null, 2);
                fs.writeFile('./webserver/data.json', data, finished);
            }
        });
        con.end(function(err){
            if (err) {
                return console.log('error:' + err.message);
              }
              console.log('Close the database connection.');
        });
    });

    

