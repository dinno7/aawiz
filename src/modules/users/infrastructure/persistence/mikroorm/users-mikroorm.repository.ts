import { EntityManager } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  User,
  UserFactory,
  UserForCreate,
  UserPublic,
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

    return domainUser;
  }

  async getById(id: UUID): Promise<UserPublic | null> {
    const user = await this.em.findOne(MikroORMUser, { id });
    if (!user) {
      return null;
    }
    return MikroORMUserMapper.toDomain(user);
  }

  async getByEmail(email: string): Promise<UserPublic | null> {
    const user = await this.em.findOne(MikroORMUser, { email });
    if (!user) {
      return null;
    }
    return MikroORMUserMapper.toDomain(user);
  }

  async getByEmailWithPassword(email: string): Promise<User | null> {
    const user = await this.em.findOne(MikroORMUser, { email });
    if (!user) {
      return null;
    }
    await user.password.load();
    return MikroORMUserMapper.toDomain(user);
  }

  async getAll(): Promise<UserPublic[]> {
    const users = await this.em.find(MikroORMUser, {});
    return Promise.all(users.map((user) => MikroORMUserMapper.toDomain(user)));
  }
}
