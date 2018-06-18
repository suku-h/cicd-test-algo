let basePath = __util.getBasePath();
let __logger = require(basePath + '/lib/logger');
let __res = require(basePath + '/lib/responseBuilder');
let testModel = require('./testModel');

let ping = (req, res) => {
    res.send('PONG');
}

let testMongo = async (req, res) => {
    try {
        let response = await testModel.getMongoUsers({location: 'Mumbai'});
        __logger.debug("Successfully fetched mongo data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'Success'));
    } catch(err) {
        __logger.error("Something went wrong while fetching mongo data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

let testPg = async (req, res) => {
    try {
        let response = await testModel.getPgUsers({location: 'Mumbai'});
        __logger.debug("Successfully fetched postgres data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'Success'));
    } catch(err) {
        __logger.error("Something went wrong while fetching postgres data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

let testMssql = async (req, res) => {
    try {
        let response = await testModel.getMssqlUsers({location: 'Mumbai'});
        __logger.debug("Successfully fetched mssql data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'Success'));
    } catch(err) {
        __logger.error("Something went wrong while fetching mssql data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

let testMysql = async (req, res) => {
    try {
        let response = await testModel.getMysqlUsers({location: 'Mumbai'});
        __logger.debug("Successfully fetched mysql data", JSON.stringify(response));
        res.send(__res.SUCCESS(response, 'Success'));
    } catch(err) {
        __logger.error("Something went wrong while fetching mysql data", err);
        res.send(__res.ERROR(err, err.message));
    }
}

module.exports = {
    ping: ping,
    testMongo: testMongo,
    testPg: testPg,
    testMssql: testMssql,
    testMysql: testMysql
};