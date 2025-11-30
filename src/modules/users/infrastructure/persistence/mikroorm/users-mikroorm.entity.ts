import { Entity, Enum, PrimaryKey, Property, type Ref } from '@mikro-orm/core';
import { UserRole } from 'src/modules/users/domain';

@Entity({ tableName: 'users' })
export class MikroORMUser {
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
    ref: true,
    lazy: true,
  })
  password!: Ref<string>;

  @Property({
    nullable: true,
  })
  passwordUpdatedAt?: Date;

  @Property()
  createdAt: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date;
}
