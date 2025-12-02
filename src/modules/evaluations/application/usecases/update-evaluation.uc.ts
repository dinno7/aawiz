import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/eveluation';
import { EvaluationRepository } from '../ports/evaluation.repository';
import { UpdateEvaluationCommand } from '../commands';

@Injectable()
export class UpdateEvaluationUC {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
  async execute(command: UpdateEvaluationCommand): Promise<Evaluation> {
    return this.evaluationRepository.updateById(
      command.id,
      command.updateValues,
    );
  }
}
