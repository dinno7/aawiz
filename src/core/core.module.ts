import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getMikroOrmConfig from '../mikro-orm.config';
import { envsValidator, NodeEnv } from 'src/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === NodeEnv.prod ? '.env.prod' : '.env.dev',
      validate: envsValidator,
    }),
    MikroOrmModule.forRoot(
      getMikroOrmConfig('app', {
        POSTGRES_URI: process.env.POSTGRES_URI,
      }),
    ),
  ],
})
export class CoreModule {}
