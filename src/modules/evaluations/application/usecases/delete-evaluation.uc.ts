import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../ports/evaluation.repository';
import { DeleteEvaluationCommand } from '../commands';

@Injectable()
export class DeleteEvaluationUC {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
  async execute(command: DeleteEvaluationCommand): Promise<boolean> {
    return this.evaluationRepository.deleteById(command.id);
  }
}
