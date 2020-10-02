var d = new Date(2020, 8, 25, 9, 5, 30, 0);
var playtime = [0, 10, 20, 30, 5, 15, 20, 25, 17, 13, 10, 9, 22];
var companies = [];
var i = 0;

function Company(id, name, geld, update, playtime) {
    this.id = id;
    this.name = name;
    this.geld = geld;
    this.update = update;
    this.actuality = d.getTime() - this.update;
    this.playtime = playtime;
    this.displaytime = 0;

    this.get_displaytime = function() {
        return this.displaytime;
    }

    this.set_displaytime = function(time) {
        this.displaytime = time;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


var mysql = require('mysql');
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

        result.forEach(function (company) {
            i++;
            companies [i] = new Company(company.id,company.name,company.geld,company.update,playtime[i]);
        });
        
        companies.sort((a, b) => a.playtime - b.playtime);
        console.log(companies);




        //>id=Math.round(Math.random() * money.length);
        //noise = id/2;
        // console.log(update);
        // console.log(money);
        // console.log(actuality);
        // console.log(noise, id, money.length);
    });

});









 
