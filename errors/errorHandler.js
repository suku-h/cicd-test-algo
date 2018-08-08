'use strict';

const errors = require(`${BASEPATH}/errors/errors`);
let BadRequest = errors.BadRequest,
  Unauthorized = errors.Unauthorized,
  Forbidden = errors.Forbidden,
  NotFound = errors.NotFound,
  Unavailable = errors.Unavailable,
  response = require(`${BASEPATH}/lib/response`);

module.exports = function errorHandler(err, req, res, next) {
  let statusCode = 500;
  if (err instanceof BadRequest) statusCode = 400;
  else if (err instanceof NotFound) statusCode = 404;
  else if (err instanceof Forbidden) statusCode = 403;
  else if (err instanceof Unauthorized) statusCode = 401;
  else if (err instanceof Unavailable) statusCode = 503;

  auditLog(`${err.functionName}:: Api failed`, 100, 'error', err.functionName, 'error', req.headers, err);
  res.response = response.createFailureResponse(err);
  res.status(statusCode);
  res.json(res.response);
};
