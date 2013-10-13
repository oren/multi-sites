var PATHS = [
    '/login',
    '/set-name',
    '/logout',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/sync-account',
    '/sync-history'
];

var url = require('url');
var isContained = require('./util').isContained;

function match(req) {
    var uri = url.parse(req.url);

    return PATHS.some(isContained(uri.pathname));
}

module.exports = match;

