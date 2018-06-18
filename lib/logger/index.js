/**
 * Created by Pravin Lolage on 30 May 2018.
 */
let basePath = __util.getBasePath();
let config = require(basePath + 'config');
let winston = require('winston');
let moment = require('moment');


let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: config.logging.level,
            colorize: config.logging.colorize,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        }),
        new (require('winston-daily-rotate-file'))({
            json: false,
            name: 'combinedLogs',
            filename: config.logging.log_file,
            level: config.logging.level,
            datePattern: (config.logging.datePattern) ? config.logging.datePattern : 'YYYY-MM-DD',
            maxsize: (config.logging.maxsize) ? config.logging.maxsize : 104857600, // 100 MB,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        }),
        new (require('winston-daily-rotate-file'))({
            json: false,
            name: 'errorLogs',
            filename: config.logging.log_file + '.error',
            level: 'error',
            datePattern: (config.logging.datePattern) ? config.logging.datePattern : 'YYYY-MM-DD',
            maxsize: (config.logging.maxsize) ? config.logging.maxsize : 104857600, // 100 MB,
            'timestamp': function () {
                return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        })
    ]
});

if (!config.logging.console) {
    logger.remove(winston.transports.Console);
}

module.exports = logger;