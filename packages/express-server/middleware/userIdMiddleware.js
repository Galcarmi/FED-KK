import { v4 } from 'uuid';

export const userIdMiddleware = (req, res, next) => {
  let userId = req.cookies.userId;
  if (!userId) {
    userId = v4();
    res.cookie('userId', userId);
  }

  req.userId = userId;
  next();
};
