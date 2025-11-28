import { Module } from '@nestjs/common';
import { HashingModule } from 'src/shared';
import { AuthController } from '../presenters/http/auth.controller';
import { SignupUC } from './usecases/signup.uc';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/application/users.module';
import { SigninUC } from './usecases/signin.uc';

@Module({
  imports: [
    UsersModule,
    HashingModule,
  ],
  providers: [AuthService, SignupUC, SigninUC],
  controllers: [AuthController],
})
export class AuthModule {}
