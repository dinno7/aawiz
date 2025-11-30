import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORMUserRepository } from './users-mikroorm.repository';
import { MikroORMUser } from './users-mikroorm.entity';
import { UserRepository } from 'src/modules/users/application/ports';
import { MikroORMUserMapper } from './users-mikroorm.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMUser])],
  providers: [
    MikroORMUserMapper,
    {
      provide: UserRepository,
      useClass: MikroORMUserRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useExisting: MikroORMUserRepository,
    },
  ],
})
export class UsersMikroORMModule {}
