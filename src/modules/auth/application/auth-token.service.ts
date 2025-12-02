import { Inject, Injectable, Logger } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { UUID } from 'crypto';
import { jwtConfig } from './configs';
import {
  AccessTokenPayload,
  AuthTokenPayload,
  RefreshTokenPayload,
  GeneratedToken,
  TokenType,
  GeneratedAuthTokens,
} from './types';
import { UsersService } from 'src/modules/users/application/users.service';
import { MemoryStorage } from 'src/shared/memory-storage';
import { UserPublic } from 'src/modules/users/domain';
import { InvalidAuthTokenError } from '../domain/errors/invalid-auth-token.error';

@Injectable()
export class AuthTokenService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly memoryStorage: MemoryStorage,
  ) {}

  private readonly logger = new Logger(AuthTokenService.name);

  async generateJWTTokens(sub: UUID): Promise<GeneratedAuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.#generateAccessToken(sub),
      this.#generateRefreshToken(sub),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<UserPublic> {
    const payload = await this.#verifyToken<AccessTokenPayload>(
      TokenType.ACCESS,
      token,
    );

    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new InvalidAuthTokenError('User not found');
    }

    if (user.passwordUpdatedAt) {
      const changePassAfterTokenIssued =
        payload.iat * 1000 <= user?.passwordUpdatedAt?.valueOf();
      if (changePassAfterTokenIssued) {
        throw new InvalidAuthTokenError('Token expires');
      }
    }

    return user;
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    const payload = await this.#verifyToken<RefreshTokenPayload>(
      TokenType.REFRESH,
      token,
    );

    const user = await this.userService.getById(payload?.id);
    if (!user) {
      throw new InvalidAuthTokenError('Invalid user');
    }

    const isRefreshTokenValid = await this.memoryStorage.validate(
      payload?.tokenId,
      token,
    );

    // -> It's mean one malicious user will try to use refresh token(Auto Reuse Detection)
    if (!isRefreshTokenValid) {
      this.logger.error('Invalid refresh token, token maybe stolen');
      this.logger.verbose(
        'If you restart the application, it saves tokens in memory, which are lost during each restart. For a production environment, it is recommended to implement and use Redis as a memory storage module',
      );
      throw new InvalidAuthTokenError(
        'Invalid refresh token, the token may have been stolen',
      );
    }

    return payload;
  }

  async #generateAccessToken(sub: UUID): Promise<GeneratedToken> {
    const token = await this.#signToken({
      id: sub,
      type: TokenType.ACCESS,
    });
    return {
      token,
      masAgeSec: this.jwtConfigurations.accessTtlSec,
    };
  }

  async #generateRefreshToken(sub: UUID): Promise<GeneratedToken> {
    const refreshTokenId = `user_${sub}_${Date.now()}`;

    const token = await this.#signToken({
      id: sub,
      type: TokenType.REFRESH,
      tokenId: refreshTokenId,
    });

    if (!(await this.memoryStorage.insert(refreshTokenId, token))) {
      this.logger.error('Setting refresh token to memory failed');
      throw new Error('Something went wrong to issue tokens');
    }

    return {
      token,
      masAgeSec: this.jwtConfigurations.refreshTtlSec,
    };
  }

  #signToken<T extends Omit<AuthTokenPayload, 'iat' | 'exp' | 'aud' | 'iss'>>(
    payload: T,
  ): Promise<string> {
    const opts: JwtSignOptions = {
      audience: this.jwtConfigurations.audience,
      issuer: this.jwtConfigurations.issuer,
    };

    if (payload.type === TokenType.REFRESH) {
      opts.secret = this.jwtConfigurations.refreshTokenSecret;
      opts.expiresIn = this.jwtConfigurations.refreshTtlSec;
    } else {
      opts.secret = this.jwtConfigurations.secret;
      opts.expiresIn = this.jwtConfigurations.accessTtlSec;
    }

    return this.jwtService.signAsync<T>(payload, opts);
  }

  #verifyToken<T extends AuthTokenPayload>(
    type: TokenType,
    token: string,
  ): Promise<T> {
    const opts: JwtVerifyOptions = {
      audience: this.jwtConfigurations.audience,
      issuer: this.jwtConfigurations.issuer,
    };
    if (type === TokenType.REFRESH) {
      opts.secret = this.jwtConfigurations.refreshTokenSecret;
    } else {
      opts.secret = this.jwtConfigurations.secret;
    }
    return this.jwtService.verifyAsync<T>(token, opts);
  }
}
