import { DomainError } from 'src/shared';

export class UserNotFoundError extends DomainError {
  isNotFound: boolean = true;
  get message(): string {
    return 'User not found';
  }
}
