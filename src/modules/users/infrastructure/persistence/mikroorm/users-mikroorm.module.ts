import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORMUserRepository } from './users-mikroorm.repository';
import { MikroORMUser } from './users-mikroorm.entity';
import { UserRepository } from 'src/modules/users/application/ports';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMUser])],
  providers: [
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
