import { Request, Response, NextFunction } from 'express';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    return next();
  }
  
  res.redirect('/login');
}
