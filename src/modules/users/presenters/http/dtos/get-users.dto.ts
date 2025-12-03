import { Exclude, Expose } from 'class-transformer';
import { type UUID } from 'crypto';
import { UserRole } from 'src/modules/users/domain';

export class GetUsersResDto {
  @Expose()
  id: UUID;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  roles: UserRole[];

  @Expose()
  createdAt: Date;
}
