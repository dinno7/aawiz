import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envsValidator } from './envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envsValidator,
    }),
  ],
})
export class AppModule {}
