import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CheckHealthResDto } from './dtos/check-health.dto';
import { HealthCheckService } from './health.service';
import { Auth } from '../auth/presenters/http/decorators/auth.decorator';
import { AuthTypes } from '../auth/presenters/http/types';

@Controller('health')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @Auth(AuthTypes.None)
  @ApiOkResponse({
    type: CheckHealthResDto,
    description: 'Checking application health',
  })
  health(): CheckHealthResDto {
    return this.healthCheckService.checkHealth();
  }
}
