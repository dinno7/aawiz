import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';
import { UsersController } from '../presenters/http/users.controller';

@Module({
  imports: [UsersInfrastructureModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
