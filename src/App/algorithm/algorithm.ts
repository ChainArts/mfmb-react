export function algorithm(companies){
     

    var selection = [];
    var i = 0,rep = 0, prev_id = 0, id = 0;

    function sum(total, num) {
        return total + num;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function weight(money,sum) {
        var i = 0;
        return (money/sum)*10;
    }

    while(rep <1000){
    
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
        companies[id-1].displaytime += Math.round(companies[id-1].playtime/weight(companies[id-1].geld,companies.map(a => a.geld).reduce(sum)));
        prev_id = id;
        rep++;
        //console.log(id);
    }
    
            console.log(companies.map(a => a.displaytime));
            //console.log(selection);
            //console.log(companies); 
            // console.log(update);
            // console.log(money);
            // console.log(actuality);
            // console.log(noise, id, money.length);
}










 
