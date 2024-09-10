import { hash } from 'argon2';
import { UserRepository } from 'src/auth/application/repositories/user';
import { User } from 'src/auth/domain/entities/user/user';

export class MemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    this.users = [
      User.create({
        email: 'joaozinho@gmail.com',
        password: await hash('12345678Joao'),
        isPasswordHashed: true,
      }),
    ];
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email.value === email) ?? null;
  }
}
