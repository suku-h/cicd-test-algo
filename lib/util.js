"use strict";

let fs = require('fs');
const PATH = require("path");
const ENV = ((process.env.NODE_ENV) ? process.env.NODE_ENV : 'development').toLowerCase();
const DEBUG = (process.env.DEBUG == 'true') ? true : false;

module.exports = {
	checkFileExists: checkFileExists,
	getBasePath: getBasePath,
	checkEnv: checkEnv,
	debug: debug
}

function checkFileExists(filePath) {
	return fs.existsSync(filePath);
}

function getBasePath() {
	return PATH.resolve(__dirname + '/..');
}

function checkEnv() {
	if(['development','testing','production'].indexOf(ENV) === -1) {
		debug('Invalid environment found');
		process.exit();
	}
	process.env.NODE_ENV = ENV;
}

function debug(logMe) {
	if(DEBUG) console.debug.apply(console, arguments);
}
