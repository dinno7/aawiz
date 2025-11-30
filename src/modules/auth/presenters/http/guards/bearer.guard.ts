import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type Request } from 'express';
import { USER_IN_REQUEST_KEY } from '../constants';
import { AuthTokenService } from 'src/modules/auth/application/auth-token.service';

@Injectable()
export class BearerGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    try {
      const token = this.__extractToken(req);
      if (!token) throw new Error();
      const user = await this.authTokenService.verifyAccessToken(token);
      req[USER_IN_REQUEST_KEY] = user;
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private __extractToken(req: Request): string | undefined {
    const cookieAccessToken = req.cookies?.['accessToken'] as string;
    if (cookieAccessToken) {
      return cookieAccessToken;
    }
    const [type, token] = req.headers.authorization?.split?.(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
