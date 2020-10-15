
    import { algorithm } from './algorithm.js'
    var mysql = require('mysql');
    var playtime = [10, 20, 30, 5, 15, 20, 25, 17, 13, 10, 9, 22], companies = [];
    var d = new Date(2020, 8, 25, 9, 5, 30, 0);
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
            else{
                var i = 0;
                
                result.forEach(function (company) {
                    companies [i] = new Company(company.id,company.name,company.geld,company.update,playtime[i]);
                    i++;
                });
                algorithm(companies);
            }
        });
        con.end(function(err){
            if (err) {
                return console.log('error:' + err.message);
              }
              console.log('Close the database connection.');
        });
    });

    

