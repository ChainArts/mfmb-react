import { id } from "./algorithm";
var fs = require('fs');
var data = fs.readFileSync('data.json');
var companies = [];
companies = JSON.parse(data);

function finished(err){
    console.log('Data written');
}

    console.log(id);
    while(companies[4].id != id){
        companies.unshift(companies.pop());
    }

    data = JSON.stringify(companies, null, 2);
    fs.writeFileSync('autodata.json', data, finished);
    finished(finished);






