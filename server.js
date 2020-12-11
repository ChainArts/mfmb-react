var http = require('http');
http.createServer(function (req, res) {
    res.write('Response from NodeJS Server');
    res.end();
}).listen(5500);

console.log("Server started at localhost:5500");