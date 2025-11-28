import { Module } from '@nestjs/common';
import { UsersModule } from './users/application/users.module';
import { AuthModule } from './auth/application/auth.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class Modules {}
