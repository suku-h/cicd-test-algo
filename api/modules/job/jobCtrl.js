"use strict";

let jobService 		= require('./jobService'),
    BadRequest  = require(`${BASEPATH}/errors/errors`).BadRequest,
    errMsg      = require(`${BASEPATH}/config/errorCodes`);

module.exports = {
	getData: getData
};

async function getData(req,res,next) {

	let functionName = 'getData';

	try {

		auditLog('getData called', 1, 'start', functionName, 'info', req.headers);

		let res1 = await jobService.fun1();
		auditLog('jobService.fun1 success', 2, 'inprogress', functionName, 'info', req.headers, res1);

		let res2 = await jobService.fun2();
		auditLog('jobService.fun2 success', 2, 'inprogress', functionName, 'info', req.headers, res2);

		let res3 = await jobService.fun3();
		auditLog('jobService.fun3 success', 2, 'inprogress', functionName, 'info', req.headers, res3);

		let res4 = await jobService.getData();
		auditLog('jobService.getData success', 99, 'closed', functionName, 'info', req.headers, res4);

		res.response = res4;

		return next();

	} catch(err) {

		auditLog('getData failed', 100, 'error', functionName, 'info', req.headers, err);
		return next(new BadRequest(errMsg['E1003'],'E1003',err));

	}

}
