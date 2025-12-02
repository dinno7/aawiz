import { UUID } from 'crypto';

export class ReadOneEvaluationCommand {
  constructor(public id: UUID) {}
}
