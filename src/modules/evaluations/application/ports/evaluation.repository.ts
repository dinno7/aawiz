import { Evaluation } from '../../domain/eveluation';
import { CreateEvaluationInput } from '../types/evaluation';
export abstract class EvaluationRepository {
  abstract create(inpEval: CreateEvaluationInput): Promise<Evaluation>;
}
