import { Mapper } from 'src/shared/interfaces';
import { MikroORMUser } from './users-mikroorm.entity';
import { User } from 'src/modules/users/domain';

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
    domainUser.password = entity.password;
    return Promise.resolve(domainUser);
  }

  toPersist(entity: User): Promise<MikroORMUser> {
    const persistUser = new MikroORMUser();
    persistUser.id = entity.id;
    persistUser.name = entity.name;
    persistUser.email = entity.email;
    persistUser.roles = entity.roles;
    persistUser.passwordUpdatedAt = entity.passwordUpdatedAt;
    persistUser.updatedAt = entity.updatedAt;
    persistUser.createdAt = entity.createdAt;
    persistUser.password = entity.password;
    return Promise.resolve(persistUser);
  }
}

export const MikroORMUserMapper = new UserMapper();
