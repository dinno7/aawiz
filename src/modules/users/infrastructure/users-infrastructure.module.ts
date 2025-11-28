import { Modules } from 'src/modules/modules';
import { UsersMikroORMModule } from './persistence/mikroorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersMikroORMModule],
  exports: [UsersMikroORMModule],
})
export class UsersInfrastructureModule {}
