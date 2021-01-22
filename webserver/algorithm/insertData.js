//THIS FILE IS COMPLETELY IN AN PRE-PRE-PRE-PRE-PRE-PRE-ALPHA STATE 
//USE ON YOUR OWN RISK!!!!!!!!!!
var fs = require('fs');
var mysql = require('mysql');
var media = require('./max_data.json');     //Filepath to file with media data with special Maximilian Roll format (see autodata.json/data,json)
var companies = require('./data');          //Filepath to file with algorithm data (see algorithmdata.json)

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
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
        var query = "INSERT INTO Company VALUES ?"
        companies.forEach( function() {
            values[i] = ['NULL',companies[i].name];
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
        var query = "INSERT INTO Media VALUES ?"
        var mysql_default = mysql.raw('default');
        media.forEach( function() {
            if(CompanyID != companies.length){CompanyID++}
            values[i] = ['NULL',media[i].image,mysql_default,media[i].website,media[i].videolink,CompanyID];
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
        var query = "INSERT INTO Algorithm VALUES ?"
        var mysql_default = mysql.raw('default');
        companies.forEach( function() {
            if(CompanyID != companies.length){CompanyID++}
            values[i] = [companies[i].credits,companies[i].contentLength,companies[i].playbackTime,companies[i].calculatedTime,false,CompanyID];
            i++
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








