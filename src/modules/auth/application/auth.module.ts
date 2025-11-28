import { Module } from '@nestjs/common';
import { HashingModule } from 'src/shared';
import { AuthController } from '../presenters/http/auth.controller';
import { SignupUC } from './usecases/signup.uc';
import { AuthService } from './auth.service';
import { UsersInfrastructureModule } from 'src/modules/users/infrastructure/users-infrastructure.module';
import { UsersModule } from 'src/modules/users/application/users.module';
import { SigninUC } from './usecases/signin.uc';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    HashingModule,
  ],
  providers: [AuthService, SignupUC, SigninUC],
  controllers: [AuthController],
})
export class AuthModule {}
