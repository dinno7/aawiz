import { Evaluation } from './eveluation';

export type CreateEvaluationInput = Pick<
  Evaluation,
  'title' | 'score' | 'evaluatorId' | 'evaluatedId' | 'note'
>;

export type UpdateEvaluationInput = Pick<
  Evaluation,
  'title' | 'score' | 'note' | 'status'
>;
