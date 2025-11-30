import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return request.cookies?.[data];
    }
    return request.cookies;
  },
);
