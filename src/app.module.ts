import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/api/auth.module';
import { SessionAuthenticatorMiddleware } from './auth/api/middlewares/session-authenticator.middleware';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionAuthenticatorMiddleware)
      .exclude({ path: 'auth/signin', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
