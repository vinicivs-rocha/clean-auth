import { randomUUID } from 'crypto';
import { SessionGateway } from '../gateways/session';
import { Session } from '../models/session';
import { UserRepository } from '../repositories/user';
import { HashingService } from '../services/hashing';

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse extends Session {}

export class Signin {
  constructor(
    private sessionGateway: SessionGateway,
    private userGateway: UserRepository,
    private hashingService: HashingService,
  ) {}

  async execute({ email, password }: SigninRequest): Promise<SigninResponse> {
    const user = await this.userGateway.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await this.hashingService.compare(
      password,
      user.password.value,
    );

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const session = {
      id: randomUUID(),
      userId: user.id.value,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    };

    await this.sessionGateway.save(session);

    return session;
  }
}
