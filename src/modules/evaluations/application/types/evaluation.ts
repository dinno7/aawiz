import { Evaluation } from '../../domain/eveluation';

export type CreateEvaluationInput = Pick<
  Evaluation,
  'title' | 'score' | 'evaluatorId' | 'evaluatedId' | 'note'
>;
