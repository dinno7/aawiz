import { AppError } from 'src/shared';

export class SameEvaluationActorsError extends AppError {
  get message(): string {
    return 'You can not evaluate yourself';
  }
}
