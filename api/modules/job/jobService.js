"use strict";

let jobModel    = require('./jobModel'),
    BadRequest  = require(`${BASEPATH}/errors/errors`).BadRequest,
    errMsg      = require(`${BASEPATH}/config/errorCodes`),
    response    = require(`${BASEPATH}/lib/response`);

module.exports = {
	getData: getData,
	fun1: fun1,
	fun2: fun2,
	fun3: fun3
};


function fun1() {
  return new Promise(function(resolve,reject) {
    resolve(1);
  });
}

function fun2() {
  return new Promise(function(resolve,reject) {
    resolve(2);
  });
}

function fun3() {
  return new Promise(function(resolve,reject) {
    resolve(3);
  });
}

async function getData() {
		let res1 = await jobModel.fun1();
		let res2 = await jobModel.fun2();
		let res3 = await jobModel.fun3();
		let res4 = await jobModel.fun4();
		let result = {res1, res2, res3, res4};
		return response.createSuccessResponse(result, 'S1004');
}

