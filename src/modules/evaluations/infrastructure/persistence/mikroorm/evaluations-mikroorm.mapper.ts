import { Evaluation } from 'src/modules/evaluations/domain/eveluation';
import { Mapper } from 'src/shared';
import { MikroORMEvaluation } from './evaluations-mikroorm.entity';

export class EvaluationMapper implements Mapper<
  Evaluation,
  MikroORMEvaluation
> {
  toDomain(entity: MikroORMEvaluation): Promise<Evaluation> {
    const domain = new Evaluation();
    domain.id = entity.id;
    domain.title = entity.title;
    domain.score = entity.score;
    domain.status = entity.status;
    domain.evaluatorId = entity.evaluator.id;
    domain.evaluatedId = entity.evaluated.id;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    domain.note = entity.note;

    return Promise.resolve(domain);
  }

  toPersist(domain: Evaluation): Promise<MikroORMEvaluation> {
    const orm = new MikroORMEvaluation(domain);
    return Promise.resolve(orm);
  }
}

export const MikroOrmEvaluationMapper = new EvaluationMapper();
