"use strict";

let express 		= require('express'),
	router 				= express.Router(),
	job 					= require(`${BASEPATH}/api/modules/job/jobCtrl`),
	errorHandler	= require(`${BASEPATH}/errors/errorHandler`);

/*
router.get('/job', job.getJobs);
router.get('/job/:id', job.getJob);
router.put('/job/:id', job.updateJob);
router.post('/job', job.createJob);
*/

router.get('/jdata', job.getData);

router.use(errorHandler);

module.exports = router;
