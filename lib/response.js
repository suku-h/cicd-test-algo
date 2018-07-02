'use strict';

let successMsgs = require(`${BASEPATH}/config/responseCodes.json`);
let errorMsgs = require(`${BASEPATH}/config/errorCodes.json`);
let uuid = require('uuid/v1');

module.exports = {
	init: function response(req, res, next) {
		let b2xReqID = uuid();
		res.headers = {b2xReqID};
		res.response = res.response || {};
		req.headers = { b2xReqID, ip: req.ip, url: req.url };
		next();
	},
	createSuccessResponse: function(respData,respCode) {
		return {
			type		: 'success',
			code		: 200,
			message	: successMsgs[respCode] || 'Request processed successfully!',
			data		: respData
		}
	}

}

