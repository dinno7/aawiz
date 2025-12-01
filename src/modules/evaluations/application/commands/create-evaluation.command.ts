import { UUID } from 'crypto';

export class CreateEvaluationCommand {
  constructor(
    public title: string,
    public score: number,
    public evaluatorId: UUID,
    public evaluatedId: UUID,
    public note?: string,
  ) {}
}
