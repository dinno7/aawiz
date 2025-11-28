import { Migrator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: 'aawiz',
  user: 'dinno',
  extensions: [Migrator],
  password: '1234',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
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
};
export default config;
