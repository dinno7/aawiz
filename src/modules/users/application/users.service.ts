import { Injectable } from '@nestjs/common';
import { UserRepository } from './ports';
import { User, UserForCreate } from '../domain';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: UserForCreate): Promise<User> {
    return this.userRepository.create(user);
  }

  async getById(id: UUID): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  async isUserEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);
    return !!user;
  }
}
