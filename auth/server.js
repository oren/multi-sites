var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Login/Logout/Registration Section');
}).listen(3003);

