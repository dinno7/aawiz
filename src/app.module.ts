import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envsValidator } from './envs';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envsValidator,
    }),
    HealthModule,
  ],
})
export class AppModule {}
