"use strict";


let util 						= require('./lib/util');

//check environment
util.checkEnv();

//set global base path and debug log
global.BASEPATH 		= util.getBasePath();
global.appLog		 		= util.debug;
global.auditLog     = util.audit;


let express 				= require('express'),
		app 						= express(),
		http 						= require('http'),
		server 					= http.createServer(app),
		cors 						= require('cors'),
		logger 					= require('morgan'),
		helmet 					= require('helmet'),
		bodyParser 			= require("body-parser"),
		response 				= require('./lib/response'),
		config 					= require('./config/constant.json'),
		v1 							= require('./api/routes/v1'),
		uuid						= require('uuid/v1');

server
	.listen(config.expressPort)
	.on('listening', function() {appLog(`Started\nENV:${process.env.NODE_ENV}, PID:${process.pid}, PORT:${config.expressPort} `);})
	.on('error', onError);

app
	.use(logger('dev'))
	.use(function(req,res,next) {response.init(req,res,next);})
	.use(helmet())
	.use(cors())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: true}));

//api routes for version v1
app.use('/v1', v1);
app.use('/v1/*', function send(req, res) { res.json(res.response); });

app.use(function (req, res, next) {
  let b2xReqID = uuid()
  req.headers.b2xReqID = b2xReqID
  req.headers.ip = req.ip
  req.headers.url = req.url
  if (res && res.headers) {
    res.headers.b2xReqID = b2xReqID
  }
  next()
})

// express request favicon by default to prevent this, or else set your favicon if you have and remove this line
app.get('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// uncaught exception handling
process.on('unhandledRejection', (err, p) => {
	appLog({
		type: 'server',
		level: 'error',
		message: 'Process unhandled rejection',
		data: JSON.stringify({
			reason: err.stack || err,
			p: p
		})
	});
}).on('uncaughtException', function (err, p) {
	appLog({
		type: 'server',
		level: 'error',
		message: 'Process uncaught exception',
		data: JSON.stringify({
			reason: err.stack || err,
			p: p
		})
	});
});

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof config.expressPort === 'string' ? 'Pipe ' + config.expressPort : 'Port ' + config.expressPort;
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
