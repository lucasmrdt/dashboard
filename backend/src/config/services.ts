import _ from 'lodash';
import assert from 'assert';
import fetch from 'node-fetch';
import env from './env';

import { Service } from 'types/configType';

export const SERVICES: Service[] = [
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
        description: 'Displays temperature for a city',
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
        description: 'Displays the weather for a city',
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
        description: 'Displays the wind for a city',
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
        description: 'Displays the real time stock price of compagny',
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
    name: 'time',
    needAuth: false,
    icon: 'hourglass',
    token: null,
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
        name: 'clock',
        description: 'Displays the time at a given timezone',
        params: [{ name: 'timezone', type: 'string' }]
      },
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
        icon: 'calendar',
        name: 'date',
        description: 'Displays the date at a given timezone',
        params: [{ name: 'timezone', type: 'string' }]
      }
    ]
  },
  {
    name: 'github',
    needAuth: true,
    icon: 'github',
    token: null,
    widgets: [
      {
        getter: async token => {
          const url = `https://api.github.com/user`;
          const res = await fetch(url, {
            headers: { Authorization: `token ${token}` }
          });
          const json = await res.json();
          return json;
        },
        defaultParams: {},
        icon: 'user',
        name: 'profile',
        description: 'Displays the profile informations',
        params: []
      },
      {
        getter: async (token, params) => {
          const url = `https://api.github.com/user/repos`;
          const res = await fetch(url, {
            headers: { Authorization: `token ${token}` }
          });
          const json = await res.json();
          const avaibleRepositories = json.map(({ name }: any) => name);
          const selectedRepository =
            json.find(({ name }: any) => name === params.repository) || json[0];
          return {
            selectedRepository: _.pick(selectedRepository, [
              'name',
              'stargazers_count',
              'description'
            ]),
            avaibleRepositories
          };
        },
        defaultParams: {
          repository: null
        },
        icon: 'save',
        name: 'repository',
        description: 'Displays the repository informations',
        params: []
      }
    ]
  }
];
