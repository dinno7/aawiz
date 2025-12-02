import { DomainError } from 'src/shared';

export class EvaluationNotFoundError extends DomainError {
  isNotFound: boolean = true;
  get message(): string {
    return 'Evaluation not found';
  }
}
