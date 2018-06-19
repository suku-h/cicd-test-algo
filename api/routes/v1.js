"use strict";

let job = require('./../modules/job/jobCtrl');

let express = require('express');
let router = express.Router();

router.get('/job', job.getJobs);
router.get('/job/:id', job.getJob);
router.put('/job/:id', job.updateJob);
router.post('/job', job.createJob);

module.exports = router;