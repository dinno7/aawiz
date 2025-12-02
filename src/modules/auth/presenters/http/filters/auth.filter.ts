import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { IncorrectPasswordError } from 'src/modules/auth/domain/errors/incorrect-password.error';
import { InvalidAuthTokenError } from 'src/modules/auth/domain/errors/invalid-auth-token.error';
import { AppError, DomainError } from 'src/shared';

@Catch(DomainError, AppError)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError | AppError) {
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
