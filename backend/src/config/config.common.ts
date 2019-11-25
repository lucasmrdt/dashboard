import fetch from 'node-fetch';
import env from './env';

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
  services: [
    {
      name: 'weather',
      needAuth: false,
      icon: 'cloud',
      token: 'e2fd1a95a05cb3d1b467bca0d469d52b',
      widgets: [
        {
          getter: async (token, params) => {
            const url = `https://samples.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${token}`;
            const res = await fetch(url);
            return res.json();
          },
          name: 'city_temperature',
          description: 'Display temperature for a city',
          params: [{ name: 'city', type: 'string' }]
        },
        {
          getter: async (token, params) => {
            return { data: 'ntm' };
          },
          name: 'city_ok',
          description: 'Test',
          params: [{ name: 'city', type: 'string' }]
        },
        {
          getter: async (token, params) => {
            return { data: 'ntm' };
          },
          name: 'petit_test',
          description: 'dzedze',
          params: [{ name: 'city', type: 'string' }]
        }
      ]
    }
  ]
};

export default config;
