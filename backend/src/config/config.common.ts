import env from './env';

import { Config, Env } from '../types/configType';

const config: Config = {
  env,
  isDev: env.NODE_ENV === Env.development,
  express: {
    port: '8080',
  },
  jwt: {
    publicKey: env.JWT_PUBKEY,
  },
  mongoose: {
    uri: env.MONGODB_URI as any,
  },
  redis: {
    uri: env.REDIS_URI as any,
  },
  sevices: [
    {
      name: 'weather',
      widgets: [
        {
          name: 'city_temperature',
          description: 'Display temperature for a city',
          params: [{ name: 'city', type: 'string' }],
        },
      ],
    },
  ],
};

export default config;
