import {Config, Env} from '../types/configType';

const NODE_ENV = process.env.NODE_ENV as Env;

const avaibleEnv = Object.values(Env).join(', ');

const getConfig = (): Config => {
  switch (NODE_ENV) {
    case Env.development:
      return require('config/config.dev').default;

    case Env.production:
      return require('config/config.prod').default;

    case Env.test:
      return require('config/config.test').default;

    default:
      throw new Error(
        `Invalid NODE_ENV '${NODE_ENV}', must be one of [${avaibleEnv}].`, // eslint-disable-line max-len
      );
  }
};

export default getConfig();
