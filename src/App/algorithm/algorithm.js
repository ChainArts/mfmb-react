var d = new Date(2020, 8, 25, 9, 5, 30, 0);
var playtime = [0, 10, 20, 30, 5, 15, 20, 25, 17, 13, 10, 9, 22];
var companies = [];
var i = 0, anz = 0, rep = 0, debug = 0;
function Company(id, name, geld, update, playtime) {
    this.id = id;
    this.name = name;
    this.geld = geld;
    this.update = update;
    this.actuality = d.getTime() - this.update;
    this.playtime = playtime;
    this.displaytime = 0;
    this.get_displaytime = function () {
        return this.displaytime;
    };
    this.set_displaytime = function (time) {
        this.displaytime = time;
    };
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            companies[i] = new Company(company.id, company.name, company.geld, company.update, playtime[i]);
        });
        //companies.sort((a, b) => a.playtime - b.playtime);
        companies.sort(function (a, b) { return a.id - b.id; });
        //console.log(companies);
        var id = 0, prev_id = 0;
        var selection = [];
        while (rep <= 24) {
            companies.sort(function (a, b) { return a.displaytime - b.displaytime; });
            selection = [0];
            for (i = 0; i <= 11; i++) {
                if (companies[0].displaytime == companies[i].displaytime) {
                    //console.log(companies[0].displaytime, companies[i].displaytime);
                    //console.log(companies[i].id,);
                    selection.push(companies[i].id);
                }
            }
            console.log(companies.map(function (a) { return a.id; }));
            console.log(selection);
            companies.sort(function (a, b) { return a.id - b.id; });
            while (id == prev_id) {
                debug = random(0, selection.length - 2);
                console.log(debug);
                id = selection[debug];
                console.log(id + 1, selection.length - 1);
            }
            rep++;
            companies[id].displaytime += companies[id].playtime;
            //console.log(companies[id].id, companies[id].displaytime);
            prev_id = id;
        }
        console.log(companies.map(function (a) { return a.id; }));
        console.log(companies.map(function (a) { return a.displaytime; }));
        //>id=Math.round(Math.random() * money.length);
        //noise = id/2;
        // console.log(update);
        // console.log(money);
        // console.log(actuality);
        // console.log(noise, id, money.length);
    });
});
