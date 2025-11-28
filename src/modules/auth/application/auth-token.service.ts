import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { jwtConfig } from './configs';
import { RefreshTokenPayload, TokensGenerated } from './types';
import { UsersService } from 'src/modules/users/application/users.service';
import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';

@Injectable()
export class AuthTokenService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signOut(refreshToken: string) {
    try {
      const {
        type,
        tokenId,
        id: userId,
      } = await this.#verifyToken<RefreshTokenPayload>(refreshToken);

      if (type !== 'refresh') throw new Error();

      // const user = await this.userService.getUserById(userId);
      // if (!user) throw new Error();

      // if (!(await this.redisService.remove(tokenId))) throw new Error();

      return true;
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async refreshToken(receivedToken: string) {
    try {
      const {
        type,
        tokenId,
        id: userId,
      } = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        receivedToken,
        {
          secret: this.jwtConfigurations.refreshTokenSecret,
          audience: this.jwtConfigurations.audience,
          issuer: this.jwtConfigurations.issuer,
        },
      );

      if (type !== 'refresh') throw new Error();

      const user = await this.userService.getById(userId);
      if (!user) throw new Error();

      // const isRefreshTokenValid = await this.redisService.validate(
      //   tokenId,
      //   receivedToken,
      // );

      // -> It's mean one malicious user will try to use refresh token(Auto Reuse Detection)
      // if (!isRefreshTokenValid)
      //   throw new InvalidRefreshTokenException('Access denied');

      // -> Just sure that refresh token will be remove successfully
      // if (!(await this.redisService.remove(tokenId))) throw new Error();

      return this.generateJWTTokens(userId);
    } catch (err) {
      if (err instanceof InvalidRefreshTokenException) {
        throw err;
      }
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async generateJWTTokens(sub: string): Promise<TokensGenerated> {
    const refreshTokenId = `user_${randomUUID()}`;

    const [accessToken, refreshToken] = await Promise.all([
      this.#signToken({
        type: 'access',
        id: sub,
      }),
      this.#signToken({
        type: 'refresh',
        id: sub,
        tokenId: refreshTokenId,
      }),
    ]);

    // TODO: Add refresh token to memory for refresh token aut

    return {
      accessToken,
      refreshToken,
    };
  }

  #signToken<T extends object = any>(payload: T): Promise<string> {
    return this.jwtService.signAsync<T>(payload, {
      secret: this.jwtConfigurations.secret,
      expiresIn: this.jwtConfigurations.accessTtl,
      audience: this.jwtConfigurations.audience,
      issuer: this.jwtConfigurations.issuer,
    });
  }

  #verifyToken<T extends object = any>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, {
      secret: this.jwtConfigurations.secret,
      audience: this.jwtConfigurations.audience,
      issuer: this.jwtConfigurations.issuer,
    });
  }
}
