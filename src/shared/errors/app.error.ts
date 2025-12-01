import { ErrorTypes } from '../types';

export class AppError extends Error {
  type: ErrorTypes = ErrorTypes.APP;
  get message(): string {
    return 'Something went wrong in application, please try again';
  }
}
