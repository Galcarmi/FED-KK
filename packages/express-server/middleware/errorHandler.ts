import express from 'express';
import { ServerError } from '../errors/ServerError';
import { logger } from '../logger/logger';
import { HTTPStatuses } from '../constants/HTTPStatus';

export const wrapError = (fn: Function) => async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const errorMiddleware = (
  err: Error | ServerError,
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  if (err instanceof ServerError) {
    logger.error(`custom server error: ${err.message}`);
    res.status(err.HTTPStatus).send(err.message);
  } else {
    logger.error(`internal server error: ${err.message}`);
    res.status(HTTPStatuses.INTERNAL_SERVER_ERROR).send(err);
  }
};
