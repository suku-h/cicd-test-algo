'use strict';

let fs = require('fs'),
	moment = require('moment'),
	auditLogger = require('./auditLogger'),
	InternalError = require(`../errors/errors`).InternalError,
	AbstractError = require(`../errors/errors`).AbstractError;

const PATH = require('path');
const ENV = ((process.env.NODE_ENV) ? process.env.NODE_ENV : 'development').toLowerCase();
const DEBUG = (process.env.DEBUG === 'true') ? true : false;
const AUDIT = (process.env.AUDIT === 'true') ? true : false;

module.exports = {
	checkFileExists,
	getBasePath,
	checkEnv,
	debug,
	audit,
	isNull,
	isNotNull,
	getCurrentDateTime,
	isFilledArray,
	wrapperCall,
	logStart,
	logClosed
}
function getCurrentDateTime() {
	return moment().toISOString();
}

function checkFileExists(filePath) {
	return fs.existsSync(filePath);
}

function getBasePath() {
	return PATH.resolve(__dirname + '/..');
}

function checkEnv() {
	if (['development', 'testing', 'production'].indexOf(ENV) === -1) {
		debug('Invalid environment found');
		process.exit();
	} else {
		let envFile = getBasePath() + '/config/' + ENV + '.json';
		if (!checkFileExists(envFile)) {
			debug('Environment config missing');
			process.exit();
		}
	}
	process.env.NODE_ENV = ENV;
}

function debug() {
  // to print all the arguments in console e.g. console.log(1, 2, 3, 4)
	if(DEBUG) console.debug.apply(console, arguments);
}

function audit(message, step, status, functionName, level, headers = {}, data = {}) {
	debug(message);
	if (AUDIT) {
		auditLogger.postgreLogger({ type: 'API', function: functionName, level, step, status, message, headers, data })
	}
}

function logStart(functionName, headers) {
	audit(functionName + ' called', 1, 'start', functionName, 'info', headers);
}

function logClosed(functionName, headers, result) {
	audit(functionName + ' success', 99, 'closed', functionName, 'info', headers, result);
}

function isNull(obj) {
	if (undefined === obj || null === obj) {
		return true;
	}
	return false;
}

function isNotNull(obj) {
	return !isNull(obj);
}

function isFilledArray(arr) {
	return isNotNull(arr) && Array.isArray(arr) && arr.length > 0;
}
/**
 * this is the error thrown by catch or an input/known error
 * functionName is the api fn name
 * if err is a known/handled error then it is directly passed to the errorHandler
 * if the error is an unhandled then an internal error is thrown with the parameters
 */
function wrapperCall(func) {
	return async (req, res, next) => {
		const functionName = func.name

		try {
			return await func.call(this, req, res, next, functionName);
		} catch (err) {
			if (err instanceof AbstractError) {
				next(err)
			} else {
				next(new InternalError(err, functionName));
			}
		}
	}
}
