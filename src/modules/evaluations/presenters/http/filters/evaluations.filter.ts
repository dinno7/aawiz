import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { AppError } from 'src/shared';

@Catch(AppError)
export class EvaluationsExceptionFilter implements ExceptionFilter {
  catch(exception: AppError) {
    throw new BadRequestException(exception.message);
  }
}
