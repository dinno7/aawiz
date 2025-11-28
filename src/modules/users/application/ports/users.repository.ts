import { UUID } from 'crypto';
import { User, UserForCreate } from '../../domain';

export abstract class UserRepository {
  abstract create(user: UserForCreate): Promise<User>;
  abstract getById(id: UUID): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
}
