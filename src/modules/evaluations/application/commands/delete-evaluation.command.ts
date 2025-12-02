import { UUID } from 'crypto';

export class DeleteEvaluationCommand {
  constructor(public id: UUID) {}
}
