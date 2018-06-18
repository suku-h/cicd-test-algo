let serveStatic = require('serve-static');
let test = require('./../modules/test/testCtrl');

let express = require('express');
let router = express.Router();

router.get('/ping', test.ping);
router.get('/test-mongo', test.testMongo);
router.get('/test-pg', test.testPg);
router.get('/test-mssql', test.testMssql);
router.get('/test-mysql', test.testMysql);

module.exports = router;