import {
  Body,
  Controller,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  CreateEvaluationDto,
  CreateEvaluationResDto,
} from './dtos/create-evaluation.dto';
import { EvaluationsService } from '../../application/evaluations.service';
import { CreateEvaluationCommand } from '../../application/commands/create-evaluation.command';
import { CurrentUser } from 'src/modules/auth/presenters/http/decorators/current-user.decorator';
import { type UserPublic } from 'src/modules/users/domain';
import { EvaluationsExceptionFilter } from './filters/evaluations.filter';

@Controller('evaluations')
@UseFilters(EvaluationsExceptionFilter)
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}
  @Post()
  async createEvaluation(
    @Body()
    { note, relatedUserId, score, title }: CreateEvaluationDto,
    @CurrentUser() currentUser: UserPublic,
  ): Promise<CreateEvaluationResDto> {
    const result = await this.evaluationsService.create(
      new CreateEvaluationCommand(
        title,
        score,
        relatedUserId,
        currentUser.id,
        note,
      ),
    );
    return result;
  }

}
