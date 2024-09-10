import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Authenticate } from 'src/auth/application/usecases/authenticate';
import { Authorize } from 'src/auth/application/usecases/authorize';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _authenticate: Authenticate,
    private _authorize: Authorize,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    const sessionId: string | undefined = request.cookies['session.id'];

    const session = await this._authenticate.execute({
      sessionId: sessionId ?? '',
    });

    const { isAuthorized } = await this._authorize.execute({
      isPublic,
      session,
    });

    request.user = {
      id: session?.userId ?? '',
      email: session?.userEmail ?? '',
    };

    return isAuthorized;
  }
}
