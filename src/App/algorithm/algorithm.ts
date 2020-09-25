var mysql = require('mysql');

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
        var d = new Date(2020,8,25,9,5,30,0);
        var update = [];
        


        result.forEach(number=>{

            var i = 0;
            update[i] = number.update;
            console.log(update[i]);

            i++;
        });
        console.log(d);
        console.log(d.getTime()-update[0]);

    });
});







 
