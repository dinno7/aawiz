import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckHealthResDto } from './dtos/check-health.dto';
import { Envs, NodeEnv } from 'src/envs';

@Injectable()
export class HealthCheckService {
  constructor(private readonly appConfig: ConfigService<Envs>) {}

  checkHealth(): CheckHealthResDto {
    return {
      ok: true,
      env: this.appConfig.get<NodeEnv>('NODE_ENV')!,
      date_time: new Date(),
    };
  }
}
