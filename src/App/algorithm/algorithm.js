var mysql = require('mysql');
var d = new Date();
var update = []; 
var geld = [];
var points = [];
var i=0;


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mfmb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");


    con.query("SELECT * FROM firmen", function (err, result, fields) {
        if (err) throw err;
        
        // function iterate(number) {
        //     console.log(number)
        // }


        result.forEach(number=>{
            geld[i] = number.geld;
            update[i] = number.update_time;
            c=d-update[i];
            
            i++
        });
    });
});







 
