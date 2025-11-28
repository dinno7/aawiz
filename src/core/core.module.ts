import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mikroOrmConfig from '../mikro-orm.config';
import { envsValidator } from '../envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envsValidator,
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
  ],
})
export class CoreModule {}
