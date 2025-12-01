import { Injectable } from '@nestjs/common';
import { CreateEvaluationUC } from './usecases/create-evaluation.uc';
import { CreateEvaluationCommand } from './commands/create-evaluation.command';
import { Evaluation } from '../domain/eveluation';

@Injectable()
export class EvaluationsService {
  constructor(private readonly createEvaluationUC: CreateEvaluationUC) {}

  create(input: CreateEvaluationCommand): Promise<Evaluation> {
    return this.createEvaluationUC.execute(input);
  }
}
