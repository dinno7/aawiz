import { ConfigModuleOptions } from '@nestjs/config';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  isPort,
  IsPort,
  IsString,
  IsUrl,
  Matches,
  Min,
  validateSync,
} from 'class-validator';

import { Expose, plainToInstance } from 'class-transformer';

export enum NodeEnv {
  dev = 'dev',
  test = 'test',
  stage = 'stage',
  prod = 'prod',
}

export class Envs {
  @Expose()
  @IsPort()
  PORT: string;

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @Expose()
  @Matches(
    /^postgres(?:ql)?:\/\/(?:([^:\/]*)(?::([^@]*))?@)?([^:\/]+|\[[^\]]+\])(?::(\d+))?\/([^?\s]*)(?:\?(.*))?$/,
  )
  POSTGRES_URI: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @Expose()
  @IsNumber()
  @Min(3600)
  JWT_ACCESS_TOKEN_TTL: number;

  @Expose()
  @Min(10000)
  JWT_REFRESH_TOKEN_TTL: number;

  @Expose()
  @IsUrl()
  JWT_TOKEN_AUDIENCE_URL: string;

  @Expose()
  @IsUrl()
  JWT_TOKEN_ISSUER_URL: string;
}

export const envsValidator: ConfigModuleOptions['validate'] = (
  config: Record<string, any>,
): Record<string, any> => {
  const validatedConfig = plainToInstance(Envs, config, {
    strategy: 'excludeAll',
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.log('----------------');
    console.error(`❗️ ~ ERROR  ~ Environment variables validation failed!`);
    const errorMsgs = errors.map(
      (error) =>
        `- ${Object.values(error.constraints || {}).join(', ')} - Current: (${error.value})`,
    );
    console.info(errorMsgs.join('\n'));
    console.log('----------------');
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
