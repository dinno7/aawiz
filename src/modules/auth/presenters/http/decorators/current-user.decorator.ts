import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
import { USER_IN_REQUEST_KEY } from '../constants';
import { UserPublic } from 'src/modules/users/domain';

export const CurrentUser = createParamDecorator(
  (data: keyof UserPublic, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req?.[USER_IN_REQUEST_KEY];
    return user ? (data ? user[data] : user) : null;
  },
);
