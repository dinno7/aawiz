import { User } from './users';

export type UserForCreate = Pick<User, 'name' | 'email' | 'password'>;

export type UserPublic = Omit<User, 'password'>;
