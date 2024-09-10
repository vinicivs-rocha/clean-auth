import { SessionGateway } from 'src/auth/application/gateways/session';
import { Session } from 'src/auth/application/models/session';

export class MemorySessionGateway implements SessionGateway {
  private sessions: Session[] = [];

  async save(session: Session) {
    this.sessions.push(session);
  }

  async find(id: string) {
    return this.sessions.find((session) => session.id === id) ?? null;
  }
}
