import { UUID } from 'crypto';
import { EvaluationStatus } from './enums';

export class Evaluation {
  id: UUID;
  title: string;
  score: number;
  status: EvaluationStatus;
  evaluatorId: UUID;
  evaluatedId: UUID;
  createdAt: Date;
  updatedAt: Date;
  note?: string;
}
