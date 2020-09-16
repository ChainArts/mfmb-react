var mysql = require('mysql');
var d = new Date();

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
        console.log(result[0].update_time);
        console.log(d);
    });


});

