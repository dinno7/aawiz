import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { IncorrectPasswordError } from 'src/modules/auth/application/errors/incorrect-password.error';
import { InvalidAuthTokenError } from 'src/modules/auth/application/errors/invalid-auth-token.error';
import { AppError } from 'src/shared';

@Catch(AppError)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: AppError) {
    let err = BadRequestException;
    if (
      exception instanceof InvalidAuthTokenError ||
      exception instanceof IncorrectPasswordError
    ) {
      err = ForbiddenException;
    }
    throw new err(exception.message);
  }
}
