import { EntityManager } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  User,
  UserFactory,
  UserForCreate,
  UserNotFoundError,
  UserPublic,
  UserRole,
} from 'src/modules/users/domain';

import { MikroORMUserMapper } from './users-mikroorm.mapper';
import { MikroORMUser } from './users-mikroorm.entity';
import { UserRepository } from 'src/modules/users/application/ports';

@Injectable()
export class MikroORMUserRepository implements UserRepository {
  constructor(public readonly em: EntityManager) {}

  async create({ email, name, password }: UserForCreate): Promise<UserPublic> {
    const domainUser = UserFactory.createRegular({
      name,
      email,
      password,
    });
    const newUser = await MikroORMUserMapper.toPersist(domainUser);
    await this.em.persistAndFlush(newUser);

    return MikroORMUserMapper.toPublicDomain(newUser);
  }

  async getById(id: UUID): Promise<UserPublic> {
    const user = await this.em.findOne(MikroORMUser, { id });
    if (!user) {
      throw new UserNotFoundError();
    }
    return MikroORMUserMapper.toPublicDomain(user);
  }

  async getByEmail(email: string): Promise<UserPublic> {
    const user = await this.em.findOne(MikroORMUser, { email });
    if (!user) {
      throw new UserNotFoundError();
    }
    return MikroORMUserMapper.toPublicDomain(user);
  }

  async getByEmailWithPassword(email: string): Promise<User> {
    const user = await this.em.findOne(MikroORMUser, { email });
    if (!user) {
      throw new UserNotFoundError();
    }
    await user.password.load();
    return MikroORMUserMapper.toDomain(user);
  }

  async getAll(): Promise<UserPublic[]> {
    const users = await this.em.find(MikroORMUser, {});
    return Promise.all(
      users.map((user) => MikroORMUserMapper.toPublicDomain(user)),
    );
  }

  async updateRoles(id: UUID, role: UserRole[]): Promise<UserPublic> {
    const user = await this.em.findOne(MikroORMUser, { id });
    if (!user) {
      throw new UserNotFoundError();
    }

    user.roles = role;
    await this.em.flush();

    return MikroORMUserMapper.toPublicDomain(user);
  }
}
