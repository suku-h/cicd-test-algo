'use strict';

let jobService = require('./jobService'),
	response = require(`${BASEPATH}/lib/response`),
	logStart = require(`${BASEPATH}/lib/util`).logStart,
	logClosed = require(`${BASEPATH}/lib/util`).logClosed;

module.exports = {
	getData: getData
};

async function getData(req, res, next, functionName) {
	logStart(functionName, req.headers);
	let res4 = await jobService.getData();
	logClosed(functionName, req.headers, res4);
	res.response = response.createSuccessResponse(res4, 'S1001');
	return next();
}
