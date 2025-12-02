import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/eveluation';
import { EvaluationRepository } from '../ports/evaluation.repository';
import { ReadOneEvaluationCommand } from '../commands';

@Injectable()
export class ReadOneEvaluationUC {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
  async execute(command: ReadOneEvaluationCommand): Promise<Evaluation> {
    return this.evaluationRepository.getById(command.id);
  }
}
