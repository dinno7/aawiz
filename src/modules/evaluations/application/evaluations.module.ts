import { Module } from '@nestjs/common';
import { EvaluationsController } from '../presenters/http/evaluation.controller';
import { EvaluationsInfrastructureModule } from '../infrastructure/persistence/evaluations-infrastructure.module';
import { CreateEvaluationUC } from './usecases/create-evaluation.uc';
import { EvaluationsService } from './evaluations.service';

@Module({
  imports: [EvaluationsInfrastructureModule],
  controllers: [EvaluationsController],
  providers: [EvaluationsService, CreateEvaluationUC],
})
export class EvaluationsModule {}
