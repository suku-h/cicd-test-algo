"use strict";

let basePath = __util.getBasePath();
let __logger = console; //require(basePath + '/lib/logger');
let postgres = require(basePath + '/lib/postgres');
let __config = require(basePath + '/config/db.json');

async function getAllJobs() {
    try {
        let dbConn = await postgres.init(__config.LENOVO_EMEA);
        return await dbConn.__select("SELECT id, b2x_job_number, imei_number_in, job_creation_date, created_on, updated_on FROM public.job_head_new order by 1 desc limit 10;", []);
    } catch(err) {
        throw err;
    }
}

async function getJob(jobId) {
    try {
        let dbConn = await postgres.init(__config.LENOVO_EMEA);
        let queryResponse = await dbConn.__select("SELECT id, b2x_job_number, imei_number_in, job_creation_date, created_on, updated_on FROM public.job_head_new WHERE id=$1;", [jobId]);

        return queryResponse.length ? queryResponse[0] : null;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getAllJobs: getAllJobs,
    getJob: getJob
}