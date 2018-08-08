"use strict";

let express 		= require('express'),
	router 				= express.Router(),
	job 					= require(`${BASEPATH}/api/modules/job/jobCtrl`),
	NotFound  = require(`${BASEPATH}/errors/errors`).NotFound,
	errorHandler	= require(`${BASEPATH}/errors/errorHandler`);

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
