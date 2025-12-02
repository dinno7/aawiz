import { DomainError } from 'src/shared';

export class SameEvaluationActorsError extends DomainError {
  get message(): string {
    return 'You can not evaluate yourself';
  }
}
