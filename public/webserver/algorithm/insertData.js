//THIS FILE IS COMPLETELY IN AN PRE-PRE-PRE-PRE-PRE-PRE-ALPHA STATE 
//USE ON YOUR OWN RISK!!!!!!!!!!
var fs = require('fs');
var mysql = require('mysql');
var media = require('../data.json');     //Filepath to file with media data with special Maximilian Roll format (see autodata.json/data,json)
var companies = require('../algorithmdata.json');          //Filepath to file with algorithm data (see algorithmdata.json)

var con = mysql.createConnection({
    host: "192.168.8.13",
    user: "mfmb",
    password: "mfmb",
    database: "mfmb"
});

//var input = "company";
//var input = "media";
//var input = "algorithm";
var input = "all";

con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected");

    if(input == "company" || input == "all"){
        var values = [];
        var i =0;
        var query = "INSERT INTO fe_users VALUES ?"
        media.forEach( function() {
            values[i] = [0,media[i].name];
            i++
        });
        con.query(query, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }

    if(input == "media" || input == "all"){
        var values = [];
        var i = 0, CompanyID = 0;
        var query = "INSERT INTO media VALUES ?"
        var mysql_default = mysql.raw('default');
        media.forEach( function() {
            values[i] = [0,media[i].campaignID,true,media[i].image,media[i].backgroundColor,media[i].website,media[i].videolink,media[i].companyID+1,media[i].contentLength,false];
            i++;
        });
        con.query(query, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }

    if(input == "algorithm" || input == "all"){
        var values = [];
        var i = 0, CompanyID = 0;
        var query = "INSERT INTO algorithm VALUES ?"
        var mysql_default = mysql.raw('default');
        companies.forEach( function() {
            if(CompanyID != companies.length){CompanyID++}
            values[i] = [0,companies[i].credits,companies[i].playbackTime,companies[i].calculatedTime,false,companies[i].companyID+1];
            i++;
        });
        con.query(query, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }
    
    con.end(function(err){
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
});








