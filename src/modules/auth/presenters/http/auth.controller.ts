import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { SignUpDto } from '../../dtos/sing-up.dto';
import { SignInDto } from '../../dtos/sing-in.dto';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signin(signinDto);
    res.cookie('auth', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      // TODO: add it
      // domain: ,
      // TODO: add it
      // maxAge: ,
    });
    return {
      refresh: tokens.refreshToken,
    };
  }

  // TODO:
  @Post('refresh')
  refreshTokens() {}
}
