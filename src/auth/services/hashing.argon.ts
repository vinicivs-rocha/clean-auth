import * as argon from 'argon2';
import { HashingService } from 'src/auth/application/services/hashing';

export class ArgonHashingService implements HashingService {
  async hash(data: string): Promise<string> {
    return argon.hash(data);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return argon.verify(hash, data);
  }
}
