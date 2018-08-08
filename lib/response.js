'use strict';

let uuid = require('uuid/v1');
let successMsgs = require(`${BASEPATH}/config/responseCodes.json`);
let errorMsgs = require(`${BASEPATH}/config/errorCodes.json`);

module.exports = {

	init: function response(req, res, next) {
		let b2xReqID = uuid();
		res.setHeader('b2xReqID', b2xReqID);
		res.response = res.response || {};
		req.headers['b2xReqID'] = b2xReqID;
		req.headers['ip'] = req.ip;
		req.headers['url'] = req.url;
		next();
	},

	createSuccessResponse: function (respData, respCode) {
		return {
			type: 'success',
			code: respCode,
			message: successMsgs[respCode] || 'Request processed successfully!',
			data: respData
		}
	},

	createFailureResponse: function (err) {
		console.log('err', err, err.code)
		return {
			type: 'error',
			code: err.code,
			message: err.message || 'Oops, something went wrong!',
			data: err.errData
		}
	}
}

