let assert = require('assert');
let __util = require('../lib/util');
global.__util = __util;
let jobModel = require('../api/modules/job/jobModel');

describe('Fetch latest 10 jobs', function() {
  describe('#LatestJobs()', function() {
    it('should return length of array as 10', async function() {
        try {
            let response = await jobModel.getAllJobs();
            assert.equal(response.length, 10);
            return response
        } catch(err) {
            throw err;
        }
    });

    it('should return a job record', async function() {
        try {
            let response = await jobModel.getJob(1);
            assert.equal(typeof response, "object");
            return response
        } catch(err) {
            throw err;
        }
    });
  });
});