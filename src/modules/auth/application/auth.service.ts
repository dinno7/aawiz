import { Injectable } from '@nestjs/common';
import { SignupUC } from './usecases/signup.uc';
import { SignUpDto } from '../dtos/sing-up.dto';
import { User } from 'src/modules/users/domain';
import { SignInDto } from '../dtos/sing-in.dto';
import { SigninUC } from './usecases/signin.uc';

@Injectable()
export class AuthService {
  constructor(
    private readonly signupUC: SignupUC,
    private readonly signinUC: SigninUC,
  ) {}

  async signup(user: SignUpDto): Promise<User> {
    return this.signupUC.execute(user);
  }

  async signin(user: SignInDto): Promise<void> {
    await this.signinUC.execute(user);
  }
}
