import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { SET_POLICIES_DECORATOR_KEY } from '../decorators/policy.decorator';
import {
  PolicyHandlerCallback,
  PolicyHandlerClass,
  PolicyHandlerResult,
  PolicyHandlerType,
  PolicyPayload,
} from '../types';
import { Request } from 'express';
import { AUTH_DECORATOR_KEY } from 'src/modules/auth/presenters/http/decorators/auth.decorator';
import { AuthTypes } from 'src/modules/auth/presenters/http/types';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private moduleRef: ModuleRef,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (this.#isPublicRoute(context)) return true;

      const routePolicySettings = this.#extractRoutePoliciesSettings(context);
      const routePolicies = routePolicySettings.policies;

      if (routePolicies?.length == 0) return true;

      const req = context.switchToHttp().getRequest<Request>();
      const routePolicyOptions = routePolicySettings.options;
      if (!req.user?.id) {
        return false;
      }

      const policiesPromises = [] as Promise<PolicyHandlerResult>[];
      for (const policy of routePolicies) {
        const handler = this.#resolveHandler(policy);
        policiesPromises.push(Promise.resolve(handler(req.user, context)));
      }

      const policiesResolvedArr = await Promise.all(policiesPromises);

      const isValid = routePolicyOptions?.justOneOfThem
        ? policiesResolvedArr.some((r) => r)
        : policiesResolvedArr.every((r) => r);

      if (!isValid) throw new Error();

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus().toString().startsWith('4')) {
          throw error;
        }
      }

      let msg = 'Permission denied';
      if (error instanceof Error && error.message.length > 0) {
        msg = error.message;
      }
      throw new ForbiddenException(msg);
    }
  }

  #extractRoutePoliciesSettings(ctx: ExecutionContext): PolicyPayload {
    return (
      this.reflector.getAllAndOverride<PolicyPayload, symbol>(
        SET_POLICIES_DECORATOR_KEY,
        [ctx.getHandler(), ctx.getClass()],
      ) || { options: { justOneOfThem: false }, policies: [] }
    );
  }

  #isPublicRoute(ctx: ExecutionContext) {
    return (
      this.reflector
        .getAllAndOverride<
          AuthTypes[]
        >(AUTH_DECORATOR_KEY, [ctx.getHandler(), ctx.getClass()])
        ?.includes(AuthTypes.None) || false
    );
  }

  #resolveHandler(policy: PolicyHandlerType): PolicyHandlerCallback {
    // 1.  plain function -> wrap into an object that implements PolicyHandlerCallback
    if (this.#isFunction(policy)) {
      return policy.bind(policy) as PolicyHandlerCallback;
    }

    // 2.  already an instance -> use as-is
    if (this.#isInstance(policy)) {
      return policy.handle.bind(policy) as PolicyHandlerCallback;
    }

    // 3.  concrete class -> let IoC container create it (with deps)
    const Ctor: Type<PolicyHandlerClass> = policy;
    const resolved = this.moduleRef.get<PolicyHandlerClass>(Ctor, {
      strict: false,
    });
    return resolved.handle.bind(resolved) as PolicyHandlerCallback;
  }

  #isFunction(val: any): val is PolicyHandlerCallback {
    Object.getPrototypeOf(val as PolicyHandlerClass);
    return typeof val === 'function' && !(val instanceof PolicyHandlerClass);
  }

  #isInstance(val: any): val is PolicyHandlerClass {
    return (
      val instanceof PolicyHandlerClass && typeof val.handle === 'function'
    );
  }
}
