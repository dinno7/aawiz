import { BadRequestException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/shared';
import { UsersService } from 'src/modules/users/application/users.service';
import { SignInDto } from '../../dtos/sing-in.dto';
import { AuthTokenService } from '../auth-token.service';
import { TokensGenerated } from '../types';

@Injectable()
export class SigninUC {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async execute({ email, password }: SignInDto): Promise<TokensGenerated> {
    const user = await this.userService.getByEmail(email);
    const dummyPassword = this.hashingService.genDummyPassword();

    const isPasswordCorrect = await this.hashingService.compare(
      password,
      user?.password || dummyPassword,
    );

    if (!user || !isPasswordCorrect) {
      throw new BadRequestException(
        'Combination of email & password is not correct!',
      );
    }
    const tokens = await this.authTokenService.generateJWTTokens(user.id);
    return tokens;
  }
}
