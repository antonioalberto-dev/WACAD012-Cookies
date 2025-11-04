import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const setGuestPurchaseId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.guestPurchaseId) {
    req.session.guestPurchaseId = uuidv4();
  }
  next();
};

export default setGuestPurchaseId;
