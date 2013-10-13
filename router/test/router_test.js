var test = require('tape');

test('home: plain url', function (t) {
    t.plan(1);

    var req = { url: '/' };
    var home = require('../lib/home');

    t.ok(home(req));
});

test('home: with querystring', function (t) {
    t.plan(1);

    var req = { url: '/?something=1' };
    var home = require('../lib/home');

    t.ok(home(req));
});

test('home: /autosuggest routes', function (t) {
    t.plan(1);

    var req = { url: '/autosuggest/location.html' };
    var home = require('../lib/home');

    t.ok(home(req));
});

test('home: /api routes', function (t) {
    t.plan(1);

    var req = { url: '/api/location.json' };
    var home = require('../lib/home');

    t.ok(home(req));
});

test('profile: plain url', function (t) {
    t.plan(1);

    var req = { url: '/profile' };
    var profile = require('../lib/profile');

    t.ok(profile(req));
});

test('auth: all', function (t) {
    var paths = ['/login', '/set-name'];

    t.plan(paths.length);

    var auth = require('../lib/auth');

    paths.forEach(function (url) {
        var req = { url: url };

        t.ok(auth(req));
    });
});

