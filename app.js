"use strict";

let express = require('express');
let helmet = require('helmet');
let cors = require('cors');
let http = require('http');
let timeout = require('connect-timeout');
let bodyParser = require("body-parser");

let __util = require('./lib/util');
global.__util = __util;
let __config = require('./config/constants.json');
let __logger = console; //require('./lib/logger');  // need to be replaced with library
let __res = require('./lib/responseBuilder');

let app = {};
__logger.info('loaded application with "' + process.env.NODE_ENV + '" environment, PID: ' + process.pid);
let self = this;

app = express();
app.use(helmet());
app.use(cors());
app.use(timeout(__config.default_server_response_timeout, {respond: false}));
app.use(haltOnTimedout);
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let v1 = require('./api/routes/v1');
app.use('/v1', v1);

app.server = http.createServer(app);
app.server.listen(__config.port);

process.on('uncaughtException', function (err) {
    __logger.error("Server crash reason ----------------------------------------------------", err);
});

__logger.info('express server started on ' + __config.port + ', with api prefix ');
__logger.info('TEST URL: ' + __config.base_url + 'ping');


module.exports.stop_express_server = function () {
    app.server.close();
};

function haltOnTimedout(req, res, next) {
    if (!req.timedout) {
        next()
    } else {
        __logger.error('haltOnTimedout, request timedout', {req_uuid: req.req_uuid});
        res.send(__res.SERVER_TIMEDOUT('request from client timedout'));
    }
    req.on('timeout', function (time, next) {
        __logger.error('haltOnTimedout, server response timedout', {req_uuid: req.req_uuid});
        res.send(__res.SERVER_TIMEDOUT('server timed out after ' + time + ' milliseconds'));
    });
}

self.stopGracefully = function () {
    __logger.info('stopping all resources gracefully');
    self.stop_express_server();
};

// if something happens which stop the server the stop gracefully db connections to
process.on('SIGINT', self.stopGracefully);
process.on('SIGTERM', self.stopGracefully);