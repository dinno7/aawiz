import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { User, UserRole } from 'src/modules/users/domain';

@Entity({ tableName: 'users' })
export class MikroORMUser implements User {
  @PrimaryKey()
  id = crypto.randomUUID();

  @Property()
  name: string;

  @Property({
    unique: true,
  })
  email: string;

  @Enum({ items: () => UserRole, array: true, default: [UserRole.user] })
  roles = [UserRole.user];

  @Property({
    hidden: true,
  })
  password: string;

  @Property({
    nullable: true,
  })
  passwordUpdatedAt?: Date;

  @Property()
  createdAt: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date;
}
