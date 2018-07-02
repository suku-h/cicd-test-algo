'use strict';

var util = require('util');

function AbstractError(msg, code, constr) {
  Error.captureStackTrace(this, constr || this);
  this.code = code || null;
  this.message = msg || '';
}

util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'AbstractError';

var BadRequest = function (msg, code) {
  code = code || 400;
  this.name = 'BadRequest';
  BadRequest.super_.call(this, msg, code, this.constructor);
};
util.inherits(BadRequest, AbstractError);

var Unauthorized = function (msg, code) {
  code = code || 401;
  this.name = 'Unauthorized';
  Unauthorized.super_.call(this, msg, code, this.constructor);
};
util.inherits(Unauthorized, AbstractError);

var Forbidden = function (msg, code) {
  code = code || 403;
  this.name = 'Forbidden';
  Forbidden.super_.call(this, msg, code, this.constructor);
};
util.inherits(Forbidden, AbstractError);

var NotFound = function (msg, code) {
  code = code || 404;
  this.name = 'NotFound';
  NotFound.super_.call(this, msg, code, this.constructor);
};
util.inherits(NotFound, AbstractError);

var Unavailable = function (msg, code) {
  code = code || 503;
  this.name = 'Unavailable';
  Unavailable.super_.call(this, msg, code, this.constructor);
};
util.inherits(Unavailable, AbstractError);

module.exports = {
  "BadRequest": BadRequest,
  "Unauthorized": Unauthorized,
  "NotFound": NotFound,
  "Forbidden": Forbidden,
  "Unavailable": Unavailable
}
