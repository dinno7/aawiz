import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateEvaluationDto,
  CreateEvaluationResDto,
} from './dtos/create-evaluation.dto';
import { EvaluationsService } from '../../application/evaluations.service';
import { CreateEvaluationCommand } from '../../application/commands/create-evaluation.command';
import { CurrentUser } from 'src/modules/auth/presenters/http/decorators/current-user.decorator';
import { UserRole, type UserPublic } from 'src/modules/users/domain';
import { type UUID } from 'crypto';
import {
  DeleteEvaluationCommand,
  ReadOneEvaluationCommand,
  UpdateEvaluationCommand,
} from '../../application/commands';
import { UpdateEvaluationDto } from './dtos/update-evaluation.dto';
import { Evaluation } from '../../domain';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Policies, RolePolicy } from 'src/modules/auth/presenters/http';

@ApiBearerAuth()
@Controller('evaluations')
@Policies([RolePolicy(UserRole.ADMIN)])
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateEvaluationResDto,
  })
  @ApiOperation({
    summary: 'create 2 users and create evaluation for one of them',
  })
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

  @Get(':id')
  async readEvaluation(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.evaluationsService.readOne(
      new ReadOneEvaluationCommand(id),
    );
  }

  @Put(':id')
  updateEvaluation(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() inp: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    return this.evaluationsService.updateOne(
      new UpdateEvaluationCommand(id, {
        status: inp.status,
        score: inp.score,
        title: inp.title,
        note: inp.note,
      }),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvaluation(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.evaluationsService.deleteOne(new DeleteEvaluationCommand(id));
  }
}
