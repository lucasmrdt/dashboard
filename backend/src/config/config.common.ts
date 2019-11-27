import assert from 'assert';
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
      token: env.WEATHER_API_KEY,
      widgets: [
        {
          getter: async (token, params) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            assert(json.cod === 200);
            return {
              current: json.main.temp,
              min: json.main.temp_min,
              max: json.main.temp_max
            };
          },
          defaultParams: {
            city: 'Bordeaux'
          },
          icon: 'fire',
          name: 'temperature',
          description: 'Display temperature for a city',
          params: [{ name: 'city', type: 'string' }]
        },
        {
          getter: async (token, params) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            assert(json.cod === 200);
            return {
              icon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            };
          },
          defaultParams: {
            city: 'Bordeaux'
          },
          icon: 'cloud',
          name: 'weather',
          description: 'Display the weather for a city',
          params: [{ name: 'city', type: 'string' }]
        },
        {
          getter: async (token, params) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            assert(json.cod === 200);
            return {
              speed: json.wind.speed,
              deg: json.wind.deg
            };
          },
          defaultParams: {
            city: 'Bordeaux'
          },
          icon: 'picture',
          name: 'wind',
          description: 'Display the wind for a city',
          params: [{ name: 'city', type: 'string' }]
        }
      ]
    },
    {
      name: 'stock',
      needAuth: true,
      icon: 'bank',
      token: env.STOCKS_API_KEY,
      widgets: [
        {
          getter: async (token, params) => {
            const url = `https://api-v2.intrinio.com/securities/${params.compagny}/prices/realtime?api_key=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            return { ask: json.ask_price, bid: json.bid_price };
          },
          defaultParams: {
            compagny: 'AAPL'
          },
          icon: 'sliders',
          name: 'price',
          description: 'Display the real time stock price of compagny',
          params: [{ name: 'compagny', type: 'string' }]
        },
        {
          getter: async (token, params) => {
            const url = `https://api-v2.intrinio.com/companies/${params.compagny}?api_key=${token}`;
            const res = await fetch(url);
            const json = await res.json();
            return {
              name: json.name,
              stock_exchange: json.stock_exchange,
              ceo: json.ceo,
              company_url: json.company_url
            };
          },
          defaultParams: {
            compagny: 'AAPL'
          },
          icon: 'search',
          name: 'information',
          description: 'Display the information of compagny',
          params: [{ name: 'compagny', type: 'string' }]
        }
      ]
    },
    {
      name: 'clock',
      needAuth: false,
      icon: 'clock-circle',
      token: 'none',
      widgets: [
        {
          getter: async (_, params) => {
            const url = `http://worldtimeapi.org/api/timezone/${params.timezone}`;
            const res = await fetch(url);
            const json = await res.json();
            return { time: json.datetime.replace(/\..*/, '') };
          },
          defaultParams: {
            timezone: 'Europe/Paris'
          },
          icon: 'clock-circle',
          name: 'worldclock',
          description: 'Displays the time at a given timezone',
          params: [{ name: 'timezone', type: 'string' }]
        }
      ]
    }
  ]
};

export default config;
