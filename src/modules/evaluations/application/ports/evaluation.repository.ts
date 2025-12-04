import { UUID } from 'crypto';
import { Evaluation } from '../../domain/eveluation';
import { CreateEvaluationInput } from '../types';
import { UpdateEvaluationInput } from '../../domain/types';

export abstract class EvaluationRepository {
  abstract create(inpEval: CreateEvaluationInput): Promise<Evaluation>;
  abstract getById(id: UUID): Promise<Evaluation>;
  abstract getAll(): Promise<Evaluation[]>;
  abstract updateById(
    id: UUID,
    input: Partial<UpdateEvaluationInput>,
  ): Promise<Evaluation>;
  abstract deleteById(id: UUID): Promise<boolean>;
}
