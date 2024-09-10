import { Session } from '../models/session';

export interface AuthorizeRequest {
  isPublic: boolean;
  session: Session | null;
}

export interface AuthorizeResponse {
  isAuthorized: boolean;
}

export class Authorize {
  async execute({
    isPublic,
    session,
  }: AuthorizeRequest): Promise<AuthorizeResponse> {
    if (isPublic) {
      return { isAuthorized: true };
    }

    if (!session) {
      return { isAuthorized: false };
    }

    return { isAuthorized: true };
  }
}
