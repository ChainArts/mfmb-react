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
        var update = [], money = [], actuality: Array<number> = [];
        var i = 0, noise = 0;

        result.forEach(company=>{
            money.push(company.geld)
            update.push(company.update);
            actuality.push(d.getTime() - update[i]);
            i++;
        });

        noise = Math.round(Math.random()*money.length)
        console.log(update);
        console.log(money);
        console.log(actuality);
        console.log(noise,money.length);

    });
});







 
