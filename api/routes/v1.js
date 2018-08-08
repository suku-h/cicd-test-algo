'use strict';

let express = require('express'),
	router = express.Router(),
	job = require(`${BASEPATH}/api/modules/job/jobCtrl`),
	NotFound = require(`${BASEPATH}/errors/errors`).NotFound,
	errorHandler = require(`${BASEPATH}/errors/errorHandler`),
	util = require(`${BASEPATH}/lib/util`);

router.get('/jdata', util.wrapperCall(job.getData));

router.use(errorHandler);

module.exports = router;
