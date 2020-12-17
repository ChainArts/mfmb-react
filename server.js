var http = require('http');

//var algorithm = require('./webserver/algorithm/algorithm')

const PORT = 5500;

http.createServer(function (req, res) {
    res.write('Response from NodeJS Server');
    res.end();
}).listen(PORT);

console.log("Server started at localhost:" + PORT);