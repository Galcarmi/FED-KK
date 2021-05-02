import express from 'express';
import { v4 } from 'uuid';

export const userIdMiddleware = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  let userId: string | undefined = req.cookies.userId;
  if (!userId) {
    userId = v4();
    res.cookie('userId', userId);
    req.cookies.userId = userId;
  }

  next();
};
