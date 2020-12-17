"use strict";
exports.__esModule = true;
var algorithm_1 = require("./algorithm");
var fs = require('fs');
var data = fs.readFileSync('data.json');
var companies = [];
companies = JSON.parse(data);
function finished(err) {
    console.log('Data written');
}
console.log(algorithm_1.id);
while (companies[4].id != algorithm_1.id) {
    companies.unshift(companies.pop());
}
data = JSON.stringify(companies, null, 2);
fs.writeFileSync('autodata.json', data, finished);
finished(finished);
