"use strict";

let fs = require('fs');
let auditLogger = require("./auditLogger"); 
const PATH = require("path");
const ENV = ((process.env.NODE_ENV) ? process.env.NODE_ENV : 'development').toLowerCase();
const DEBUG = (process.env.DEBUG == 'true') ? true : false;
const AUDIT = (process.env.AUDIT == 'true') ? true : false;

module.exports = {
	checkFileExists: checkFileExists,
	getBasePath: getBasePath,
	checkEnv: checkEnv,
	debug: debug,
	audit: audit
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
	}
	process.env.NODE_ENV = ENV;
}

function debug(logMe) {
	if (DEBUG) console.debug.apply(console, arguments);
}

function audit(message, step, status, functionName, level,  headers={}, data={}){
	debug(message);
	console.log(AUDIT);
	if(AUDIT){
	  auditLogger.postgreLogger({type: 'API',function: functionName,level,step,status,message,headers,data})
	}
}
 