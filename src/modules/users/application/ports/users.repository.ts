import { UUID } from 'crypto';
import { User, UserForCreate, UserPublic, UserRole } from '../../domain';

export abstract class UserRepository {
  abstract create(user: UserForCreate): Promise<UserPublic>;
  abstract getById(id: UUID): Promise<UserPublic>;
  abstract getByEmail(email: string): Promise<UserPublic>;
  abstract getByEmailWithPassword(email: string): Promise<User>;
  abstract getAll(): Promise<UserPublic[]>;
  abstract updateRoles(id: UUID, role: UserRole[]): Promise<UserPublic>;
}
