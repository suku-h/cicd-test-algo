"use strict";

let postgres = require(`${BASEPATH}/lib/postgres`);
let __config = require(`${BASEPATH}/config/db.json`);

module.exports = {
    fun1: fun1,
    fun2: fun2,
    fun3: fun3,
    fun4: fun4
}

function fun1() {
	return new Promise(function(resolve,reject) {
		resolve({data: [1,2,3,4,5]});
	});
}

function fun2() {
	return new Promise(function(resolve,reject) {
		resolve({data: [6,7,8,9,10]});
	});
}

function fun3() {
	return new Promise(function(resolve,reject) {
		// let e = new Error('func3 failed');
		//reject(e);
		resolve({data: [11,12,13,14,15]});
	});
}

function fun4() {
	return new Promise(function(resolve,reject) {
		resolve({data: [16,17,18,19,20]});
	});
}

