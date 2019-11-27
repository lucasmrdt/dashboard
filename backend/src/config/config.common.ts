import env from './env';
import { SERVICES } from './services';

import { Config, Env } from '../types/configType';

const config: Config = {
  env,
  isDev: env.NODE_ENV === Env.development,
  express: {
    port: '8080'
  },
  jwt: {
    publicKey: env.JWT_PUBLICKEY,
    privateKey: env.JWT_PRIVATEKEY
  },
  mongoose: {
    uri: env.MONGODB_URI as any
  },
  redis: {
    uri: env.REDIS_URI as any
  },
  services: SERVICES
};

export default config;
