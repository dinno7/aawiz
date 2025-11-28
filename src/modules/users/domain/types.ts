import { User } from './users';

export type UserForCreate = Pick<User, 'name' | 'email' | 'password'>;
