import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { SignUpDto } from './dtos/sing-up.dto';
import { SignInDto } from './dtos/sing-in.dto';
import { type Response } from 'express';
import { Auth } from './decorators/auth.decorator';
import { AuthTypes } from './types';
import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from './constants';
import { Cookies } from 'src/shared';
import { SigninResult } from '../../application/types';
import { AuthExceptionFilter } from './filters/auth.filter';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Auth(AuthTypes.None)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @Auth(AuthTypes.None)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async signin(
    @Body() signinDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signin(signinDto);
    this.#injectTokensToCookie(res, tokens);
    return;
  }
  #injectTokensToCookie(res: Response, tokens: SigninResult) {
    res.cookie(COOKIE_ACCESS_TOKEN_KEY, tokens.accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === NodeEnv.prod,
      maxAge: tokens.accessMaxAgeMS,
      sameSite: true,
    });
    res.cookie(COOKIE_REFRESH_TOKEN_KEY, tokens.refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === NodeEnv.prod,
      maxAge: tokens.refreshMaxAgeMS,
      sameSite: true,
    });
  }

  @Post('refresh')
  @Auth(AuthTypes.None)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async refreshTokens(
    @Res({ passthrough: true }) res: Response,
    @Cookies(COOKIE_REFRESH_TOKEN_KEY) refreshToken: string,
  ) {
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not provided');
    }
    const tokens = await this.authService.refreshTokens(refreshToken);
    this.#injectTokensToCookie(res, tokens);
    return;
  }
}
