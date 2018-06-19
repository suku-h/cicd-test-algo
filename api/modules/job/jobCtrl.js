"use strict";

let basePath = __util.getBasePath();
let __logger = console; //require(basePath + '/lib/logger');
let __res = require(basePath + '/lib/responseBuilder');
let jobModel = require('./jobModel');

async function getJobs(req, res) {
    try {
        let response = await jobModel.getAllJobs();
        __logger.debug("Successfully fetched jobs data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'N1001'));
    } catch(err) {
        __logger.error("Something went wrong while fetching jobs data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

async function getJob(req, res) {
    try {
        let response = await jobModel.getJob(req.params.id);
        __logger.debug("Successfully fetched job data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'N1001'));
    } catch(err) {
        __logger.error("Something went wrong while fetching job data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

async function updateJob(req, res) {
    // code for update job
}

async function createJob(req, res) {
    // code for update job
}

module.exports = {
    getJobs: getJobs,
    getJob: getJob,
    updateJob: updateJob,
    createJob: createJob
};