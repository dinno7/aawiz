import { UUID } from 'crypto';
import { User, UserForCreate, UserPublic } from '../../domain';

export abstract class UserRepository {
  abstract create(user: UserForCreate): Promise<UserPublic>;
  abstract getById(id: UUID): Promise<UserPublic | null>;
  abstract getByEmail(email: string): Promise<UserPublic | null>;
  abstract getByEmailWithPassword(email: string): Promise<User | null>;
}
