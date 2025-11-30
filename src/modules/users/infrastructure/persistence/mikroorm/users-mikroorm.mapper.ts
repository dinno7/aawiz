import { Mapper } from 'src/shared/interfaces';
import { MikroORMUser } from './users-mikroorm.entity';
import { User } from 'src/modules/users/domain';
import { ref } from '@mikro-orm/postgresql';

class UserMapper implements Mapper<User, MikroORMUser> {
  toDomain(entity: MikroORMUser): Promise<User> {
    const domainUser = new User();
    domainUser.id = entity.id;
    domainUser.name = entity.name;
    domainUser.email = entity.email;
    domainUser.roles = entity.roles;
    domainUser.passwordUpdatedAt = entity?.passwordUpdatedAt;
    domainUser.updatedAt = entity.updatedAt;
    domainUser.createdAt = entity.createdAt;
    domainUser.password = entity.password.unwrap() || '';
    return Promise.resolve(domainUser);
  }

  toPersist(entity: User): Promise<MikroORMUser> {
    const orm = new MikroORMUser();
    orm.id = entity.id;
    orm.name = entity.name;
    orm.email = entity.email;
    orm.roles = entity.roles;
    orm.passwordUpdatedAt = entity.passwordUpdatedAt;
    orm.updatedAt = entity.updatedAt;
    orm.createdAt = entity.createdAt;
    orm.password = ref(entity.password);
    return Promise.resolve(orm);
  }
}

export const MikroORMUserMapper = new UserMapper();
