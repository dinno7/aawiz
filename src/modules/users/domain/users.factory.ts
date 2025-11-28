import { UserRole } from './enums';
import { UserForCreate } from './types';
import { User } from './users';

export class UserFactory {
  static createRegular(newUser: UserForCreate): User {
    const user = new User();
    user.id = crypto.randomUUID();
    user.name = newUser.name;
    user.email = newUser.email;
    user.password = newUser.password;
    user.roles = [UserRole.user];
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  }

  static createAdmin(newUser: UserForCreate): User {
    const user = UserFactory.createRegular(newUser);
    user.roles = [UserRole.admin];
    return user;
  }
}
