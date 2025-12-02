import { ExecutionContext } from '@nestjs/common';
import { UserPublic, UserRole } from 'src/modules/users/domain';

export const RolePolicy =
  (role: UserRole) => (user: UserPublic, _: ExecutionContext) =>
    user.roles.includes(role);
