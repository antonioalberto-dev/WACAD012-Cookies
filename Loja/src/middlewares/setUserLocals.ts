import { Request, Response, NextFunction } from 'express';

export default function setUserLocals(req: Request, res: Response, next: NextFunction) {
  res.locals.userId = req.session.userId;
  res.locals.userType = req.session.userType;
  res.locals.isAdmin = req.session.userType === 'admin';
  next();
}
