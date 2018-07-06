"use strict";

let express 		= require('express'),
	router 				= express.Router(),
	job 					= require(`${BASEPATH}/api/modules/job/jobCtrl`),
	NotFound  = require(`${BASEPATH}/errors/errors`).NotFound,
	errorHandler	= require(`${BASEPATH}/errors/errorHandler`);

/*
router.get('/job', job.getJobs);
router.get('/job/:id', job.getJob);
router.put('/job/:id', job.updateJob);
router.post('/job', job.createJob);
*/

router.get('/jdata', job.getData);

// handle 404 errors
router.use(function(req, res, next) {
    if (!req.route) {
        return next(new NotFound());
	}
    next();
});

router.use(errorHandler);

module.exports = router;
