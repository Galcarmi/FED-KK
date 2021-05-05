import express from 'express';
import { v4 } from 'uuid';
import { IDigestedRequest } from '../types/IDigestedRequest';

export const userIdMiddleware = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let userId: string | undefined = req.cookies.userId;
  if (!userId) {
    userId = v4();
    res.cookie('userId', userId);
  }

  (<IDigestedRequest>req).userId = userId;
  next();
};
