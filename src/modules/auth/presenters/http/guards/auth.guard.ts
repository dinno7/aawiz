import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_DECORATOR_KEY } from '../decorators/auth.decorator';
import { AuthTypes } from '../types';
import { BearerGuard } from './bearer.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypes.Bearer;
  private readonly authTypesMap: Record<
    AuthTypes,
    CanActivate | CanActivate[]
  > = {
    [AuthTypes.None]: { canActivate: () => true },
    [AuthTypes.Bearer]: { canActivate: () => false }, // Will set in constructor
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly bearerGuard: BearerGuard,
  ) {
    this.authTypesMap[AuthTypes.Bearer] = this.bearerGuard;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const mustValidateGuards = this.extractAuthTypesFromRoutes(context);

      //? Check all route Auth types and if one of them is passed return it's value
      const canActivate = await Promise.any(
        mustValidateGuards.map((guard) =>
          Promise.resolve(guard.canActivate(context)),
        ),
      );

      return canActivate === true;
    } catch (error) {
      throw new UnauthorizedException('You are not authorize');
    }
  }

  async provideUserIfAuthTypeIsNone(context: ExecutionContext) {
    const authType = this.extractRouteAuthTypes(context) || [];
    return authType?.includes(AuthTypes.None)
      ? (<BearerGuard>this.authTypesMap[AuthTypes.Bearer]).canActivate(context)
      : undefined;
  }

  private extractRouteAuthTypes(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<AuthTypes[] | undefined>(
      AUTH_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );
  }

  private extractAuthTypesFromRoutes(context: ExecutionContext) {
    const routeAuths = this.extractRouteAuthTypes(context) || [
      AuthenticationGuard.defaultAuthType,
    ];

    return routeAuths.map((guardKey) => this.authTypesMap[guardKey]).flat();
  }
}
