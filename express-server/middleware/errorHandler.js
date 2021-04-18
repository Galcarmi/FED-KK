const { ServerError } = require('../errors/ServerError');
const { logger } = require('../logger/logger.js');
const { HTTPStatuses } = require('../constants/HTTPStatus.js');

exports.wrapError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
};

exports.errorMiddleware = (err, req, res, next) => {
  if (err instanceof ServerError) {
    res.status(err.HTTPStatus).send(err.message);
    logger.error(`custom server error: ${err.message}`);
  } else {
    res
      .status(HTTPStatuses.INTERNAL_SERVER_ERROR)
      .send('internal server error');
    logger.error(`internal server error: ${err.message}`);
  }
};
