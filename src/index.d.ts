import { Envs } from './envs';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
}
