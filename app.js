"use strict";

let util = require('./lib/util');

//check environment
util.checkEnv();

//set global base path and debug log
global.BASEPATH = util.getBasePath();
global.appLog = util.debug;
global.auditLog = util.audit;

let express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	cors = require('cors'),
	logger = require('morgan'),
	helmet = require('helmet'),
	bodyParser = require("body-parser"),
	response = require('./lib/response'),
	config = require('./config'),
	constant = require('./config/constant.json'),
	NotFound = require(`./errors/errors`).NotFound,
	errorHandler = require(`./errors/errorHandler`),
	v1 = require('./api/routes/v1');

server
	.listen(constant.expressPort)
	.on('listening', function () { appLog(`Started\nENV:${process.env.NODE_ENV}, PID:${process.pid}, PORT:${constant.expressPort} `); })
	.on('error', onError);

app
	.use(logger('dev'))
	.use(function (req, res, next) { response.init(req, res, next); })
	.use(helmet())
	.use(cors())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', v1);
app.use('/v1/*', function send(req, res) { res.json(res.response); });

app.use(function (req, res, next) {
	next(new NotFound());
});
app.use(errorHandler);

function onError(error) {
	if (error.syscall !== 'listen') throw error;
	var bind = typeof constant.expressPort === 'string' ? 'Pipe ' + constant.expressPort : 'Port ' + constant.expressPort;
	switch (error.code) {
		case 'EACCES':
			appLog(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			appLog(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

module.exports = app;
