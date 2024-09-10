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
  }: AuthenticateRequest): Promise<AuthenticateResponse | null> {
    return this.sessionGateway.find(sessionId);
  }
}
