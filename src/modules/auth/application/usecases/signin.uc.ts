import { BadRequestException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/shared';
import { UsersService } from 'src/modules/users/application/users.service';
import { AuthTokenService } from '../auth-token.service';
import { SigninCommand } from '../commands/signin.command';
import { SigninResult } from '../types';
import { IncorrectPasswordError } from '../errors/incorrect-password.error';

@Injectable()
export class SigninUC {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async execute({ email, password }: SigninCommand): Promise<SigninResult> {
    const user = await this.userService.getByEmailForAuth(email);
    const dummyPassword = this.hashingService.genDummyPassword();

    const isPasswordCorrect = await this.hashingService.compare(
      password,
      user?.password || dummyPassword,
    );

    if (!user || !isPasswordCorrect) {
      throw new IncorrectPasswordError(
        'Combination of email & password is not correct!',
      );
    }
    const { accessToken, refreshToken } =
      await this.authTokenService.generateJWTTokens(user.id);
    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
      accessMaxAgeMS: accessToken.masAgeSec * 1000,
      refreshMaxAgeMS: refreshToken.masAgeSec * 1000,
    };
  }
}
