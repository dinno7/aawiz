import { Injectable } from '@nestjs/common';
import { SignupUC } from './usecases/signup.uc';
import { UserPublic } from 'src/modules/users/domain';
import { SigninUC } from './usecases/signin.uc';
import { SigninCommand } from './commands/signin.command';
import { SignupCommand } from './commands/signup.command';
import { SigninResult } from './types';
import { RefreshTokensUC } from './usecases/refresh-tokens.uc';

@Injectable()
export class AuthService {
  constructor(
    private readonly signupUC: SignupUC,
    private readonly signinUC: SigninUC,
    private readonly refreshTokenUC: RefreshTokensUC,
  ) {}

  async signup(user: SignupCommand): Promise<UserPublic> {
    return this.signupUC.execute(user);
  }

  async signin(user: SigninCommand): Promise<SigninResult> {
    return this.signinUC.execute(user);
  }

  async refreshTokens(refreshToken: string): Promise<SigninResult> {
    return this.refreshTokenUC.execute(refreshToken);
  }
}
