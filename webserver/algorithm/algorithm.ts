    var fs = require('fs');
    var companies = require('../data.json');
    const prevData = require('../autodata.json');

    var selection = [];
    var i = 0, prevId = 0, id = 0;

    function sum(total, num) {
        return total + num;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function weight(money,sum) {
        return (money/sum)*10;
    }

    function finished(err){
        console.log('Data written');
    }


    //console.log(companies.map(a => a.countedtime));

    //create selection of companies with samllest and same countedtime
    companies.sort((a, b) => a.countedtime - b.countedtime);
    for(i=0; i<companies.length; i++){
        if(companies[0].countedtime == companies[i].countedtime){
            selection[i]=companies[i].id;
        }
    }
    console.log(selection);
    companies.sort((a, b) => a.id - b.id);
    
    //remove previous id from the selection
    prevId = prevData[4].id;
    console.log(prevId);
    if(prevId != 0){
        for(i=0; i<selection.length; i++){
            if(selection[i]==prevId){
                selection.splice(i,1);
            }
        }
    }

    if(selection.length == 0){
        selection = [];
        companies.sort((a, b) => a.countedtime - b.countedtime);
        for(i=1; i<companies.length; i++){
            if(companies[1].countedtime == companies[i].countedtime){
                selection[i-1]=companies[i].id;
            }
        }
        companies.sort((a, b) => a.id - b.id);
    }
    id= selection[Math.floor(Math.random() * selection.length)];
    companies[id-1].countedtime += Math.round(companies[id-1].playtime/weight(companies[id-1].geld,companies.map(a => a.geld).reduce(sum)));
    companies[id-1].displaytime += companies[id-1].playtime;
    prevId = id;
    console.log(id);
    companies = JSON.stringify(companies, null, 2);
    fs.writeFile('./webserver/data.json', companies, finished);
    companies = JSON.parse(companies);
    while(companies[4].id != id){
        companies.unshift(companies.pop());
    }
    companies = JSON.stringify(companies, null, 2);
    fs.writeFile('./webserver/autodata.json', companies, finished);
    var companies = JSON.parse(companies);
        //console.log(selection);
        //console.log(companies); 
        // console.log(update);
        // console.log(money);
        // console.log(actuality);
        // console.log(noise, id, money.length);
    