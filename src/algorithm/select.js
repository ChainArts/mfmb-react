var fs = require('fs');
var mysql = require('mysql');
var playtime = [10, 20, 30, 5, 15, 20, 25, 17, 13, 10, 9, 22];
var d = new Date(2020, 8, 25, 9, 5, 30, 0);
var companies = [];
function Company(id, name, geld, update, playtime, displaytime, countedtime) {
    this.id = id;
    this.name = name;
    this.geld = geld;
    this.update = update;
    this.actuality = d.getTime() - this.update;
    this.playtime = playtime;
    this.displaytime = 0;
    this.countedtime = 0;
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
        else {
            var i = 0;
            result.forEach(function (company) {
                companies[i] = new Company(company.id, company.name, company.geld, company.update, company.playtime, company.displaytime, company.countedtime);
                i++;
            });
            var data = JSON.stringify(companies, null, 2);
            fs.writeFile('data.json', data, finished);
            function finished(err) {
                console.log('Data written');
            }
        }
    });
    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
});
