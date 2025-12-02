import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { DomainError } from 'src/shared';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError) {
    if (exception instanceof HttpException) {
      throw exception;
    }
    if (exception.isNotFound) {
      throw new NotFoundException(exception.message);
    }
    throw new BadRequestException(exception.message);
  }
}
