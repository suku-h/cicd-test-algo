"use strict";

let postgres = require(`${BASEPATH}/lib/postgres`);
let __dbQueries = require(`${BASEPATH}/lib/dbQueries`);
let __config = require(`${BASEPATH}/config/db.json`);

module.exports = {
    getAllJobs: getAllJobs,
    getJob: getJob
}

async function getAllJobs() {
    try {
        // let dbConn = await postgres.init(__config.LENOVO_EMEA);
        // return await dbConn.__select(__dbQueries.getAllJobs(), []);
        return 'success';
    } catch(err) {
        throw err;
    }
}

async function getJob(jobId) {
    try {
        // let dbConn = await postgres.init(__config.LENOVO_EMEA);
        // let queryResponse = await dbConn.__select(__dbQueries.getJob(), [jobId]);

        // return queryResponse.length ? queryResponse[0] : null;
        return 'success';

    } catch(err) {
        throw err;
    }
}
