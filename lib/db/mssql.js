/*
    Created by Pravin Lolage on 15 June 2018.
*/
var mssql = require('mssql');
let libMssql = {};

let init = (dbConfig) => {
    return new Promise((resolve, reject) => {

        // set config here for later use
        libMssql.dbConfig = dbConfig;

        if (!libMssql.dbConfig.init) {
            libMssql.conn = null;
            return resolve(false);
        }

        mssql.connect(dbConfig.options).then(pool => {
            libMssql.conn = pool;
            resolve(true);

            pool.on('error', function (err) {
                console.error('libMssql.init, error connecting mssql:', err.message);
                libMssql.conn = null;
            });
        }).catch(err => {
            console.error('connection failed with mssql', err.message);
            reject(err);
        });
    });
}

let select = (query, queryParams = []) => {
    return new Promise((resolve, reject) => {
        if (libMssql.conn) {

            libMssql.conn.request()
            // .input('visitPurposeCode', mssql.VarChar(50), dataParams.visitPurposeCode)
            // .input('PurposeName', mssql.VarChar(100), dataParams.PurposeName)
            .query('SELECT * from problemFound').then(result => {
                resolve(result);
            }).catch(err => {
                console.error('libMssql.select, failed', e.message);
                reject(err);
            });
        } else {
            console.error('libMssql.select, error connecting mssql');
            reject(new Error('Mssql is not connected, please try again later'));
        }
    });
}

let close = async () => {
    if (libMssql.dbConfig.init) {
        await libMssql.conn.close();
    }
}

module.exports = {
    __init: init,
    __select: select,
    __close: close
}
