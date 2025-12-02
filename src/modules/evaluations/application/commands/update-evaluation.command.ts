import { UUID } from 'crypto';
import { UpdateEvaluationInput } from '../../domain';

export class UpdateEvaluationCommand {
  constructor(
    public id: UUID,
    public updateValues: Partial<UpdateEvaluationInput>,
  ) {}
}
