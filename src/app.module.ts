import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { CoreModule } from './core/core.module';
import { Modules } from './modules/modules';

@Module({
  imports: [CoreModule, HealthModule, Modules],
})
export class AppModule {}
