import { SessionGateway } from '../gateways/session';
import { Session } from '../models/session';

export interface AuthenticateRequest {
  sessionId: string;
}

export interface AuthenticateResponse extends Session {}

export class Authenticate {
  constructor(private sessionGateway: SessionGateway) {}

  async execute({
    sessionId,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const session = await this.sessionGateway.find(sessionId);

    if (!session) {
      throw new Error('Invalid session');
    }

    if (session.expiresAt < new Date()) {
      throw new Error('Session expired');
    }

    return session;
  }
}
