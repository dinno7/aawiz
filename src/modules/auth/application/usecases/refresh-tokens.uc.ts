import { Injectable } from '@nestjs/common';
import { AuthTokenService } from '../auth-token.service';
import { MemoryStorage } from 'src/shared/memory-storage';
import { SigninResult } from '../types';
import { AppError } from 'src/shared';

@Injectable()
export class RefreshTokensUC {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly memoryStorage: MemoryStorage,
  ) {}

  async execute(receivedToken: string): Promise<SigninResult> {
    const payload =
      await this.authTokenService.verifyRefreshToken(receivedToken);

    // -> Just sure that refresh token will be remove successfully
    if (!(await this.memoryStorage.remove(payload?.tokenId))) {
      throw new AppError('Removing exists refresh from memory failed');
    }

    const { accessToken, refreshToken } =
      await this.authTokenService.generateJWTTokens(payload.id);
    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
      accessMaxAgeMS: accessToken.masAgeSec * 1000,
      refreshMaxAgeMS: refreshToken.masAgeSec * 1000,
    };
  }
}
