import { UUID } from 'crypto';
import { UserRole } from './enums';

export class User {
  id: UUID;
  name: string;
  email: string;
  roles: UserRole[];
  password: string;
  passwordUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
