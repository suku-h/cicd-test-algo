'use strict';

var util = require('util');

function AbstractError(msg, code, errData, constr) {
  Error.captureStackTrace(this, constr || this);
  this.code = code || null;
  this.message = msg || '';
  this.errData = errData || {};
}

util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'AbstractError';

var BadRequest = function(msg, code, errData) {
  code = code || 400;
  errData = errData || {};
  this.name = 'BadRequest';
  BadRequest.super_.call(this, msg, code, errData, this.constructor);
};
util.inherits(BadRequest, AbstractError);

var Unauthorized = function(msg, code, errData) {
  code = code || 401;
  errData = errData || {};
  this.name = 'Unauthorized';
  Unauthorized.super_.call(this, msg, code, errData, this.constructor);
};
util.inherits(Unauthorized, AbstractError);

var Forbidden = function(msg, code, errData) {
  code = code || 403;
  errData = errData || {};
  this.name = 'Forbidden';
  Forbidden.super_.call(this, msg, code, errData, this.constructor);
};
util.inherits(Forbidden, AbstractError);

var NotFound = function(msg, code, errData) {
  code = code || 404;
  errData = errData || {};
  this.name = 'NotFound';
  NotFound.super_.call(this, msg, code, errData, this.constructor);
};
util.inherits(NotFound, AbstractError);

var Unavailable = function(msg, code, errData) {
  code = code || 503;
  errData = errData || {};
  this.name = 'Unavailable';
  Unavailable.super_.call(this, msg, code, errData, this.constructor);
};
util.inherits(Unavailable, AbstractError);

module.exports = {
  "BadRequest": BadRequest,
  "Unauthorized": Unauthorized,
  "NotFound": NotFound,
  "Forbidden": Forbidden,
  "Unavailable": Unavailable
}
