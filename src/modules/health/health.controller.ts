import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CheckHealthResDto } from './dtos/check-health.dto';
import { HealthCheckService } from './health.service';
import { Auth, AuthTypes } from '../auth/presenters/http';

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
