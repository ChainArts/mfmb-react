var d = new Date(2020, 8, 25, 9, 5, 30, 0);
var playtime = [10, 20, 30, 5, 15, 20, 25, 17, 13, 10, 9, 22];
var companies = [], selection = [];
var i = 0, anz=0, rep = 0, debug =0;

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
            companies [i] = new Company(company.id,company.name,company.geld,company.update,playtime[i]);
            i++;
        });
        
        var prev_id = 0, id = 0;
while(rep <50){

    selection = [];
    //create selection of companies with samllest and same dispalytime
    companies.sort((a, b) => a.displaytime - b.displaytime);
    for(i=0; i<companies.length; i++){
        if(companies[0].displaytime == companies[i].displaytime){
            selection[i]=companies[i].id;
        }
    }

    companies.sort((a, b) => a.id - b.id);

    //remove previous id from the selection
    if(prev_id != 0){
        for(i=0; i<selection.length; i++){
            if(selection[i]==prev_id){
                selection.splice(i,1);
            }
        }
    }
    if(selection.length == 0){
        selection = [];
        companies.sort((a, b) => a.displaytime - b.displaytime);
        for(i=1; i<companies.length; i++){
            if(companies[1].displaytime == companies[i].displaytime){
                selection[i-1]=companies[i].id;
            }
        }
        companies.sort((a, b) => a.id - b.id);
    }
    id= selection[Math.floor(Math.random() * selection.length)];
    companies[id-1].displaytime += companies[id-1].playtime;
    prev_id = id;
    rep++;
}

        console.log(companies.map(a => a.displaytime));
        //console.log(selection);
        console.log(companies); 
        // console.log(update);
        // console.log(money);
        // console.log(actuality);
        // console.log(noise, id, money.length);
    });

});









 
