import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { SignUpDto } from '../../dtos/sing-up.dto';
import { SignInDto } from '../../dtos/sing-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SignInDto) {
    return this.authService.signin(signinDto);
  }
}
