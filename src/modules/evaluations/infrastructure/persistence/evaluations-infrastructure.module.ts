import { Module } from '@nestjs/common';
import { EvaluationsMikroORMModule } from './mikroorm/evaluations-mikroorm.module';

@Module({
  imports: [EvaluationsMikroORMModule],
  exports: [EvaluationsMikroORMModule],
})
export class EvaluationsInfrastructureModule {}
