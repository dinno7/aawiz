import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { HashingService } from './hashing.service';
import { randomBytes } from 'crypto';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt(12);
    return hash(data, salt);
  }

  async compare(data: string | Buffer, hashedData: string): Promise<boolean> {
    try {
      return await compare(data, hashedData);
    } catch (_) {
      return false;
    }
  }

  genDummyPassword(): string {
    return randomBytes(32).toString('hex');
  }
}
