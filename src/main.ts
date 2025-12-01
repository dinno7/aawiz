import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { Envs, NodeEnv } from './envs';
import { AppSetting } from './app.settings';
import { MikroORM } from '@mikro-orm/postgresql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: AppSetting.defaultVersion,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const appConfig = app.get(ConfigService<Envs>);
  if (appConfig.get('NODE_ENV') !== NodeEnv.prod) {
    const config = new DocumentBuilder()
      .setTitle(AppSetting.appName)
      .setContact('M. Taha Delroba', '', 'tahadlrb7@gmail.com')
      .setDescription(AppSetting.appName)
      .setVersion(AppSetting.version)
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  const orm = app.get(MikroORM);
  await orm.getMigrator().up();

  const PORT = +appConfig.get('PORT', 5000);
  await app.listen(PORT);
  new Logger('App').log(`Running on ${PORT}`);
}

void bootstrap();
