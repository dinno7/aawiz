import { SetMetadata } from '@nestjs/common';

import { PolicyHandlerType, PolicyOptions, PolicyPayload } from '../types';

export const SET_POLICIES_DECORATOR_KEY = Symbol('policies');

export function Policies(
  policies: PolicyHandlerType[],
  options?: PolicyOptions,
) {
  options ??= { justOneOfThem: false };

  return SetMetadata<symbol, PolicyPayload>(SET_POLICIES_DECORATOR_KEY, {
    policies,
    options,
  });
}
