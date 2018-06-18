let basePath = __util.getBasePath();
let __logger = require(basePath + '/lib/logger');
let pg = require(basePath + '/lib/db/postgres');
let mssql = require(basePath + '/lib/db/mssql');
let mysql = require('mysqllib');
let mongo = require('mongolib');

let getMongoUsers = (condition) => {
    return new Promise((resolve, reject) => {
        mongo.__find('users', condition).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

let getPgUsers = (condition) => {
    return new Promise((resolve, reject) => {
        pg.__select('SELECT * from pups WHERE age > $1', [3]).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
        // pg.__insert('insert into pups(name, breed, age, sex) values($1, $2, $3, $4), ($5, $6, $7, $8)', ['Ronny', 'Doberman', 4, 'M', 'Ricky', 'Pug', 7, 'F']).then((result) => {
        //         resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
        // pg.__update('UPDATE pups SET age=$1 WHERE id=$2', [1, 6]).then((result) => {
        //     resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
    });
}

let getMssqlUsers = (condition) => {
    return new Promise((resolve, reject) => {
        mssql.__select('SELECT * from pups WHERE age > $1', [3]).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
        // pg.__insert('insert into pups(name, breed, age, sex) values($1, $2, $3, $4), ($5, $6, $7, $8)', ['Ronny', 'Doberman', 4, 'M', 'Ricky', 'Pug', 7, 'F']).then((result) => {
        //         resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
        // pg.__update('UPDATE pups SET age=$1 WHERE id=$2', [1, 6]).then((result) => {
        //     resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
    });
}

let getMysqlUsers = (condition) => {
    return new Promise((resolve, reject) => {
        // mysql.__select('SELECT * from test WHERE id >= ?', [1]).then((result) => {
        //     resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
        // mysql.__insert('insert into test(name, password) values(?, ?), (?, ?)', ['Ronny', '123123', 'Ricky', '123']).then((result) => {
        //     resolve(result);
        // }).catch(err => {
        //     reject(err);
        // });
        mysql.__update('UPDATE test SET password=? WHERE id=?', ['123123', 1]).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getMongoUsers: getMongoUsers,
    getPgUsers: getPgUsers,
    getMssqlUsers: getMssqlUsers,
    getMysqlUsers: getMysqlUsers
}