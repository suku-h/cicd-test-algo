"use strict";

let jobModel 		= require('./jobModel'),
    BadRequest 	    = require(`${BASEPATH}/errors/errors`).BadRequest,
    errMsg 			= require(`${BASEPATH}/config/errorCodes`),
    response 		= require(`${BASEPATH}/lib/response`);

module.exports = {
    getJobs: getJobs,
    getJob: getJob,
    updateJob: updateJob,
    createJob: createJob
};

async function getJobs(req, res, next) {
    try {
        let result = await jobModel.getAllJobs();
        res.response = response.createSuccessResponse(result, 'S1001');
        return next();
    } catch(err) {
        appLog("Something went wrong while fetching jobs data", err);
        return next(new BadRequest(errMsg['E1001'], 'E1001'));
    }
}

async function getJob(req, res, next) {
    try {
        auditLog("success",1,"3","4","5",req.headers);
        let result = await jobModel.getJob(req.params.id);
        res.response = response.createSuccessResponse(result, 'S1001');
        return next();
    } catch(err) {
        appLog("Something went wrong while fetching job data", err);
        return next(new BadRequest(errMsg['E1001'], 'E1001'));
    }
}

async function updateJob(req, res) {
    // code for update job
}

async function createJob(req, res) {
    // code for update job
}

