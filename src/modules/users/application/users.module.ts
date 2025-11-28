import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';

@Module({
  imports: [UsersInfrastructureModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
