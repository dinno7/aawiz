import { ConfigModuleOptions } from '@nestjs/config';
import { IsEnum, validateSync } from 'class-validator';

import { Expose, plainToInstance, Transform } from 'class-transformer';

export enum NodeEnv {
  dev = 'dev',
  test = 'test',
  stage = 'stage',
  prod = 'prod',
}

export class Envs {
  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;
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
    const errorMsgs = errors.map((error) =>
      Object.values(error.constraints || {}).join(', '),
    );
    console.info(errorMsgs.map((s) => `\t- ${s}`).join('\n'));
    console.log('----------------');
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
