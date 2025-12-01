import { Module } from '@nestjs/common';
import { UsersModule } from './users/application/users.module';
import { AuthModule } from './auth/application/auth.module';
import { EvaluationsModule } from './evaluations/application/evaluations.module';

@Module({
  imports: [AuthModule, UsersModule, EvaluationsModule],
})
export class Modules {}
