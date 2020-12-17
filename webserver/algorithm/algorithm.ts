    export { id };
    var fs = require('fs');
    var data = fs.readFileSync('data.json');
    var companies = [];
    companies = JSON.parse(data);
    var selection = [];
    var i = 0,rep = 0, prev_id = 0, id = 0;

    function sum(total, num) {
        return total + num;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function weight(money,sum) {
        return (money/sum)*10;
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function finished(err){
        console.log('Data written');
    }

    (async () =>{
    while(rep <1){
    
        selection = [];
        //create selection of companies with samllest and same countedtime
        companies.sort((a, b) => a.countedtime - b.countedtime);
        for(i=0; i<companies.length; i++){
            if(companies[0].countedtime == companies[i].countedtime){
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
        prev_id = id;
        rep++;
        //console.log(id);
        await delay(1000);
        data = JSON.stringify(companies, null, 2);
        fs.writeFile('data.json', data, finished);
        finished(finished);
        
    
            console.log(companies.map(a => a.countedtime));
            //console.log(selection);
            //console.log(companies); 
            // console.log(update);
            // console.log(money);
            // console.log(actuality);
            // console.log(noise, id, money.length);

            }
        })();