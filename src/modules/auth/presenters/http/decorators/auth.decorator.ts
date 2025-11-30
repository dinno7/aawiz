import { applyDecorators, SetMetadata } from '@nestjs/common';
import { AuthTypes } from '../types';

export const AUTH_DECORATOR_KEY = Symbol('auth');
export const Auth = (auths: AuthTypes | AuthTypes[]) =>
  SetMetadata(AUTH_DECORATOR_KEY, !Array.isArray(auths) ? [auths] : auths);
