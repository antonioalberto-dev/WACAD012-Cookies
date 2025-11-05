import 'express-session';

declare module 'express-session' {
  interface SessionData {
    guestPurchaseId?: string;
    userId?: string;
    userType?: string;
  }
}
