import express from 'express';
import { v4 } from 'uuid';
import { IDigestedRequest } from '../types/IDigestedRequest';
import jwt, { Secret } from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/UnAuthenticatedError';

const encrypt = (userId: string): string => {
  return jwt.sign(userId, <Secret>process.env.JWTKey);
};

const decrypt = (JWTToken: string): string => {
  return <string>jwt.verify(JWTToken, <Secret>process.env.JWTKey);
};

export const userIdMiddleware = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  try {
    let userId: string | undefined = req.cookies.userId;
    if (!userId) {
      userId = encrypt(v4());
      res.cookie('userId', userId);
    }

    (<IDigestedRequest>req).userId = decrypt(userId);
    next();
  } catch (err) {
    next(new UnAuthenticatedError());
  }
};
