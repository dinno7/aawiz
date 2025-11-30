import { Mapper } from 'src/shared/interfaces';
import { MikroORMUser } from './users-mikroorm.entity';
import { User } from 'src/modules/users/domain';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class MikroORMUserMapper implements Mapper<User, MikroORMUser> {
  constructor(
    @InjectRepository(MikroORMUser)
    private readonly userRepo: EntityRepository<MikroORMUser>,
  ) {}
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
    const persistUser = this.userRepo.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      roles: entity.roles,
      passwordUpdatedAt: entity.passwordUpdatedAt,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      password: entity.password,
    });
    return Promise.resolve(persistUser);
  }
}
