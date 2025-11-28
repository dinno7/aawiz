import { Module } from '@nestjs/common';
import { HealthCheckService } from './health.service';
import { HealthCheckController } from './health.controller';

@Module({
  providers: [HealthCheckService],
  controllers: [HealthCheckController],
})
export class HealthModule {}
