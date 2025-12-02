import { Module } from '@nestjs/common';
import { EvaluationsController } from '../presenters/http/evaluation.controller';
import { EvaluationsInfrastructureModule } from '../infrastructure/persistence/evaluations-infrastructure.module';
import { CreateEvaluationUC } from './usecases/create-evaluation.uc';
import { EvaluationsService } from './evaluations.service';
import {
  DeleteEvaluationUC,
  ReadOneEvaluationUC,
  UpdateEvaluationUC,
} from './usecases';
import { UsersModule } from 'src/modules/users/application/users.module';

@Module({
  imports: [UsersModule, EvaluationsInfrastructureModule],
  controllers: [EvaluationsController],
  providers: [
    EvaluationsService,
    CreateEvaluationUC,
    ReadOneEvaluationUC,
    UpdateEvaluationUC,
    DeleteEvaluationUC,
  ],
})
export class EvaluationsModule {}
