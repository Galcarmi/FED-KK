const { ServerError } = require('./ServerError.js');
const { logger } = require('../logger/logger.js');
const { HTTPStatuses } = require('../constants/HTTPStatus.js');

const handleServerError = (e, res) => {
  if (e instanceof ServerError) {
    res.status(e.HTTPStatus).send(e.message);
    logger.error(`custom server error: ${e.message}`);
  } else {
    res
      .status(HTTPStatuses.INTERNAL_SERVER_ERROR)
      .send('internal server error');
    logger.error(`internal server error: ${e.message}`);
  }
};

module.exports = {
  handleServerError
}