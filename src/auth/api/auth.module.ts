import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SessionGateway } from '../application/gateways/session';
import { UserRepository } from '../application/repositories/user';
import { HashingService } from '../application/services/hashing';
import { Authenticate } from '../application/usecases/authenticate';
import { Signin } from '../application/usecases/signin';
import { MemorySessionGateway } from '../data/gateways/session.memory';
import { MemoryUserRepository } from '../data/repositories/user.memory';
import { ArgonHashingService } from '../infra/services/hashing.argon';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'SessionGateway',
      useClass: MemorySessionGateway,
    },
    {
      provide: 'UserRepository',
      useClass: MemoryUserRepository,
    },
    {
      provide: 'HashingService',
      useClass: ArgonHashingService,
    },
    {
      provide: Signin,
      useFactory: (
        sessionGateway: SessionGateway,
        userRepository: UserRepository,
        hashingService: HashingService,
      ) => new Signin(sessionGateway, userRepository, hashingService),
      inject: ['SessionGateway', 'UserRepository', 'HashingService'],
    },
    {
      provide: 'Authenticate',
      useFactory: (sessionGateway: SessionGateway) =>
        new Authenticate(sessionGateway),
      inject: ['SessionGateway'],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: ['Authenticate'],
})
export class AuthModule {}
