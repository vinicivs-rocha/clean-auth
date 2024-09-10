import { User } from 'src/auth/domain/entities/user/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}
