'use strict';

const errors 			= require(`${BASEPATH}/errors/errors`);
let BadRequest 		= errors.BadRequest,
		Unauthorized 	= errors.Unauthorized,
		Forbidden 		= errors.Forbidden,
		NotFound 			= errors.NotFound,
		Unavailable 	= errors.Unavailable;

module.exports = function errorHandler(err, req, res, next) {

	res.status(500);
  if (err instanceof BadRequest) res.status(400);
  else if (err instanceof NotFound) res.status(404);
  else if (err instanceof Forbidden) res.status(403);
  else if (err instanceof Unauthorized) res.status(401);
  else if (err instanceof Unavailable) res.status(503);

  appLog(err);
  if (!res.response.message) res.response.message = err.message || 'An error occurred';
  res.response.code = err.code || 0;
  res.json(res.response);
};
