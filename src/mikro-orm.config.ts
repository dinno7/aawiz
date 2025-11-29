import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Envs, NodeEnv } from './envs';

function getMikroOrmConfig(contextName: undefined): Options;
function getMikroOrmConfig(contextName: 'cli'): Options;
function getMikroOrmConfig(
  contextName: 'app',
  envs: Pick<Envs, 'POSTGRES_URI'>,
): Options;
function getMikroOrmConfig(
  contextName?: 'cli' | 'app',
  envs?: Pick<Envs, 'POSTGRES_URI'>,
) {
  const config = defineConfig({
    driver: PostgreSqlDriver,
    extensions: [Migrator],
    clientUrl: process.env.POSTGRES_URI,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: process.env.NODE_ENV !== NodeEnv.prod, // Only debug in non-production environments
    migrations: {
      path: 'dist/migrations',
      pathTs: 'src/migrations',
      fileName(timestamp: string, name?: string): string {
        if (!name || name?.length === 0) {
          throw new Error('Please provide --name');
        }
        return `${timestamp}_${name?.replace(/\s/g, '_')}`;
      },
    },
  });

  if (contextName === 'app') {
    if (!envs) {
      throw new Error("envs is required when contextName is 'app'");
    }
    config.clientUrl = envs.POSTGRES_URI;
    return config;
  } else {
    // Load .envs for cli
    require?.('dotenv')?.config?.();
    config.clientUrl = process.env.POSTGRES_URI;
  }

  return config;
}

export default getMikroOrmConfig;
