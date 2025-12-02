import { Injectable } from '@nestjs/common';
import { CreateEvaluationUC } from './usecases/create-evaluation.uc';
import { CreateEvaluationCommand } from './commands/create-evaluation.command';
import { Evaluation } from '../domain/eveluation';
import {
  DeleteEvaluationCommand,
  ReadOneEvaluationCommand,
  UpdateEvaluationCommand,
} from './commands';
import {
  DeleteEvaluationUC,
  ReadOneEvaluationUC,
  UpdateEvaluationUC,
} from './usecases';
import { UsersService } from 'src/modules/users/application/users.service';
import { UserNotFoundError } from 'src/modules/users/domain';

@Injectable()
export class EvaluationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly createEvaluationUC: CreateEvaluationUC,
    private readonly readOneEvaluationUC: ReadOneEvaluationUC,
    private readonly updateEvaluationUC: UpdateEvaluationUC,
    private readonly deleteEvaluationUC: DeleteEvaluationUC,
  ) {}

  async create(input: CreateEvaluationCommand): Promise<Evaluation> {
    const evaluator = await this.usersService.getById(input.evaluatorId);
    if (!evaluator) {
      throw new UserNotFoundError('Related user not found');
    }
    const evaluated = await this.usersService.getById(input.evaluatedId);
    if (!evaluated) {
      throw new UserNotFoundError('Evaluated not found');
    }

    return this.createEvaluationUC.execute(input);
  }

  readOne(input: ReadOneEvaluationCommand): Promise<Evaluation> {
    return this.readOneEvaluationUC.execute(input);
  }

  updateOne(input: UpdateEvaluationCommand): Promise<Evaluation> {
    return this.updateEvaluationUC.execute(input);
  }

  deleteOne(input: DeleteEvaluationCommand): Promise<boolean> {
    return this.deleteEvaluationUC.execute(input);
  }
}
