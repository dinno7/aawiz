import { ErrorTypes } from '../types';

export class DomainError extends Error {
  type: ErrorTypes = ErrorTypes.DOMAIN;
  isNotFound: boolean = false;

  get message(): string {
    return 'Something went wrong, please try again';
  }
}
