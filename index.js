'use strict';

var express = require('express');
var kraken = require('kraken-js');
var env = process.env.NODE_ENV;

var app = module.exports = express();
var options = require('./lib/options')(app);

if (env === 'sandbox') {
    // Configure the response headers so that the API can be used locally
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
}

// Set cache headers so that browsers do not cache the JSON responses (e.g. IE)
app.all('*', function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
