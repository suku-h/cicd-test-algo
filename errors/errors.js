'use strict';

var util = require('util');
var constant = require('../config/constant.json');
var errorCodes = require('../config/errorCodes.json');

module.exports = {
  AbstractError,
  BadRequest,
  Unauthorized,
  NotFound,
  Forbidden,
  Unavailable,
  InternalError
}

function AbstractError(msg, code, errData, functionName, constr) {
  Error.captureStackTrace(this, constr || this);
  this.code = code || null;
  this.message = msg || '';
  this.errData = errData || {};
  this.functionName = functionName || '';
}

util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'AbstractError';

function BadRequest(code, errData, functionName) {
  this.name = 'BadRequest'
  let msg = errorCodes[code] || constant['invalid_request'];
  BadRequest.super_.call(this, msg, code, errData, functionName, this.constructor);
};
util.inherits(BadRequest, AbstractError);

function Unauthorized(code, errData, functionName) {
  this.name = 'Unauthorized'
  let msg = errorCodes[code] || constant['unauthorized'];
  Unauthorized.super_.call(this, msg, code, errData, functionName, this.constructor);
};
util.inherits(Unauthorized, AbstractError);

function Forbidden(code, errData, functionName) {
  this.name = 'Forbidden'
  let msg = errorCodes[code] || constant['access_denied'];
  Forbidden.super_.call(this, msg, code, errData, functionName, this.constructor);
};
util.inherits(Forbidden, AbstractError);

function NotFound(code, errData, functionName) {
  this.name = 'NotFound'
  let msg = errorCodes[code] || constant['not_found'];
  NotFound.super_.call(this, msg, code, errData, functionName, this.constructor);
};
util.inherits(NotFound, AbstractError);

function Unavailable(code, errData, functionName) {
  this.name = 'Unavailable'
  let msg = errorCodes[code] || constant['unavailable'];
  Unavailable.super_.call(this, msg, code, errData, functionName, this.constructor);
};
util.inherits(Unavailable, AbstractError);

function InternalError(errData,functionName) {
  this.name = 'InternalError'
  let code = 500;
  InternalError.super_.call(this, 'Oops! Something went wrong.', code, errData, functionName, this.constructor);
};
util.inherits(InternalError, AbstractError);
