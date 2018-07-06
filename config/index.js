let _ = require('lodash');

const ENV = (process.env.NODE_ENV).toLowerCase();

let defaultConfig = require('./default.json');
defaultConfig = _.merge(defaultConfig, require('./' + ENV + '.json') || {});

module.exports = defaultConfig;
