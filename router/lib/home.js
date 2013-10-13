var PATHS = [
    '/autosuggest',
    '/nearby.html',
    '/api'
];

var url = require('url');
var isContained = require('./util').isContained;

function home(req) {
    var uri = url.parse(req.url);

    return uri.pathname === '/' || PATHS.some(isContained(uri.pathname));
}

module.exports = home;

