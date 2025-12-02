import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getMikroOrmConfig from '../mikro-orm.config';
import { envsValidator } from 'src/envs';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from 'src/shared/filters/domain.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: envsValidator,
    }),
    MikroOrmModule.forRoot(
      getMikroOrmConfig('app', {
        POSTGRES_URI: process.env.POSTGRES_URI,
      }),
    ),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class CoreModule {}
