import {cleanEnv, port, str} from 'envalid';
import dotenv from 'dotenv';

dotenv.config({quiet: true});

export function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({default: 3032}),
    APP_NAME: str({default: 'ExpressTS App'}),
    LOGGER_DIR: str({default: 'logs'}), 
  });
}
