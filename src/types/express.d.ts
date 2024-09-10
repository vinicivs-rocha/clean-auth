import { Session } from 'src/auth/domain/session';

export interface UserSessionData {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      session?: Session;
      user?: UserSessionData;
    }
  }
}
