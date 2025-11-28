import { Module } from '@nestjs/common';
import { HashingModule } from 'src/shared';
import { AuthController } from '../presenters/http/auth.controller';
import { SignupUC } from './usecases/signup.uc';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/application/users.module';
import { SigninUC } from './usecases/signin.uc';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './configs';
import { AuthTokenService } from './auth-token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    HashingModule,
  ],
  providers: [AuthService, AuthTokenService, SignupUC, SigninUC],
  controllers: [AuthController],
})
export class AuthModule {}
