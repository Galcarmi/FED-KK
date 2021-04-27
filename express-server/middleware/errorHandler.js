import { ServerError } from '../errors/ServerError.js';
import { logger } from '../logger/logger.js';
import { HTTPStatuses } from '../constants/HTTPStatus.js';

export const wrapError = (fn) => async (req, res, next) => {
  try{
    await fn(req, res, next);
  }
  catch(err){
    next(err);
  }
};

export const errorMiddleware = (err, req, res, next) => {
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
