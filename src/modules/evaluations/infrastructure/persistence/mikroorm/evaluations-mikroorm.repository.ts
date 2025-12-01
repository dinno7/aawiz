import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from 'src/modules/evaluations/application/ports/evaluation.repository';
import { CreateEvaluationInput } from 'src/modules/evaluations/application/types/evaluation';
import { Evaluation } from 'src/modules/evaluations/domain/eveluation';
import { MikroOrmEvaluationMapper } from './evaluations-mikroorm.mapper';
import { MikroORMEvaluation } from './evaluations-mikroorm.entity';
import { UUID } from 'crypto';
import { EvaluationStatus } from 'src/modules/evaluations/domain/enums';

@Injectable()
export class MikroORMEvaluationRepository implements EvaluationRepository {
  constructor(public readonly em: EntityManager) {}

  async create(inpEval: CreateEvaluationInput): Promise<Evaluation> {
    const newEvaluate = this.em.create(MikroORMEvaluation, {
      evaluated: inpEval.evaluatedId,
      score: inpEval.score,
      status: EvaluationStatus.PENDING,
      title: inpEval.title,
      note: inpEval.note,
      evaluator: inpEval.evaluatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.em.flush();
    return MikroOrmEvaluationMapper.toDomain(newEvaluate);
  }
}
