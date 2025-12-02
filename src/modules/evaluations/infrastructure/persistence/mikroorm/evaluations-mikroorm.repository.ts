import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { EvaluationRepository } from 'src/modules/evaluations/application/ports/evaluation.repository';
import {
  CreateEvaluationInput,
  UpdateEvaluationInput,
} from 'src/modules/evaluations/domain/types';
import { Evaluation } from 'src/modules/evaluations/domain/eveluation';
import { MikroOrmEvaluationMapper } from './evaluations-mikroorm.mapper';
import { MikroORMEvaluation } from './evaluations-mikroorm.entity';
import { UUID } from 'crypto';
import { EvaluationStatus } from 'src/modules/evaluations/domain/enums';
import { EvaluationNotFoundError } from 'src/modules/evaluations/domain';
import { pickDefined } from 'src/shared';

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

  async getById(id: UUID): Promise<Evaluation> {
    const fetchedEval = await this.em.findOne(MikroORMEvaluation, id);
    if (!fetchedEval) {
      throw new EvaluationNotFoundError();
    }
    return MikroOrmEvaluationMapper.toDomain(fetchedEval);
  }

  async updateById(
    id: UUID,
    input: Partial<UpdateEvaluationInput>,
  ): Promise<Evaluation> {
    const fetchedEval = await this.em.findOne(MikroORMEvaluation, id);
    if (!fetchedEval) {
      throw new EvaluationNotFoundError();
    }
    Object.assign(fetchedEval, pickDefined(input));
    await this.em.flush();

    return MikroOrmEvaluationMapper.toDomain(fetchedEval);
  }

  async deleteById(id: UUID): Promise<boolean> {
    const isExists = await this.em.findOne(MikroORMEvaluation, id);
    if (!isExists) {
      throw new EvaluationNotFoundError();
    }
    await this.em.removeAndFlush(isExists);
    return true;
  }
}
