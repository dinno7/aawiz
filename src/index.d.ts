import { Envs } from './envs';
import { UserPublic } from './modules/users/domain';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv extends Envs {}
  }
  declare namespace Express {
    interface Request {
      user?: UserPublic;
    }
  }
}
