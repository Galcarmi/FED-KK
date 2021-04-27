const { ServerError } = require('../errors/ServerError');
const { logger } = require('../logger/logger.js');
const { HTTPStatuses } = require('../constants/HTTPStatus.js');

exports.wrapError = (fn) => async (req, res, next) => {
  try{
    await fn(req, res, next);
  }
  catch(err){
    next(err);
  }
};

exports.errorMiddleware = (err, req, res, next) => {
  if (err instanceof ServerError) {
    logger.error(`custom server error: ${err.message}`);
    res.status(err.HTTPStatus).send(err.message);
  } else {
    logger.error(`internal server error: ${err.message}`);
    res
      .status(HTTPStatuses.INTERNAL_SERVER_ERROR)
      .send(err);
  }
};
