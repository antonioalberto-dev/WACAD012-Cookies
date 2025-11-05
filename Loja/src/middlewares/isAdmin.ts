import { Request, Response, NextFunction } from 'express';

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userType === 'admin') {
    return next();
  }
  
  res.status(403).render('error', { 
    message: 'Acesso negado. Apenas administradores podem realizar esta ação.' 
  });
}
