import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORMEvaluationRepository } from './evaluations-mikroorm.repository';
import { EvaluationRepository } from 'src/modules/evaluations/application/ports/evaluation.repository';
import { MikroORMEvaluation } from './evaluations-mikroorm.entity';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMEvaluation])],
  providers: [
    {
      provide: EvaluationRepository,
      useClass: MikroORMEvaluationRepository,
    },
  ],
  exports: [
    {
      provide: EvaluationRepository,
      useExisting: MikroORMEvaluationRepository,
    },
  ],
})
export class EvaluationsMikroORMModule {}
