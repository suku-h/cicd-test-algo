"use strict";

let jobModel 		= require('./jobModel'),
		BadRequest 	= require(`${BASEPATH}errors/errors`).BadRequest,
		errMsg 			= require(`${BASEPATH}config/errorCodes`),
		response 		= require(`${BASEPATH}lib/response`);

module.exports = {
    getJobs: getJobs,
    getJob: getJob,
    updateJob: updateJob,
    createJob: createJob,
		getJobsTest: getJobsTest
};

function func1() {
	return 'func1';
}

function func2() {
	return 'func2';
}

function func3() {
	return new Promise(function(resolve,reject) {
		resolve('func 3');
	});
}

async function getJobsTest(req,res,next) {
	try {
		let resp1 = await func1();
		let resp2 = await func2();
		let resp3 = await func3();
		res.response = response.createSuccessResponse([resp1,resp2,resp3],'S1001');
		return next();
	} catch(err) {
		return next(new BadRequest(errMsg['E1001'], 'E1001'));
	}
}

async function getJobs(req, res) {
    try {
        let response = await jobModel.getAllJobs();
        appLog("Successfully fetched jobs data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'N1001'));
    } catch(err) {
        appLog("Something went wrong while fetching jobs data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

async function getJob(req, res) {
    try {
        let response = await jobModel.getJob(req.params.id);
        appLog("Successfully fetched job data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'N1001'));
    } catch(err) {
        appLog("Something went wrong while fetching job data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

async function updateJob(req, res) {
    // code for update job
}

async function createJob(req, res) {
    // code for update job
}

