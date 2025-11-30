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
import { MemoryStorageModule } from 'src/shared/memory-storage';
import { BearerGuard } from '../presenters/http/guards/bearer.guard';
import { AuthenticationGuard } from '../presenters/http/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokensUC } from './usecases/refresh-tokens.uc';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    HashingModule,
    MemoryStorageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AuthService,
    AuthTokenService,
    BearerGuard,
    SignupUC,
    SigninUC,
    RefreshTokensUC,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
