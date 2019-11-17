import common_config from './config.common';

import { Config } from '../types/configType';

const config: Config = {
  ...common_config,
  mongoose: {
    ...common_config.mongoose,
    uri: common_config.mongoose.uri || 'mongodb://localhost:27017/dashboard',
  },
  redis: {
    ...common_config.redis,
    uri: common_config.redis.uri || 'redis://localhost:6379',
  },
};

export default config;
