import { Injectable } from '@nestjs/common';
import { UserRepository } from './ports';
import { User, UserForCreate, UserPublic } from '../domain';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: UserForCreate): Promise<UserPublic> {
    return this.userRepository.create(user);
  }

  async getById(id: UUID): Promise<UserPublic | null> {
    return this.userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<UserPublic | null> {
    return this.userRepository.getByEmail(email);
  }

  async getByEmailForAuth(email: string): Promise<User | null> {
    return this.userRepository.getByEmailWithPassword(email);
  }

  async isUserEmailExists(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.getByEmail(email);
      return !!user;
    } catch (_) {
      return false;
    }
  }

  async getUsers(): Promise<UserPublic[]> {
    try {
      const users = await this.userRepository.getAll();
      return users || [];
    } catch (_) {
      return [];
    }
  }
}
