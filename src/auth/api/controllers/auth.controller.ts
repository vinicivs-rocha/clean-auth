import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Signin } from 'src/auth/application/usecases/signin';
import { UserSessionData } from 'src/types/express';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { SigninDto } from '../dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _signin: Signin) {}

  @Post('signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    const session = await this._signin.execute(signinDto);

    res.cookie('session.id', session.id, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).send({ message: 'User signed in successfully' });
  }

  @Get('me')
  async me(@User() user: UserSessionData) {
    return { message: 'User fetched successfully', id: user.id };
  }
}
