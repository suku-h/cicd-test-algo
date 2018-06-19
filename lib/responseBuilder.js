"use strict";

let basePath = __util.getBasePath();
let resMsgs = require(basePath + 'config/rescode.json');

let response = {
    SUCCESS: (data, msgCode) => {
        return {code: 200, message: resMsgs[msgCode] ? resMsgs[msgCode].message : "API Success", data: data || null};
    },
    ERROR: (err, msgCode) => {
        return {code: 510, message: resMsgs[msgCode] ? resMsgs[msgCode].message : "API Success", data: err ? err.message : null};
    },
    NOT_AUTHORISED: (err, msgCode) => {
        return {code: 511, message: resMsgs[msgCode] ? resMsgs[msgCode].message : "API Success", data: err ? err.message : null};
    },
    TOKEN_EXPIRED: (err, msgCode) => {
        return {code: 512, message: resMsgs[msgCode] ? resMsgs[msgCode].message : "API Success", data: err ? err.message : null};
    },
    SERVER_TIMEDOUT: (err, msgCode) => {
        return {code: 513, message: resMsgs[msgCode] ? resMsgs[msgCode].message : "API Success", data: err ? err.message : null};
    }
}

module.exports = response;