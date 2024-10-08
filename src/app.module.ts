import { Module } from '@nestjs/common';
import { AuthModule } from './auth/api/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
