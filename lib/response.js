'use strict';

let successMsgs = require(`${BASEPATH}/config/responseCodes.json`);
let errorMsgs = require(`${BASEPATH}/config/errorCodes.json`);

module.exports = {

  init: function response(req, res, next) {
    res.response = res.response || {};
    next();
  },

  createSuccessResponse: function (respData, respCode) {
    return {
      type: 'success',
      code: 200,
      message: successMsgs[respCode] || 'Request processed successfully!',
      data: respData
    }
  },

  createFailureResponse: function (errData, errCode) {
    return {
      type: 'error',
      message: errorMsgsMsgs[errCode] || 'Oops, something went wrong!',
      data: errData
    }
  }

}

