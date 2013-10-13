var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Home Page');
}).listen(3001);

