import { ExecutionContext, Type } from '@nestjs/common';
import { UserPublic } from 'src/modules/users/domain';

export type PolicyHandlerResult = boolean | Promise<boolean>;

export type PolicyHandlerCallback = (
  user: UserPublic,
  context: ExecutionContext,
) => PolicyHandlerResult;

export abstract class PolicyHandlerClass {
  abstract handle(
    user: UserPublic,
    context: ExecutionContext,
  ): PolicyHandlerResult;
}

export type PolicyHandlerType =
  | PolicyHandlerCallback
  | PolicyHandlerClass
  | Type<PolicyHandlerClass>;

export type PolicyOptions = {
  justOneOfThem?: boolean;
};

export type PolicyPayload = {
  policies: PolicyHandlerType[];
  options: PolicyOptions;
};
