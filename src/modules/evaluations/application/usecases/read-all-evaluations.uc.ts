import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/eveluation';
import { EvaluationRepository } from '../ports/evaluation.repository';

@Injectable()
export class ReadAllEvaluationUC {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
  async execute(): Promise<Evaluation[]> {
    return this.evaluationRepository.getAll();
  }
}
