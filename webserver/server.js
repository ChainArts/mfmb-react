var http = require('http');

var printData = require('../webserver/algorithm/algorithm.js');

const PORT = 5500;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(printData));
    res.end();
}).listen(PORT);

console.log("Server started at localhost:" + PORT);