import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/eveluation';
import { CreateEvaluationCommand } from '../commands';
import { EvaluationRepository } from '../ports/evaluation.repository';
import { SameEvaluationActorsError } from '../../domain/errors/same-actors.error';

@Injectable()
export class CreateEvaluationUC {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}
  execute(command: CreateEvaluationCommand): Promise<Evaluation> {
    if (command.evaluatedId === command.evaluatorId) {
      throw new SameEvaluationActorsError();
    }
    return this.evaluationRepository.create({
      title: command.title,
      score: command.score,
      evaluatedId: command.evaluatedId,
      evaluatorId: command.evaluatorId,
      note: command?.note,
    });
  }
}
