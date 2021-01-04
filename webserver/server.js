var http = require('http');
var childProcess = require('child_process');
var fs = require('fs');

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}



const PORT = 5500;

http.createServer(function (req, res) {
    
    if(req.url === '/reset'){
        runScript('./webserver/algorithm/select.js', function (err) {
            if (err) throw err;
            console.log('finished running select.js');
        });
        res.write('finished running select.js');
        res.end();
    }

    if(req.url === '/run'){
        runScript('./webserver/algorithm/algorithm.js', function (err) {
            if (err) throw err;
            console.log('finished running algorithm.js');
        });
        res.write('finished running algorithm.js');
        res.end();
    }

    if(req.url === '/display'){
        fs.readFile("./webserver/autodata.json", "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            res.write(jsonString);
            res.end();
          });
    }
    
}).listen(PORT);

console.log("Server started at localhost:" + PORT);