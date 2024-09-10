import { UserRepository } from 'src/auth/application/repositories/user';
import { User } from 'src/auth/domain/entities/user/user';

export class MemoryUserRepository implements UserRepository {
  private users: User[] = [
    User.create({ email: 'joaozinho@gmail.com', password: '12345678Joao' }),
  ];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email.value === email) ?? null;
  }
}
