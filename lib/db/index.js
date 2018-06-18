let basePath = __util.getBasePath();

let pgDb = require(basePath + 'lib/db/postgres');
let mssqlDb = require(basePath + 'lib/db/mssql');
let mysqlDb = require('mysqllib');



let mongoDb = require('mongolib');
let __logger = require(basePath + 'lib/logger');
let __config = require(basePath + 'config');

module.exports = {
    initialize: () => {
        // return mongoDb.__init(__config.mongo).then(() => {
        //     __logger.debug('Mongo connection started successfully');
        // }).catch(err => {
        //     throw err;
        // });
        // return pgDb.__init(__config.pg).then((status) => {
        //     if(status)
        //     __logger.debug('Postgres connection started successfully');
        // }).catch(err => {
        //     throw err;
        // });
        return mysqlDb.__init(__config.mysql).then((status) => {
            if(status)
            __logger.debug('Mssql connection started successfully');
        }).catch(err => {
            throw err;
        });
    },
    closeAll: () => {
        // mongoDb.__close(() => {
        //     __logger.debug('Mongo connection closed successfully');
        // })
        // pgDb.__close().then(() => {
        //     __logger.debug('Postgres connection closed successfully');
        // }).catch(err => {
        //     console.log('Errr', err.message);
        // });
        // mssqlDb.__close().then(() => {
        //     __logger.debug('Mssql connection closed successfully');
        // }).catch(err => {
        //     console.log('Errr', err.message);
        // });
        mysqlDb.__close().then(() => {
            __logger.debug('Mysql connection closed successfully');
        }).catch(err => {
            console.log('Errr', err.message);
        });
    }
}