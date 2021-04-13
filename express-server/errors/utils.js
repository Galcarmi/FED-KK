import { ServerError } from './ServerError.js';
import { logger } from '../logger/logger.js';
import { HTTPStatuses } from '../constants/HTTPStatus.js';

export const handleServerError = (e, res) => {
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
