import { Session } from '../models/session';

export interface SessionGateway {
  save(session: Session): Promise<void>;
  find(id: string): Promise<Session | null>;
}
