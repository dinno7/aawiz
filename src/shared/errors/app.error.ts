import { ErrorTypes } from '../types';

export class AppError extends Error {
  type: ErrorTypes = ErrorTypes.APP;
}
