import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Authenticate } from 'src/auth/application/usecases/authenticate';

@Injectable()
export class SessionAuthenticatorMiddleware implements NestMiddleware {
  constructor(private _authenticate: Authenticate) {}

  async use(req: Request, res: Response, next: () => void) {
    const sessionId = req.cookies['session.id'];

    const session = await this._authenticate.execute(sessionId);

    req['session'] = session;

    next();
  }
}
