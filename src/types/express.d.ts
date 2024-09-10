import { Session } from 'src/auth/domain/session';

export interface UserSessionData {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      session: Session | null;
      user: UserSessionData | null;
    }
  }
}
